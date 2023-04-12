/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import {createStackNavigator} from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';

import HeaderSaveButton from './components/HeaderSaveButton';
import HeaderSearchButton from './components/HeaderSearchButton';

// import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';

import {headerStyles} from './assets/style';

import {connect} from 'react-redux';

import DrawerUserDetails from './components/DrawerUserDetails';
import DrawerLogoutButton from './components/DrawerLogoutButton';
import DrawerNotificationBadge from './components/DrawerNotificationBadge';
import {primaryHexColor, primaryBlueHexColor} from './constants/themeColors';

import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';

/*==========================================================================================
==================================== GENERAL PAGES START =====================================
============================================================================================*/

import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import MyProfile from './pages/MyProfile';
import LocationTracker from './pages/LocationTracker';
import ShowLocationHistory from './pages/ShowLocationHistory';
import Notifications from './pages/Notifications';
import LocationTrackingTest from './pages/sales/LocationTrackingTest';

import MonthlyDayOffs from './pages/attendances/MonthlyDayOffs';
import LeaveApplications from './pages/attendances/LeaveApplications';
import LeaveApplicationForm from './pages/attendances/LeaveApplicationForm';
import LeaveApplicationDetails from './pages/attendances/LeaveApplicationDetails';

import EmployeeAttendanceReport from './pages/employeeAttendances/EmployeeAttendanceReport';
import EmployeeLeaveApplications from './pages/employeeAttendances/EmployeeLeaveApplications';
import EmployeeLeaveApplicationDetails from './pages/employeeAttendances/EmployeeLeaveApplicationDetails';

import Categories from './pages/CategoriesAndProducts/Categories';
import Products from './pages/CategoriesAndProducts/Products';
import ProductDetails from './pages/CategoriesAndProducts/ProductDetails';

import Brands from './pages/BrandsAndProducts/Brands';
import BrandProducts from './pages/BrandsAndProducts/BrandProducts';
import BrandProductDetails from './pages/BrandsAndProducts/BrandProductDetails';

/*==========================================================================================
==================================== GENERAL PAGES START =====================================
============================================================================================*/

/*==========================================================================================
==================================== ADMIN QC PAGES START =====================================
============================================================================================*/
/* Admin QC Head Pages Start */

import AdminQCHeadDashboard from './pages/adminQCs/departmentHead/AdminQCHeadDashboard';

/* Admin QC Head Pages End */

import AdminQCDashboard from './pages/adminQCs/AdminQCDashboard';

import AdminQCOrders from './pages/adminQCs/orders/AdminQCOrders';
import AdminQCOrder from './pages/adminQCs/orders/AdminQCOrder';
import AdminQCJobs from './pages/adminQCs/orders/AdminQCJobs';
import AdminQCJob from './pages/adminQCs/orders/AdminQCJob';

import AdminQCSalesPersons from './pages/adminQCs/salesPersons/AdminQCSalesPersons';
import AdminQCSalesPerson from './pages/adminQCs/salesPersons/AdminQCSalesPerson';

import AdminQCLeads from './pages/adminQCs/leads/AdminQCLeads';
import AdminQCLead from './pages/adminQCs/leads/AdminQCLead';
import AdminQCLeadInteractions from './pages/adminQCs/leads/AdminQCLeadInteractions';

/*==========================================================================================
==================================== ADMIN QC PAGES END =======================================
============================================================================================*/

/*==========================================================================================
==================================== PACKAGING PAGES START =====================================
============================================================================================*/
/* Packaging Head Pages Start */

import PackagingHeadDashboard from './pages/packagings/departmentHead/PackagingHeadDashboard';

/* Packaging Head Pages End */

import PackagingDashboard from './pages/packagings/PackagingDashboard';

/*==========================================================================================
==================================== PACKAGING PAGES END =======================================
============================================================================================*/

/*==========================================================================================
==================================== PRODUCTION PAGES START =====================================
============================================================================================*/
/* Production Head Pages Start */

import ProductionHeadDashboard from './pages/productions/departmentHead/ProductionHeadDashboard';

import ProductionEmployees from './pages/productions/departmentHead/productionEmployees/ProductionEmployees';
import ProductionEmployeeDetails from './pages/productions/departmentHead/productionEmployees/ProductionEmployeeDetails';
import ProductionEmployeeAssignedJobs from './pages/productions/departmentHead/productionEmployees/ProductionEmployeeAssignedJobs';
import ProductionEmployeeAssignedJob from './pages/productions/departmentHead/productionEmployees/ProductionEmployeeAssignedJob';

import ProductionHeadOrderView from './pages/productions/departmentHead/ProductionHeadOrderView';

import ProductionUnAssignedJobs from './pages/productions/departmentHead/productionUnAssignedJobs/ProductionUnAssignedJobs';
import ProductionUnAssignedJobDetails from './pages/productions/departmentHead/productionUnAssignedJobs/ProductionUnAssignedJobDetails';
import ProductionScanQrCodeForUnAssignedJob from './pages/productions/departmentHead/productionUnAssignedJobs/ProductionScanQrCodeForUnAssignedJob';

import ProductionOngoingJobs from './pages/productions/departmentHead/productionOngoingJobs/ProductionOngoingJobs';
import ProductionOngoingJobDetails from './pages/productions/departmentHead/productionOngoingJobs/ProductionOngoingJobDetails';
import ProductionScanQrCodeForOngoingJob from './pages/productions/departmentHead/productionOngoingJobs/ProductionScanQrCodeForOngoingJob';

/* Production Head Pages End */

import ProductionAssignedJobs from './pages/productions/productionAssignedJobs/ProductionAssignedJobs';
import ProductionAssignedJobDetails from './pages/productions/productionAssignedJobs/ProductionAssignedJobDetails';
import ProductionScanQrCodeForAssignedJob from './pages/productions/productionAssignedJobs/ProductionScanQrCodeForAssignedJob';

import ProductionDashboard from './pages/productions/ProductionDashboard';

/*==========================================================================================
==================================== PRODUCTION PAGES END =======================================
============================================================================================*/

/*==========================================================================================
================================ RECEPTIONIST'S PAGES START ================================
============================================================================================*/

import ReceptionDashboard from './pages/receptionists/ReceptionDashboard';
import QrCodeScannerDemo from './pages/QrCodeScannerDemo';

import ReceptionCustomers from './pages/receptionists/customers/ReceptionCustomers';
import ReceptionCustomerDetails from './pages/receptionists/customers/ReceptionCustomerDetails';
import ReceptionCustomerForm from './pages/receptionists/customers/ReceptionCustomerForm';

import ReceptionCollectionCalls from './pages/receptionists/collectionCalls/ReceptionCollectionCalls';
import ReceptionCollectionCallForm from './pages/receptionists/collectionCalls/ReceptionCollectionCallForm';
import ReceptionCollectionCallDetails from './pages/receptionists/collectionCalls/ReceptionCollectionCallDetails';

import ReceptionDeliveryCalls from './pages/receptionists/deliveryCalls/ReceptionDeliveryCalls';
import ReceptionDeliveryCallForm from './pages/receptionists/deliveryCalls/ReceptionDeliveryCallForm';
import ReceptionDeliveryCallDetails from './pages/receptionists/deliveryCalls/ReceptionDeliveryCallDetails';

import ReceptionComplaints from './pages/receptionists/complaints/ReceptionComplaints';
import ReceptionComplaintForm from './pages/receptionists/complaints/ReceptionComplaintForm';
import ReceptionComplaintDetails from './pages/receptionists/complaints/ReceptionComplaintDetails';

import ReceptionOrders from './pages/receptionists/orders/ReceptionOrders';
import ReceptionOrderForm from './pages/receptionists/orders/ReceptionOrderForm';
import ReceptionViewOrder from './pages/receptionists/orders/ReceptionViewOrder';
import ReceptionViewOrderDetails from './pages/receptionists/orders/ReceptionViewOrderDetails';
import ReceptionViewJob from './pages/receptionists/orders/ReceptionViewJob';

import ReceptionCompletedOrders from './pages/receptionists/completedOrders/ReceptionCompletedOrders';
import ReceptionViewCompletedOrder from './pages/receptionists/completedOrders/ReceptionViewCompletedOrder';
import ReceptionViewCompletedOrderDetails from './pages/receptionists/completedOrders/ReceptionViewCompletedOrderDetails';
import ReceptionViewCompletedJob from './pages/receptionists/completedOrders/ReceptionViewCompletedJob';

import ReceptionCompletedJobs from './pages/receptionists/completedJobs/ReceptionCompletedJobs';
import ReceptionCompletedJob from './pages/receptionists/completedJobs/ReceptionCompletedJob';

import ReceptionRejectedJobs from './pages/receptionists/rejectedJobs/ReceptionRejectedJobs';
import ReceptionRejectedJob from './pages/receptionists/rejectedJobs/ReceptionRejectedJob';

/*==========================================================================================
================================ RECEPTIONIST'S PAGES END ==================================
============================================================================================*/

/*==========================================================================================
==================================== SALES PAGES START =====================================
============================================================================================*/
import Dashboard from './pages/sales/Dashboard';
import Sales from './pages/sales/Sales';
import Salesdetail from './pages/sales/Salesdetail';

/* Sales Head Pages Start */

import SalesHeadDashboard from './pages/sales/departmentHead/SalesHeadDashboard';

import SalesHeadSalesPersons from './pages/sales/departmentHead/salesPersons/SalesHeadSalesPersons';
import SalesHeadSalesPersonForm from './pages/sales/departmentHead/salesPersons/SalesHeadSalesPersonForm';
import SalesHeadSalesPersonDetails from './pages/sales/departmentHead/salesPersons/SalesHeadSalesPersonDetails';
import SalesHeadSalesPersonTrackingHistory from './pages/sales/departmentHead/salesPersons/SalesHeadSalesPersonTrackingHistory';

