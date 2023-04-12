import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {primaryBlueHexColor, primaryHexColor} from './constants/themeColors';
import Home from './pages/Home';
import { Component } from 'react';
import { headerStyles } from './assets/style';

import Dashboard from './pages/sales/Dashboard';
import Sales from './pages/sales/Sales';
import Salesdetail from './pages/sales/Salesdetail';
import HeaderSearchButton from './components/HeaderSearchButton';

import Categories from './pages/CategoriesAndProducts/Categories';
import Products from './pages/CategoriesAndProducts/Products';
import ProductDetails from './pages/CategoriesAndProducts/ProductDetails';

import EditProfile from './pages/EditProfile';



import HeaderSaveButton from './components/HeaderSaveButton';
import DrawerUserDetails from './components/DrawerUserDetails';
import DrawerLogoutButton from './components/DrawerLogoutButton';

export const createRootNavigator = (
  signedIn = false,
  userType = null,
  appUserType = null,
  isDepartmentHead = false,
) => {
  let initialRouteName = '';
  if (signedIn && userType !== null && appUserType !== null) {
    // Customer
    if (userType === 4 || userType === '4') {
      initialRouteName = 'CustomerUserRoutes';
    }
    // Users
    else {
      // Admin QC User
      if (appUserType === 1 || appUserType === '1') {
        // Head of the Department
        if (isDepartmentHead) {
          initialRouteName = 'AdminQCHeadUserRoutes';
        }
        // Common Admin QC User
        else {
          initialRouteName = 'AdminQCUserRoutes';
        }
      }
      // Packaging User
      else if (appUserType === 2 || appUserType === '2') {
        // Head of the Department
        if (isDepartmentHead) {
          initialRouteName = 'PackagingHeadUserRoutes';
        }
        // Common Packaging User
        else {
          initialRouteName = 'PackagingUserRoutes';
        }
      }
      // Production User
      else if (appUserType === 3 || appUserType === '3') {
        // Head of the Department
        if (isDepartmentHead) {
          initialRouteName = 'ProductionHeadUserRoutes';
        }
        // Common Production User
        else {
          initialRouteName = 'ProductionUserRoutes';
        }
      }
      // Reception User
      else if (appUserType === 4 || appUserType === '4') {
        // Head of the Department
        if (isDepartmentHead) {
          initialRouteName = 'ReceptionUserRoutes';
        }
        // Common Receptionists
        else {
          initialRouteName = 'ReceptionUserRoutes';
        }
      }
      // Sales User
      else if (appUserType === 5 || appUserType === '5') {
        // Head of the Department
        if (isDepartmentHead) {
          initialRouteName = 'SalesHeadUserRoutes';
        }
        // Common Sales Person
        else {
          initialRouteName = 'SalesUserRoutes';
        }
      }
      // Supervisor User
      else if (appUserType === 6 || appUserType === '6') {
        // Head of the Department
        if (isDepartmentHead) {
          initialRouteName = 'SupervisorUserRoutes';
        }
        // Common Sales Person
        else {
          initialRouteName = 'SupervisorUserRoutes';
        }
      }
      // Default
      else {
        initialRouteName = 'SignedOut';
      }
    }
  } else {
    initialRouteName = 'SignedOut';
  }
  return createAppContainer(
    createSwitchNavigator(
      {
        SignedIn: SignedIn,
      },
      {
        initialRouteName: initialRouteName,
      },
    ),
  );
};
export const homeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Home"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={true}
          />
        ),
      };
    },
  },
});
const headerStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.0,
  elevation: 24,
};

export const CategoriesStack = createStackNavigator({
  Categories: {
    screen: Categories,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Products"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerRight: () => (
          <HeaderSearchButton
            onPress={() => navigation?.state?.params?.toggleSearch()}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SubCategories: {
    screen: Categories,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title={navigation?.state?.params?.pageHeading}
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  Products: {
    screen: Products,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title={navigation?.state?.params?.pageHeading}
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ProductDetails: {
    screen: ProductDetails,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title={navigation?.state?.params?.pageHeading}
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});



export const SalesStack = createStackNavigator({
  Sales: {
    screen: Sales,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Sales"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
      };
    },
  },
  Salesdetail: {
    screen: Salesdetail,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Sales Detail"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
      };
    },
  },
});

export const dashboardStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Dashboard"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={true}
          />
        ),
      };
    },
  },
});


