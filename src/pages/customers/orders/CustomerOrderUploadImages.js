import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Button} from 'native-base';

import {
  dangerHexColor,
  fontColor,
  mainBgColor,
  primaryBlueHexColor,
  primaryHexColor,
  seperator,
  successHexColor,
  textMutedColor,
} from '../../../constants/themeColors';

import {
  common,
  commonCard,
  commonLabelDescription,
} from '../../../assets/style';

import Icon from 'react-native-vector-icons/FontAwesome';

import FormButton from '../../../components/FormButton';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import {Formik} from 'formik';

// import {LinearGradient} from 'expo-linear-gradient';
import {ActionSheet} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import update from 'immutability-helper';

const screenWidth = Dimensions.get('window').width;
const appScreenWidth = Dimensions.get('window');
const carouselWidth = appScreenWidth.width - 30;
const imageHeight = Math.round(((carouselWidth - 10) * 10) / 14);

export default class CustomerOrderUploadImages extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeCarouselIndex: 0,
      orderId:
        typeof this.props.navigation
          .dangerouslyGetParent()
          .getParam('orderId') !== 'undefined'
          ? parseInt(
              this.props.navigation.dangerouslyGetParent().getParam('orderId'),
            )
          : 0,
      orderimages: [],
    };

    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  renderCarouselItem = ({item, index}) => {
    return (
      <View
        style={[
          commonCard.imageContainer,
          {width: '100%', position: 'relative'},
        ]}>
        <TouchableOpacity
          onPress={() => {
            this.onClickEditImage(index, item.istobedeleted);
          }}
          activeOpacity={0.9}>
          <Image
            source={{uri: item.imagefilepath}}
            style={{
              height: imageHeight,
              width: '100%',
              flex: 1,
              borderRadius: 2,
            }}
            resizeMode="contain"
          />
          {item.istobedeleted !== 0 ? (
            <></>
          ) : // <LinearGradient
          //   colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.8)']}
          //   style={{
          //     position: 'absolute',
          //     left: 0,
          //     right: 0,
          //     top: 0,
          //     height: imageHeight,
          //   }}
          // />
          null}
          {item.istobedeleted !== 0 ? (
            <Icon
              name="trash"
              size={50}
              style={{
                color: dangerHexColor,
                position: 'absolute',
                left: carouselWidth / 2 - 20,
                top: imageHeight / 2 - 35,
              }}
            />
          ) : null}
          {item.istobedeleted !== 0 ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                fontStyle: 'italic',
                color: dangerHexColor,
                position: 'absolute',
                left: 0,
                top: imageHeight / 2 + 15,
                width: carouselWidth,
              }}>
              To be deleted
            </Text>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
    })
      .then(image => {
        this.onSelectedImage([image]);
      })
      .catch(e => {
        let permissionErrorMessage = 'Error: Required permission missing';

        // Permission Missing
        if (e === permissionErrorMessage) {
          this.api.showPermissionRelatedError(
            'Missing Permissions!',
            'Please enable camera and storage permissions to use this feature.',
            'Ok, Got It',
          );
        }
      });
  };

  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
    })
      .then(image => {
        this.onSelectedImage(image);
      })
      .catch(e => {
        let permissionErrorMessage = 'Error: Required permission missing';

        // Permission Missing
        if (e === permissionErrorMessage) {
          this.api.showPermissionRelatedError(
            'Missing Permissions!',
            'Please enable storage permission to use this feature.',
            'Ok, Got It',
          );
        }
      });
  };

  onSelectedImage = images => {
    this.setState({loading: true});
    let timeOutTime = 2000;
    if (images.length > 2 && images.length <= 5) {
      timeOutTime = 5000;
    } else if (images.length > 5) {
      timeOutTime = 10000;
    }
    images.forEach((image, index) => {
      const source = {uri: image.path};
      let pathParts = image.path.split('/');

      let item = {
        id: Date.now(),
        url: source,
        content: image.data,
        type: image.mime,
        uri: image.path,
        name: pathParts[pathParts.length - 1],
        istobedeleted: 0,
        orderimageid: 0,
        imagefilepath: image.path,
      };
      this.setState({
        orderimages: update(this.state.orderimages, {
          $push: [item],
        }),
      });
    });

    setTimeout(() => {
      this.setState({
        loading: false,
        activeCarouselIndex: this.state.orderimages.length - 1,
      });
    }, timeOutTime);
  };

  onClickEditImage = (index, istobedeleted) => {
    let BUTTONS = [];
    if (istobedeleted === 0) {
      BUTTONS = [
        {text: 'Remove Image', icon: 'trash', iconColor: dangerHexColor},
        {text: 'Cancel', icon: 'close', iconColor: successHexColor},
      ];
    } else {
      BUTTONS = [
        {text: 'Undo Remove', icon: 'undo', iconColor: dangerHexColor},
        {text: 'Cancel', icon: 'close', iconColor: successHexColor},
      ];
    }

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 3,
        title: 'Image Options',
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.removeSelectedImage(index, istobedeleted);
            break;
          default:
            break;
        }
      },
    );
  };

  removeSelectedImage = (index, istobedeleted) => {
    let newValue = istobedeleted === 0 ? 1 : 0;
    this.setState({
      orderimages: update(this.state.orderimages, {
        [index]: {
          istobedeleted: {$set: newValue},
        },
      }),
    });
  };

  handleSubmit = values => {
    let formData = new FormData();
    formData.append('orderid', this.state.orderId);

    let hasUploadedAnyImage = false;
    let imagestobedeleted = [];
    this.state.orderimages.forEach((orderimage, index) => {
      if (orderimage.istobedeleted === 0 && orderimage.orderimageid === 0) {
        hasUploadedAnyImage = true;
        let imagefile = {
          uri: orderimage.uri,
          type: orderimage.type,
          name: orderimage.name,
        };
        formData.append('files[]', imagefile, orderimage.name);
      } else if (
        orderimage.istobedeleted !== 0 &&
        orderimage.orderimageid !== 0
      ) {
        imagestobedeleted.push(orderimage.orderimageid);
      }
    });

    // HAS SELECTED ANY PHOTO
    if (hasUploadedAnyImage) {
      let options = {
        api: 'v_1/customers/orders/upload-images',
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        data: formData,
        refreshOn401: true,
      };

      this.setState({loading: true});

      this.api.callPostApi(options).then(responseData => {
        this.setState({loading: false});

        if (responseData?.status_code === 200) {
          this.api.showSuccessMessage(responseData?.response.message, null);
          setTimeout(() => {
            this.setState({
              activeCarouselIndex: 0,
              orderimages: [],
            });
            this.props.navigation.navigate('CustomerViewOrder', {
              orderId: this.state.orderid,
            });
          }, 4000);
        } else {
          let errormessage = null;
          if (
            typeof responseData?.status_code !== 'undefined' &&
            responseData?.status_code === 422
          ) {
            errormessage = responseData?.response.data.message;
          }
          this.api.showErrorMessage(
            responseData?.response.message,
            errormessage,
          );
        }
      });
    }
    // NOT SELECTED ANY PHOTO
    else {
      this.api.showErrorMessage(
        'Required fields are missing.',
        'Please select image(s) to upload.',
      );
    }
  };

  validate(values) {
    let errors = {};

    return errors;
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{flex: 1, flexDirection: 'column'}}
        behavior={'padding'}
        enabled
        keyboardVerticalOffset={100}>
        <View style={{flex: 1, backgroundColor: mainBgColor}}>
          <View style={common.formContainer}>
            <Loader loading={this.state.loading} />
            <Formik
              enableReinitialize={true}
              validate={this.validate}
              initialValues={{}}
              onSubmit={this.handleSubmit}>
              {({errors, handleChange, values, handleSubmit}) => (
                <View style={styles.imageTabcontainer}>
                  <ScrollView>
                    <View style={{alignItems: 'center'}}>
                      <Icon
                        name="cloud-upload"
                        size={100}
                        style={{
                          color: textMutedColor,
                        }}
                      />
                      <Text style={styles.imageTaberrortTitle}>
                        Let's Upload Case Photos
                      </Text>
                      <Text style={styles.imageTaberrortDescription}>
                        Add photos from your phone or Open camera to capture new
                        photos.
                      </Text>
                    </View>
                    <View style={styles.imageButtonBlock}>
                      <View style={styles.imageButtonContainer}>
                        <Button
                          block
                          iconLeft
                          rounded
                          style={{backgroundColor: primaryBlueHexColor}}
                          onPress={this.choosePhotoFromLibrary}>
                          <Icon
                            name="folder-open"
                            style={styles.imageButtonIconStyle}
                          />
                          <Text style={styles.imageButtonTextStyle}>
                            Open Gallery
                          </Text>
                        </Button>
                      </View>
                      <View style={styles.imageButtonContainer}>
                        <Button
                          block
                          iconLeft
                          rounded
                          style={{backgroundColor: primaryHexColor}}
                          onPress={this.takePhotoFromCamera}>
                          <Icon
                            name="camera"
                            style={styles.imageButtonIconStyle}
                          />
                          <Text style={styles.imageButtonTextStyle}>
                            Open Camera
                          </Text>
                        </Button>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={[
                          commonLabelDescription.blockTitle,
                          {marginHorizontal: 0},
                        ]}>
                        Images to be uploaded:
                      </Text>
                      {this.state.orderimages.length === 0 ? (
                        <Text
                          style={[
                            common.mutedTextInItalic,
                            {textAlign: 'center'},
                          ]}>
                          No image is selected!
                        </Text>
                      ) : (
                        <View>
                          <Carousel
                            layout={'default'}
                            data={
                              this.state.orderimages.length > 0
                                ? this.state.orderimages
                                : [
                                    {
                                      imagefilepath:
                                        this.state.order.firstimagefilepath,
                                    },
                                  ]
                            }
                            renderItem={this.renderCarouselItem}
                            sliderWidth={carouselWidth}
                            itemWidth={carouselWidth}
                            firstItem={this.state.activeCarouselIndex}
                            onSnapToItem={index =>
                              this.setState({activeCarouselIndex: index})
                            }
                          />
                          <Pagination
                            dotsLength={this.state.orderimages.length}
                            activeDotIndex={this.state.activeCarouselIndex}
                            containerStyle={{
                              backgroundColor: 'transparent',
                              paddingTop: 8,
                              paddingBottom: 0,
                              paddingLeft: 8,
                              paddingRight: 8,
                              width: screenWidth - 30,
                              flexWrap: 'wrap',
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
                          <Text
                            style={[
                              common.mutedTextInItalic,
                              {fontSize: 10, marginTop: 5},
                            ]}>
                            Instructions: Tap on image for image related more
                            options.
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.uploadButton}>
                      <FormButton
                        buttonType="solid"
                        onPress={handleSubmit}
                        title="Upload"
                        buttonColor={primaryHexColor}
                        bgColor={primaryHexColor}
                        color="#ffffff"
                      />
                    </View>
                  </ScrollView>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  blockTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginHorizontal: 10,
    paddingVertical: 10,
    color: fontColor,
    borderBottomWidth: 1,
    borderBottomColor: seperator,
  },
  imageTabcontainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  imageTaberrortTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: fontColor,
    marginTop: 0,
  },
  imageTaberrortDescription: {
    textAlign: 'center',
    fontSize: 12,
    color: textMutedColor,
  },
  imageButtonBlock: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  imageButtonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  imageButtonStyle: {},
  imageButtonIconStyle: {
    fontSize: 20,
    color: '#fff',
  },
  imageButtonTextStyle: {
    marginLeft: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  uploadButton: {
    marginTop: 10,
  },
});
