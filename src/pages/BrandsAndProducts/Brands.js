import {Card, CardItem} from 'native-base';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  backgroundGrey,
  mainBgColor,
  primaryHexColor,
} from '../../constants/themeColors';

import {common, commonCard, modalLayout} from '../../assets/style';

import ListingSearchBar from '../../components/ListingSearchBar';
import NoRecordsFound from '../../components/NoRecordsFound';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';

// import {LinearGradient} from 'expo-linear-gradient';

// import {MaterialIcons} from '@expo/vector-icons';
import Modal from 'react-native-modal';

import {skeletonPlaceholderProps} from '../../constants/defaultValues';
import SkeletonContent from '../../components/SkeletonContent';

const appScreenWidth = Dimensions.get('window');
const cardWidth = (appScreenWidth.width - 38) / 2;
const cardHeight = (appScreenWidth.width - 75) / 2;

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(((cardWidth - 34) * 5) / 9);
const imageWidth = cardWidth - 34;

// const modalImageHeight = Math.round((dimensions.width - 34) * 8 / 16);
const modalImageWidth = dimensions.width - 34;

const modalCardWidth = (appScreenWidth.width - 38) / 2;
const modalCardHeight = (appScreenWidth.width - 75) / 2;

const modalImageHeight = modalCardHeight - 10;
// const modalImageWidth = modalCardWidth - 20;

export default class Brands extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
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

  getData() {
    const formData = new FormData();
    formData.append('search', '');

    let options = {
      api: 'v_1/brands/load',
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
          data: responseData.brands,
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

  renderBrandDetails = ({item}) => {
    return (
      <View style={{}}>
        <Card
          style={[
            commonCard.cardContainer,
            styles.categoryContainer,
            {flex: 1, justifyContent: 'center'},
          ]}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('BrandProducts', {
                pageHeading: item.name,
                brandId: item.brandid,
              });
            }}>
            <CardItem style={[commonCard.imageContainer, {}]}>
              <Image
                source={{uri: item.imagefilepath}}
                style={{
                  height: imageHeight,
                  width: imageWidth,
                  flex: 1,
                }}
                resizeMode="contain"
              />
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
      api: 'v_1/brands/products/search',
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
            modalData: responseData.brandproducts.data,
            modalLastPage: responseData.brandproducts.last_page,
          });
        } else {
          this.setState({
            modalData: this.state.modalData.concat(
              responseData.brandproducts.data,
            ),
            modalLastPage: responseData.brandproducts.last_page,
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
                this.props.navigation.push('BrandProductDetails', {
                  pageHeading: item.brandname,
                  brandProductId: item.brandproductid,
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
              {/* <LinearGradient
                colors={['rgba(0, 0.1, 0.1, 0.2)', 'transparent']}
                style={styles.modalImageGradient}
              /> */}
            </CardItem>
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
                  renderItem={this.renderBrandDetails}
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
                {/* <MaterialIcons
                  name="close"
                  size={28}
                  style={modalLayout.headerMenuicon}
                  onPress={this.toggleSearchModal}
                /> */}
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
