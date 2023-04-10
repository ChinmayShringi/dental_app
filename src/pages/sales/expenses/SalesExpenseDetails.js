import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  badgeColorCode,
  common,
  commonCard,
  commonLabelDescription,
  modalLayout,
} from '../../../assets/style';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import NotFound from '../../../components/NotFound';

import {Formik} from 'formik';

import FlashMessage from 'react-native-flash-message';
import Modal from 'react-native-modal';

import FormTextArea from '../../../components/FormTextArea';
import ModalSaveButton from '../../../components/ModalSaveButton';

import {
  dangerHexColor,
  mainBgColor,
  primaryBlueHexColor,
  primaryHexColor,
  successHexColor,
} from '../../../constants/themeColors';

// import {MaterialIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Button} from 'native-base';

import SkeletonContent from 'react-native-skeleton-content';
import {skeletonPlaceholderProps} from '../../../constants/defaultValues';

import Carousel, {Pagination} from 'react-native-snap-carousel';

import {connect} from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const appScreenWidth = Dimensions.get('window');
const carouselWidth = appScreenWidth.width - 30;
const imageHeight = Math.round(((carouselWidth - 10) * 10) / 16);

class SalesExpenseDetails extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  modalFlashMessageRef = null;

  submitModalForm = null;
  handleSubmitFormModalForHeaderButton = e => {
    if (this.submitModalForm) {
      this.submitModalForm();
    }
  };
  bindSubmitFormToModalHeaderButton = submitForm => {
    this.submitModalForm = submitForm;
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      transparentLoader: false,

      expenseId:
        typeof this.props.navigation.state.params.expenseId !== 'undefined'
          ? parseInt(this.props.navigation.state.params.expenseId)
          : 0,
      expense: null,
      expenseImages: [],
      activeCarouselIndex: 0,

      isRejectJobModalVisible: false,
    };

    this.modalFormValidate = this.modalFormValidate.bind(this);
    this.modalFormHandleSubmit = this.modalFormHandleSubmit.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  reloadPageData = () => {
    this.setState({loading: true}, this.getData);
  };

  onRefreshPageData = () => {
    this.setState({refreshing: true}, this.getData);
  };

  getData() {
    let formData = new FormData();
    formData.append('expenseid', this.state.expenseId);

    let options = {
      api: 'v_1/sales/expenses/view',
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
          expense: responseData.expense,
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

  renderCarouselItem = ({item, index}) => {
    return (
      <View style={[commonCard.imageContainer, {width: '100%'}]}>
        <Image
          source={{uri: item.imagefilepath}}
          style={{
            height: imageHeight,
            width: '100%',
            flex: 1,
            borderRadius: 8,
          }}
          // resizeMode='cover'
          resizeMode="contain"
        />
      </View>
    );
  };

  approveExpense = () => {
    Alert.alert(
      'Confirmation Required',
      "Are sure you've reviewed expense details and want to approve?",
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel CLicked');
          },
          style: 'cancel',
        },
        {
          text: 'Sure, Approve',
          onPress: () => {
            this.setState({transparentLoader: true});

            let formData = new FormData();
            formData.append('expenseid', this.state.expenseId);
            formData.append('isapproved', 1); // APPROVED

            let options = {
              api: 'v_1/sales/expenses/change-status',
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
              data: formData,
              refreshOn401: true,
            };

            this.api.callPostApi(options).then(data => {
              this.setState({transparentLoader: false});

              if (data.status_code === 200) {
                let responseData = data.response.data;
                this.setState({
                  expense: responseData.expense,
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
          },
        },
      ],
      {cancelable: false},
    );
  };

  toggleRejectJobFormModal = () => {
    this.setState({
      isRejectJobModalVisible: !this.state.isRejectJobModalVisible,
    });
  };

  modalFormHandleSubmit = values => {
    const formData = new FormData();
    formData.append('expenseid', this.state.expenseId);
    formData.append('isapproved', 0); // APPROVED
    formData.append('rejectreason', values.rejectreason);

    let options = {
      api: 'v_1/sales/expenses/change-status',
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      data: formData,
      refreshOn401: true,
    };

    this.setState({transparentLoader: true});

    this.api.callPostApi(options).then(responseData => {
      this.setState({transparentLoader: false});

      if (responseData.status_code === 200) {
        this.setState({
          expense: responseData.response.data.expense,
          expenseImages: responseData.response.data.expenseimages,
        });

        this.api.showSuccessMessageOnRef(
          this.modalFlashMessageRef,
          responseData.response.message,
          null,
        );
        setTimeout(() => {
          this.toggleRejectJobFormModal();
        }, 4500);
      } else {
        let errormessage = null;
        if (
          typeof responseData.status_code !== 'undefined' &&
          responseData.status_code === 422
        ) {
          errormessage = responseData.response.data.message;
        }
        this.api.showErrorMessageOnRef(
          this.modalFlashMessageRef,
          responseData.response.message,
          errormessage,
        );
      }
    });
  };

  modalFormValidate(values) {
    let errors = {};

    if (!values.rejectreason) {
      errors.rejectreason = 'Please enter reason.';
    }

    return errors;
  }

  render() {
    const skeletonLayout = [
      {
        marginLeft: screenWidth - 55,
        width: 24,
        height: 20,
        borderRadius: 2,
        marginTop: 0,
      },
      {
        width: 150,
        height: 26,
        borderRadius: 4,
        marginBottom: 15,
      },
      {
        width: 200,
        height: 17,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 230,
        height: 17,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 240,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 240,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 260,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 260,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 260,
        height: 16,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: 240,
        height: 17,
        borderRadius: 4,
        marginTop: 0,
        marginBottom: 5,
      },
      {
        width: screenWidth - 50,
        height: 1,
        marginTop: 10,
        marginBottom: 15,
      },
      {
        width: 150,
        height: 26,
        borderRadius: 4,
        marginBottom: 15,
      },
      {
        width: carouselWidth,
        height: imageHeight,
        borderRadius: 8,
      },
    ];

    return (
      <View style={{flex: 1, backgroundColor: mainBgColor}}>
        <View
          style={[common.cardContainer, {overflow: 'hidden', paddingTop: 0}]}>
          <Loader loading={this.state.transparentLoader} />
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshPageData}
              />
            }>
            <View style={[common.card, {margin: 0, borderRadius: 0}]}>
              <SkeletonContent
                containerStyle={{flex: 1, width: screenWidth.width}}
                layout={skeletonLayout}
                isLoading={this.state.loading}
                duration={skeletonPlaceholderProps.duration}
                animationType={skeletonPlaceholderProps.animationType}
                animationDirection={skeletonPlaceholderProps.animationDirection}
                boneColor={skeletonPlaceholderProps.boneColor}
                highlightColor={skeletonPlaceholderProps.highlightColor}>
                {this.state.expense !== null && !this.state.loading ? (
                  <View>
                    {this.props.user !== null &&
                    this.props.user.userid === this.state.expense.userid ? (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{alignSelf: 'flex-start'}}>
                          <Text></Text>
                        </View>
                        <View style={{alignSelf: 'flex-end'}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <TouchableOpacity
                              onPress={() => {
                                this.props.navigation.push('SalesExpenseForm', {
                                  pageHeading: 'Edit Expense',
                                  expenseId: this.state.expenseId,
                                });
                              }}
                              style={{}}>
                              <Text style={{color: primaryHexColor}}>
                                <Icon name="pencil-square-o" size={20} />
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ) : null}
                    <View>
                      <Text style={commonLabelDescription.blockTitle}>
                        Expense Details
                      </Text>
                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Expense ID
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={commonLabelDescription.labelValue}>
                            #{this.state.expense.expenseid}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Type
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.expense.expensetypetext}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Voucher No.
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.expense.vouchernumber !== '' &&
                          this.state.expense.vouchernumber !== null ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.expense.vouchernumber}
                            </Text>
                          ) : (
                            <Text
                              style={[
                                commonLabelDescription.labelValue,
                                common.mutedTextInItalic,
                              ]}>
                              NA
                            </Text>
                          )}
                        </View>
                      </View>
                      {this.props.user !== null &&
                      this.props.user.isdepartmenthead ? (
                        <View
                          style={[
                            commonLabelDescription.listContainer,
                            styles.listContainer,
                          ]}>
                          <View
                            style={[
                              commonLabelDescription.listLabelContainer,
                              styles.listLabelContainer,
                            ]}>
                            <Text style={commonLabelDescription.labelText}>
                              Sales Person
                            </Text>
                          </View>
                          <View style={commonLabelDescription.listSeperator}>
                            <Text style={commonLabelDescription.labelText}>
                              :
                            </Text>
                          </View>
                          <View style={styles.descriptionContainer}>
                            {this.state.expense.userid !== '' &&
                            this.state.expense.userid !== null ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.expense.username}
                              </Text>
                            ) : (
                              <Text
                                style={[
                                  commonLabelDescription.labelValue,
                                  common.mutedTextInItalic,
                                ]}>
                                NA
                              </Text>
                            )}
                          </View>
                        </View>
                      ) : null}
                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Expensed On
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.expense.expensedondisplaydate}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Amount
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text style={commonLabelDescription.labelValue}>
                            {this.state.expense.displayamount}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Description
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          {this.state.expense.description !== '' &&
                          this.state.expense.description !== null ? (
                            <Text style={commonLabelDescription.labelValue}>
                              {this.state.expense.description}
                            </Text>
                          ) : (
                            <Text
                              style={[
                                commonLabelDescription.labelValue,
                                common.mutedTextInItalic,
                              ]}>
                              NA
                            </Text>
                          )}
                        </View>
                      </View>
                      <View
                        style={[
                          commonLabelDescription.listContainer,
                          styles.listContainer,
                        ]}>
                        <View
                          style={[
                            commonLabelDescription.listLabelContainer,
                            styles.listLabelContainer,
                          ]}>
                          <Text style={commonLabelDescription.labelText}>
                            Status
                          </Text>
                        </View>
                        <View style={commonLabelDescription.listSeperator}>
                          <Text style={commonLabelDescription.labelText}>
                            :
                          </Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                          <Text
                            style={[
                              commonLabelDescription.labelValue,
                              badgeColorCode(
                                this.state.expense.isapprovedcolor,
                              ),
                            ]}>
                            {this.state.expense.isapprovedtext}
                          </Text>
                        </View>
                      </View>
                      {this.state.expense.isapproved === 0 ? (
                        <View
                          style={[
                            commonLabelDescription.listContainer,
                            styles.listContainer,
                          ]}>
                          <View
                            style={[
                              commonLabelDescription.listLabelContainer,
                              styles.listLabelContainer,
                            ]}>
                            <Text style={commonLabelDescription.labelText}>
                              Reason
                            </Text>
                          </View>
                          <View style={commonLabelDescription.listSeperator}>
                            <Text style={commonLabelDescription.labelText}>
                              :
                            </Text>
                          </View>
                          <View style={styles.descriptionContainer}>
                            {this.state.expense.rejectreason !== '' &&
                            this.state.expense.rejectreason !== null ? (
                              <Text style={commonLabelDescription.labelValue}>
                                {this.state.expense.rejectreason}
                              </Text>
                            ) : (
                              <Text
                                style={[
                                  commonLabelDescription.labelValue,
                                  common.mutedTextInItalic,
                                ]}>
                                NA
                              </Text>
                            )}
                          </View>
                        </View>
                      ) : null}
                    </View>

                    <View style={common.seperator} />

                    <View>
                      <Text style={commonLabelDescription.blockTitle}>
                        Documents
                      </Text>

                      {this.state.expenseImages.length === 0 ? (
                        <Text
                          style={[
                            common.mutedTextInItalic,
                            {textAlign: 'center'},
                          ]}>
                          No documents added!
                        </Text>
                      ) : (
                        <View>
                          <Carousel
                            layout={'default'}
                            data={
                              this.state.expenseImages.length > 0
                                ? this.state.expenseImages
                                : [
                                    {
                                      imagefilepath:
                                        this.state.expense.firstimagefilepath,
                                    },
                                  ]
                            }
                            renderItem={this.renderCarouselItem}
                            sliderWidth={carouselWidth}
                            itemWidth={carouselWidth}
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
                      )}
                    </View>
                    {this.props.user !== null &&
                    this.props.user.isdepartmenthead &&
                    this.state.expense != null &&
                    this.state.expense.isapproved === 2 ? (
                      <View style={styles.buttonBlock}>
                        <View style={styles.buttonContainer}>
                          <Button
                            block
                            iconLeft
                            rounded
                            style={{backgroundColor: successHexColor}}
                            onPress={this.approveExpense}>
                            <Icon name="check" style={styles.buttonIconStyle} />
                            <Text style={styles.buttonTextStyle}>Approve</Text>
                          </Button>
                        </View>
                        <View style={styles.buttonContainer}>
                          <Button
                            block
                            iconLeft
                            rounded
                            style={{backgroundColor: dangerHexColor}}
                            onPress={this.toggleRejectJobFormModal}>
                            <Icon name="close" style={styles.buttonIconStyle} />
                            <Text style={styles.buttonTextStyle}>Reject</Text>
                          </Button>
                        </View>
                      </View>
                    ) : null}
                    <Modal
                      isVisible={this.state.isRejectJobModalVisible}
                      onBackButtonPress={this.toggleRejectJobFormModal}
                      backdropOpacity={0.5}
                      style={modalLayout.modalContainer}
                      animationInTiming={500}
                      animationOutTiming={500}
                      // onModalWillShow={this.getFormData}
                      // onModalHide={this.resetFormData}
                    >
                      <Loader loading={this.state.transparentLoader} />
                      <View style={modalLayout.body}>
                        <View style={modalLayout.header}>
                          {/* <MaterialIcons
                            name="close"
                            size={28}
                            style={modalLayout.headerMenuicon}
                            onPress={this.toggleJobFormModal}
                          /> */}
                          <View>
                            <Text style={modalLayout.headertext}>
                              Reject Expense
                            </Text>
                          </View>
                          <ModalSaveButton
                            buttonType="solid"
                            onPress={this.handleSubmitFormModalForHeaderButton}
                            title="Save"
                            buttonColor={primaryBlueHexColor}
                            bgColor={primaryBlueHexColor}
                            color="#ffffff"
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <KeyboardAvoidingView
                            style={{flex: 1, flexDirection: 'column'}}
                            behavior={'padding'}
                            enabled
                            keyboardVerticalOffset={100}>
                            <View style={modalLayout.bodyContent}>
                              <ScrollView>
                                <View style={common.formElementsContainer}>
                                  <Formik
                                    enableReinitialize={true}
                                    validate={this.modalFormValidate}
                                    initialValues={{
                                      rejectreason: '',
                                    }}
                                    onSubmit={this.modalFormHandleSubmit}>
                                    {formikProps => {
                                      const {
                                        values,
                                        handleChange,
                                        handleSubmit,
                                        errors,
                                      } = formikProps;
                                      // BIND SUBMISSION HANDLER REMOTLY FOR HEADER SAVE BUTTON
                                      this.bindSubmitFormToModalHeaderButton(
                                        formikProps.submitForm,
                                      );

                                      return (
                                        <View>
                                          <FormTextArea
                                            name="rejectreason"
                                            label="Reason"
                                            value={values.rejectreason}
                                            placeholder="Enter expense rejection reason"
                                            rowSpan={8}
                                            onChangeText={handleChange(
                                              'rejectreason',
                                            )}
                                            errors={errors.rejectreason}
                                          />
                                        </View>
                                      );
                                    }}
                                  </Formik>
                                </View>
                              </ScrollView>
                            </View>
                          </KeyboardAvoidingView>
                        </View>
                      </View>
                      <FlashMessage
                        ref={modalFlashMessageRef =>
                          (this.modalFlashMessageRef = modalFlashMessageRef)
                        }
                        position="top"
                      />
                    </Modal>
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
  listContainer: {
    // paddingLeft: 10
  },
  listLabelContainer: {
    width: 100,
  },
  descriptionContainer: {
    width: screenWidth - 145,
  },
  buttonBlock: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: -5,
    marginRight: -5,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonStyle: {},
  buttonIconStyle: {
    fontSize: 20,
    color: '#fff',
  },
  buttonTextStyle: {
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

export default connect(mapStateToProps, null)(SalesExpenseDetails);