import SalesExpenses from './pages/sales/expenses/SalesExpenses';
import SalesExpenseDetails from './pages/sales/expenses/SalesExpenseDetails';
import SalesExpenseForm from './pages/sales/expenses/SalesExpenseForm';

/* Sales Head Pages End */

import SalesDashboard from './pages/sales/SalesDashboard';

import SalesCustomers from './pages/sales/customers/SalesCustomers';
import SalesCustomerDetails from './pages/sales/customers/SalesCustomerDetails';
import SalesCustomerForm from './pages/sales/customers/SalesCustomerForm';

import CollectionCalls from './pages/sales/calllogs/CollectionCalls';
import CollectionCallForm from './pages/sales/calllogs/CollectionCallForm';
import CollectionCallDetails from './pages/sales/calllogs/CollectionCallDetails';

import DeliveryCalls from './pages/sales/calllogs/DeliveryCalls';
import DeliveryCallForm from './pages/sales/calllogs/DeliveryCallForm';
import DeliveryCallDetails from './pages/sales/calllogs/DeliveryCallDetails';

import Complaints from './pages/sales/calllogs/Complaints';
import ComplaintForm from './pages/sales/calllogs/ComplaintForm';
import ComplaintDetails from './pages/sales/calllogs/ComplaintDetails';

import Leads from './pages/sales/leads/Leads';
import LeadForm from './pages/sales/leads/LeadForm';
import LeadDetails from './pages/sales/leads/LeadDetails';
import LeadInteractions from './pages/sales/leads/LeadInteractions';
import LeadMessages from './pages/sales/leads/LeadMessages';

/*==========================================================================================
==================================== SALES PAGES END =======================================
============================================================================================*/

/*==========================================================================================
================================ SUPERVISOR'S PAGES START ================================
============================================================================================*/

import SupervisorDashboard from './pages/supervisors/SupervisorDashboard';

import SupervisorOrders from './pages/supervisors/orders/SupervisorOrders';
import SupervisorViewOrder from './pages/supervisors/orders/SupervisorViewOrder';
import SupervisorViewOrderDetails from './pages/supervisors/orders/SupervisorViewOrderDetails';

import SupervisorJobs from './pages/supervisors/jobs/SupervisorJobs';
import SupervisorViewJob from './pages/supervisors/jobs/SupervisorViewJob';
import SupervisorScanQrCodeOrSearchUsingJobId from './pages/supervisors/jobs/SupervisorScanQrCodeOrSearchUsingJobId';

import SupervisorOngoingJobs from './pages/supervisors/ongoingjobs/SupervisorOngoingJobs';
import SupervisorViewOngoingJob from './pages/supervisors/ongoingjobs/SupervisorViewOngoingJob';
import SupervisorOngoingJobProgress from './pages/supervisors/ongoingjobs/SupervisorOngoingJobProgress';

import SupervisorCustomerDetails from './pages/supervisors/customers/SupervisorCustomerDetails';

import SupervisorReworks from './pages/supervisors/reworks/SupervisorReworks';
import SupervisorRework from './pages/supervisors/reworks/SupervisorRework';

import SupervisorReopens from './pages/supervisors/reopens/SupervisorReopens';
import SupervisorReopen from './pages/supervisors/reopens/SupervisorReopen';

/*==========================================================================================
================================ SUPERVISOR'S PAGES END ==================================
============================================================================================*/

/*==========================================================================================
==================================== CUSTOMER PAGES START =====================================
============================================================================================*/

import CustomerDashboard from './pages/customers/CustomerDashboard';
import CustomerViewProfile from './pages/customers/profile/CustomerViewProfile';
import CustomerChangePassword from './pages/customers/profile/CustomerChangePassword';
import CustomerMyAccounts from './pages/customers/profile/CustomerMyAccounts';

import CustomerCollectionCalls from './pages/customers/collectionCalls/CustomerCollectionCalls';
import CustomerCollectionCallForm from './pages/customers/collectionCalls/CustomerCollectionCallForm';

import CustomerComplaints from './pages/customers/complaints/CustomerComplaints';
import CustomerComplaintForm from './pages/customers/complaints/CustomerComplaintForm';

import CustomerOrders from './pages/customers/orders/CustomerOrders';
import CustomerViewOrder from './pages/customers/orders/CustomerViewOrder';
import CustomerViewOrderDetails from './pages/customers/orders/CustomerViewOrderDetails';
import CustomerViewJob from './pages/customers/orders/CustomerViewJob';
import CustomerOrderUploadImages from './pages/customers/orders/CustomerOrderUploadImages';

/*==========================================================================================
==================================== CUSTOMER PAGES END =======================================
============================================================================================*/

import {circleBgColor, fontColor} from './constants/themeColors';

const tabColors = {
  // activeColor: '#ffffff',
  // inactiveColor: '#919191',
  // barBgColor: '#5f5f5f',
  activeColor: '#ffffff',
  inactiveColor: '#d5d5d5',
  barBgColor: primaryBlueHexColor,
};

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

const contentOptions = {
  inactiveTintColor: fontColor,
  activeTintColor: '#fff',
  activeBackgroundColor: primaryHexColor,
  labelStyle: {
    marginHorizontal: 12,
    marginVertical: 12,
  },
  itemStyle: {},
  itemsContainerStyle: {
    paddingBottom: 0,
  },
  style: {},
};

const drawerIconSize = 20;
const activeDrawerIconColor = '#fff';
const inactiveDrawerIconColor = circleBgColor;

const drawerWidth = Dimensions.get('window').width - 110;
const drawerLabelWidth = drawerWidth - 78;

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

const CustomDrawerContentComponent = (props: any) => (
  <ScrollView>
    <DrawerUserDetails {...props} />

    <View style={styles.container}>
      <DrawerNavigatorItems {...props} />
    </View>

    <DrawerLogoutButton {...props} />
  </ScrollView>
);

/*==========================================================================================
=================================== PRE LOGIN ROUTES START =================================
============================================================================================*/

export const SignedOut = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Sign In',
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        title: 'Forgot Password',
      },
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        title: 'Sign Up',
      },
    },
    LocationTracker: {
      screen: LocationTracker,
      navigationOptions: {
        title: 'Location Tracker',
      },
    },
    ShowLocationHistory: {
      screen: ShowLocationHistory,
      navigationOptions: {
        title: 'Show Location History',
      },
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

/*==========================================================================================
=================================== PRE LOGIN ROUTES END ===================================
============================================================================================*/

/*==========================================================================================
================================= GENERAL POST LOGIN ROUTES START ===========================
============================================================================================*/

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

export const MyAccountsStack = createStackNavigator({
  // MyAccounts: {
  //   screen: MyAccounts,
  //   navigationOptions: ({ navigation }) => {
  //     return {
  //       headerTitle: () => <NavigationDrawerStructure navigation={ navigation } title="My Accounts" isShowDrawerToggleButton={true} isShowLogoInsteadOfTitle={false} />,
  //     }
  //   }
  // },
  MyProfile: {
    screen: MyProfile,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="My Profile"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerRight: () => (
          <HeaderSaveButton
            buttonType="solid"
            onPress={() => navigation?.state?.params?.handleSave()}
            title="Edit"
            buttonColor={primaryBlueHexColor}
            bgColor={primaryBlueHexColor}
            color="#ffffff"
          />
        ),
      };
    },
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Edit Profile"
            isShowDrawerToggleButton={false}
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
      };
    },
  },
});

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

