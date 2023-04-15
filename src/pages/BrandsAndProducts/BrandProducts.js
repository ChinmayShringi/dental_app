import {Card, CardItem} from 'native-base';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {mainBgColor} from '../../constants/themeColors';

import {common, commonCard} from '../../assets/style';

import ListingSearchBar from '../../components/ListingSearchBar';
import NoRecordsFound from '../../components/NoRecordsFound';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';

// import {LinearGradient} from 'expo-linear-gradient';

import {skeletonPlaceholderProps} from '../../constants/defaultValues';
import SkeletonContent from '../../components/SkeletonContent';

const appScreenWidth = Dimensions.get('window');
const cardWidth = (appScreenWidth.width - 38) / 2;
const cardHeight = (appScreenWidth.width - 75) / 2;

const dimensions = Dimensions.get('window');
const imageHeight = cardHeight - 10;
const imageWidth = cardWidth - 20;

export default class BrandProducts extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      brandId:
        typeof this?.props?.navigation?.state?.params !== 'undefined' &&
        typeof this?.props?.navigation?.state?.params?.brandId !== 'undefined'
          ? parseInt(this?.props?.navigation?.state?.params?.brandId)
          : 0,
      data: [],
      currentPage: 1,
      lastPage: 1,
      isLoadMore: false,
      isDataRefreshing: false,
      loading: true,
      textSearchLoading: false,
      searchText: '',
      typing: false,
      typingTimeout: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  reloadPageData = () => {
    this.setState(
      {
        loading: true,
        currentPage: 1,
        lastPage: 1,
      },
      this.getData,
    );
  };

  getData() {
    const formData = new FormData();
    formData.append('search', this.state.searchText);
    formData.append('page', this.state.currentPage);
    formData.append('brandid', this.state.brandId);

    let options = {
      api: 'v_1/brands/products/load',
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

        if (this.state.isDataRefreshing || this.state.textSearchLoading) {
          this.setState({
            data: responseData.brandproducts.data,
            lastPage: responseData.brandproducts.last_page,
          });
        } else {
          this.setState({
            data: this.state.data.concat(responseData.brandproducts.data),
            lastPage: responseData.brandproducts.last_page,
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
        isLoadMore: false,
        isDataRefreshing: false,
        loading: false,
        textSearchLoading: false,
      });
    });
  }

  renderCallLogDetails = ({item}) => {
    return (
      <View>
        {/* <Card style={commonCard.cardContainer}> */}
        <Card style={[commonCard.cardContainer, styles.categoryContainer]}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.push('BrandProductDetails', {
                pageHeading: item.brandname,
                brandProductId: item.brandproductid,
              });
            }}>
            <CardItem style={commonCard.imageContainer}>
              <Image
                source={{uri: item.firstimagefilepath}}
                style={{
                  height: imageHeight,
                  width: imageWidth,
                  flex: 1,
                }}
                resizeMode="cover"
              />
              {/* <LinearGradient
                colors={['rgba(0, 0.1, 0.1, 0.2)', 'transparent']}
                style={styles.imageGradient}
              /> */}
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  handleRefreshData = () => {
    this.setState(
      {
        currentPage: 1,
        isLoadMore: false,
        isDataRefreshing: true,
      },
      this.getData,
    );
  };

  handleLoadMoreData = () => {
    if (
      this.state.lastPage === 0 ||
      this.state.lastPage >= this.state.currentPage + 1
    ) {
      if (!this.state.isLoadMore) {
        this.setState(
          {
            currentPage: this.state.currentPage + 1,
            isLoadMore: true,
          },
          this.getData,
        );
      }
    }
  };

  footerLoader = () => {
    return this.state.isLoadMore ? (
      <View style={common.footerLoaderForLoadMore}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  updateSearchText = searchText => {
    if (typeof searchText !== 'undefined') {
      const self = this;
      if (self.state.typingTimeout) {
        clearTimeout(self.state.typingTimeout);
      }

      self.setState({
        searchText: typeof searchText !== 'undefined' ? searchText : '',
        typing: false,
        typingTimeout: setTimeout(function () {
          self.setState(
            {
              textSearchLoading: true,
              currentPage: 1,
              lastPage: 1,
            },
            self.getData,
          );
        }, 1000),
      });
    }
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

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View style={common.listingContainer}>
          {/* <NavigationEvents onDidFocus={() => this.getInitialData() } /> */}
          {/* <Loader loading={this.state.loading}/> */}
          <ListingSearchBar
            onChangeText={this.updateSearchText}
            onClear={this.updateSearchText}
            value={this.state.searchText}
            showLoading={this.state.textSearchLoading}
          />
          <SkeletonContent
            containerStyle={{
              flex: 1,
              flexWrap: 'wrap',
              width: dimensions.width - 20,
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
                  style={{width: '100%'}}
                  data={this.state.data}
                  renderItem={this.renderCallLogDetails}
                  keyExtractor={(item, index) => index.toString()}
                  onEndReached={this.handleLoadMoreData}
                  onEndReachedThreshold={0.001}
                  numColumns={2}
                  refreshing={this.state.isDataRefreshing}
                  onRefresh={this.handleRefreshData}
                  ListFooterComponent={this.footerLoader}
                />
              </View>
            ) : null}
            {!this.state.loading && this.state.data.length === 0 ? (
              <NoRecordsFound onPress={this.reloadPageData} />
            ) : null}
          </SkeletonContent>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: imageHeight,
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
  categoryContainer: {
    minWidth: cardWidth,
    maxWidth: cardWidth,
    maxHeight: cardHeight - 10,
    minHeight: cardHeight - 10,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
  },
});