export const tabStack = createMaterialBottomTabNavigator(
  {
    Dashboard: {
      screen: dashboardStack,
      navigationOptions: {
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            {/* <MaterialIcons
                style={[{color: tintColor}]}
                name="dashboard"
                size={24}
              /> */}
          </View>
        ),
      },
    },
    Sales: {
      screen: SalesStack,
      navigationOptions: {
        tabBarLabel: 'Sales',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            {/* <MaterialIcons style={[{color: tintColor}]} name="home" size={24} /> */}
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'Dashboard',
    activeColor: '#ffffff',
    inactiveColor: '#bda1f7',
    barStyle: {backgroundColor: '#6948f4'},
  },
);

const CustomDrawerContentComponent = (props: any) => (
  <ScrollView>
    <DrawerUserDetails {...props} />

    <View style={customRootNavigatorStyles.container}>
      <DrawerNavigatorItems {...props} />
    </View>

    <DrawerLogoutButton {...props} />
  </ScrollView>
);


export const EditProfileStack = createStackNavigator({
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Edit Profile"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerRight: () => (
          <HeaderSaveButton
            buttonType="solid"
            onPress={() => navigation?.state?.params?.handleSave()}
            title="Save"
            buttonColor={primaryBlueHexColor}
            bgColor={primaryBlueHexColor}
            color="#ffffff"
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});


export const SignedIn = createDrawerNavigator(
  {
    Home: {
      screen: homeStack,
      navigationOptions: {
        title: 'Home',
        drawerIcon: ({tintColor}: any) => (
          <></>
          // <MaterialIcons style={[{color: tintColor}]} name="home" size={20} />
        ),
      },
    },
    Dashboard: {
      screen: tabStack,
      navigationOptions: {
        title: 'Dashboard',
        drawerIcon: ({tintColor}: any) => (
          <></>
          // <MaterialIcons
          //   style={[{color: tintColor}]}
          //   name="dashboard"
          //   size={20}
          // />
        ),
      },
    },
    Categories: {
      screen: CategoriesStack,
      navigationOptions: {
        title: 'Products',
        drawerIcon: ({tintColor}: any) => (
          <></>
          // <MaterialIcons style={[{color: tintColor}]} name="layers" size={20} />
        ),
      },
    },
    EditProfile: {
      screen: EditProfileStack,
      navigationOptions: {
        title: 'Edit Profile',
        drawerIcon: ({tintColor}: any) => (
          <></>
          // <MaterialIcons style={[{color: tintColor}]} name="edit" size={20} />
        ),
      },
    },
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: primaryHexColor,
    },
  },
);


class NavigationDrawerStructure extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <View
        style={
          this.props.isShowLogoInsteadOfTitle
            ? headerStyles.headerWithLogo
            : headerStyles.header
        }>
        {/* {this.props.isShowDrawerToggleButton ?
          <MaterialIcons name="menu" size={28} style={headerStyles.headerMenuicon} onPress={this.toggleDrawer.bind(this)} />
          : null
        } */}
        {this.props.isShowDrawerToggleButton ? (
          <View style={headerStyles.headerMenuicon}>
            <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
              <Image
                style={{
                  resizeMode: 'contain',
                  width: 28,
                  height: 28,
                }}
                source={require('./images/drawer-icon.png')}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <View
          style={{
            flex: 1,
          }}>
          {this.props.isShowLogoInsteadOfTitle ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                paddingRight: 24,
              }}>
              <Image
                style={{
                  resizeMode: 'contain',
                  width: 150,
                  height: 50,
                }}
                source={require('./images/logo.png')}
              />
            </View>
          ) : (
            <Text
              style={
                this.props.isShowDrawerToggleButton
                  ? headerStyles.headertext
                  : headerStyles.headertextwithbackbutton
              }>
              {this.props.title}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const drawerWidth = Dimensions.get('window').width - 110;
const drawerLabelWidth = drawerWidth - 78;

const customRootNavigatorStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    margin: 'auto',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    borderRadius: 40,
    marginVertical: 8,
    marginBottom: 0,
    textAlign: 'center',
  },
  email: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    borderRadius: 40,
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  UserBtnContainerBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  UserBtnContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  drawerLabelContainer: {
    // marginHorizontal: 12,
    // marginVertical: 12,
    // paddingRight: 30,
    paddingVertical: 8,
    paddingRight: 8,
    width: drawerLabelWidth,
  },
  drawerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  drawerLabelBadgeContainer: {
    position: 'absolute',
    right: -10,
    top: 8,
  },
  commonDrawerLabelContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingRight: 8,
  },
  commonDrawerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});