export const BrandsStack = createStackNavigator({
  Brands: {
    screen: Brands,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Brands"
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
  BrandProducts: {
    screen: BrandProducts,
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
  BrandProductDetails: {
    screen: BrandProductDetails,
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

// export const AttendancesStack = createStackNavigator(
//   {
//     Attendances: {
//       screen: Attendances,
//       navigationOptions: ({ navigation }) => {
//         return {
//           headerTitle: () => <NavigationDrawerStructure navigation={ navigation } title="Attendances" isShowDrawerToggleButton={true} isShowLogoInsteadOfTitle={false} />,
//         }
//       }
//     }
//   }
// );

export const NotificationsStack = createStackNavigator({
  Notifications: {
    screen: Notifications,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Notifications"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerRight: () => (
          <HeaderSaveButton
            buttonType="solid"
            onPress={() =>
              navigation?.state?.params?.handleClearNotifications()
            }
            title="Clear"
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

export const LocationTrackingTestStack = createStackNavigator({
  LocationTrackingTest: {
    screen: LocationTrackingTest,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Location Tracking"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerRight: () => (
          <HeaderSaveButton
            buttonType="solid"
            onPress={() =>
              navigation?.state?.params?.handleClearNotifications()
            }
            title="Clear"
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

export const MonthlyDayOffsStack = createStackNavigator({
  MonthlyDayOffs: {
    screen: MonthlyDayOffs,
  },
});

export const LeaveApplicationsStack = createStackNavigator({
  LeaveApplications: {
    screen: LeaveApplications,
  },
});

export const AttendancesTabStack = createMaterialBottomTabNavigator(
  {
    MonthlyDayOffs: {
      screen: MonthlyDayOffsStack,
      navigationOptions: {
        tabBarLabel: 'Monthly Dayoffs',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="calendar" size={20} />
          </View>
        ),
      },
    },
    LeaveApplications: {
      screen: LeaveApplicationsStack,
      navigationOptions: {
        tabBarLabel: 'Leave Applications',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="list" size={20} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'MonthlyDayOffs',
    activeColor: tabColors.activeColor,
    inactiveColor: tabColors.inactiveColor,
    barStyle: {backgroundColor: tabColors.barBgColor},
  },
);

export const AttendancesStack = createStackNavigator({
  Attendances: {
    screen: AttendancesTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Attendances"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  LeaveApplicationForm: {
    screen: LeaveApplicationForm,
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
        headerRight: () => (
          <HeaderSaveButton
            buttonType="solid"
            onPress={() => navigation?.state?.params?.handleSave()}
            title="Apply"
            buttonColor={primaryBlueHexColor}
            bgColor={primaryBlueHexColor}
            color="#ffffff"
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  LeaveApplicationDetails: {
    screen: LeaveApplicationDetails,
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

export const EmployeeAttendanceReportStack = createStackNavigator({
  EmployeeAttendanceReport: {
    screen: EmployeeAttendanceReport,
  },
});

export const EmployeeLeaveApplicationsStack = createStackNavigator({
  EmployeeLeaveApplications: {
    screen: EmployeeLeaveApplications,
  },
});

export const EmployeeAttendancesTabStack = createMaterialBottomTabNavigator(
  {
    EmployeeAttendanceReport: {
      screen: EmployeeAttendanceReportStack,
      navigationOptions: {
        tabBarLabel: 'Attendance Report',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="calendar" size={20} />
          </View>
        ),
      },
    },
    EmployeeLeaveApplications: {
      screen: EmployeeLeaveApplicationsStack,
      navigationOptions: {
        tabBarLabel: 'Leave Applications',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="list" size={20} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'EmployeeAttendanceReport',
    activeColor: tabColors.activeColor,
    inactiveColor: tabColors.inactiveColor,
    barStyle: {backgroundColor: tabColors.barBgColor},
  },
);

export const EmployeeAttendancesStack = createStackNavigator({
  EmployeeAttendances: {
    screen: EmployeeAttendancesTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Employees Attendances"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  EmployeeLeaveApplicationDetails: {
    screen: EmployeeLeaveApplicationDetails,
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

/*==========================================================================================
================================= GENERAL POST LOGIN ROUTES END =============================
============================================================================================*/

/*==========================================================================================
============ COMMON ROUTES FOR ADMIN-QC, PACKAGINGS AND PRODUCTION USER START  =============
============================================================================================*/

/* Head Stacks Start */

export const ProductionEmployeeDetailsStack = createStackNavigator({
  ProductionEmployeeDetails: {
    screen: ProductionEmployeeDetails,
  },
});

export const ProductionEmployeeAssignedJobsStack = createStackNavigator({
  ProductionEmployeeAssignedJobs: {
    screen: ProductionEmployeeAssignedJobs,
  },
});

export const ProductionEmployeeTabStack = createMaterialBottomTabNavigator(
  {
    ProductionEmployeeDetails: {
      screen: ProductionEmployeeDetailsStack,
      navigationOptions: {
        tabBarLabel: 'Personal Details',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
          </View>
        ),
      },
    },
    ProductionEmployeeAssignedJobs: {
      screen: ProductionEmployeeAssignedJobsStack,
      navigationOptions: {
        tabBarLabel: 'Assigned Jobs',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="cubes" size={20} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'ProductionEmployeeDetails',
    activeColor: tabColors.activeColor,
    inactiveColor: tabColors.inactiveColor,
    barStyle: {backgroundColor: tabColors.barBgColor},
  },
);

export const ProductionEmployeesStack = createStackNavigator({
  ProductionEmployees: {
    screen: ProductionEmployees,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Employees"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ProductionEmployeeDetails: {
    screen: ProductionEmployeeTabStack,
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
  ProductionEmployeeAssignedJob: {
    screen: ProductionEmployeeAssignedJob,
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
  ProductionHeadOrderViewForEmployee: {
    screen: ProductionHeadOrderView,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

export const ProductionUnAssignedJobsStack = createStackNavigator({
  ProductionUnAssignedJobs: {
    screen: ProductionUnAssignedJobs,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Unassigned Jobs"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              navigation?.state?.params?.redirectToQrCodeScanningPage()
            }
            style={{margin: 15}}>
            {/* <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              style={{color: '#333'}}
            /> */}
          </TouchableOpacity>
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ProductionUnAssignedJobDetails: {
    screen: ProductionUnAssignedJobDetails,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Job Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ProductionHeadOrderView: {
    screen: ProductionHeadOrderView,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

export const ProductionScanQrCodeForUnAssignedJobStack = createStackNavigator({
  ProductionScanQrCodeForUnAssignedJob: {
    screen: ProductionScanQrCodeForUnAssignedJob,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Scan Qr Code"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

export const ProductionOngoingJobsStack = createStackNavigator({
  ProductionOngoingJobs: {
    screen: ProductionOngoingJobs,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Ongoing Jobs"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              navigation?.state?.params?.redirectToQrCodeScanningPage()
            }
            style={{margin: 15}}>
            {/* <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              style={{color: '#333'}}
            /> */}
          </TouchableOpacity>
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ProductionOngoingJobDetails: {
    screen: ProductionOngoingJobDetails,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Job Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ProductionHeadOrderViewForOngoingJob: {
    screen: ProductionHeadOrderView,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ProductionScanQrCodeForOngoingJob: {
    screen: ProductionScanQrCodeForOngoingJob,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Scan Qr Code"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

/* Head Stacks End */

export const ProductionScanQrCodeForAssignedJobStack = createStackNavigator({
  ProductionScanQrCodeForAssignedJob: {
    screen: ProductionScanQrCodeForAssignedJob,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Scan Qr Code"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

export const ProductionAssignedJobsStack = createStackNavigator({
  ProductionAssignedJobs: {
    screen: ProductionAssignedJobs,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Assigned Jobs"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              navigation?.state?.params?.redirectToQrCodeScanningPage()
            }
            style={{margin: 15}}>
            {/* <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              style={{color: '#333'}}
            /> */}
          </TouchableOpacity>
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ProductionAssignedJobDetails: {
    screen: ProductionAssignedJobDetails,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Job Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ProductionOrderViewForAssignedJobs: {
    screen: ProductionHeadOrderView,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

/*==========================================================================================
============ COMMON ROUTES FOR ADMIN-QC, PACKAGINGS AND PRODUCTION USER END  ===============
============================================================================================*/

/*==========================================================================================
=================================== ADMIN QC USER ROUTES START ================================
============================================================================================*/

/* Admin QC Head Stacks Start */
export const AdminQCHeadDashboardStack = createStackNavigator({
  AdminQCHeadDashboard: {
    screen: AdminQCHeadDashboard,
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
        headerStyle: headerStyle,
      };
    },
  },
});

/* Admin QC Head Stacks End */

export const AdminQCDashboardStack = createStackNavigator({
  AdminQCDashboard: {
    screen: AdminQCDashboard,
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
        headerStyle: headerStyle,
      };
    },
  },
});

export const AdminQCViewOrderTabStack = createMaterialBottomTabNavigator(
  {
    AdminQCOrder: {
      screen: AdminQCOrder,
      navigationOptions: {
        tabBarLabel: 'Order',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
          </View>
        ),
      },
    },
    AdminQCJobs: {
      screen: AdminQCJobs,
      navigationOptions: {
        tabBarLabel: 'Job Details',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="cubes" size={20} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'AdminQCOrder',
    activeColor: tabColors.activeColor,
    inactiveColor: tabColors.inactiveColor,
    barStyle: {backgroundColor: tabColors.barBgColor},
  },
);

export const AdminQCOrdersStack = createStackNavigator({
  AdminQCOrders: {
    screen: AdminQCOrders,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Orders"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  // AdminQCCustomerDetails: {
  //   screen: ReceptionCustomerDetails,
  //   navigationOptions: ({ navigation }) => {
  //     return {
  //       headerTitle: () => <NavigationDrawerStructure navigation={ navigation } title={navigation?.state?.params?.pageHeading} isShowDrawerToggleButton={false} isShowLogoInsteadOfTitle={false} />,
  //     }
  //   }
  // },
  AdminQCOrder: {
    screen: AdminQCViewOrderTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  AdminQCJob: {
    screen: AdminQCJob,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Job Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

export const AdminQCSalesPersonTabStack = createMaterialBottomTabNavigator(
  {
    AdminQCSalesPerson: {
      screen: AdminQCSalesPerson,
      navigationOptions: {
        tabBarLabel: 'Personal Details',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
          </View>
        ),
      },
    },
    AdminQCSalesPersonTrackingHistory: {
      screen: SalesHeadSalesPersonTrackingHistory,
      navigationOptions: {
        tabBarLabel: 'Location Tracking',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="history" size={20} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'AdminQCSalesPerson',
    activeColor: tabColors.activeColor,
    inactiveColor: tabColors.inactiveColor,
    barStyle: {backgroundColor: tabColors.barBgColor},
  },
);

export const AdminQCSalesPersonsStack = createStackNavigator({
  AdminQCSalesPersons: {
    screen: AdminQCSalesPersons,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Sales Persons"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  AdminQCSalesPerson: {
    screen: AdminQCSalesPersonTabStack,
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

export const AdminQCLeadTabStack = createMaterialBottomTabNavigator(
  {
    AdminQCLead: {
      screen: AdminQCLead,
      navigationOptions: {
        tabBarLabel: 'Lead Details',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
          </View>
        ),
      },
    },
    AdminQCLeadInteractions: {
      screen: AdminQCLeadInteractions,
      navigationOptions: {
        tabBarLabel: 'Interactions',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="id-badge" size={20} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'AdminQCLead',
    activeColor: tabColors.activeColor,
    inactiveColor: tabColors.inactiveColor,
    barStyle: {backgroundColor: tabColors.barBgColor},
  },
);

export const AdminQCLeadsStack = createStackNavigator({
  AdminQCLeads: {
    screen: AdminQCLeads,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Leads"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  AdminQCLead: {
    screen: AdminQCLeadTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Lead Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

export const AdminQCHeadUserRoutes = createDrawerNavigator(
  {
    AdminQCHeadDashboard: {
      screen: AdminQCHeadDashboardStack,
      navigationOptions: {
        title: 'Dashboard',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Home
            </Text>
          </View>
        ),
      },
    },
    AdminQCScanQrCodeForUnAssignedJob: {
      screen: ProductionScanQrCodeForUnAssignedJobStack,
      navigationOptions: {
        title: 'Scan Qr Code',
        // drawerIcon:({tintColor}: any)=> <MaterialCommunityIcons name="qrcode-scan" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Scan Qr Code
            </Text>
          </View>
        ),
      },
    },
    AdminQCUnAssignedJobs: {
      screen: ProductionUnAssignedJobsStack,
      navigationOptions: {
        title: 'Unassigned Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Unassigned Jobs
            </Text>
          </View>
        ),
      },
    },
    AdminQCOngoingJobs: {
      screen: ProductionOngoingJobsStack,
      navigationOptions: {
        title: 'Ongoing Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Ongoing Jobs
            </Text>
          </View>
        ),
      },
    },
    AdminQCEmployees: {
      screen: ProductionEmployeesStack,
      navigationOptions: {
        title: 'Employees',
        // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Employees
            </Text>
          </View>
        ),
      },
    },
    AdminQCOrders: {
      screen: AdminQCOrdersStack,
      navigationOptions: {
        title: 'Orders',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Orders
            </Text>
          </View>
        ),
      },
    },
    AdminQCSalesPersons: {
      screen: AdminQCSalesPersonsStack,
      navigationOptions: {
        title: 'Sales Persons',
        // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Sales Persons
            </Text>
          </View>
        ),
      },
    },
    AdminQCLeads: {
      screen: AdminQCLeadsStack,
      navigationOptions: {
        title: 'Leads',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="bullhorn" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Leads
            </Text>
          </View>
        ),
      },
    },
    EmployeeAttendances: {
      screen: EmployeeAttendancesStack,
      navigationOptions: {
        title: 'Employees Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Employee Attendances
            </Text>
          </View>
        ),
      },
    },
    Attendances: {
      screen: AttendancesStack,
      navigationOptions: {
        title: 'Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Attendances
            </Text>
          </View>
        ),
      },
    },
    MyAccounts: {
      screen: MyAccountsStack,
      navigationOptions: {
        title: 'My Accounts',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              My Accounts
            </Text>
          </View>
        ),
      },
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: {
        title: 'Notifications',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.drawerLabelContainer]}>
            <Text
              style={[
                styles.drawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Notifications
            </Text>
            <View style={[styles.drawerLabelBadgeContainer]}>
              <DrawerNotificationBadge
                isMenuFocused={drawerLabelOptions.focused}
                menuFontColor={drawerLabelOptions.tintColor}
              />
            </View>
          </View>
        ),
      },
    },
    // EditProfile: {
    //   name: 'EditProfile',
    //   screen: EditProfileStack,
    //   navigationOptions:{
    //     title: "Edit Profile",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="pencil-square-o" size={20}/>
    //   }
    // }
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: contentOptions,
  },
);

export const AdminQCUserRoutes = createDrawerNavigator(
  {
    AdminQCDashboard: {
      screen: AdminQCDashboardStack,
      navigationOptions: {
        title: 'Dashboard',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Home
            </Text>
          </View>
        ),
      },
    },
    AdminQCScanQrCodeForAssignedJob: {
      screen: ProductionScanQrCodeForAssignedJobStack,
      navigationOptions: {
        title: 'Scan Qr Code',
        // drawerIcon:({tintColor}: any)=> <MaterialCommunityIcons name="qrcode-scan" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Scan Qr Code
            </Text>
          </View>
        ),
      },
    },
    AdminQCAssignedJobs: {
      screen: ProductionAssignedJobsStack,
      navigationOptions: {
        title: 'Assigned Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Assigned Jobs
            </Text>
          </View>
        ),
      },
    },
    AdminQCOrders: {
      screen: AdminQCOrdersStack,
      navigationOptions: {
        title: 'Orders',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Orders
            </Text>
          </View>
        ),
      },
    },
    AdminQCSalesPersons: {
      screen: AdminQCSalesPersonsStack,
      navigationOptions: {
        title: 'Sales Persons',
        // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Sales Persons
            </Text>
          </View>
        ),
      },
    },
    AdminQCLeads: {
      screen: AdminQCLeadsStack,
      navigationOptions: {
        title: 'Leads',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="bullhorn" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Leads
            </Text>
          </View>
        ),
      },
    },
    Attendances: {
      screen: AttendancesStack,
      navigationOptions: {
        title: 'Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Attendances
            </Text>
          </View>
        ),
      },
    },
    MyAccounts: {
      screen: MyAccountsStack,
      navigationOptions: {
        title: 'My Accounts',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              My Accounts
            </Text>
          </View>
        ),
      },
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: {
        title: 'Notifications',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.drawerLabelContainer]}>
            <Text
              style={[
                styles.drawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Notifications
            </Text>
            <View style={[styles.drawerLabelBadgeContainer]}>
              <DrawerNotificationBadge
                isMenuFocused={drawerLabelOptions.focused}
                menuFontColor={drawerLabelOptions.tintColor}
              />
            </View>
          </View>
        ),
      },
    },
    // EditProfile: {
    //   screen: EditProfileStack,
    //   navigationOptions:{
    //     title: "Edit Profile",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="pencil-square-o" size={20}/>
    //   }
    // }
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: contentOptions,
  },
);

/*==========================================================================================
=================================== ADMIN QC USER ROUTES ENDS =================================
============================================================================================*/

/*==========================================================================================
=================================== PACKAGING USER ROUTES START ================================
============================================================================================*/

/* Packaging Head Stacks Start */
export const PackagingHeadDashboardStack = createStackNavigator({
  PackagingHeadDashboard: {
    screen: PackagingHeadDashboard,
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
        headerStyle: headerStyle,
      };
    },
  },
});

/* Packaging Head Stacks End */

export const PackagingDashboardStack = createStackNavigator({
  PackagingDashboard: {
    screen: PackagingDashboard,
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
        headerStyle: headerStyle,
      };
    },
  },
});

export const PackagingHeadUserRoutes = createDrawerNavigator(
  {
    PackagingHeadDashboard: {
      screen: PackagingHeadDashboardStack,
      navigationOptions: {
        title: 'Dashboard',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Home
            </Text>
          </View>
        ),
      },
    },
    PackagingScanQrCodeForUnAssignedJob: {
      screen: ProductionScanQrCodeForUnAssignedJobStack,
      navigationOptions: {
        title: 'Scan Qr Code',
        // drawerIcon:({tintColor}: any)=> <MaterialCommunityIcons name="qrcode-scan" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Scan Qr Code
            </Text>
          </View>
        ),
      },
    },
    PackagingUnAssignedJobs: {
      screen: ProductionUnAssignedJobsStack,
      navigationOptions: {
        title: 'Unassigned Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Unassigned Jobs
            </Text>
          </View>
        ),
      },
    },
    PackagingOngoingJobs: {
      screen: ProductionOngoingJobsStack,
      navigationOptions: {
        title: 'Ongoing Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Ongoing Jobs
            </Text>
          </View>
        ),
      },
    },
    PackagingEmployees: {
      screen: ProductionEmployeesStack,
      navigationOptions: {
        title: 'Employees',
        // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Employees
            </Text>
          </View>
        ),
      },
    },
    EmployeeAttendances: {
      screen: EmployeeAttendancesStack,
      navigationOptions: {
        title: 'Employees Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Employees Attendances
            </Text>
          </View>
        ),
      },
    },
    Attendances: {
      screen: AttendancesStack,
      navigationOptions: {
        title: 'Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Attendances
            </Text>
          </View>
        ),
      },
    },
    MyAccounts: {
      screen: MyAccountsStack,
      navigationOptions: {
        title: 'My Accounts',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              My Accounts
            </Text>
          </View>
        ),
      },
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: {
        title: 'Notifications',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.drawerLabelContainer]}>
            <Text
              style={[
                styles.drawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Notifications
            </Text>
            <View style={[styles.drawerLabelBadgeContainer]}>
              <DrawerNotificationBadge
                isMenuFocused={drawerLabelOptions.focused}
                menuFontColor={drawerLabelOptions.tintColor}
              />
            </View>
          </View>
        ),
      },
    },
    // EditProfile: {
    //   screen: EditProfileStack,
    //   navigationOptions:{
    //     title: "Edit Profile",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="pencil-square-o" size={20}/>
    //   }
    // }
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: contentOptions,
  },
);

export const PackagingUserRoutes = createDrawerNavigator(
  {
    PackagingDashboard: {
      screen: PackagingDashboardStack,
      navigationOptions: {
        title: 'Dashboard',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Home
            </Text>
          </View>
        ),
      },
    },
    PackagingScanQrCodeForAssignedJob: {
      screen: ProductionScanQrCodeForAssignedJobStack,
      navigationOptions: {
        title: 'Scan Qr Code',
        // drawerIcon:({tintColor}: any)=> <MaterialCommunityIcons name="qrcode-scan" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Scan Qr Code
            </Text>
          </View>
        ),
      },
    },
    PackagingAssignedJobs: {
      screen: ProductionAssignedJobsStack,
      navigationOptions: {
        title: 'Assigned Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Assigned Jobs
            </Text>
          </View>
        ),
      },
    },
    Attendances: {
      screen: AttendancesStack,
      navigationOptions: {
        title: 'Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Attendances
            </Text>
          </View>
        ),
      },
    },
    MyAccounts: {
      screen: MyAccountsStack,
      navigationOptions: {
        title: 'My Accounts',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              My Accounts
            </Text>
          </View>
        ),
      },
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: {
        title: 'Notifications',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.drawerLabelContainer]}>
            <Text
              style={[
                styles.drawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Notifications
            </Text>
            <View style={[styles.drawerLabelBadgeContainer]}>
              <DrawerNotificationBadge
                isMenuFocused={drawerLabelOptions.focused}
                menuFontColor={drawerLabelOptions.tintColor}
              />
            </View>
          </View>
        ),
      },
    },
    // EditProfile: {
    //   screen: EditProfileStack,
    //   navigationOptions:{
    //     title: "Edit Profile",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="pencil-square-o" size={20}/>
    //   }
    // }
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: contentOptions,
  },
);

/*==========================================================================================
=================================== PACKAGING USER ROUTES ENDS =================================
============================================================================================*/

/*==========================================================================================
=================================== PRODUCTION USER ROUTES START ================================
============================================================================================*/

/* Production Head Stacks Start */
export const ProductionHeadDashboardStack = createStackNavigator({
  ProductionHeadDashboard: {
    screen: ProductionHeadDashboard,
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
        headerStyle: headerStyle,
      };
    },
  },
});
/* Production Head Stacks End */

export const ProductionDashboardStack = createStackNavigator({
  ProductionDashboard: {
    screen: ProductionDashboard,
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
        headerStyle: headerStyle,
      };
    },
  },
});

export const ProductionHeadUserRoutes = createDrawerNavigator(
  {
    ProductionHeadDashboard: {
      screen: ProductionHeadDashboardStack,
      navigationOptions: {
        title: 'Dashboard',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>,
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Home
            </Text>
          </View>
        ),
      },
    },
    ProductionScanQrCodeForUnAssignedJob: {
      screen: ProductionScanQrCodeForUnAssignedJobStack,
      navigationOptions: {
        title: 'Scan Qr Code',
        // drawerIcon:({tintColor}: any)=> <Icon name="qrcode" size={20} style={[{color: tintColor}]} />
        // drawerIcon:({tintColor}: any)=> <MaterialCommunityIcons name="qrcode-scan" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Scan Qr Code
            </Text>
          </View>
        ),
      },
    },
    ProductionUnAssignedJobs: {
      screen: ProductionUnAssignedJobsStack,
      navigationOptions: {
        title: 'Unassigned Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Unassigned Jobs
            </Text>
          </View>
        ),
      },
    },
    ProductionOngoingJobs: {
      screen: ProductionOngoingJobsStack,
      navigationOptions: {
        title: 'Ongoing Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Ongoing Jobs
            </Text>
          </View>
        ),
      },
    },
    ProductionEmployees: {
      screen: ProductionEmployeesStack,
      navigationOptions: {
        title: 'Employees',
        // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Employees
            </Text>
          </View>
        ),
      },
    },
    EmployeeAttendances: {
      screen: EmployeeAttendancesStack,
      navigationOptions: {
        title: 'Employees Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Employees Attendances
            </Text>
          </View>
        ),
      },
    },
    Attendances: {
      screen: AttendancesStack,
      navigationOptions: {
        title: 'Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Attendances
            </Text>
          </View>
        ),
      },
    },
    MyAccounts: {
      screen: MyAccountsStack,
      navigationOptions: {
        title: 'My Accounts',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              My Accounts
            </Text>
          </View>
        ),
      },
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: {
        title: 'Notifications',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.drawerLabelContainer]}>
            <Text
              style={[
                styles.drawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Notifications
            </Text>
            <View style={[styles.drawerLabelBadgeContainer]}>
              <DrawerNotificationBadge
                isMenuFocused={drawerLabelOptions.focused}
                menuFontColor={drawerLabelOptions.tintColor}
              />
            </View>
          </View>
        ),
      },
    },
    // EditProfile: {
    //   screen: EditProfileStack,
    //   navigationOptions:{
    //     title: "Edit Profile",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="pencil-square-o" size={20}/>
    //   }
    // }
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: contentOptions,
    // drawerWidth: drawerWidth,
  },
);

export const ProductionUserRoutes = createDrawerNavigator(
  {
    ProductionDashboard: {
      screen: ProductionDashboardStack,
      navigationOptions: {
        title: 'Dashboard',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Home
            </Text>
          </View>
        ),
      },
    },
    ProductionScanQrCodeForAssignedJob: {
      screen: ProductionScanQrCodeForAssignedJobStack,
      navigationOptions: {
        title: 'Scan Qr Code',
        // drawerIcon:({tintColor}: any)=> <MaterialCommunityIcons name="qrcode-scan" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Scan Qr Code
            </Text>
          </View>
        ),
      },
    },
    ProductionAssignedJobs: {
      screen: ProductionAssignedJobsStack,
      navigationOptions: {
        title: 'Assigned Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Assigned Jobs
            </Text>
          </View>
        ),
      },
    },
    Attendances: {
      screen: AttendancesStack,
      navigationOptions: {
        title: 'Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Attendances
            </Text>
          </View>
        ),
      },
    },
    MyAccounts: {
      screen: MyAccountsStack,
      navigationOptions: {
        title: 'My Accounts',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              My Accounts
            </Text>
          </View>
        ),
      },
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: {
        title: 'Notifications',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.drawerLabelContainer]}>
            <Text
              style={[
                styles.drawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Notifications
            </Text>
            <View style={[styles.drawerLabelBadgeContainer]}>
              <DrawerNotificationBadge
                isMenuFocused={drawerLabelOptions.focused}
                menuFontColor={drawerLabelOptions.tintColor}
              />
            </View>
          </View>
        ),
      },
    },
    // EditProfile: {
    //   screen: EditProfileStack,
    //   navigationOptions:{
    //     title: "Edit Profile",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="pencil-square-o" size={20}/>
    //   }
    // }
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: contentOptions,
  },
);

