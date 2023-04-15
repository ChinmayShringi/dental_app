import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  callLogCardLayout,
  common,
  commonCard,
  commonLabelDescription,
} from '../../assets/style';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';

import NotFound from '../../components/NotFound';

import {
  fontColor,
  mainBgColor,
  primaryHexColor,
} from '../../constants/themeColors';

import {Body, Left, List, ListItem} from 'native-base';

import Carousel, {Pagination} from 'react-native-snap-carousel';

import Icon from 'react-native-vector-icons/FontAwesome';

import {skeletonPlaceholderProps} from '../../constants/defaultValues';
import SkeletonContent from '../../components/SkeletonContent';

const appScreenWidth = Dimensions.get('window');
const cardWidth = appScreenWidth.width;
const imageHeight = Math.round(((cardWidth - 10) * 14) / 16);
const imageWidth = cardWidth;

export default class BrandProductDetails extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      brandProductId:
        typeof this?.props?.navigation?.state?.params !== 'undefined' &&
        typeof this?.props?.navigation?.state?.params?.brandProductId !== 'undefined'
          ? parseInt(this?.props?.navigation?.state?.params?.brandProductId)
          : 0,
      brandProduct: null,
      benefits: [],
      flexuralStrength: '',
      workingTime: '',
      warranty: '',
      brandProductImages: [],
      activeCarouselIndex: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  reloadPageData = () => {
    this.setState({loading: true}, this.getData);
  };

  getData() {
    let formData = new FormData();
    formData.append('brandproductid', this.state.brandProductId);

    let options = {
      api: 'v_1/brands/products/view',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      refreshOn401: true,
    };

    this.api.callPostApi(options).then(data => {
      this.setState({
        loading: false,
        refreshing: false,
      });

      if (data.status_code === 200) {
        let responseData = data.response.data;

        this.setState({
          brandProduct: responseData.brandproduct,
          benefits: responseData.benefits,
          flexuralStrength: responseData.flexuralstrength,
          workingTime: responseData.workingtime,
          warranty: responseData.warranty,
          brandProductImages: responseData.brandproductimages,
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
    });
  }

  onRefreshPageData = () => {
    this.setState({refreshing: true}, this.getData);
  };

  renderCarouselItem = ({item, index}) => {
    return (
      <View style={[commonCard.imageContainer, {width: '100%'}]}>
        <Image
          source={{uri: item.imagefilepath}}
          style={{
            height: imageHeight,
            width: '100%',
            flex: 1,
          }}
          resizeMode="cover"
        />
      </View>
    );
  };

  benefitsRender = () => {
    return this.state.benefits.map(benefit => {
      return (
        <View style={callLogCardLayout.textWithIconContainer}>
          <Icon
            name="circle"
            size={14}
            style={callLogCardLayout.textWithIconContainerIcon}
          />
          <View>
            <Text
              style={[
                callLogCardLayout.textWithIconContainerText,
                {color: fontColor},
              ]}>
              {benefit.title}
            </Text>
          </View>
        </View>
      );
    });
  };

  render() {
    const skeletonLayout = [
      {
        width: imageWidth + 40,
        height: imageHeight + 10,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 0,
      },
      {
        width: imageWidth / 2 + 20,
        height: 20,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
      },
      {
        width: imageWidth / 2 + 100,
        height: 10,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
      },
      {
        width: imageWidth / 2 + 20,
        height: 20,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
      },
      {
        width: imageWidth / 2,
        height: 15,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
      },
      {
        width: imageWidth / 2 + 40,
        height: 15,
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
      },
      {
        width: imageWidth / 2 + 80,
        height: 15,
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[common.cardContainer, {overflow: 'hidden', paddingTop: 0}]}>
          {/* <NavigationEvents onDidFocus={() => this.getFormData() } /> */}
          {/* <Loader loading={this.state.loading}/> */}
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshPageData}
              />
            }>
            <View style={{flex: 1}}>
              <SkeletonContent
                containerStyle={{flex: 1, width: appScreenWidth.width}}
                layout={skeletonLayout}
                isLoading={this.state.loading}
                duration={skeletonPlaceholderProps.duration}
                animationType={skeletonPlaceholderProps.animationType}
                animationDirection={skeletonPlaceholderProps.animationDirection}
                boneColor={skeletonPlaceholderProps.boneColor}
                highlightColor={skeletonPlaceholderProps.highlightColor}>
                {this.state.brandProduct !== null && !this.state.loading ? (
                  <View>
                    <View>
                      <Carousel
                        layout={'default'}
                        data={
                          this.state.brandProductImages.length > 0
                            ? this.state.brandProductImages
                            : [
                                {
                                  imagefilepath:
                                    this.state.product.firstimagefilepath,
                                },
                              ]
                        }
                        renderItem={this.renderCarouselItem}
                        sliderWidth={cardWidth}
                        itemWidth={cardWidth}
                        onSnapToItem={index =>
                          this.setState({activeCarouselIndex: index})
                        }
                      />
                      <Pagination
                        dotsLength={this.state.brandProductImages.length}
                        activeDotIndex={this.state.activeCarouselIndex}
                        containerStyle={{
                          backgroundColor: 'transparent',
                          paddingTop: 8,
                          paddingBottom: 4,
                          paddingLeft: 8,
                          paddingRight: 8,
                        }}
                        dotStyle={{
                          width: 8,
                          height: 8,
                          borderRadius: 5,
                          marginHorizontal: 0,
                          backgroundColor: primaryHexColor,
                        }}
                        inactiveDotStyle={{}}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                      />
                    </View>
                    <View
                      style={{
                        marginTop: 15,
                      }}>
                      <List>
                        <ListItem thumbnail>
                          <Left>
                            <Image
                              source={{
                                uri: this.state.brandProduct.brandimagefilepath,
                              }}
                              style={{
                                height: 50,
                                width: 50,
                              }}
                              resizeMode="center"
                            />
                          </Left>
                          <Body style={{borderBottomWidth: 0}}>
                            <Text
                              style={[commonCard.cardTitle, {marginBottom: 0}]}>
                              {this.state.brandProduct.brandname}
                            </Text>
                          </Body>
                        </ListItem>
                      </List>
                    </View>
                    <View
                      style={{
                        padding: 15,
                        paddingTop: 15,
                        paddingBottom: 15,
                      }}>
                      <Text
                        style={[
                          commonCard.cardTitle,
                          {textTransform: 'none', marginBottom: 5},
                        ]}>
                        {this.state.brandProduct.name}
                      </Text>
                      <Text style={{color: fontColor, fontSize: 12}}>
                        {this.state.brandProduct.description}
                      </Text>

                      <View style={{marginTop: 15}}>
                        <View style={commonLabelDescription.listContainer}>
                          <View
                            style={[
                              commonLabelDescription.listLabelContainer,
                              styles.labelContainer,
                            ]}>
                            <Text style={commonLabelDescription.labelText}>
                              Flexural Strength
                            </Text>
                          </View>
                          <View style={commonLabelDescription.listSeperator}>
                            <Text style={commonLabelDescription.labelText}>
                              :
                            </Text>
                          </View>
                          <View style={styles.descriptionContainer}>
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.flexuralStrength}
                            </Text>
                          </View>
                        </View>
                        <View style={commonLabelDescription.listContainer}>
                          <View
                            style={[
                              commonLabelDescription.listLabelContainer,
                              styles.labelContainer,
                            ]}>
                            <Text style={commonLabelDescription.labelText}>
                              In-Lab Working Time
                            </Text>
                          </View>
                          <View style={commonLabelDescription.listSeperator}>
                            <Text style={commonLabelDescription.labelText}>
                              :
                            </Text>
                          </View>
                          <View style={styles.descriptionContainer}>
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.workingTime}
                            </Text>
                          </View>
                        </View>
                        <View style={commonLabelDescription.listContainer}>
                          <View
                            style={[
                              commonLabelDescription.listLabelContainer,
                              styles.labelContainer,
                            ]}>
                            <Text style={commonLabelDescription.labelText}>
                              Warranty
                            </Text>
                          </View>
                          <View style={commonLabelDescription.listSeperator}>
                            <Text style={commonLabelDescription.labelText}>
                              :
                            </Text>
                          </View>
                          <View style={styles.descriptionContainer}>
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.warranty}
                            </Text>
                          </View>
                        </View>

                        <Text
                          style={[
                            commonLabelDescription.blockTitle,
                            {
                              color: primaryHexColor,
                              marginBottom: 5,
                              marginTop: 15,
                            },
                          ]}>
                          Benefits
                        </Text>
                        <View style={[common.seperator, {marginTop: 0}]} />
                        {this.state.benefits.length > 0 ? (
                          <View>{this.benefitsRender()}</View>
                        ) : (
                          <Text
                            style={[common.mutedTextInItalic, {fontSize: 12}]}>
                            No benefits added!
                          </Text>
                        )}
                      </View>

                      <View style={{marginTop: 15}}>
                        <Text
                          style={[
                            commonLabelDescription.blockTitle,
                            {color: primaryHexColor, marginBottom: 5},
                          ]}>
                          Preparation Guidelines
                        </Text>
                        <View style={[common.seperator, {marginTop: 0}]} />
                        <Text style={{color: fontColor, fontSize: 12}}>
                          {this.state.brandProduct.preparationguidelines}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <NotFound onPress={this.reloadPageData} />
                )}
              </SkeletonContent>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labelContainer: {
    width: 120,
  },
  descriptionContainer: {
    width: appScreenWidth.width - 170,
  },
});
