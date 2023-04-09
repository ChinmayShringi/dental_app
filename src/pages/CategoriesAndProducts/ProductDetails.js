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

import {common, commonCard} from '../../assets/style';

import Api from '../../provider/Api';
import Dataprovider from '../../provider/Dataprovider';

import NotFound from '../../components/NotFound';

import {
  fontColor,
  mainBgColor,
  primaryHexColor,
} from '../../constants/themeColors';

import {Body, Content, List, ListItem} from 'native-base';

import Carousel, {Pagination} from 'react-native-snap-carousel';

import Icon from 'react-native-vector-icons/FontAwesome';

import SkeletonContent from 'react-native-skeleton-content';
import {skeletonPlaceholderProps} from '../../constants/defaultValues';

const appScreenWidth = Dimensions.get('window');
const cardWidth = appScreenWidth.width;
const imageHeight = Math.round(((cardWidth - 10) * 14) / 16);
const imageWidth = cardWidth;

export default class ProductDetails extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      productId:
        typeof this.props.navigation.state.params !== 'undefined' &&
        typeof this.props.navigation.state.params.productId !== 'undefined'
          ? parseInt(this.props.navigation.state.params.productId)
          : 0,
      product: null,
      productImages: [],
      slabs: [],
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
    formData.append('productid', this.state.productId);

    let options = {
      api: 'v_1/categories/products/view',
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
          product: responseData.product,
          productImages: responseData.productimages,
          slabs: responseData.slabs,
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

  slabsRender = () => {
    return this.state.slabs.map((slab, index) => {
      return (
        <ListItem
          key={index}
          style={{marginLeft: 10, paddingTop: 10, paddingBottom: 10}}>
          <Body>
            <Text style={[common.fontBold, {fontSize: 12, color: fontColor}]}>
              {slab.title}
            </Text>
            <Text note numberOfLines={1} style={{fontSize: 12}}>
              Total units{' '}
              <Text style={[common.fontBold, {color: fontColor}]}>
                {slab.formatedtotalunits}
              </Text>{' '}
              at{' '}
              <Text style={[common.fontBold, {color: fontColor}]}>
                <Icon name="inr" size={12} />
                {slab.formatedpriceperunit}
              </Text>
              /per unit.
            </Text>
          </Body>
        </ListItem>
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
              {/* <View style={[common.card, { padding: 0, overflow: 'hidden' }]}>     */}
              <SkeletonContent
                containerStyle={{flex: 1, width: appScreenWidth.width}}
                layout={skeletonLayout}
                isLoading={this.state.loading}
                duration={skeletonPlaceholderProps.duration}
                animationType={skeletonPlaceholderProps.animationType}
                animationDirection={skeletonPlaceholderProps.animationDirection}
                boneColor={skeletonPlaceholderProps.boneColor}
                highlightColor={skeletonPlaceholderProps.highlightColor}>
                {this.state.product !== null && !this.state.loading ? (
                  <View>
                    <View>
                      <Carousel
                        layout={'default'}
                        data={
                          this.state.productImages.length > 0
                            ? this.state.productImages
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
                        dotsLength={this.state.productImages.length}
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
                        padding: 15,
                        paddingTop: 8,
                        paddingBottom: 8,
                      }}>
                      <Text style={[commonCard.cardTitle, {marginBottom: 0}]}>
                        {this.state.product.name}
                      </Text>
                      <Text
                        style={[
                          commonCard.cardDescription,
                          {fontSize: 11, marginBottom: 3},
                        ]}>
                        {this.state.product.categoryname} |{' '}
                        {this.state.product.subcategoryname}
                      </Text>
                      <Text style={styles.productPrice}>
                        <Icon name="inr" size={14} color={fontColor} />
                        &nbsp;{this.state.product.formatedprice}
                      </Text>
                      <Text
                        style={{fontSize: 12, marginTop: 2, color: fontColor}}>
                        <Text style={common.fontBold}>Code:</Text>{' '}
                        {this.state.product.code !== '' ? (
                          this.state.product.code
                        ) : (
                          <Text style={common.mutedTextInItalic}>NA</Text>
                        )}
                      </Text>
                      <Text
                        style={{fontSize: 12, marginTop: 2, color: fontColor}}>
                        <Text style={common.fontBold}>Warranty:</Text>
                        &nbsp;{this.state.product.warranty}&nbsp;
                        {parseInt(this.state.product.warranty) > 1
                          ? 'years warranty'
                          : 'year warranty'}
                      </Text>
                      <Text
                        style={{fontSize: 12, marginTop: 2, color: fontColor}}>
                        <Text style={common.fontBold}>
                          Project Completion Days:
                        </Text>
                        &nbsp;
                        {parseInt(this.state.product.productcompletiontime)}
                        &nbsp;
                        {parseInt(this.state.product.productcompletiontime) > 1
                          ? 'days'
                          : 'day'}
                      </Text>
                      {this.state.slabs.length > 0 ? (
                        <Content style={{marginTop: 10}}>
                          <List>
                            <ListItem
                              itemDivider
                              style={{
                                paddingTop: 0,
                                paddingRight: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                backgroundColor: 'transparent',
                              }}>
                              <Text
                                style={{
                                  color: primaryHexColor,
                                  fontWeight: 'bold',
                                  fontSize: 15,
                                  textTransform: 'uppercase',
                                }}>
                                Slabs:
                              </Text>
                            </ListItem>
                            {this.slabsRender()}
                          </List>
                        </Content>
                      ) : null}
                    </View>
                  </View>
                ) : (
                  <NotFound onPress={this.reloadPageData} />
                )}
              </SkeletonContent>
              {/* </View> */}
            </View>

            {/* {!this.state.loading ?
                            <View style={{flex: 1}}>
                                {this.state.product !== null && !this.state.loading ? 
                                    <View style={[common.card, { padding: 0, overflow: 'hidden' }]}>
                                        <View>
                                            <Carousel
                                                layout={"default"}
                                                data={this.state.productImages.length > 0 ? this.state.productImages : [{ "imagefilepath": this.state.product.firstimagefilepath }]}
                                                renderItem={this.renderCarouselItem}
                                                sliderWidth={cardWidth}
                                                itemWidth={cardWidth}
                                                onSnapToItem = { index => this.setState({activeCarouselIndex:index}) }
                                            />
                                            <Pagination
                                                dotsLength={this.state.productImages.length}
                                                activeDotIndex={this.state.activeCarouselIndex}
                                                containerStyle={{ 
                                                    backgroundColor: 'transparent', 
                                                    paddingTop: 8,
                                                    paddingBottom: 4, 
                                                    paddingLeft: 8, 
                                                    paddingRight: 8,
                                                    // backgroundColor: 'red'
                                                }}
                                                dotStyle={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: 5,
                                                    marginHorizontal: 0,
                                                    backgroundColor: primaryHexColor
                                                }}
                                                inactiveDotStyle={{
                                                    // Define styles for inactive dots here
                                                }}
                                                inactiveDotOpacity={0.4}
                                                inactiveDotScale={0.6}
                                                />
                                        </View>
                                        <View style={{
                                            padding: 15,
                                            paddingTop: 8,
                                            paddingBottom: 8
                                        }}>
                                            <Text style={[commonCard.cardTitle, {marginBottom: 0}]}>
                                                {this.state.product.name}
                                            </Text>
                                            <Text style={[commonCard.cardDescription, {fontSize: 12, marginBottom: 3}]}>
                                                {this.state.product.categoryname} | {this.state.product.subcategoryname}
                                            </Text>
                                            <Text style={styles.productPrice}>
                                                <Icon
                                                    name="inr"
                                                    size={14}
                                                    color="#333"
                                                />
                                                &nbsp;{this.state.product.formatedprice}
                                            </Text>
                                            <Text style={{marginTop: 2}}>
                                                <Text style={common.fontBold}>Code:</Text> {this.state.product.code !== '' ? this.state.product.code : <Text style={common.mutedTextInItalic}>NA</Text>}
                                            </Text>
                                            <Text style={{marginTop: 2}}>
                                                <Text style={common.fontBold}>Warranty:</Text>
                                                &nbsp;{this.state.product.warranty}&nbsp;
                                                {parseInt(this.state.product.warranty) > 1 ? "years warranty" : "year warranty"}
                                            </Text>
                                            <Text style={{marginTop: 2}}>
                                                <Text style={common.fontBold}>Project Completion Days:</Text>
                                                &nbsp;{parseInt(this.state.product.productcompletiontime)}&nbsp;
                                                {parseInt(this.state.product.productcompletiontime) > 1 ? "days" : "day"}
                                            </Text>
                                            {this.state.slabs.length > 0 ?
                                                <Content style={{ marginTop: 10}}>
                                                    <List>
                                                        <ListItem 
                                                            itemDivider 
                                                            style={{
                                                                paddingTop: 0,
                                                                paddingRight: 0,
                                                                paddingBottom: 0,
                                                                paddingLeft: 0,
                                                                backgroundColor: 'transparent'
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    color: primaryHexColor,
                                                                    fontWeight: 'bold',
                                                                    fontSize: 16
                                                                }}
                                                            >
                                                                Slabs: 
                                                            </Text>
                                                        </ListItem>
                                                        {this.slabsRender()}
                                                    </List>
                                                </Content>
                                                : null
                                            }
                                        </View>
                                    </View>
                                    : null
                                }
                                {this.state.product === null && !this.state.loading ? 
                                    <View style={common.card}>
                                        <NotFound 
                                            onPress={this.reloadPageData}
                                        />
                                    </View> : null
                                }
                            </View>
                        : null } */}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  productPrice: {
    fontSize: 14,
    marginBottom: 5,
    color: fontColor,
  },
});
