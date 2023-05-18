import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {common} from '../../../assets/style';

import {
  backgroundGrey,
  dangerHexColor,
  fontColor,
  mainBgColor,
  successHexColor,
  textMutedColor,
} from '../../../constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';

import Api from '../../../provider/Api';
import Dataprovider from '../../../provider/Dataprovider';
import Loader from '../../../provider/Loader';

import {ActionSheet} from 'native-base';

import {skeletonPlaceholderProps} from '../../../constants/defaultValues';
import SkeletonContent from '../../../components/SkeletonContent';

const screenWidth = Dimensions.get('window').width;

export default class LeadMessages extends Component {
  api = new Api();
  dataProvider = new Dataprovider();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      transparentLoader: false,
      isDataRefreshing: false,
      salesLeadId:
        typeof this.props.navigation
          .dangerouslyGetParent()
          .getParam('salesLeadId') !== 'undefined'
          ? parseInt(
              this.props.navigation
                .dangerouslyGetParent()
                .getParam('salesLeadId'),
            )
          : 0,
      saleslead: null,
      message: '',
      messages: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const formData = new FormData();
    formData.append('salesleadid', this.state.salesLeadId);

    let options = {
      api: 'v_1/sales/lead-messages/load',
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
        isDataRefreshing: false,
      });

      if (data?.status_code === 200) {
        let responseData = data?.response.data;
        this.setState({
          saleslead: responseData.saleslead,
          messages: responseData.messages,
        });
      } else {
        let errormessage = null;
        if (
          typeof data?.status_code !== 'undefined' &&
          data?.status_code === 422
        ) {
          errormessage = data?.response.data.message;
        }
        this.api.showErrorMessage(data?.response.message, errormessage);
      }
    });
  }

  handleRefreshData = () => {
    this.setState(
      {
        isDataRefreshing: true,
      },
      this.getData,
    );
  };

  noMessagesRender = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
        }}>
        <Icon
          name="comments"
          size={130}
          style={{
            color: '#ff7972',
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
            color: '#555',
            marginTop: 15,
          }}>
          No Messages, Yet.
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            color: textMutedColor,
          }}>
          No messages for this lead, yet! You can start conversation now by
          sending a message.
        </Text>
      </View>
    );
  };

  renderDate = date => {
    return <Text style={styles.time}>{date}</Text>;
  };

  sendMessage = () => {
    if (this.state.message != null && this.state.message != '') {
      const formData = new FormData();
      formData.append(
        'salesleadid',
        this.state.salesLeadId === null ? '' : this.state.salesLeadId,
      );
      formData.append('message', this.state.message);

      let options = {
        api: 'v_1/sales/lead-messages/store',
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

        if (responseData?.status_code === 200) {
          this.setState({
            message: '',
            messages: responseData?.response.data.messages,
          });
          // this.api.showSuccessMessage(responseData?.response.message, null);
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
  };

  showEditMessageOptions = item => {
    const BUTTONS = [
      {text: 'Remove Message', icon: 'trash', iconColor: dangerHexColor},
      {text: 'Cancel', icon: 'close', iconColor: successHexColor},
    ];

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 1,
        title: 'Message Options',
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.deleteMessage(item);
            break;
          default:
            break;
        }
      },
    );
  };

  deleteMessage = item => {
    Alert.alert(
      'Confirmation Required',
      'Are sure to delete this message?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel CLicked');
          },
          style: 'cancel',
        },
        {
          text: 'Yeah, Delete It',
          onPress: () => {
            const formData = new FormData();
            formData.append(
              'salesleadid',
              this.state.salesLeadId === null ? '' : this.state.salesLeadId,
            );
            formData.append('salesleadmessagid', item.id);

            let options = {
              api: 'v_1/sales/lead-messages/delete',
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

              if (responseData?.status_code === 200) {
                this.setState({
                  message: '',
                  messages: responseData?.response.data.messages,
                });
                this.api.showSuccessMessage(
                  responseData?.response.message,
                  null,
                );
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
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const skeletonLayout = [
      {
        width: screenWidth - 150,
        height: 60,
        borderRadius: 15,
        marginTop: 15,
        marginLeft: 10,
      },
      {
        width: screenWidth - 145,
        height: 70,
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 130,
      },
      {
        width: screenWidth - 200,
        height: 50,
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 185,
      },
      {
        width: screenWidth - 180,
        height: 40,
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 10,
      },
      {
        width: screenWidth - 80,
        height: 60,
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 10,
      },
      {
        width: screenWidth - 40,
        height: 40,
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 30,
      },
    ];

    return (
      <KeyboardAvoidingView
        style={{flex: 1, flexDirection: 'column'}}
        behavior={'padding'}
        enabled
        keyboardVerticalOffset={100}>
        <View style={{flex: 1, backgroundColor: mainBgColor}}>
          <View
            style={[
              common.cardContainer,
              {
                backgroundColor: backgroundGrey,
                overflow: 'hidden',
                paddingTop: 0,
              },
            ]}>
            <Loader loading={this.state.transparentLoader} />
            <SkeletonContent
              containerStyle={{flex: 1, width: screenWidth.width}}
              layout={skeletonLayout}
              isLoading={this.state.loading}
              duration={skeletonPlaceholderProps.duration}
              animationType={skeletonPlaceholderProps.animationType}
              animationDirection={skeletonPlaceholderProps.animationDirection}
              boneColor={skeletonPlaceholderProps.boneColor}
              highlightColor={skeletonPlaceholderProps.highlightColor}>
              <View style={styles.container}>
                <FlatList
                  style={styles.list}
                  data={this.state.messages}
                  keyExtractor={item => {
                    return item.id.toString();
                  }}
                  refreshing={this.state.isDataRefreshing}
                  onRefresh={this.handleRefreshData}
                  ListEmptyComponent={this.noMessagesRender}
                  renderItem={message => {
                    const item = message.item;
                    let inMessage = item.type === 'in';
                    let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
                    return (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          if (item.type === 'out') {
                            this.showEditMessageOptions(item);
                          }
                        }}>
                        <View style={[styles.item, itemStyle]}>
                          <View style={[styles.balloon]}>
                            <Text style={{color: fontColor, fontSize: 12}}>
                              {item.message}
                            </Text>
                          </View>
                          {this.renderDate(item.date)}
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
                <View style={styles.footer}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      placeholder="Write a message..."
                      underlineColorAndroid="transparent"
                      multiline={true}
                      value={this.state.message}
                      onChangeText={message => {
                        this.setState({
                          message: message,
                        });
                      }}
                      onSubmitEditing={value => {
                        this.sendMessage();
                      }}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.btnSend}
                    onPress={() => {
                      this.sendMessage();
                    }}>
                    <Icon name="send" color={'#fff'} size={16} />
                  </TouchableOpacity>
                </View>
              </View>
            </SkeletonContent>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 17,
    paddingVertical: 5,
    backgroundColor: backgroundGrey,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
    maxHeight: 100,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 5,
    padding: 5,
  },
  btnSend: {
    backgroundColor: successHexColor,
    color: '#fff',
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    maxHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  inputs: {
    maxHeight: 80,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    padding: 10,
    paddingBottom: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  itemOut: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize: 10,
    color: textMutedColor,
    position: 'absolute',
    bottom: -8,
    right: 0,
  },
  item: {
    marginVertical: 6,
    flex: 1,
    // flexDirection: 'row',
    flexDirection: 'column',
    backgroundColor: '#eeeeee',
    borderRadius: 15,
    padding: 0,
    paddingTop: 0,
    paddingBottom: 10,
    minWidth: 130,
  },
});
