import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Card, CardItem, Body} from 'native-base';

import {
  primaryHexColor,
  dangerHexColor,
  mainBgColor,
  backgroundGrey,
  fontColor,
  circleBgColor,
} from '../../constants/themeColors';

import {common, commonCard, modalLayout} from '../../assets/style';

import NoRecordsFound from '../../components/NoRecordsFound';
import ListingSearchBar from '../../components/ListingSearchBar';

import {NavigationEvents} from 'react-navigation';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';
import Loader from '../../provider/Loader';

import {LinearGradient} from 'expo-linear-gradient';

import Modal from 'react-native-modal';
import {MaterialIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../../constants/defaultValues';
import SkeletonContent from 'react-native-skeleton-content';

const appScreenWidth = Dimensions.get('window');
const cardWidth = (appScreenWidth.width - 38) / 2;
const cardHeight = (appScreenWidth.width - 75) / 2;

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(((cardWidth - 34) * 8) / 9);
const imageWidth = cardWidth - 34;

// const modalImageHeight = Math.round((dimensions.width - 34) * 8 / 16);
const modalImageWidth = dimensions.width - 34;

const modalCardWidth = (appScreenWidth.width - 38) / 2;
const modalCardHeight = (appScreenWidth.width - 75) / 2;

const modalImageHeight = modalCardHeight - 10;
// const modalImageWidth = modalCardWidth - 20;

export default class Categories extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      parentId:
        typeof this.props.navigation.state.params !== 'undefined' &&
        typeof this.props.navigation.state.params.parentId !== 'undefined'
          ? parseInt(this.props.navigation.state.params.parentId)
          : 0,
      data: [],
      isDataRefreshing: false,
      loading: true,

      modalLoading: false,
      isSearchModalVisible: false,
      modalData: [],
      modalCurrentPage: 1,
      modalLastPage: 1,
      modalIsLoadMore: false,
      modalIsDataRefreshing: false,
      modalTextSearchLoading: false,
      modalSearchText: '',
      modalTyping: false,
      modalTypingTimeout: 0,
    };

    this.toggleSearchModal = this.toggleSearchModal.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.props.navigation.setParams({toggleSearch: this.toggleSearchModal});
  }

  reloadPageData = () => {
    this.setState(
      {
        loading: true,
      },
      this.getData,
    );
  };

  // getInitialData = () => {
  //     this.setState({
  //         loading: true,
  //         currentPage: 1,
  //         data: []
  //     });
  //     this.getData();
  // }

  getData() {
    const formData = new FormData();
    formData.append('search', '');
    formData.append('parentid', this.state.parentId);

    let options = {
      api: 'v_1/categories/load',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      refreshOn401: true,
    };

    this.api.callPostApi(options).then(data => {
      if (data.status_code === 200) {
        let responseData = data.response.data;

        this.setState({
          data: responseData.categories,
        });
      } else {
        let errormessage = null;
        if (
          typeof data.status_code !== 'undefined' &&
          data.status_code === 422
        ) {
          errormessage = data.response.data.message;
        }
        this.api.showErrorMessage(data.response.message, errormessage);
      }

      this.setState({
        isDataRefreshing: false,
        loading: false,
      });
    });
  }

  renderCallLogDetails = ({item}) => {
    return (
      <View style={{}}>
        <Card style={[commonCard.cardContainer, styles.categoryContainer]}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              if (this.state.parentId === 0) {
                this.props.navigation.push('SubCategories', {
                  pageHeading: item.title,
                  parentId: item.categoryid,
                });
              } else {
                this.props.navigation.push('Products', {
                  pageHeading: item.title,
                  categoryId: this.state.parentId,
                  subCategoryId: item.categoryid,
                });
              }
            }}>
            <CardItem style={commonCard.imageContainer}>
              <Image
                source={{uri: item.imagefilepath}}
                style={{height: imageHeight, width: imageWidth, flex: 1}}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(0, 0.1, 0.1, 0.2)', 'transparent']}
                style={styles.imageGradient}
              />
            </CardItem>
            <CardItem
              style={{
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 5,
                paddingBottom: 5,
              }}>
              <Body>
                <Text
                  style={[styles.cardTitle]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.title}
                </Text>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  handleRefreshData = () => {
    this.setState(
      {
        isDataRefreshing: true,
      },
      this.getData,
    );
  };

  toggleSearchModal = () => {
    this.setState({isSearchModalVisible: !this.state.isSearchModalVisible});
  };

  getModalInitialData = () => {
    setTimeout(() => {
      this.setState(
        {
          modalLoading: true,
          modalData: [],
          modalCurrentPage: 1,
          modalIsLoadMore: false,
          modalIsDataRefreshing: true,
          modalTextSearchLoading: false,
          modalSearchText: '',
          modalTyping: false,
          modalTypingTimeout: 0,
        },
        this.getModalData,
      );
    });
  };

  resetFormData = () => {
    this.setState({
      modalLoading: false,
      modalData: [],
      modalCurrentPage: 1,
      modalLastPage: 1,
      modalIsLoadMore: false,
      modalIsDataRefreshing: false,
      modalTextSearchLoading: false,
      modalSearchText: '',
      modalTyping: false,
      modalTypingTimeout: 0,
    });
  };

  getModalData() {
    const formData = new FormData();
    formData.append('search', this.state.modalSearchText);
    formData.append('page', this.state.modalCurrentPage);

    let options = {
      api: 'v_1/categories/products/search',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      refreshOn401: true,
    };

    this.api.callPostApi(options).then(data => {
      if (data.status_code === 200) {
        let responseData = data.response.data;

        if (
          this.state.modalIsDataRefreshing ||
          this.state.modalTextSearchLoading
        ) {
          this.setState({
            modalData: responseData.products.data,
            modalLastPage: responseData.products.last_page,
          });
        } else {
          this.setState({
            modalData: this.state.modalData.concat(responseData.products.data),
            modalLastPage: responseData.products.last_page,
          });
        }
      } else {
        let errormessage = null;
        if (
          typeof data.status_code !== 'undefined' &&
          data.status_code === 422
        ) {
          errormessage = data.response.data.message;
        }
        this.api.showErrorMessage(data.response.message, errormessage);
      }

      this.setState({
        modalLoading: false,
        modalIsLoadMore: false,
        modalIsDataRefreshing: false,
        modalTextSearchLoading: false,
      });
    });
  }

  handleModalRefreshData = () => {
    this.setState(
      {
        modalCurrentPage: 1,
        modalIsLoadMore: false,
        modalIsDataRefreshing: true,
      },
      this.getModalData,
    );
  };

  handleModalLoadMoreData = () => {
    if (
      this.state.modalLastPage === 0 ||
      this.state.modalLastPage >= this.state.modalCurrentPage + 1
    ) {
      if (!this.state.modalIsLoadMore) {
        this.setState(
          {
            modalCurrentPage: this.state.modalCurrentPage + 1,
            modalIsLoadMore: true,
          },
          this.getModalData,
        );
      }
    }
  };

  modalFooterLoader = () => {
    return this.state.modalIsLoadMore ? (
      <View style={common.footerLoaderForLoadMore}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  updateModalSearchText = modalSearchText => {
    if (typeof modalSearchText !== 'undefined') {
      const self = this;
      if (self.state.modalTypingTimeout) {
        clearTimeout(self.state.modalTypingTimeout);
      }

      self.setState({
        modalSearchText:
          typeof modalSearchText !== 'undefined' ? modalSearchText : '',
        modalTyping: false,
        modalTypingTimeout: setTimeout(function () {
          self.setState(
            {
              modalTextSearchLoading: true,
              modalCurrentPage: 1,
              modalLastPage: 1,
            },
            self.getModalData,
          );
        }, 1000),
      });
    }
  };

  renderModalProduct = ({item}) => {
    return (
      <View>
        {/* <Card style={commonCard.cardContainer}> */}
        <Card style={[commonCard.cardContainer, styles.productContainer]}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.toggleSearchModal();
              setTimeout(() => {
                this.props.navigation.push('ProductDetails', {
                  pageHeading: item.name,
                  productId: item.productid,
                });
              }, 500);
            }}>
            <CardItem style={commonCard.imageContainer}>
              <Image
                source={{uri: item.firstimagefilepath}}
                style={{
                  height: modalImageHeight,
                  width: modalImageWidth,
                  flex: 1,
                }}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(0, 0.1, 0.1, 0.2)', 'transparent']}
                style={styles.modalImageGradient}
              />
              {/* <View style={styles.warrantyContainer}>
                                <Icon
                                    name="certificate"
                                    size={56}
                                    color={dangerHexColor}
                                    style={{position: 'relative', flex: 1}}
                                />
                                <Text style={styles.warrantyTextContainer}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 13,
                                        }}
                                    >
                                        {item.warranty}
                                    </Text>
                                    {"\n"}
                                    {item.warranty > 1 ? 'Years' : 'Year' }
                                    {"\n"}
                                    Warranty
                                </Text>
                            </View> */}
            </CardItem>
            {/* <CardItem>
                            <Body>
                                <Text style={[commonCard.cardTitle, {marginBottom: 0}]}>
                                    {item.name}
                                </Text>
                                <Text style={[commonCard.cardDescription, {fontSize: 12, marginBottom: 2}]}>
                                    {item.categoryname} | {item.subcategoryname}
                                </Text>
                                <Text style={styles.productPrice}>
                                    <Icon
                                        name="inr"
                                        size={14}
                                        color="#333"
                                    />
                                    &nbsp;{item.formatedprice}
                                </Text>
                            </Body>
                        </CardItem> */}
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  render() {
    const skeletonLayoutItem = {
      width: cardWidth,
      height: cardHeight,
      marginRight: 5,
      marginLeft: 5,
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 8,
    };
    const skeletonLayout = [
      skeletonLayoutItem,
      skeletonLayoutItem,
      skeletonLayoutItem,
      skeletonLayoutItem,
      skeletonLayoutItem,
      skeletonLayoutItem,
      skeletonLayoutItem,
    ];

    // const modalSkeletonLayoutItem = {
    //     width: modalImageWidth + 10,
    //     height: modalImageHeight + 80,
    //     borderRadius: 8,
    //     marginTop: 5,
    //     marginBottom: 5
    // };
    // const modalSkeletonLayout = [
    //     modalSkeletonLayoutItem,
    //     modalSkeletonLayoutItem,
    // ];

    const modalSkeletonLayoutItem = {
      width: modalCardWidth,
      height: modalCardHeight,
      marginRight: 5,
      marginLeft: 5,
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 8,
    };
    const modalSkeletonLayout = [
      skeletonLayoutItem,
      skeletonLayoutItem,
      skeletonLayoutItem,
      skeletonLayoutItem,
      skeletonLayoutItem,
      skeletonLayoutItem,
      skeletonLayoutItem,
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[common.listingContainer, {backgroundColor: backgroundGrey}]}>
          {/* <NavigationEvents onDidFocus={() => this.getInitialData() } /> */}
          {/* <Loader loading={this.state.loading}/> */}
          <SkeletonContent
            containerStyle={{
              flex: 1,
              flexWrap: 'wrap',
              width: appScreenWidth.width - 20,
            }}
            layout={skeletonLayout}
            isLoading={this.state.loading}
            duration={skeletonPlaceholderProps.duration}
            animationType={skeletonPlaceholderProps.animationType}
            animationDirection={skeletonPlaceholderProps.animationDirection}
            boneColor={skeletonPlaceholderProps.boneColor}
            highlightColor={skeletonPlaceholderProps.highlightColor}>
            {this.state.data.length > 0 ? (
              <View style={{flexWrap: 'wrap'}}>
                <FlatList
                  data={this.state.data}
                  renderItem={this.renderCallLogDetails}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  refreshing={this.state.isDataRefreshing}
                  onRefresh={this.handleRefreshData}
                />
              </View>
            ) : null}
            {!this.state.loading && this.state.data.length === 0 ? (
              <NoRecordsFound onPress={this.reloadPageData} />
            ) : null}
          </SkeletonContent>
          <Modal
            isVisible={this.state.isSearchModalVisible}
            onBackButtonPress={this.toggleSearchModal}
            backdropOpacity={0.5}
            style={modalLayout.modalContainer}
            animationInTiming={500}
            animationOutTiming={500}
            onModalWillShow={this.getModalInitialData}
            onModalHide={this.resetModalData}>
            {/* <Loader loading={this.state.modalLoading}/> */}
            <View style={modalLayout.body}>
              <View style={modalLayout.header}>
                <MaterialIcons
                  name="close"
                  size={28}
                  style={modalLayout.headerMenuicon}
                  onPress={this.toggleSearchModal}
                />
                <View>
                  <Text style={modalLayout.headertext}>Search Products</Text>
                </View>
              </View>
              <View style={[modalLayout.bodyContent]}>
                <View style={{flex: 1, padding: 10, paddingTop: 0}}>
                  <ListingSearchBar
                    onChangeText={this.updateModalSearchText}
                    onClear={this.updateModalSearchText}
                    value={this.state.modalSearchText}
                    showLoading={this.state.modalTextSearchLoading}
                  />
                  {/* <View style={[common.listingContainer, { borderRadius: 0, backgroundColor: 'red', paddingTop: 0, marginTop: -5 }]}> */}
                  <View style={{flex: 1}}>
                    <SkeletonContent
                      containerStyle={{
                        flex: 1,
                        flexWrap: 'wrap',
                        width: modalImageWidth + 15,
                      }}
                      layout={modalSkeletonLayout}
                      isLoading={this.state.modalLoading}
                      duration={skeletonPlaceholderProps.duration}
                      animationType={skeletonPlaceholderProps.animationType}
                      animationDirection={
                        skeletonPlaceholderProps.animationDirection
                      }
                      boneColor={skeletonPlaceholderProps.boneColor}
                      highlightColor={skeletonPlaceholderProps.highlightColor}>
                      {this.state.modalData.length > 0 ? (
                        <View style={{flexWrap: 'wrap'}}>
                          <FlatList
                            style={{width: '100%'}}
                            data={this.state.modalData}
                            renderItem={this.renderModalProduct}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.handleModalLoadMoreData}
                            onEndReachedThreshold={0.001}
                            numColumns={2}
                            refreshing={this.state.modalIsDataRefreshing}
                            onRefresh={this.handleModalRefreshData}
                            ListFooterComponent={this.modalFooterLoader}
                          />
                        </View>
                      ) : null}
                      {!this.state.modalLoading &&
                      this.state.modalData.length === 0 ? (
                        <NoRecordsFound onPress={this.getModalInitialData} />
                      ) : null}
                    </SkeletonContent>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  categoryContainer: {
    minWidth: cardWidth,
    maxWidth: cardWidth,
    maxHeight: cardHeight,
    minHeight: cardHeight,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: primaryHexColor,
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: imageHeight,
  },
  modalImageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: modalImageHeight,
  },
  warrantyContainer: {
    position: 'absolute',
    top: 6,
    right: 8,
  },
  warrantyTextContainer: {
    textAlign: 'center',
    position: 'absolute',
    top: 9,
    left: 12,
    fontSize: 6,
    color: '#fff',
  },
  productPrice: {
    fontSize: 14,
  },
  productContainer: {
    minWidth: modalCardWidth,
    maxWidth: modalCardWidth,
    maxHeight: modalCardHeight - 10,
    minHeight: modalCardHeight - 10,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
  },
});