/*==========================================================================================
=================================== PRODUCTION USER ROUTES ENDS =================================
============================================================================================*/

/*==========================================================================================
================================= RECEPTION USER ROUTES START ==============================
============================================================================================*/

export const ReceptionDashboardStack = createStackNavigator({
  ReceptionDashboard: {
    screen: ReceptionDashboard,
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
        headerStyle: headerStyle,
      };
    },
  },
  QrCodeScannerDemo: {
    screen: QrCodeScannerDemo,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Qr Code Scanner"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

export const ReceptionCustomersStack = createStackNavigator({
  ReceptionCustomers: {
    screen: ReceptionCustomers,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Customers"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionCustomerDetails: {
    screen: ReceptionCustomerDetails,
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
  ReceptionCustomerForm: {
    screen: ReceptionCustomerForm,
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

export const ReceptionCollectionCallsStack = createStackNavigator({
  ReceptionCollectionCalls: {
    screen: ReceptionCollectionCalls,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Pickup Request"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionCollectionCallDetails: {
    screen: ReceptionCollectionCallDetails,
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
  ReceptionCollectionCallForm: {
    screen: ReceptionCollectionCallForm,
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

export const ReceptionDeliveryCallsStack = createStackNavigator({
  ReceptionDeliveryCalls: {
    screen: ReceptionDeliveryCalls,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Delivery Calls"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionDeliveryCallDetails: {
    screen: ReceptionDeliveryCallDetails,
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
  ReceptionDeliveryCallForm: {
    screen: ReceptionDeliveryCallForm,
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

export const ReceptionComplaintsStack = createStackNavigator({
  ReceptionComplaints: {
    screen: ReceptionComplaints,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Complaints"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionComplaintDetails: {
    screen: ReceptionComplaintDetails,
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
  ReceptionComplaintForm: {
    screen: ReceptionComplaintForm,
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

export const ReceptionViewOrderDetailsTabStack =
  createMaterialBottomTabNavigator(
    {
      ReceptionViewOrder: {
        screen: ReceptionViewOrder,
        navigationOptions: {
          tabBarLabel: 'Order',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
            </View>
          ),
        },
      },
      ReceptionViewOrderDetails: {
        screen: ReceptionViewOrderDetails,
        navigationOptions: {
          tabBarLabel: 'Job Details',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="cubes" size={20} />
            </View>
          ),
        },
      },
    },
    {
      initialRouteName: 'ReceptionViewOrder',
      activeColor: tabColors.activeColor,
      inactiveColor: tabColors.inactiveColor,
      barStyle: {backgroundColor: tabColors.barBgColor},
    },
  );

export const ReceptionOrdersStack = createStackNavigator({
  ReceptionOrders: {
    screen: ReceptionOrders,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Orders"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionOrderForm: {
    screen: ReceptionOrderForm,
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
  ReceptionCustomerDetails: {
    screen: ReceptionCustomerDetails,
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
  ReceptionViewOrder: {
    screen: ReceptionViewOrderDetailsTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionViewJob: {
    screen: ReceptionViewJob,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Job Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

export const ReceptionViewCompletedOrderDetailsTabStack =
  createMaterialBottomTabNavigator(
    {
      ReceptionViewCompletedOrder: {
        screen: ReceptionViewCompletedOrder,
        navigationOptions: {
          tabBarLabel: 'Order',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
            </View>
          ),
        },
      },
      ReceptionViewCompletedOrderDetails: {
        screen: ReceptionViewCompletedOrderDetails,
        navigationOptions: {
          tabBarLabel: 'Job Details',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="cubes" size={20} />
            </View>
          ),
        },
      },
    },
    {
      initialRouteName: 'ReceptionViewCompletedOrder',
      activeColor: tabColors.activeColor,
      inactiveColor: tabColors.inactiveColor,
      barStyle: {backgroundColor: tabColors.barBgColor},
    },
  );

export const ReceptionCompletedOrdersStack = createStackNavigator({
  ReceptionCompletedOrders: {
    screen: ReceptionCompletedOrders,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Completed Orders"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionCustomerDetails: {
    screen: ReceptionCustomerDetails,
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
  ReceptionViewCompletedOrder: {
    screen: ReceptionViewCompletedOrderDetailsTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionViewCompletedJob: {
    screen: ReceptionViewCompletedJob,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Job Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

export const ReceptionCompletedJobsStack = createStackNavigator({
  ReceptionCompletedJobs: {
    screen: ReceptionCompletedJobs,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Completed Jobs"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionCompletedJob: {
    screen: ReceptionCompletedJob,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Job Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionViewOrderForCompletedJob: {
    screen: ReceptionViewCompletedOrderDetailsTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionCustomerDetails: {
    screen: ReceptionCustomerDetails,
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

export const ReceptionRejectedJobsStack = createStackNavigator({
  ReceptionRejectedJobs: {
    screen: ReceptionRejectedJobs,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Rejected Jobs"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionRejectedJob: {
    screen: ReceptionRejectedJob,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Job Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionViewOrderForRejectedJob: {
    screen: ReceptionViewCompletedOrderDetailsTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ReceptionCustomerDetails: {
    screen: ReceptionCustomerDetails,
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

export const ReceptionUserRoutes = createDrawerNavigator(
  {
    ReceptionDashboard: {
      screen: ReceptionDashboardStack,
      navigationOptions: {
        title: 'Dashboard',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Home
            </Text>
          </View>
        ),
      },
    },
    ReceptionCategories: {
      screen: CategoriesStack,
      navigationOptions: {
        title: 'Products',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Products
            </Text>
          </View>
        ),
      },
    },
    ReceptionBrands: {
      screen: BrandsStack,
      navigationOptions: {
        title: 'Brands',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Brands
            </Text>
          </View>
        ),
      },
    },
    ReceptionCustomers: {
      screen: ReceptionCustomersStack,
      navigationOptions: {
        title: 'Customers',
        // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Customers
            </Text>
          </View>
        ),
      },
    },
    ReceptionCollectionCalls: {
      screen: ReceptionCollectionCallsStack,
      navigationOptions: {
        title: 'Pickup Request',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="add-shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Pickup Request
            </Text>
          </View>
        ),
      },
    },
    ReceptionDeliveryCalls: {
      screen: ReceptionDeliveryCallsStack,
      navigationOptions: {
        title: 'Delivery Calls',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Delivery Calls
            </Text>
          </View>
        ),
      },
    },
    ReceptionComplaints: {
      screen: ReceptionComplaintsStack,
      navigationOptions: {
        title: 'Complaints',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="remove-shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Complaints
            </Text>
          </View>
        ),
      },
    },
    ReceptionOrders: {
      screen: ReceptionOrdersStack,
      navigationOptions: {
        title: 'Orders',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Orders
            </Text>
          </View>
        ),
      },
    },
    ReceptionCompletedOrders: {
      screen: ReceptionCompletedOrdersStack,
      navigationOptions: {
        title: 'Completed Orders',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Completed Orders
            </Text>
          </View>
        ),
      },
    },
    ReceptionCompletedJobs: {
      screen: ReceptionCompletedJobsStack,
      navigationOptions: {
        title: 'Completed Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Completed Jobs
            </Text>
          </View>
        ),
      },
    },
    ReceptionRejectedJobs: {
      screen: ReceptionRejectedJobsStack,
      navigationOptions: {
        title: 'Rejected Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Rejected Jobs
            </Text>
          </View>
        ),
      },
    },
    Attendances: {
      screen: AttendancesStack,
      navigationOptions: {
        title: 'Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Attendances
            </Text>
          </View>
        ),
      },
    },
    MyAccounts: {
      screen: MyAccountsStack,
      navigationOptions: {
        title: 'My Accounts',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              My Accounts
            </Text>
          </View>
        ),
      },
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: {
        title: 'Notifications',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.drawerLabelContainer]}>
            <Text
              style={[
                styles.drawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Notifications
            </Text>
            <View style={[styles.drawerLabelBadgeContainer]}>
              <DrawerNotificationBadge
                isMenuFocused={drawerLabelOptions.focused}
                menuFontColor={drawerLabelOptions.tintColor}
              />
            </View>
          </View>
        ),
      },
    },
    // EditProfile: {
    //   screen: EditProfileStack,
    //   navigationOptions:{
    //     title: "Edit Profile",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="pencil-square-o" size={20}/>
    //   }
    // }
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: contentOptions,
  },
);

/*==========================================================================================
================================= RECEPTION USER ROUTES ENDS ===============================
============================================================================================*/

/*==========================================================================================
=================================== SALES USER ROUTES START ================================
============================================================================================*/

/* Sales Head Stacks Start */
export const SalesHeadDashboardStack = createStackNavigator({
  SalesHeadDashboard: {
    screen: SalesHeadDashboard,
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
        headerStyle: headerStyle,
      };
    },
  },
});

export const SalesHeadSalesPersonDetailsStack = createStackNavigator({
  SalesHeadSalesPersonDetails: {
    screen: SalesHeadSalesPersonDetails,
  },
});

export const SalesHeadSalesPersonTrackingHistoryStack = createStackNavigator({
  SalesHeadSalesPersonTrackingHistory: {
    screen: SalesHeadSalesPersonTrackingHistory,
  },
});

export const SalesHeadSalesPersonsTabStack = createMaterialBottomTabNavigator(
  {
    SalesHeadSalesPersonDetails: {
      screen: SalesHeadSalesPersonDetailsStack,
      navigationOptions: {
        tabBarLabel: 'Personal Details',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
          </View>
        ),
      },
    },
    SalesHeadSalesPersonTrackingHistory: {
      screen: SalesHeadSalesPersonTrackingHistoryStack,
      navigationOptions: {
        tabBarLabel: 'Location Tracking',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="history" size={20} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'SalesHeadSalesPersonDetails',
    activeColor: tabColors.activeColor,
    inactiveColor: tabColors.inactiveColor,
    barStyle: {backgroundColor: tabColors.barBgColor},
  },
);

export const SalesHeadSalesPersonsStack = createStackNavigator({
  SalesHeadSalesPersons: {
    screen: SalesHeadSalesPersons,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Sales Persons"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SalesHeadSalesPersonDetails: {
    screen: SalesHeadSalesPersonsTabStack,
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
  SalesHeadSalesPersonForm: {
    screen: SalesHeadSalesPersonForm,
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

/* Sales Head Stacks End */

export const SalesDashboardStack = createStackNavigator({
  SalesDashboard: {
    screen: SalesDashboard,
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
        headerStyle: headerStyle,
      };
    },
  },
});

export const SalesCustomersStack = createStackNavigator({
  SalesCustomers: {
    screen: SalesCustomers,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Customers"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SalesCustomerDetails: {
    screen: SalesCustomerDetails,
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
  SalesCustomerForm: {
    screen: SalesCustomerForm,
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

export const CollectionCallsStack = createStackNavigator({
  CollectionCalls: {
    screen: CollectionCalls,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Pickup Request"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  CollectionCallDetails: {
    screen: CollectionCallDetails,
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
  CollectionCallForm: {
    screen: CollectionCallForm,
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

export const DeliveryCallsStack = createStackNavigator({
  DeliveryCalls: {
    screen: DeliveryCalls,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Delivery Calls"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  DeliveryCallDetails: {
    screen: DeliveryCallDetails,
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
  DeliveryCallForm: {
    screen: DeliveryCallForm,
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

export const ComplaintsStack = createStackNavigator({
  Complaints: {
    screen: Complaints,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Complaints"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  ComplaintDetails: {
    screen: ComplaintDetails,
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
  ComplaintForm: {
    screen: ComplaintForm,
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

export const SalesLeadDetailsStack = createStackNavigator({
  LeadDetails: {
    screen: LeadDetails,
  },
});

export const SalesLeadInteractionsStack = createStackNavigator({
  LeadInteractions: {
    screen: LeadInteractions,
  },
});

export const SalesLeadMessagesStack = createStackNavigator({
  LeadMessages: {
    screen: LeadMessages,
  },
});

export const LeadDetailsTabStack = createMaterialBottomTabNavigator(
  {
    LeadDetails: {
      screen: SalesLeadDetailsStack,
      navigationOptions: {
        tabBarLabel: 'Lead Details',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
          </View>
        ),
      },
    },
    LeadInteractions: {
      screen: SalesLeadInteractionsStack,
      navigationOptions: {
        tabBarLabel: 'Interactions',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="id-badge" size={20} />
          </View>
        ),
      },
    },
    LeadMessages: {
      screen: SalesLeadMessagesStack,
      navigationOptions: {
        tabBarLabel: 'Messages',
        tabBarIcon: ({tintColor}: any) => (
          <View>
            <Icon style={[{color: tintColor}]} name="comments" size={20} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'LeadDetails',
    activeColor: tabColors.activeColor,
    inactiveColor: tabColors.inactiveColor,
    barStyle: {backgroundColor: tabColors.barBgColor},
  },
);

export const SalesLeadsStack = createStackNavigator({
  Leads: {
    screen: Leads,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Leads"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  LeadDetails: {
    screen: LeadDetailsTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Lead Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  LeadForm: {
    screen: LeadForm,
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

export const SalesExpensesStack = createStackNavigator({
  SalesExpenses: {
    screen: SalesExpenses,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Expenses"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SalesExpenseDetails: {
    screen: SalesExpenseDetails,
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
  SalesExpenseForm: {
    screen: SalesExpenseForm,
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

export const SalesHeadUserRoutes = createDrawerNavigator(
  {
    SalesHeadDashboard: {
      screen: SalesHeadDashboardStack,
      navigationOptions: {
        title: 'Dashboard',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Home
            </Text>
          </View>
        ),
      },
    },
    SalesHeadSalesPersons: {
      screen: SalesHeadSalesPersonsStack,
      navigationOptions: {
        title: 'Sales Persons',
        // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Sales Persons
            </Text>
          </View>
        ),
      },
    },
    SalesCustomers: {
      screen: SalesCustomersStack,
      navigationOptions: {
        title: 'Customers',
        // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Customers
            </Text>
          </View>
        ),
      },
    },
    SalesBrands: {
      screen: BrandsStack,
      navigationOptions: {
        title: 'Brands',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Brands
            </Text>
          </View>
        ),
      },
    },
    SalesCategories: {
      screen: CategoriesStack,
      navigationOptions: {
        title: 'Products',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Products
            </Text>
          </View>
        ),
      },
    },
    CollectionCalls: {
      screen: CollectionCallsStack,
      navigationOptions: {
        title: 'Pickup Request',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="add-shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Pickup Request
            </Text>
          </View>
        ),
      },
    },
    DeliveryCalls: {
      screen: DeliveryCallsStack,
      navigationOptions: {
        title: 'Delivery Calls',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Delivery Calls
            </Text>
          </View>
        ),
      },
    },
    Complaints: {
      screen: ComplaintsStack,
      navigationOptions: {
        title: 'Complaints',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="remove-shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Complaints
            </Text>
          </View>
        ),
      },
    },
    SalesLeads: {
      screen: SalesLeadsStack,
      navigationOptions: {
        title: 'Leads',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="bullhorn" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Leads
            </Text>
          </View>
        ),
      },
    },
    SalesExpenses: {
      screen: SalesExpensesStack,
      navigationOptions: {
        title: 'Expenses',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="money" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Expenses
            </Text>
          </View>
        ),
      },
    },
    EmployeeAttendances: {
      screen: EmployeeAttendancesStack,
      navigationOptions: {
        title: 'Employees Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Employees Attendances
            </Text>
          </View>
        ),
      },
    },
    Attendances: {
      screen: AttendancesStack,
      navigationOptions: {
        title: 'Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Attendances
            </Text>
          </View>
        ),
      },
    },
    MyAccounts: {
      screen: MyAccountsStack,
      navigationOptions: {
        title: 'My Accounts',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              My Accounts
            </Text>
          </View>
        ),
      },
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: {
        title: 'Notifications',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="bell-o" size={20}/>,
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.drawerLabelContainer]}>
            <Text
              style={[
                styles.drawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Notifications
            </Text>
            <View style={[styles.drawerLabelBadgeContainer]}>
              <DrawerNotificationBadge
                isMenuFocused={drawerLabelOptions.focused}
                menuFontColor={drawerLabelOptions.tintColor}
              />
            </View>
          </View>
        ),
      },
    },
    // LocationTrackingTest: {
    //   screen: LocationTrackingTestStack,
    //   navigationOptions:{
    //     title: "Location Tracking",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="map-marker" size={20}/>
    //   }
    // },
    // EditProfile: {
    //   screen: EditProfileStack,
    //   navigationOptions:{
    //     title: "Edit Profile",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="pencil-square-o" size={20}/>
    //   }
    // }
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: contentOptions,
  },
);

export const SalesUserRoutes = createDrawerNavigator(
  {
    SalesDashboard: {
      screen: SalesDashboardStack,
      navigationOptions: {
        title: 'Dashboard',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Home
            </Text>
          </View>
        ),
      },
    },
    SalesCustomers: {
      screen: SalesCustomersStack,
      navigationOptions: {
        title: 'Customers',
        // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Customers
            </Text>
          </View>
        ),
      },
    },
    SalesBrands: {
      screen: BrandsStack,
      navigationOptions: {
        title: 'Brands',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Brands
            </Text>
          </View>
        ),
      },
    },
    SalesCategories: {
      screen: CategoriesStack,
      navigationOptions: {
        title: 'Products',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Products
            </Text>
          </View>
        ),
      },
    },
    CollectionCalls: {
      screen: CollectionCallsStack,
      navigationOptions: {
        title: 'Pickup Request',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="add-shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Pickup Request
            </Text>
          </View>
        ),
      },
    },
    DeliveryCalls: {
      screen: DeliveryCallsStack,
      navigationOptions: {
        title: 'Delivery Calls',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Delivery Calls
            </Text>
          </View>
        ),
      },
    },
    Complaints: {
      screen: ComplaintsStack,
      navigationOptions: {
        title: 'Complaints',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="remove-shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Complaints
            </Text>
          </View>
        ),
      },
    },
    SalesLeads: {
      screen: SalesLeadsStack,
      navigationOptions: {
        title: 'Leads',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="bullhorn" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Leads
            </Text>
          </View>
        ),
      },
    },
    SalesExpenses: {
      screen: SalesExpensesStack,
      navigationOptions: {
        title: 'Expenses',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="money" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Expenses
            </Text>
          </View>
        ),
      },
    },
    Attendances: {
      screen: AttendancesStack,
      navigationOptions: {
        title: 'Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Attendances
            </Text>
          </View>
        ),
      },
    },
    MyAccounts: {
      screen: MyAccountsStack,
      navigationOptions: {
        title: 'My Accounts',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              My Accounts
            </Text>
          </View>
        ),
      },
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: {
        title: 'Notifications',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.drawerLabelContainer]}>
            <Text
              style={[
                styles.drawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Notifications
            </Text>
            <View style={[styles.drawerLabelBadgeContainer]}>
              <DrawerNotificationBadge
                isMenuFocused={drawerLabelOptions.focused}
                menuFontColor={drawerLabelOptions.tintColor}
              />
            </View>
          </View>
        ),
      },
    },
    // LocationTrackingTest: {
    //   name: 'Location Tracking',
    //   screen: LocationTrackingTestStack,
    //   navigationOptions:{
    //     title: "Location Tracking",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="map-marker" size={20}/>
    //   }
    // },
    // EditProfile: {
    //   name: 'EditProfile',
    //   screen: EditProfileStack,
    //   navigationOptions:{
    //     title: "Edit Profile",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="pencil-square-o" size={20}/>
    //   }
    // }
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: contentOptions,
  },
);

/*==========================================================================================
=================================== SALES USER ROUTES ENDS =================================
============================================================================================*/

/*==========================================================================================
================================= SUPERVISOR USER ROUTES START ==============================
============================================================================================*/

export const SupervisorDashboardStack = createStackNavigator({
  SupervisorDashboard: {
    screen: SupervisorDashboard,
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
        headerStyle: headerStyle,
      };
    },
  },
});

export const SupervisorViewOrderDetailsTabStack =
  createMaterialBottomTabNavigator(
    {
      SupervisorViewOrder: {
        screen: SupervisorViewOrder,
        navigationOptions: {
          tabBarLabel: 'Order',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
            </View>
          ),
        },
      },
      SupervisorViewOrderDetails: {
        screen: SupervisorViewOrderDetails,
        navigationOptions: {
          tabBarLabel: 'Job Details',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="cubes" size={20} />
            </View>
          ),
        },
      },
    },
    {
      initialRouteName: 'SupervisorViewOrder',
      activeColor: tabColors.activeColor,
      inactiveColor: tabColors.inactiveColor,
      barStyle: {backgroundColor: tabColors.barBgColor},
    },
  );

export const SupervisorOrdersStack = createStackNavigator({
  SupervisorOrders: {
    screen: SupervisorOrders,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Orders"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SupervisorViewOrder: {
    screen: SupervisorViewOrderDetailsTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

export const SupervisorScanQrCodeStack = createStackNavigator({
  SupervisorScanQrCode: {
    screen: SupervisorScanQrCodeOrSearchUsingJobId,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Scan Qr Code"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

export const SupervisorJobsStack = createStackNavigator({
  SupervisorJobs: {
    screen: SupervisorJobs,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Jobs"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SupervisorViewJob: {
    screen: SupervisorViewJob,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Job Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SupervisorViewOrderForJob: {
    screen: SupervisorViewOrderDetailsTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SupervisorCustomerDetailsForJob: {
    screen: SupervisorCustomerDetails,
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

export const SupervisorViewOngoingJobTabStack =
  createMaterialBottomTabNavigator(
    {
      SupervisorViewOngoingJob: {
        screen: SupervisorViewOngoingJob,
        navigationOptions: {
          tabBarLabel: 'Job Details',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
            </View>
          ),
        },
      },
      SupervisorOngoingJobProgress: {
        screen: SupervisorOngoingJobProgress,
        navigationOptions: {
          tabBarLabel: 'Production Progress',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="tasks" size={20} />
            </View>
          ),
        },
      },
    },
    {
      initialRouteName: 'SupervisorViewOngoingJob',
      activeColor: tabColors.activeColor,
      inactiveColor: tabColors.inactiveColor,
      barStyle: {backgroundColor: tabColors.barBgColor},
    },
  );

export const SupervisorOngoingJobsStack = createStackNavigator({
  SupervisorOngoingJobs: {
    screen: SupervisorOngoingJobs,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Ongoing Jobs"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SupervisorViewOngoingJob: {
    screen: SupervisorViewOngoingJobTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Job Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SupervisorViewOrderForOngoingJob: {
    screen: SupervisorViewOrderDetailsTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SupervisorCustomerDetailsForOngoingJob: {
    screen: SupervisorCustomerDetails,
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

export const SupervisorReworksStack = createStackNavigator({
  SupervisorReworks: {
    screen: SupervisorReworks,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Reworks"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SupervisorViewJobForRework: {
    screen: SupervisorRework,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Job Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SupervisorViewOrderForRework: {
    screen: SupervisorViewOrderDetailsTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SupervisorCustomerDetailsForRework: {
    screen: SupervisorCustomerDetails,
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

export const SupervisorReopensStack = createStackNavigator({
  SupervisorReopens: {
    screen: SupervisorReopens,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Reopened Jobs"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SupervisorViewJobForReopen: {
    screen: SupervisorReopen,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Job Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SupervisorViewOrderForReopen: {
    screen: SupervisorViewOrderDetailsTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  SupervisorCustomerDetailsForReopen: {
    screen: SupervisorCustomerDetails,
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

export const SupervisorUserRoutes = createDrawerNavigator(
  {
    SupervisorDashboard: {
      screen: SupervisorDashboardStack,
      navigationOptions: {
        title: 'Dashboard',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Home
            </Text>
          </View>
        ),
      },
    },
    SupervisorCategories: {
      screen: CategoriesStack,
      navigationOptions: {
        title: 'Products',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Products
            </Text>
          </View>
        ),
      },
    },
    SupervisorBrands: {
      screen: BrandsStack,
      navigationOptions: {
        title: 'Brands',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Brands
            </Text>
          </View>
        ),
      },
    },
    // SupervisorOrders: {
    //   screen: SupervisorOrdersStack,
    //   navigationOptions:{
    //     title: "Orders",
    //     drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
    //   }
    // },
    SupervisorScanQrCode: {
      screen: SupervisorScanQrCodeStack,
      navigationOptions: {
        title: 'Scan Qr Code',
        // drawerIcon:({tintColor}: any)=> <MaterialCommunityIcons name="qrcode-scan" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Scan Qr Code
            </Text>
          </View>
        ),
      },
    },
    SupervisorJobs: {
      screen: SupervisorJobsStack,
      navigationOptions: {
        title: 'Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Jobs
            </Text>
          </View>
        ),
      },
    },
    SupervisorReworks: {
      screen: SupervisorReworksStack,
      navigationOptions: {
        title: 'Reworks',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Reworks
            </Text>
          </View>
        ),
      },
    },
    SupervisorReopens: {
      screen: SupervisorReopensStack,
      navigationOptions: {
        title: 'Reopened Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Reopened Jobs
            </Text>
          </View>
        ),
      },
    },
    SupervisorOngoingJobs: {
      screen: SupervisorOngoingJobsStack,
      navigationOptions: {
        title: 'Ongoing Jobs',
        // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Ongoing Jobs
            </Text>
          </View>
        ),
      },
    },
    Attendances: {
      screen: AttendancesStack,
      navigationOptions: {
        title: 'Attendances',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Attendances
            </Text>
          </View>
        ),
      },
    },
    MyAccounts: {
      screen: MyAccountsStack,
      navigationOptions: {
        title: 'My Accounts',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              My Accounts
            </Text>
          </View>
        ),
      },
    },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: {
        title: 'Notifications',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.drawerLabelContainer]}>
            <Text
              style={[
                styles.drawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Notifications
            </Text>
            <View style={[styles.drawerLabelBadgeContainer]}>
              <DrawerNotificationBadge
                isMenuFocused={drawerLabelOptions.focused}
                menuFontColor={drawerLabelOptions.tintColor}
              />
            </View>
          </View>
        ),
      },
    },
    // EditProfile: {
    //   screen: EditProfileStack,
    //   navigationOptions:{
    //     title: "Edit Profile",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="pencil-square-o" size={20}/>
    //   }
    // }
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: contentOptions,
  },
);

/*==========================================================================================
================================= SUPERVISOR USER ROUTES ENDS ===============================
============================================================================================*/

/*==========================================================================================
=================================== CUSTOMER USER ROUTES START ================================
============================================================================================*/

export const CustomerDashboardStack = createStackNavigator({
  CustomerDashboard: {
    screen: CustomerDashboard,
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
        headerStyle: headerStyle,
      };
    },
  },
});

export const CustomerCollectionCallsStack = createStackNavigator({
  CustomerCollectionCalls: {
    screen: CustomerCollectionCalls,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Pickup Request"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  CustomerCollectionCallForm: {
    screen: CustomerCollectionCallForm,
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

export const CustomerComplaintsStack = createStackNavigator({
  CustomerComplaints: {
    screen: CustomerComplaints,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="My Complaints"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  CustomerComplaintForm: {
    screen: CustomerComplaintForm,
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

export const CustomerViewOrderDetailsTabStack =
  createMaterialBottomTabNavigator(
    {
      CustomerViewOrder: {
        screen: CustomerViewOrder,
        navigationOptions: {
          tabBarLabel: 'Order',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
            </View>
          ),
        },
      },
      CustomerOrderUploadImages: {
        screen: CustomerOrderUploadImages,
        navigationOptions: {
          tabBarLabel: 'Upload Case Photos',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="picture-o" size={20} />
            </View>
          ),
        },
      },
      CustomerViewOrderDetails: {
        screen: CustomerViewOrderDetails,
        navigationOptions: {
          tabBarLabel: 'Job Details',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="cubes" size={20} />
            </View>
          ),
        },
      },
    },
    {
      initialRouteName: 'CustomerViewOrder',
      activeColor: tabColors.activeColor,
      inactiveColor: tabColors.inactiveColor,
      barStyle: {backgroundColor: tabColors.barBgColor},
    },
  );

export const CustomerOrdersStack = createStackNavigator({
  CustomerOrders: {
    screen: CustomerOrders,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="My Orders"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  CustomerViewOrder: {
    screen: CustomerViewOrderDetailsTabStack,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="My Order"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  CustomerViewJob: {
    screen: CustomerViewJob,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Job Details"
            isShowDrawerToggleButton={false}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
});

export const CustomerViewProfileStack = createStackNavigator({
  CustomerViewProfile: {
    screen: CustomerViewProfile,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="My Profile"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
      };
    },
  },
});

export const CustomerChangePasswordStack = createStackNavigator({
  CustomerChangePassword: {
    screen: CustomerChangePassword,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Change Password"
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

export const CustomerMyAccountsStack = createStackNavigator({
  CustomerMyAccounts: {
    screen: CustomerMyAccounts,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="My Accounts"
            isShowDrawerToggleButton={true}
            isShowLogoInsteadOfTitle={false}
          />
        ),
        headerStyle: headerStyle,
      };
    },
  },
  CustomerViewProfile: {
    screen: CustomerViewProfile,
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
  CustomerChangePassword: {
    screen: CustomerChangePassword,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <NavigationDrawerStructure
            navigation={navigation}
            title="Change Password"
            isShowDrawerToggleButton={false}
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

export const CustomerUserRoutes = createDrawerNavigator(
  {
    CustomerDashboard: {
      screen: CustomerDashboardStack,
      navigationOptions: {
        title: 'Dashboard',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Home
            </Text>
          </View>
        ),
      },
    },
    CustomerBrands: {
      screen: BrandsStack,
      navigationOptions: {
        title: 'Brands',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Brands
            </Text>
          </View>
        ),
      },
    },
    CustomerCategories: {
      screen: CategoriesStack,
      navigationOptions: {
        title: 'Products',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Products
            </Text>
          </View>
        ),
      },
    },
    CustomerCollectionCalls: {
      screen: CustomerCollectionCallsStack,
      navigationOptions: {
        title: 'Pickup Request',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="add-shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Pickup Request
            </Text>
          </View>
        ),
      },
    },
    CustomerOrders: {
      screen: CustomerOrdersStack,
      navigationOptions: {
        title: 'My Orders',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              My Orders
            </Text>
          </View>
        ),
      },
    },
    CustomerComplaints: {
      screen: CustomerComplaintsStack,
      navigationOptions: {
        title: 'My Complaints',
        // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="remove-shopping-cart" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              My Complaints
            </Text>
          </View>
        ),
      },
    },
    CustomerMyAccounts: {
      screen: CustomerMyAccountsStack,
      navigationOptions: {
        title: 'My Accounts',
        // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.commonDrawerLabelContainer]}>
            <Text
              style={[
                styles.commonDrawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              My Accounts
            </Text>
          </View>
        ),
      },
    },
    // CustomerViewPassword: {
    //   screen: CustomerViewProfileStack,
    //   navigationOptions:{
    //     title: "My Profile",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user-md" size={20}/>
    //   }
    // },
    Notifications: {
      screen: NotificationsStack,
      navigationOptions: {
        title: 'Notifications',
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            style={[
              {
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              },
            ]}
            name="circle"
            size={drawerIconSize}
          />
        ),
        drawerLabel: drawerLabelOptions => (
          <View style={[styles.drawerLabelContainer]}>
            <Text
              style={[
                styles.drawerLabel,
                {color: drawerLabelOptions.tintColor},
              ]}>
              Notifications
            </Text>
            <View style={[styles.drawerLabelBadgeContainer]}>
              <DrawerNotificationBadge
                isMenuFocused={drawerLabelOptions.focused}
                menuFontColor={drawerLabelOptions.tintColor}
              />
            </View>
          </View>
        ),
      },
    },
    // CustomerChangePassword: {
    //   name: <Text>Change Password</Text>,
    //   screen: CustomerChangePasswordStack,
    //   navigationOptions:{
    //     title: "Change Password",
    //     drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="key" size={20}/>
    //   }
    // },
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: contentOptions,
  },
);

/*==========================================================================================
=================================== CUSTOMER USER ROUTES ENDS =================================
============================================================================================*/

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
        AdminQCUserRoutes: AdminQCUserRoutes,
        AdminQCHeadUserRoutes: AdminQCHeadUserRoutes,
        PackagingUserRoutes: PackagingUserRoutes,
        PackagingHeadUserRoutes: PackagingHeadUserRoutes,
        ProductionUserRoutes: ProductionUserRoutes,
        ProductionHeadUserRoutes: ProductionHeadUserRoutes,
        ReceptionUserRoutes: ReceptionUserRoutes,
        SalesUserRoutes: SalesUserRoutes,
        SalesHeadUserRoutes: SalesHeadUserRoutes,
        SupervisorUserRoutes: SupervisorUserRoutes,
        CustomerUserRoutes: CustomerUserRoutes,
        SignedOut: SignedOut,
      },
      {
        initialRouteName: initialRouteName,
      },
    ),
  );
};

const styles = StyleSheet.create({
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

const mapStateToProps = (state: any) => {
  return {
    user: state.loggedInUserDetailsReducer.user,
    count: state.DrawerNotificationBadgeCountReducer.count,
  };
};

export default connect(mapStateToProps, null)(NavigationDrawerStructure);
