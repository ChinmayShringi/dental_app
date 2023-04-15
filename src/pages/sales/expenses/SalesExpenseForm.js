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
  mainBgColor,
  primaryBlueHexColor,
  primaryHexColor,
  seperator,
  successHexColor,
  textMutedColor,
} from '../../../constants/themeColors';

import {common, commonCard} from '../../../assets/style';

import FormDatePicker from '../../../components/FormDatePicker';
import FormInput from '../../../components/FormInput';
import FormSelectPicker from '../../../components/FormSelectPicker';
import FormTextArea from '../../../components/FormTextArea';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import {Formik} from 'formik';

import update from 'immutability-helper';
import moment from 'moment';

import Icon from 'react-native-vector-icons/FontAwesome';

// import {LinearGradient} from 'expo-linear-gradient';
import {ActionSheet} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {connect} from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const appScreenWidth = Dimensions.get('window');
const carouselWidth = appScreenWidth.width - 50;
const imageHeight = Math.round(((carouselWidth - 10) * 10) / 14);

class SalesExpenseForm extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  submitForm = null;
  handleSubmitFormForHeaderButton = e => {
    if (this.submitForm) {
      this.submitForm();
    }
  };
  bindSubmitFormToHeaderButton = submitForm => {
    this.submitForm = submitForm;
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      expenseId:
        typeof this?.props?.navigation?.state?.params?.expenseId !== 'undefined'
          ? parseInt(this?.props?.navigation?.state?.params?.expenseId)
          : 0,
      expense: null,
      expenseTypes: [],
      expenseType: null,
      expensedOn: null,

      activeCarouselIndex: 0,
      expenseImages: [],
    };

    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getFormData();
    this.props.navigation.setParams({
      handleSave: this.handleSubmitFormForHeaderButton,
    });
  }

  getFormData() {
    let formData = new FormData();
    formData.append('expenseid', this.state.expenseId);

    let options = {
      api: '',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      refreshOn401: true,
    };

    if (this.state.expenseId === 0) {
      options.api = 'v_1/sales/expenses/add';
    } else {
      options.api = 'v_1/sales/expenses/edit';
    }

    this.api.callPostApi(options).then(data => {
      this.setState({loading: false});

      if (data.status_code === 200) {
        let responseData = data.response.data;

        let expensedOn =
          responseData.expense.expensedon !== null && this.state.expenseId !== 0
            ? moment(responseData.expense.expensedon)
            : null;

        this.setState({
          expense: responseData.expense,
          expenseTypes: responseData.expensetypes,
          expenseType: parseInt(responseData.expense.expensetype),
          expensedOn: expensedOn,
          expenseImages: responseData.expenseimages,
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

  handleChangeExpenseType = expenseType => {
    if (this.state.expenseType !== expenseType) {
      this.setState({
        expenseType: expenseType,
      });
    }
  };

  handleOnChangeExpensedOn = expensedOn => {
    this.setState({expensedOn});
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
        let selectionCancelledErrorMessage =
          'Error: User cancelled image selection';

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
        let selectionCancelledErrorMessage =
          'Error: User cancelled image selection';

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
        expenseimageid: 0,
        imagefilepath: image.path,
      };
      this.setState({
        expenseImages: update(this.state.expenseImages, {
          $push: [item],
        }),
      });
    });

    setTimeout(() => {
      this.setState({
        loading: false,
        activeCarouselIndex: this.state.expenseImages.length - 1,
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
      expenseImages: update(this.state.expenseImages, {
        [index]: {
          istobedeleted: {$set: newValue},
        },
      }),
    });
  };

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

  handleSubmit = values => {
    const formData = new FormData();
    formData.append(
      'expenseid',
      this.state.expenseId === null ? '' : this.state.expenseId,
    );
    formData.append(
      'expensetype',
      this.state.expenseType === null ? '' : this.state.expenseType,
    );
    formData.append(
      'expensedon',
      this.state.expensedOn === null
        ? ''
        : this.state.expensedOn.format('YYYY-MM-DD'),
    );
    formData.append(
      'vouchernumber',
      typeof values.vouchernumber === 'undefined' ? '' : values.vouchernumber,
    );
    formData.append(
      'amount',
      typeof values.amount === 'undefined' ? '' : values.amount,
    );
    formData.append(
      'description',
      typeof values.description === 'undefined' ? '' : values.description,
    );

    let hasUploadedAnyImage = false;
    let imagestobedeleted = [];
    this.state.expenseImages.forEach((expenseimage, index) => {
      if (
        expenseimage.istobedeleted === 0 &&
        expenseimage.expenseimageid === 0
      ) {
        hasUploadedAnyImage = true;
        let imagefile = {
          uri: expenseimage.uri,
          type: expenseimage.type,
          name: expenseimage.name,
        };
        formData.append('files[]', imagefile, expenseimage.name);
      } else if (
        expenseimage.istobedeleted !== 0 &&
        expenseimage.expenseimageid !== 0
      ) {
        imagestobedeleted.push(expenseimage.expenseimageid);
      }
    });

    if (!hasUploadedAnyImage) {
      formData.append('files[]', '');
    }
    formData.append('imagestobedeleted', JSON.stringify(imagestobedeleted));

    let options = {
      api: 'v_1/sales/expenses/store',
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

      if (responseData.status_code === 200) {
        this.api.showSuccessMessage(responseData.response.message, null);
        setTimeout(() => {
          if (this.state.expenseId > 0) {
            this.props.navigation.goBack(null);
          } else {
            this.props.navigation.navigate('SalesExpenses');
          }
        }, 4500);
      } else {
        let errormessage = null;
        if (
          typeof responseData.status_code !== 'undefined' &&
          responseData.status_code === 422
        ) {
          errormessage = responseData.response.data.message;
        }
        this.api.showErrorMessage(responseData.response.message, errormessage);
      }
    });
  };

  validate(values) {
    let errors = {};

    if (
      typeof this.state.expenseType === 'undefined' ||
      this.state.expenseType === '' ||
      this.state.expenseType === null
    ) {
      errors.expensetype = 'Please select expense type.';
    }

    if (
      typeof this.state.expensedOn === 'undefined' ||
      this.state.expensedOn === '' ||
      this.state.expensedOn === null
    ) {
      errors.expensedon = 'Please select expensed on.';
    }

    if (!values.amount) {
    } else {
      let validateAmount = values.amount.replace('.', '');
      if (isNaN(validateAmount)) {
        errors.amount = 'Please enter a valid amount.';
      }
    }

    if (!values.description) {
      errors.description = 'Please enter description.';
    }

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
            {/* <NavigationEvents onDidFocus={() => this.getFormData() } /> */}
            <Loader loading={this.state.loading} />
            <ScrollView>
              <View style={common.formElementsContainer}>
                <Formik
                  enableReinitialize={true}
                  validate={this.validate}
                  initialValues={{
                    vouchernumber:
                      this.state.expense &&
                      typeof this.state.expense.vouchernumber !== 'undefined' &&
                      this.state.expense.vouchernumber !== null
                        ? this.state.expense.vouchernumber
                        : '',
                    amount:
                      this.state.expense &&
                      typeof this.state.expense.amount !== 'undefined' &&
                      this.state.expense.amount !== null
                        ? this.state.expense.amount
                        : '',
                    description:
                      this.state.expense &&
                      typeof this.state.expense.description !== 'undefined' &&
                      this.state.expense.description !== null
                        ? this.state.expense.description
                        : '',
                  }}
                  onSubmit={this.handleSubmit}>
                  {formikProps => {
                    const {values, handleChange, handleSubmit, errors} =
                      formikProps;

                    // BIND SUBMISSION HANDLER REMOTLY FOR HEADER SAVE BUTTON
                    this.bindSubmitFormToHeaderButton(formikProps.submitForm);

                    return (
                      <View>
                        <FormSelectPicker
                          label="Expense Type"
                          placeholder={{
                            label: 'Select Expense Type',
                            value: '',
                          }}
                          value={this.state.expenseType}
                          onValueChange={this.handleChangeExpenseType}
                          items={this.state.expenseTypes}
                          errors={errors.expensetype}
                        />
                        <FormInput
                          name="vouchernumber"
                          value={values.vouchernumber}
                          onChangeText={handleChange('vouchernumber')}
                          placeholder="Enter Voucher Number"
                          autoCapitalize="none"
                          label="Voucher Number"
                          errorMessage={errors.vouchernumber}
                        />
                        <FormDatePicker
                          name="expensedon"
                          value={this.state.expensedOn}
                          onChangeEvent={this.handleOnChangeExpensedOn}
                          label="Expensed On"
                          errors={errors.expensedon}
                          display="spinner"
                        />
                        <FormInput
                          name="amount"
                          value={values.amount}
                          onChangeText={handleChange('amount')}
                          placeholder="Enter Amount"
                          autoCapitalize="none"
                          label="Amount"
                          errorMessage={errors.amount}
                        />
                        <FormTextArea
                          name="description"
                          label="Description"
                          value={values.description}
                          placeholder="Write some description here"
                          rowSpan={5}
                          onChangeText={handleChange('description')}
                          errors={errors.description}
                        />

                        <Text style={[styles.blockTitle, {}]}>Documents:</Text>

                        <View style={{alignItems: 'center'}}>
                          <Icon
                            name="cloud-upload"
                            size={100}
                            style={{
                              color: textMutedColor,
                            }}
                          />
                          <Text style={styles.imageTaberrortTitle}>
                            Let's Upload Documents
                          </Text>
                          <Text style={styles.imageTaberrortDescription}>
                            Add documents from your phone or Open camera to scan
                            new documents.
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
                          {this.state.expenseImages.length === 0 ? (
                            <Text
                              style={[
                                common.mutedTextInItalic,
                                {textAlign: 'center'},
                              ]}>
                              No images added!
                            </Text>
                          ) : (
                            <View style={{marginHorizontal: 8}}>
                              <Carousel
                                layout={'default'}
                                data={
                                  this.state.expenseImages.length > 0
                                    ? this.state.expenseImages
                                    : [
                                        {
                                          imagefilepath:
                                            this.state.expense
                                              .firstimagefilepath,
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
                                dotsLength={this.state.expenseImages.length}
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
                                Instructions: Tap on image for image related
                                more options.
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    );
                  }}
                </Formik>
              </View>
            </ScrollView>
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
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: seperator,
    marginTop: 0,
    paddingTop: 0,
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
    color: '#555',
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
});

const mapStateToProps = state => {
  return {
    user: state.loggedInUserDetailsReducer.user,
  };
};

export default connect(mapStateToProps, null)(SalesExpenseForm);
