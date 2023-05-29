import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {headerStyles} from './assets/style';
import DrawerLogoutButton from './components/DrawerLogoutButton';
import DrawerNotificationBadge from './components/DrawerNotificationBadge';
import DrawerUserDetails from './components/DrawerUserDetails';
import HeaderSaveButton from './components/HeaderSaveButton';
import HeaderSearchButton from './components/HeaderSearchButton';
import {
  circleBgColor,
  fontColor,
  primaryBlueHexColor,
  primaryHexColor,
} from './constants/themeColors';
import Categories from './pages/CategoriesAndProducts/Categories';
import ProductDetails from './pages/CategoriesAndProducts/ProductDetails';
import Products from './pages/CategoriesAndProducts/Products';
import EditProfile from './pages/EditProfile';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import LocationTracker from './pages/LocationTracker';
import Login from './pages/Login';
import ShowLocationHistory from './pages/ShowLocationHistory';
import Signup from './pages/Signup';
import Dashboard from './pages/sales/Dashboard';
import Sales from './pages/sales/Sales';

/*==========================================================================================
==================================== ADMIN QC PAGES START =====================================
============================================================================================*/
/* Admin QC Head Pages Start */

/* Admin QC Head Pages End */

import AdminQCDashboard from './pages/adminQCs/AdminQCDashboard';

import AdminQCJob from './pages/adminQCs/orders/AdminQCJob';
import AdminQCJobs from './pages/adminQCs/orders/AdminQCJobs';
import AdminQCOrder from './pages/adminQCs/orders/AdminQCOrder';
import AdminQCOrders from './pages/adminQCs/orders/AdminQCOrders';

import AdminQCSalesPerson from './pages/adminQCs/salesPersons/AdminQCSalesPerson';
import AdminQCSalesPersons from './pages/adminQCs/salesPersons/AdminQCSalesPersons';

import BrandProductDetails from './pages/BrandsAndProducts/BrandProductDetails';
import BrandProducts from './pages/BrandsAndProducts/BrandProducts';
import Brands from './pages/BrandsAndProducts/Brands';
import MyProfile from './pages/MyProfile';
import Notifications from './pages/Notifications';
import QrCodeScannerDemo from './pages/QrCodeScannerDemo';
import AdminQCLead from './pages/adminQCs/leads/AdminQCLead';
import AdminQCLeadInteractions from './pages/adminQCs/leads/AdminQCLeadInteractions';
import AdminQCLeads from './pages/adminQCs/leads/AdminQCLeads';
import LeaveApplicationDetails from './pages/attendances/LeaveApplicationDetails';
import LeaveApplicationForm from './pages/attendances/LeaveApplicationForm';
import LeaveApplications from './pages/attendances/LeaveApplications';
import MonthlyDayOffs from './pages/attendances/MonthlyDayOffs';
import CustomerDashboard from './pages/customers/CustomerDashboard';
import EmployeeAttendanceReport from './pages/employeeAttendances/EmployeeAttendanceReport';
import EmployeeLeaveApplicationDetails from './pages/employeeAttendances/EmployeeLeaveApplicationDetails';
import EmployeeLeaveApplications from './pages/employeeAttendances/EmployeeLeaveApplications';
import PackagingHeadDashboard from './pages/packagings/departmentHead/PackagingHeadDashboard';
import ProductionDashboard from './pages/productions/ProductionDashboard';
import ProductionHeadOrderView from './pages/productions/departmentHead/ProductionHeadOrderView';
import ProductionEmployeeAssignedJob from './pages/productions/departmentHead/productionEmployees/ProductionEmployeeAssignedJob';
import ProductionEmployeeAssignedJobs from './pages/productions/departmentHead/productionEmployees/ProductionEmployeeAssignedJobs';
import ProductionEmployeeDetails from './pages/productions/departmentHead/productionEmployees/ProductionEmployeeDetails';
import ProductionEmployees from './pages/productions/departmentHead/productionEmployees/ProductionEmployees';
import ProductionOngoingJobDetails from './pages/productions/departmentHead/productionOngoingJobs/ProductionOngoingJobDetails';
import productionOngoingJobs from './pages/productions/departmentHead/productionOngoingJobs/ProductionOngoingJobs';
import ProductionScanQrCodeForOngoingJob from './pages/productions/departmentHead/productionOngoingJobs/ProductionScanQrCodeForOngoingJob';
import ProductionScanQrCodeForUnAssignedJob from './pages/productions/departmentHead/productionUnAssignedJobs/ProductionScanQrCodeForUnAssignedJob';
import ProductionUnAssignedJobDetails from './pages/productions/departmentHead/productionUnAssignedJobs/ProductionUnAssignedJobDetails';
import productionUnAssignedJobs from './pages/productions/departmentHead/productionUnAssignedJobs/ProductionUnAssignedJobs';
import ProductionAssignedJobDetails from './pages/productions/productionAssignedJobs/ProductionAssignedJobDetails';
import ProductionAssignedJobs from './pages/productions/productionAssignedJobs/ProductionAssignedJobs';
import ProductionScanQrCodeForAssignedJob from './pages/productions/productionAssignedJobs/ProductionScanQrCodeForAssignedJob';
import ReceptionDashboard from './pages/receptionists/ReceptionDashboard';
import ReceptionCollectionCallDetails from './pages/receptionists/collectionCalls/ReceptionCollectionCallDetails';
import ReceptionCollectionCallForm from './pages/receptionists/collectionCalls/ReceptionCollectionCallForm';
import ReceptionCollectionCalls from './pages/receptionists/collectionCalls/ReceptionCollectionCalls';
import ReceptionComplaintDetails from './pages/receptionists/complaints/ReceptionComplaintDetails';
import ReceptionComplaintForm from './pages/receptionists/complaints/ReceptionComplaintForm';
import ReceptionComplaints from './pages/receptionists/complaints/ReceptionComplaints';
import ReceptionCompletedJob from './pages/receptionists/completedJobs/ReceptionCompletedJob';
import ReceptionCompletedJobs from './pages/receptionists/completedJobs/ReceptionCompletedJobs';
import ReceptionCompletedOrders from './pages/receptionists/completedOrders/ReceptionCompletedOrders';
import ReceptionViewCompletedJob from './pages/receptionists/completedOrders/ReceptionViewCompletedJob';
import ReceptionViewCompletedOrder from './pages/receptionists/completedOrders/ReceptionViewCompletedOrder';
import ReceptionViewCompletedOrderDetails from './pages/receptionists/completedOrders/ReceptionViewCompletedOrderDetails';
import ReceptionCustomerDetails from './pages/receptionists/customers/ReceptionCustomerDetails';
import ReceptionCustomerForm from './pages/receptionists/customers/ReceptionCustomerForm';
import ReceptionCustomers from './pages/receptionists/customers/ReceptionCustomers';
import ReceptionDeliveryCallDetails from './pages/receptionists/deliveryCalls/ReceptionDeliveryCallDetails';
import ReceptionDeliveryCallForm from './pages/receptionists/deliveryCalls/ReceptionDeliveryCallForm';
import ReceptionDeliveryCalls from './pages/receptionists/deliveryCalls/ReceptionDeliveryCalls';
import ReceptionOrderForm from './pages/receptionists/orders/ReceptionOrderForm';
import ReceptionOrders from './pages/receptionists/orders/ReceptionOrders';
import ReceptionViewJob from './pages/receptionists/orders/ReceptionViewJob';
import ReceptionViewOrder from './pages/receptionists/orders/ReceptionViewOrder';
import ReceptionViewOrderDetails from './pages/receptionists/orders/ReceptionViewOrderDetails';
import ReceptionRejectedJob from './pages/receptionists/rejectedJobs/ReceptionRejectedJob';
import ReceptionRejectedJobs from './pages/receptionists/rejectedJobs/ReceptionRejectedJobs';
import SalesDashboard from './pages/sales/SalesDashboard';
import CollectionCallDetails from './pages/sales/calllogs/CollectionCallDetails';
import CollectionCallForm from './pages/sales/calllogs/CollectionCallForm';
import CollectionCalls from './pages/sales/calllogs/CollectionCalls';
import ComplaintDetails from './pages/sales/calllogs/ComplaintDetails';
import ComplaintForm from './pages/sales/calllogs/ComplaintForm';
import Complaints from './pages/sales/calllogs/Complaints';
import DeliveryCallDetails from './pages/sales/calllogs/DeliveryCallDetails';
import DeliveryCallForm from './pages/sales/calllogs/DeliveryCallForm';
import DeliveryCalls from './pages/sales/calllogs/DeliveryCalls';
import SalesCustomerDetails from './pages/sales/customers/SalesCustomerDetails';
import SalesCustomerForm from './pages/sales/customers/SalesCustomerForm';
import SalesCustomers from './pages/sales/customers/SalesCustomers';
import SalesHeadDashboard from './pages/sales/departmentHead/SalesHeadDashboard';
import SalesHeadSalesPersonDetails from './pages/sales/departmentHead/salesPersons/SalesHeadSalesPersonDetails';
import SalesHeadSalesPersonForm from './pages/sales/departmentHead/salesPersons/SalesHeadSalesPersonForm';
import SalesHeadSalesPersonTrackingHistory from './pages/sales/departmentHead/salesPersons/SalesHeadSalesPersonTrackingHistory';
import SalesHeadSalesPersons from './pages/sales/departmentHead/salesPersons/SalesHeadSalesPersons';
import SalesExpenseDetails from './pages/sales/expenses/SalesExpenseDetails';
import SalesExpenseForm from './pages/sales/expenses/SalesExpenseForm';
import SalesExpenses from './pages/sales/expenses/SalesExpenses';
import LeadDetails from './pages/sales/leads/LeadDetails';
import LeadForm from './pages/sales/leads/LeadForm';
import LeadInteractions from './pages/sales/leads/LeadInteractions';
import LeadMessages from './pages/sales/leads/LeadMessages';
import Leads from './pages/sales/leads/Leads';
import SupervisorDashboard from './pages/supervisors/SupervisorDashboard';
import SupervisorCustomerDetails from './pages/supervisors/customers/SupervisorCustomerDetails';
import SupervisorJobs from './pages/supervisors/jobs/SupervisorJobs';
import SupervisorScanQrCodeOrSearchUsingJobId from './pages/supervisors/jobs/SupervisorScanQrCodeOrSearchUsingJobId';
import SupervisorViewJob from './pages/supervisors/jobs/SupervisorViewJob';
import SupervisorOngoingJobProgress from './pages/supervisors/ongoingjobs/SupervisorOngoingJobProgress';
import SupervisorOngoingJobs from './pages/supervisors/ongoingjobs/SupervisorOngoingJobs';
import SupervisorViewOngoingJob from './pages/supervisors/ongoingjobs/SupervisorViewOngoingJob';
import SupervisorViewOrder from './pages/supervisors/orders/SupervisorViewOrder';
import SupervisorViewOrderDetails from './pages/supervisors/orders/SupervisorViewOrderDetails';
import SupervisorReopen from './pages/supervisors/reopens/SupervisorReopen';
import SupervisorReopens from './pages/supervisors/reopens/SupervisorReopens';
import SupervisorRework from './pages/supervisors/reworks/SupervisorRework';
import SupervisorReworks from './pages/supervisors/reworks/SupervisorReworks';

import CustomerCollectionCallForm from './pages/customers/collectionCalls/CustomerCollectionCallForm';
import CustomerCollectionCalls from './pages/customers/collectionCalls/CustomerCollectionCalls';
import CustomerComplaintForm from './pages/customers/complaints/CustomerComplaintForm';
import CustomerComplaints from './pages/customers/complaints/CustomerComplaints';
import CustomerOrderUploadImages from './pages/customers/orders/CustomerOrderUploadImages';
import CustomerOrders from './pages/customers/orders/CustomerOrders';
import CustomerViewJob from './pages/customers/orders/CustomerViewJob';
import CustomerViewOrder from './pages/customers/orders/CustomerViewOrder';
import CustomerViewOrderDetails from './pages/customers/orders/CustomerViewOrderDetails';
import CustomerChangePassword from './pages/customers/profile/CustomerChangePassword';
import CustomerMyAccounts from './pages/customers/profile/CustomerMyAccounts';
import CustomerViewProfile from './pages/customers/profile/CustomerViewProfile';
import PackagingDashboard from './pages/packagings/PackagingDashboard';
/*==========================================================================================
==================================== ADMIN QC PAGES END =======================================
============================================================================================*/

const SignedInDrawerStack = createDrawerNavigator();
const Stack = createStackNavigator();

function NavigationDrawerStructure(props: any) {
  const toggleDrawer = () => {
    props.navigation.toggleDrawer();
  };

  const {isShowDrawerToggleButton, isShowLogoInsteadOfTitle, title} = props;

  return (
    <View
      style={
        isShowLogoInsteadOfTitle
          ? headerStyles.headerWithLogo
          : headerStyles.header
      }>
      {isShowDrawerToggleButton && (
        <View style={{paddingRight: 20}}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Image
              style={{resizeMode: 'contain', width: 28, height: 28}}
              source={require('./images/drawer-icon.png')}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={{flex: 1}}>
        {isShowLogoInsteadOfTitle ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingRight: 25,
            }}>
            <Image
              style={{resizeMode: 'contain', width: 150, height: 50}}
              source={require('./images/logo.png')}
            />
          </View>
        ) : (
          <Text
            style={
              isShowDrawerToggleButton
                ? headerStyles.headertext
                : headerStyles.headertextwithbackbutton
            }>
            {title}
          </Text>
        )}
      </View>
    </View>
  );
}

// import Dashboard from './pages/Dashboard';
// import Sales from './pages/Sales';

const Tab = createMaterialBottomTabNavigator();
// const Stack = createStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

function SalesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sales" component={Sales} />
    </Stack.Navigator>
  );
}

export const EmployeeAttendanceReportStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="EmployeeAttendanceReport"
        component={EmployeeAttendanceReport}
      />
    </Tab.Navigator>
  );
};
export const EmployeeLeaveApplicationsStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="EmployeeLeaveApplications"
        component={EmployeeLeaveApplications}
      />
    </Tab.Navigator>
  );
};

export const MonthlyDayOffsStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MonthlyDayOffs" component={MonthlyDayOffs} />
    </Tab.Navigator>
  );
};

export const LeaveApplicationsStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LeaveApplications" component={LeaveApplications} />
    </Tab.Navigator>
  );
};
export const ProductionEmployeeDetailsStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ProductionEmployeeDetails"
        component={ProductionEmployeeDetails}
      />
    </Tab.Navigator>
  );
};
export const ProductionEmployeeAssignedJobsStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ProductionEmployeeAssignedJobs"
        component={ProductionEmployeeAssignedJobs}
      />
    </Tab.Navigator>
  );
};
export const ProductionEmployeeTabStack = () => {
  return (
    <Tab.Navigator initialRouteName="Dashboard">
      <Tab.Screen
        name="ProductionEmployeeDetails"
        component={ProductionEmployeeDetailsStack}
        options={{
          tabBarLabel: 'Personal Details',
          tabBarIcon: ({color}) => (
            <Icon name="wpforms" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="ProductionEmployeeAssignedJobs"
        component={ProductionEmployeeAssignedJobsStack}
        options={{
          tabBarLabel: 'Assigned Jobs',
          tabBarIcon: ({color}) => (
            <Icon name="cubes" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      activeColor="#ffffff"
      inactiveColor="#bda1f7"
      barStyle={{backgroundColor: '#6948f4'}}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          // tabBarLabel: 'Dashboard',

          tabBarIcon: ({color}) => (
            <View>
              <Icon name="dashboard" color={color} size={24} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Sales"
        component={SalesStack}
        options={{
          tabBarLabel: 'Sales',
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="home" color={color} size={24} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export const AdminQCViewOrderTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Order"
      activeColor="#ffffff"
      inactiveColor="#bda1f7"
      barStyle={{backgroundColor: '#6948f4'}}>
      <Tab.Screen
        name="Order"
        component={AdminQCOrder}
        options={{
          // tabBarLabel: 'Dashboard',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Job Details"
        component={AdminQCJobs}
        options={{
          tabBarLabel: 'Job Details',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="cubes" size={20} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export const AdminQCSalesPersonTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="AdminQCSalesPerson"
      activeColor="#ffffff"
      inactiveColor="#bda1f7"
      barStyle={{backgroundColor: '#6948f4'}}>
      <Tab.Screen
        name="Personal Details"
        component={AdminQCSalesPerson}
        options={{
          tabBarLabel: 'Personal Details',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Location Tracking"
        component={SalesHeadSalesPersonTrackingHistory}
        options={{
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="history" size={20} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export const AdminQCLeadTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="AdminQCLead"
      activeColor="#ffffff"
      inactiveColor="#bda1f7"
      barStyle={{backgroundColor: '#6948f4'}}>
      <Tab.Screen
        name="Lead Details"
        component={AdminQCLead}
        options={{
          tabBarLabel: 'Lead Details',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="wpforms" size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Interactions"
        component={AdminQCLeadInteractions}
        options={{
          tabBarLabel: 'Interactions',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="id-badge" size={20} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export const EmployeeAttendancesTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="EmployeeAttendanceReport"
      activeColor="#ffffff"
      inactiveColor="#bda1f7"
      barStyle={{backgroundColor: '#6948f4'}}>
      <Tab.Screen
        name="Attendance Reports"
        component={EmployeeAttendanceReportStack}
        options={{
          tabBarLabel: 'Attendance Report',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="calendar" size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Leave Applications"
        component={EmployeeLeaveApplicationsStack}
        options={{
          tabBarLabel: 'Leave Applications',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="list" size={20} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export const AttendancesTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="MonthlyDayOffs"
      activeColor="#ffffff"
      inactiveColor="#bda1f7"
      barStyle={{backgroundColor: '#6948f4'}}>
      <Tab.Screen
        name="Attendance Reports"
        component={MonthlyDayOffsStack}
        options={{
          tabBarLabel: 'Monthly Dayoffs',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="calendar" size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Leave Applications"
        component={LeaveApplications}
        options={{
          tabBarLabel: 'Leave Applications',
          tabBarIcon: ({tintColor}: any) => (
            <View>
              <Icon style={[{color: tintColor}]} name="list" size={20} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Home"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={true}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

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

const EditProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({navigation}) => ({
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
        })}
      />
    </Stack.Navigator>
  );
};

const CategoriesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={({navigation}) => ({
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
        })}
      />
      <Stack.Screen
        name="SubCategories"
        component={Categories}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.state?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.state?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.state?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};
function SignedInDrawer({initialRouteName}: any) {
  return (
    <SignedInDrawerStack.Navigator initialRouteName={initialRouteName}>
      <SignedInDrawerStack.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          // title: 'Home',
          drawerIcon: ({color}) => (
            <Icon style={[{color: color}]} name="layers" size={20} />
          ),
        }}
      />
      <SignedInDrawerStack.Screen
        name="Dashboard"
        component={TabStack}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Icon style={[{color: color}]} name="layers" size={20} />
          ),
        }}
      />
      <SignedInDrawerStack.Screen
        name="Categories"
        component={CategoriesStack}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Icon style={[{color: color}]} name="layers" size={20} />
          ),
        }}
      />
      <SignedInDrawerStack.Screen
        name="EditProfile"
        component={EditProfileStack}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Icon style={[{color: color}]} name="layers" size={20} />
          ),
        }}
      />
    </SignedInDrawerStack.Navigator>
  );
}

function SignedOut({initialRouteName}: any) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: 'Sign In'}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{title: 'Forgot Password'}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{title: 'Sign Up'}}
      />
      <Stack.Screen
        name="LocationTracker"
        component={LocationTracker}
        options={{title: 'Location Tracker'}}
      />
      <Stack.Screen
        name="ShowLocationHistory"
        component={ShowLocationHistory}
        options={{title: 'Show Location History'}}
      />
    </Stack.Navigator>
  );
}
const Drawer = createDrawerNavigator();

const CustomDrawerContentComponent = (props: any) => (
  <ScrollView>
    <DrawerUserDetails {...props} />
    <View style={styles.container}>
      <DrawerNavigatorItems {...props} />
    </View>
    <DrawerLogoutButton {...props} />
  </ScrollView>
);
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
function AdminQCDashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminQCDashboard"
        component={AdminQCDashboard}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Dashboard"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={true}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
function ProductionScanQrCodeForAssignedJobStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Scan Qr Code"
        component={ProductionScanQrCodeForAssignedJob}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Scan Qr Code"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
function ProductionDashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductionDashboard"
        component={ProductionDashboard}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Dashboard"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={true}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function ProductionAssignedJobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Assigned Jobs"
        component={ProductionAssignedJobs}
        options={({navigation}) => ({
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
        })}
      />
      <Stack.Screen
        name="Job Details"
        component={ProductionAssignedJobDetails}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Job Details"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="Order"
        component={ProductionHeadOrderView}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Order"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
function AdminQCOrdersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders"
        component={AdminQCOrders}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Orders"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="Order"
        component={AdminQCViewOrderTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Order"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="Job Details"
        component={AdminQCJob}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Job Details"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
function AdminQCSalesPersonsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sales Persons"
        component={AdminQCSalesPersons}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Sales Persons"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="Sales Persons"
        component={AdminQCSalesPersonTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.state?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
function AdminQCLeadsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Leads"
        component={AdminQCLeads}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Leads"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="Lead Details"
        component={AdminQCSalesPersonTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Lead Details"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
function EmployeeAttendancesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Employees Attendances"
        component={EmployeeAttendancesTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Employees Attendances"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="EmployeeLeaveApplicationDetails"
        component={EmployeeLeaveApplicationDetails}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.state?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
function AttendancesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Attendances"
        component={AttendancesTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Attendances"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="LeaveApplicationForm"
        component={LeaveApplicationForm}
        options={({navigation}) => ({
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
        })}
      />
      <Stack.Screen
        name="LeaveApplicationDetails"
        component={LeaveApplicationDetails}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.state?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
function MyAccountsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={({navigation}) => ({
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
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({navigation}) => ({
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
        })}
      />
    </Stack.Navigator>
  );
}
function NotificationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={({navigation}) => ({
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
        })}
      />
    </Stack.Navigator>
  );
}
function ProductionHeadDashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PackagingHeadDashboard"
        component={PackagingHeadDashboard}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Dashboard"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={true}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
function ProductionScanQrCodeForUnAssignedJobStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductionScanQrCodeForUnAssignedJob"
        component={ProductionScanQrCodeForUnAssignedJob}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Scan Qr Code"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
function ProductionUnAssignedJobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductionUnAssignedJobs"
        component={productionUnAssignedJobs}
        options={({navigation}) => ({
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
                style={{ color: '#333' }}
              /> */}
            </TouchableOpacity>
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ProductionUnAssignedJobDetails"
        component={ProductionUnAssignedJobDetails}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Job Details"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ProductionHeadOrderView"
        component={ProductionHeadOrderView}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Order"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
function ProductionOngoingJobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductionOngoingJobs"
        component={productionOngoingJobs}
        options={({navigation}) => ({
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
        })}
      />
      <Stack.Screen
        name="ProductionOngoingJobDetails"
        component={ProductionOngoingJobDetails}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Job Details"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ProductionHeadOrderViewForOngoingJob"
        component={ProductionHeadOrderView}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Order"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ProductionScanQrCodeForOngoingJob"
        component={ProductionScanQrCodeForOngoingJob}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Scan Qr Code"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
export const ProductionEmployeesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductionEmployees"
        component={ProductionEmployees}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Employees"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ProductionEmployeeDetails"
        component={ProductionEmployeeTabStack}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ProductionEmployeeAssignedJob"
        component={ProductionEmployeeAssignedJob}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ProductionHeadOrderViewForEmployee"
        component={ProductionHeadOrderView}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Order"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};

function ReceptionDashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReceptionDashboard"
        component={ReceptionDashboard}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Dashboard"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={true}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="QrCodeScannerDemo"
        component={QrCodeScannerDemo}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Qr Code Scanner"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

export const BrandsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Brands"
        component={Brands}
        options={({navigation}) => ({
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
        })}
      />
      <Stack.Screen
        name="BrandProducts"
        component={BrandProducts}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="BrandProductDetails"
        component={BrandProductDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};

function ReceptionCustomersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReceptionCustomers"
        component={ReceptionCustomers}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Customers"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionCustomerDetails"
        component={ReceptionCustomerDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionCustomerForm"
        component={ReceptionCustomerForm}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerRight: () => (
            <HeaderSaveButton
              buttonType="solid"
              onPress={navigation?.route?.params?.handleSave}
              title="Save"
              buttonColor={primaryBlueHexColor}
              bgColor={primaryBlueHexColor}
              color="#ffffff"
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function ReceptionCollectionCallsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReceptionCollectionCalls"
        component={ReceptionCollectionCalls}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Pickup Request"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionCollectionCallDetails"
        component={ReceptionCollectionCallDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionCollectionCallForm"
        component={ReceptionCollectionCallForm}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerRight: () => (
            <HeaderSaveButton
              buttonType="solid"
              onPress={() => navigation?.route?.params?.handleSave()}
              title="Save"
              buttonColor={primaryBlueHexColor}
              bgColor={primaryBlueHexColor}
              color="#ffffff"
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

export const ReceptionDeliveryCallsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReceptionDeliveryCalls"
        component={ReceptionDeliveryCalls}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Delivery Calls"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionDeliveryCallDetails"
        component={ReceptionDeliveryCallDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionDeliveryCallForm"
        component={ReceptionDeliveryCallForm}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerRight: () => (
            <HeaderSaveButton
              buttonType="solid"
              onPress={navigation?.route?.params?.handleSave}
              title="Save"
              buttonColor={primaryBlueHexColor}
              bgColor={primaryBlueHexColor}
              color="#ffffff"
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};

function ReceptionComplaintsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReceptionComplaints"
        component={ReceptionComplaints}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Complaints"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionComplaintDetails"
        component={ReceptionComplaintDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionComplaintForm"
        component={ReceptionComplaintForm}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerRight: () => (
            <HeaderSaveButton
              buttonType="solid"
              onPress={() => navigation?.route.params?.handleSave()}
              title="Save"
              buttonColor={primaryBlueHexColor}
              bgColor={primaryBlueHexColor}
              color="#ffffff"
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
export const ReceptionViewOrderDetailsTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="ReceptionViewOrder"
      // activeColor={colors.tabActiveColor}
      // inactiveColor={colors.tabInactiveColor}
      // barStyle={{ backgroundColor: colors.tabBarBgColor }}
    >
      <Tab.Screen
        name="ReceptionViewOrder"
        component={ReceptionViewOrder}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({color}) => (
            <View>
              <Icon style={{color}} name="wpforms" size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ReceptionViewOrderDetails"
        component={ReceptionViewOrderDetails}
        options={{
          tabBarLabel: 'Job Details',
          tabBarIcon: ({color}) => (
            <View>
              <Icon style={{color}} name="cubes" size={20} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function ReceptionOrdersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReceptionOrders"
        component={ReceptionOrders}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Orders"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionOrderForm"
        component={ReceptionOrderForm}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerRight: () => (
            <HeaderSaveButton
              buttonType="solid"
              onPress={() => navigation?.route?.params?.handleSave()}
              title="Save"
              buttonColor={primaryBlueHexColor}
              bgColor={primaryBlueHexColor}
              color="#ffffff"
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionCustomerDetails"
        component={ReceptionCustomerDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionViewOrder"
        component={ReceptionViewOrderDetailsTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Order"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionViewJob"
        component={ReceptionViewJob}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Job Details"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function ReceptionViewCompletedOrderDetailsTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="ReceptionViewCompletedOrder"
      // activeColor={tabColors.activeColor}
      // inactiveColor={tabColors.inactiveColor}
      // barStyle={{ backgroundColor: tabColors.barBgColor }}
    >
      <Tab.Screen
        name="ReceptionViewCompletedOrder"
        component={ReceptionViewCompletedOrder}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({color}: any) => (
            <View>
              <Icon name="wpforms" size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ReceptionViewCompletedOrderDetails"
        component={ReceptionViewCompletedOrderDetails}
        options={{
          tabBarLabel: 'Job Details',
          tabBarIcon: ({color}: any) => (
            <View>
              <Icon name="cubes" size={20} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function ReceptionCompletedOrdersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReceptionCompletedOrders"
        component={ReceptionCompletedOrders}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Completed Orders"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionCustomerDetails"
        component={ReceptionCustomerDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionViewCompletedOrder"
        component={ReceptionViewCompletedOrderDetailsTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Order"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionViewCompletedJob"
        component={ReceptionViewCompletedJob}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Job Details"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
function ReceptionCompletedJobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReceptionCompletedJobs"
        component={ReceptionCompletedJobs}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Completed Jobs"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionCompletedJob"
        component={ReceptionCompletedJob}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Job Details"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionViewOrderForCompletedJob"
        component={ReceptionViewCompletedOrderDetailsTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Order"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ReceptionCustomerDetails"
        component={ReceptionCustomerDetails}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.state?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function ReceptionRejectedJobsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'blue', // set your desired header background color
        },
        headerTintColor: '#fff', // set your desired text color
      }}>
      <Stack.Screen
        name="ReceptionRejectedJobs"
        component={ReceptionRejectedJobs}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Rejected Jobs"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ReceptionRejectedJob"
        component={ReceptionRejectedJob}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Job Details"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ReceptionViewOrderForRejectedJob"
        component={ReceptionViewCompletedOrderDetailsTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Order"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ReceptionCustomerDetails"
        component={ReceptionCustomerDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
function SalesDashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SalesDashboard"
        component={SalesDashboard}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Dashboard"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={true}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function SalesCustomersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SalesCustomers"
        component={SalesCustomers}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Customers"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SalesCustomerDetails"
        component={SalesCustomerDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SalesCustomerForm"
        component={SalesCustomerForm}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerRight: () => (
            <HeaderSaveButton
              buttonType="solid"
              onPress={navigation?.route?.params?.handleSave}
              title="Save"
              buttonColor={primaryBlueHexColor}
              bgColor={primaryBlueHexColor}
              color="#ffffff"
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function CollectionCallsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CollectionCalls"
        component={CollectionCalls}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Pickup Request"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="CollectionCallDetails"
        component={CollectionCallDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="CollectionCallForm"
        component={CollectionCallForm}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerRight: () => (
            <HeaderSaveButton
              buttonType="solid"
              onPress={navigation?.route?.params?.handleSave}
              title="Save"
              buttonColor={primaryBlueHexColor}
              bgColor={primaryBlueHexColor}
              color="#ffffff"
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function DeliveryCallsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DeliveryCalls"
        component={DeliveryCalls}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Delivery Calls"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="DeliveryCallDetails"
        component={DeliveryCallDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="DeliveryCallForm"
        component={DeliveryCallForm}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerRight: () => (
            <HeaderSaveButton
              buttonType="solid"
              onPress={navigation?.route?.params?.handleSave}
              title="Save"
              buttonColor="#007bff"
              bgColor="#007bff"
              color="#ffffff"
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function ComplaintsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Complaints"
        component={Complaints}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Complaints"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ComplaintDetails"
        component={ComplaintDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="ComplaintForm"
        component={ComplaintForm}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerRight: () => (
            <HeaderSaveButton
              buttonType="solid"
              onPress={() => navigation?.route?.params?.handleSave()}
              title="Save"
              buttonColor={primaryBlueHexColor}
              bgColor={primaryBlueHexColor}
              color="#ffffff"
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
function SalesLeadDetailsStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LeadDetails" component={LeadDetails} />
    </Tab.Navigator>
  );
}

function SalesLeadInteractionsStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LeadInteractions" component={LeadInteractions} />
    </Tab.Navigator>
  );
}

function SalesLeadMessagesStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LeadMessages" component={LeadMessages} />
    </Tab.Navigator>
  );
}
function LeadDetailsTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="LeadDetails"
      shifting={true}
      // activeColor={tabColors.activeColor}
      // inactiveColor={tabColors.inactiveColor}
      // barStyle={{ backgroundColor: tabColors.barBgColor }}
    >
      <Tab.Screen
        name="LeadDetails"
        component={SalesLeadDetailsStack}
        options={{
          tabBarLabel: 'Lead Details',
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="wpforms" color={color} size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="LeadInteractions"
        component={SalesLeadInteractionsStack}
        options={{
          tabBarLabel: 'Interactions',
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="id-badge" color={color} size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="LeadMessages"
        component={SalesLeadMessagesStack}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="comments" color={color} size={20} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function SalesLeadsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Leads"
        component={Leads}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Leads"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="LeadDetails"
        component={LeadDetailsTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Lead Details"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="LeadForm"
        component={LeadForm}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerRight: () => (
            <HeaderSaveButton
              buttonType="solid"
              onPress={() => navigation?.route?.params?.handleSave()}
              title="Save"
              buttonColor={primaryBlueHexColor}
              bgColor={primaryBlueHexColor}
              color="#ffffff"
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function SalesExpensesStack() {
  return (
    <Stack.Navigator initialRouteName="SalesExpenses">
      <Stack.Screen
        name="SalesExpenses"
        component={SalesExpenses}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Expenses"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SalesExpenseDetails"
        component={SalesExpenseDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SalesExpenseForm"
        component={SalesExpenseForm}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerRight: () => (
            <HeaderSaveButton
              buttonType="solid"
              onPress={() => navigation?.route?.params?.handleSave()}
              title="Save"
              buttonColor={primaryBlueHexColor}
              bgColor={primaryBlueHexColor}
              color="#ffffff"
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function SalesHeadDashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SalesHeadDashboard"
        component={SalesHeadDashboard}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Dashboard"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={true}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}
export const SalesHeadSalesPersonDetailsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SalesHeadSalesPersonDetails"
        component={SalesHeadSalesPersonDetails}
      />
    </Stack.Navigator>
  );
};

export const SalesHeadSalesPersonTrackingHistoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SalesHeadSalesPersonTrackingHistory"
        component={SalesHeadSalesPersonTrackingHistory}
      />
    </Stack.Navigator>
  );
};
function SalesHeadSalesPersonsTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="SalesHeadSalesPersonDetails"
      // activeColor={tabColors.activeColor}
      // inactiveColor={tabColors.inactiveColor}
      // barStyle={{backgroundColor: tabColors.barBgColor}}
    >
      <Tab.Screen
        name="SalesHeadSalesPersonDetails"
        component={SalesHeadSalesPersonDetailsStack}
        options={{
          tabBarLabel: 'Personal Details',
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="wpforms" size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SalesHeadSalesPersonTrackingHistory"
        component={SalesHeadSalesPersonTrackingHistoryStack}
        options={{
          tabBarLabel: 'Location Tracking',
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="history" size={20} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const SalesHeadSalesPersonsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SalesHeadSalesPersons"
        component={SalesHeadSalesPersons}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Sales Persons"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SalesHeadSalesPersonDetails"
        component={SalesHeadSalesPersonsTabStack}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SalesHeadSalesPersonForm"
        component={SalesHeadSalesPersonForm}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerRight: () => (
            <HeaderSaveButton
              buttonType="solid"
              onPress={() => navigation?.route?.params?.handleSave?.()}
              title="Save"
              buttonColor={primaryBlueHexColor}
              bgColor={primaryBlueHexColor}
              color="#ffffff"
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};

function SupervisorDashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SupervisorDashboard"
        component={SupervisorDashboard}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Dashboard"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={true}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function SupervisorScanQrCodeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SupervisorScanQrCode"
        component={SupervisorScanQrCodeOrSearchUsingJobId}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Scan Qr Code"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

export const SupervisorViewOrderDetailsTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="SupervisorViewOrder"
      // activeColor={tabColors.activeColor}
      // inactiveColor={tabColors.inactiveColor}
      // barStyle={{ backgroundColor: tabColors.barBgColor }}
    >
      <Tab.Screen
        name="SupervisorViewOrder"
        component={SupervisorViewOrder}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({color}) => (
            <View>
              <Icon style={{color}} name="wpforms" size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SupervisorViewOrderDetails"
        component={SupervisorViewOrderDetails}
        options={{
          tabBarLabel: 'Job Details',
          tabBarIcon: ({color}) => (
            <View>
              <Icon style={{color}} name="cubes" size={20} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function SupervisorJobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SupervisorJobs"
        component={SupervisorJobs}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Jobs"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SupervisorViewJob"
        component={SupervisorViewJob}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Job Details"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SupervisorViewOrderForJob"
        component={SupervisorViewOrderDetailsTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Order"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SupervisorCustomerDetailsForJob"
        component={SupervisorCustomerDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function SupervisorReworksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SupervisorReworks"
        component={SupervisorReworks}
        options={({navigation}) => {
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
        }}
      />
      <Stack.Screen
        name="SupervisorViewJobForRework"
        component={SupervisorRework}
        options={({navigation}) => {
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
        }}
      />
      <Stack.Screen
        name="SupervisorViewOrderForRework"
        component={SupervisorViewOrderDetailsTabStack}
        options={({navigation}) => {
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
        }}
      />
      <Stack.Screen
        name="SupervisorCustomerDetailsForRework"
        component={SupervisorCustomerDetails}
        options={({navigation, route}) => {
          return {
            headerTitle: () => (
              <NavigationDrawerStructure
                navigation={navigation}
                title={navigation?.route?.params?.pageHeading}
                isShowDrawerToggleButton={false}
                isShowLogoInsteadOfTitle={false}
              />
            ),
            headerStyle: headerStyle,
          };
        }}
      />
    </Stack.Navigator>
  );
}

function SupervisorReopensStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SupervisorReopens"
        component={SupervisorReopens}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Reopened Jobs"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SupervisorViewJobForReopen"
        component={SupervisorReopen}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Job Details"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SupervisorViewOrderForReopen"
        component={SupervisorViewOrderDetailsTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Order"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SupervisorCustomerDetailsForReopen"
        component={SupervisorCustomerDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

export const SupervisorViewOngoingJobTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="SupervisorViewOngoingJob"
      // activeColor={tabColors.activeColor}
      // inactiveColor={tabColors.inactiveColor}
      // barStyle={{backgroundColor: tabColors.barBgColor}}
    >
      <Tab.Screen
        name="SupervisorViewOngoingJob"
        component={SupervisorViewOngoingJob}
        options={{
          tabBarLabel: 'Job Details',
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="wpforms" size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SupervisorOngoingJobProgress"
        component={SupervisorOngoingJobProgress}
        options={{
          tabBarLabel: 'Production Progress',
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="tasks" size={20} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function SupervisorOngoingJobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SupervisorOngoingJobs"
        component={SupervisorOngoingJobs}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Ongoing Jobs"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SupervisorViewOngoingJob"
        component={SupervisorViewOngoingJobTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Job Details"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SupervisorViewOrderForOngoingJob"
        component={SupervisorViewOrderDetailsTabStack}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Order"
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="SupervisorCustomerDetailsForOngoingJob"
        component={SupervisorCustomerDetails}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function CustomerDashboardStack() {
  return <Stack.Navigator></Stack.Navigator>;
}

function CustomerCollectionCallsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerCollectionCalls"
        component={CustomerCollectionCalls}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Pickup Request"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
      <Stack.Screen
        name="CustomerCollectionCallForm"
        component={CustomerCollectionCallForm}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerRight: () => (
            <HeaderSaveButton
              buttonType="solid"
              onPress={navigation?.route?.params?.handleSave}
              title="Save"
              buttonColor={primaryBlueHexColor}
              bgColor={primaryBlueHexColor}
              color="#ffffff"
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function CustomerViewOrderDetailsTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="CustomerViewOrder"
      // activeColor={tabColors.activeColor}
      // inactiveColor={tabColors.inactiveColor}
      // barStyle={{ backgroundColor: tabColors.barBgColor }}
    >
      <Tab.Screen
        name="CustomerViewOrder"
        component={CustomerViewOrder}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({color}) => (
            <View>
              <Icon style={[{color}]} name="wpforms" size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CustomerOrderUploadImages"
        component={CustomerOrderUploadImages}
        options={{
          tabBarLabel: 'Upload Case Photos',
          tabBarIcon: ({color}) => (
            <View>
              <Icon style={[{color}]} name="picture-o" size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CustomerViewOrderDetails"
        component={CustomerViewOrderDetails}
        options={{
          tabBarLabel: 'Job Details',
          tabBarIcon: ({color}) => (
            <View>
              <Icon style={[{color}]} name="cubes" size={20} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function CustomerOrdersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerOrders"
        component={CustomerOrders}
        options={({navigation}) => {
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
        }}
      />
      <Stack.Screen
        name="CustomerViewOrder"
        component={CustomerViewOrderDetailsTabStack}
        options={({navigation}) => {
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
        }}
      />
      <Stack.Screen
        name="CustomerViewJob"
        component={CustomerViewJob}
        options={({navigation}) => {
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
        }}
      />
    </Stack.Navigator>
  );
}

function CustomerComplaintsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerComplaints"
        component={CustomerComplaints}
        options={({navigation}) => {
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
        }}
      />
      <Stack.Screen
        name="CustomerComplaintForm"
        component={CustomerComplaintForm}
        options={({navigation}) => {
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
        }}
      />
    </Stack.Navigator>
  );
}

function CustomerMyAccountsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerMyAccounts"
        component={CustomerMyAccounts}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="My Accounts"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle,
        })}
      />
      <Stack.Screen
        name="CustomerViewProfile"
        component={CustomerViewProfile}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title={navigation?.route?.params?.pageHeading}
              isShowDrawerToggleButton={false}
              isShowLogoInsteadOfTitle={false}
            />
          ),
          headerStyle,
        })}
      />
      <Stack.Screen
        name="CustomerChangePassword"
        component={CustomerChangePassword}
        options={({navigation, route}) => ({
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
              onPress={navigation?.route?.params?.handleSave}
              title="Save"
              buttonColor={primaryBlueHexColor}
              bgColor={primaryBlueHexColor}
              color="#ffffff"
            />
          ),
          headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function PackagingDashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PackagingDashboard"
        component={PackagingDashboard}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              title="Dashboard"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={true}
            />
          ),
          headerStyle: headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function AdminQCUserRoutes({initialRouteName}: any) {
  return (
    <Drawer.Navigator
    // drawerContent={CustomDrawerContentComponent}
    // initialRouteName={initialRouteName}
    >
      <Drawer.Screen
        name="AdminQCDashboard"
        component={AdminQCDashboardStack}
        options={{
          title: 'Dashboard',
          drawerIcon: ({focused, color, size}) => (
            <Icon
              name="circle"
              style={{
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              }}
              size={drawerIconSize}
            />
          ),
          drawerLabel: ({focused, color}) => (
            <View style={[styles.commonDrawerLabelContainer]}>
              <Text style={[styles.commonDrawerLabel, {color}]}>{'Home'}</Text>
            </View>
          ),
          ...contentOptions,
        }}
      />
      <Drawer.Screen
        name="AdminQCScanQrCodeForAssignedJob"
        component={ProductionScanQrCodeForAssignedJobStack}
        options={{
          title: 'Scan Qr Code',
          drawerIcon: ({focused, color, size}) => (
            <Icon
              name="circle"
              style={{
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              }}
              size={drawerIconSize}
            />
          ),
          drawerLabel: ({focused, color}) => (
            <View style={[styles.commonDrawerLabelContainer]}>
              <Text style={[styles.commonDrawerLabel, {color}]}>
                {'Scan Qr Code'}
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="AdminQCAssignedJobs"
        component={ProductionAssignedJobsStack}
        options={{
          title: 'Assigned Jobs',
          drawerIcon: ({focused, color, size}) => (
            <Icon
              name="circle"
              style={{
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              }}
              size={drawerIconSize}
            />
          ),
          drawerLabel: ({focused, color}) => (
            <View style={[styles.commonDrawerLabelContainer]}>
              <Text style={[styles.commonDrawerLabel, {color}]}>
                {'Assigned Jobs'}
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="AdminQCOrders"
        component={AdminQCOrdersStack}
        options={{
          title: 'Orders',
          drawerIcon: ({focused, color, size}) => (
            <Icon
              name="circle"
              style={{
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              }}
              size={drawerIconSize}
            />
          ),
          drawerLabel: ({focused, color}) => (
            <View style={[styles.commonDrawerLabelContainer]}>
              <Text style={[styles.commonDrawerLabel, {color}]}>
                {'Orders'}
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="AdminQCSalesPersons"
        component={AdminQCSalesPersonsStack}
        options={{
          title: 'Sales Persons',
          drawerIcon: ({focused, color, size}) => (
            <Icon
              name="circle"
              style={{
                color: focused
                  ? activeDrawerIconColor
                  : inactiveDrawerIconColor,
              }}
              size={drawerIconSize}
            />
          ),
          drawerLabel: ({focused, color}) => (
            <View style={[styles.commonDrawerLabelContainer]}>
              <Text style={[styles.commonDrawerLabel, {color}]}>
                {'Sales Persons'}
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="AdminQCLeads"
        component={AdminQCLeadsStack}
        options={{
          title: 'Leads',
          drawerIcon: ({focused, color, size}) => (
            <Icon
              name="circle"
              size={size}
              color={focused ? activeDrawerIconColor : inactiveDrawerIconColor}
            />
          ),
          drawerLabel: ({focused, color}) => (
            <View style={[styles.commonDrawerLabelContainer]}>
              <Text
                style={[
                  styles.commonDrawerLabel,
                  {
                    color: focused
                      ? activeDrawerIconColor
                      : inactiveDrawerIconColor,
                  },
                ]}>
                Leads
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="EmployeeAttendances"
        component={EmployeeAttendancesStack}
        options={{
          title: 'Employees Attendances',
          drawerIcon: ({focused, color, size}) => (
            <Icon
              name="circle"
              size={size}
              color={focused ? activeDrawerIconColor : inactiveDrawerIconColor}
            />
          ),
          drawerLabel: ({focused, color}) => (
            <View style={[styles.commonDrawerLabelContainer]}>
              <Text
                style={[
                  styles.commonDrawerLabel,
                  {
                    color: focused
                      ? activeDrawerIconColor
                      : inactiveDrawerIconColor,
                  },
                ]}>
                Employee Attendances
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Attendances"
        component={AttendancesStack}
        options={{
          title: 'Attendances',
          drawerIcon: ({focused, color, size}) => (
            <Icon
              name="circle"
              size={size}
              color={focused ? activeDrawerIconColor : inactiveDrawerIconColor}
            />
          ),
          drawerLabel: ({focused, color}) => (
            <View style={[styles.commonDrawerLabelContainer]}>
              <Text
                style={[
                  styles.commonDrawerLabel,
                  {
                    color: focused
                      ? activeDrawerIconColor
                      : inactiveDrawerIconColor,
                  },
                ]}>
                Attendances
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="MyAccounts"
        component={MyAccountsStack}
        options={{
          title: 'My Accounts',
          drawerIcon: ({focused, color, size}) => (
            <Icon
              name="circle"
              size={drawerIconSize}
              color={focused ? activeDrawerIconColor : inactiveDrawerIconColor}
            />
          ),
          drawerLabel: ({focused, color}) => (
            <View style={[styles.commonDrawerLabelContainer]}>
              <Text
                style={[
                  styles.commonDrawerLabel,
                  {
                    color: focused
                      ? activeDrawerIconColor
                      : inactiveDrawerIconColor,
                  },
                ]}>
                My Accounts
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, color, size}) => (
            <Icon
              name="circle"
              size={drawerIconSize}
              color={focused ? activeDrawerIconColor : inactiveDrawerIconColor}
            />
          ),
          drawerLabel: ({focused, color}) => (
            <View style={[styles.drawerLabelContainer]}>
              <Text
                style={[
                  styles.drawerLabel,
                  {
                    color: focused
                      ? activeDrawerIconColor
                      : inactiveDrawerIconColor,
                  },
                ]}>
                Notifications
              </Text>
              <View style={[styles.drawerLabelBadgeContainer]}>
                <DrawerNotificationBadge
                  isMenuFocused={focused}
                  menuFontColor={color}
                />
              </View>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
function AdminQCHeadUserRoutes({initialRouteName}: any) {
  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName}
      // drawerContent={props => <CustomDrawerContentComponent {...props} />}
      // drawerContentOptions={{
      //   activeTintColor: activeDrawerIconColor,
      //   inactiveTintColor: inactiveDrawerIconColor,
      //   labelStyle: styles.drawerLabel,
      // }}
    >
      <Drawer.Screen
        name="MyAccounts"
        component={MyAccountsStack}
        options={{
          title: 'My Accounts',
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          title: 'Notifications',
          drawerLabel: ({focused, color}) => (
            <View style={[styles.drawerLabelContainer]}>
              <Text
                style={[
                  styles.drawerLabel,
                  {
                    color: focused
                      ? activeDrawerIconColor
                      : inactiveDrawerIconColor,
                  },
                ]}>
                Notifications
              </Text>
              <View style={[styles.drawerLabelBadgeContainer]}>
                <DrawerNotificationBadge
                  isMenuFocused={focused}
                  menuFontColor={color}
                />
              </View>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function PackagingUserRoutes({initialRouteName}: any) {
  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName}
      // drawerContent={props => <CustomDrawerContentComponent {...props} />}
      // drawerContentOptions={{
      //   activeTintColor: activeDrawerIconColor,
      //   inactiveTintColor: inactiveDrawerIconColor,
      //   labelStyle: styles.drawerLabel,
      // }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={PackagingDashboardStack}
        options={{
          title: 'Dashboard',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Scan Qr Code"
        component={ProductionScanQrCodeForUnAssignedJobStack}
        options={{
          title: 'Scan Qr Code',
          // drawerIcon:({tintColor}: any)=> <MaterialCommunityIcons name="qrcode-scan" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Scan Qr Code
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Assigned Jobs"
        component={ProductionAssignedJobsStack}
        options={{
          title: 'Assigned Jobs',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Assigned Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Unassigned Jobs"
        component={ProductionUnAssignedJobsStack}
        options={{
          title: 'Unassigned Jobs',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Unassigned Jobs
              </Text>
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Attendances"
        component={AttendancesStack}
        options={{
          title: 'Attendances',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Attendances
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="My Accounts"
        component={MyAccountsStack}
        options={{
          title: 'My Accounts',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                My Accounts
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Notifications
              </Text>
              <View style={[styles.drawerLabelBadgeContainer]}>
                <DrawerNotificationBadge
                  isMenuFocused={drawerLabelOptions.focused}
                  // menuFontColor={drawerLabelOptions.tintColor}
                />
              </View>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
function PackagingHeadUserRoutes({initialRouteName}: any) {
  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName}
      // drawerContent={props => <CustomDrawerContentComponent {...props} />}
      // drawerContentOptions={{
      //   activeTintColor: activeDrawerIconColor,
      //   inactiveTintColor: inactiveDrawerIconColor,
      //   labelStyle: styles.drawerLabel,
      // }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={ProductionHeadDashboardStack}
        options={{
          title: 'Dashboard',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Scan Qr Code"
        component={ProductionScanQrCodeForUnAssignedJobStack}
        options={{
          title: 'Scan Qr Code',
          // drawerIcon:({tintColor}: any)=> <MaterialCommunityIcons name="qrcode-scan" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Scan Qr Code
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Unassigned Jobs"
        component={ProductionUnAssignedJobsStack}
        options={{
          title: 'Unassigned Jobs',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Unassigned Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Ongoing Jobs"
        component={ProductionOngoingJobsStack}
        options={{
          title: 'Ongoing Jobs',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Ongoing Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Employees"
        component={ProductionEmployeesStack}
        options={{
          title: 'Employees',
          // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Employees
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Employees Attendance"
        component={EmployeeAttendancesStack}
        options={{
          title: 'Employees Attendances',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Employees Attendances
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Attendances"
        component={AttendancesStack}
        options={{
          title: 'Attendances',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Attendances
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="My Accounts"
        component={MyAccountsStack}
        options={{
          title: 'My Accounts',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                My Accounts
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Notifications
              </Text>
              <View style={[styles.drawerLabelBadgeContainer]}>
                <DrawerNotificationBadge
                  isMenuFocused={drawerLabelOptions.focused}
                  // menuFontColor={drawerLabelOptions.tintColor}
                />
              </View>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function ProductionUserRoutes({initialRouteName}: any) {
  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName}
      // drawerContent={props => <CustomDrawerContentComponent {...props} />}
      // drawerContentOptions={{
      //   activeTintColor: activeDrawerIconColor,
      //   inactiveTintColor: inactiveDrawerIconColor,
      //   labelStyle: styles.drawerLabel,
      // }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={ProductionDashboardStack}
        options={{
          title: 'Dashboard',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Scan Qr Code"
        component={ProductionScanQrCodeForAssignedJobStack}
        options={{
          title: 'Scan Qr Code',
          // drawerIcon:({tintColor}: any)=> <MaterialCommunityIcons name="qrcode-scan" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Scan Qr Code
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Assigned Jobs"
        component={ProductionAssignedJobsStack}
        options={{
          title: 'Assigned Jobs',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Assigned Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Attendances"
        component={AttendancesStack}
        options={{
          title: 'Attendances',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Attendances
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="My Accounts"
        component={MyAccountsStack}
        options={{
          title: 'My Accounts',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                My Accounts
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Notifications
              </Text>
              <View style={[styles.drawerLabelBadgeContainer]}>
                <DrawerNotificationBadge
                  isMenuFocused={drawerLabelOptions.focused}
                  // menuFontColor={drawerLabelOptions.tintColor}
                />
              </View>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
function ProductionHeadUserRoutes({initialRouteName}: any) {
  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName}
      // drawerContent={props => <CustomDrawerContentComponent {...props} />}
      // drawerContentOptions={{
      //   activeTintColor: activeDrawerIconColor,
      //   inactiveTintColor: inactiveDrawerIconColor,
      //   labelStyle: styles.drawerLabel,
      // }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={ProductionHeadDashboardStack}
        options={{
          title: 'Dashboard',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Scan Qr Code"
        component={ProductionScanQrCodeForUnAssignedJobStack}
        options={{
          title: 'Scan Qr Code',
          // drawerIcon:({tintColor}: any)=> <MaterialCommunityIcons name="qrcode-scan" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Scan Qr Code
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Unassigned Jobs"
        component={ProductionUnAssignedJobsStack}
        options={{
          title: 'Unassigned Jobs',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Unassigned Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Ongoing Jobs"
        component={ProductionOngoingJobsStack}
        options={{
          title: 'Ongoing Jobs',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Ongoing Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Employees"
        component={ProductionEmployeesStack}
        options={{
          title: 'Employees',
          // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Employees
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Employees Attendances"
        component={EmployeeAttendancesStack}
        options={{
          title: 'Employees Attendances',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Employees Attendances
              </Text>
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Attendances"
        component={AttendancesStack}
        options={{
          title: 'Attendances',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Attendances
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="My Accounts"
        component={MyAccountsStack}
        options={{
          title: 'My Accounts',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                My Accounts
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Notifications
              </Text>
              <View style={[styles.drawerLabelBadgeContainer]}>
                <DrawerNotificationBadge
                  isMenuFocused={drawerLabelOptions.focused}
                  // menuFontColor={drawerLabelOptions.tintColor}
                />
              </View>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function ReceptionUserRoutes({initialRouteName}: any) {
  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName}
      // drawerContent={props => <CustomDrawerContentComponent {...props} />}
      // drawerContentOptions={{
      //   activeTintColor: activeDrawerIconColor,
      //   inactiveTintColor: inactiveDrawerIconColor,
      //   labelStyle: styles.drawerLabel,
      // }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={ReceptionDashboardStack}
        options={{
          title: 'Dashboard',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Products"
        component={CategoriesStack}
        options={{
          title: 'Products',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Products
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Brands"
        component={BrandsStack}
        options={{
          title: 'Brands',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Brands
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Customers"
        component={ReceptionCustomersStack}
        options={{
          title: 'Customers',
          // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Customers
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Pickup Request"
        component={ReceptionCollectionCallsStack}
        options={{
          title: 'Pickup Request',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="add-shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Pickup Request
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Delivery Calls"
        component={ReceptionDeliveryCallsStack}
        options={{
          title: 'Delivery Calls',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Delivery Calls
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Complaints"
        component={ReceptionComplaintsStack}
        options={{
          title: 'Complaints',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="remove-shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Complaints
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={ReceptionOrdersStack}
        options={{
          title: 'Orders',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Orders
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Completed Orders"
        component={ReceptionCompletedOrdersStack}
        options={{
          title: 'Completed Orders',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Completed Orders
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Completed Jobs"
        component={ReceptionCompletedJobsStack}
        options={{
          title: 'Completed Jobs',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Completed Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Rejected Jobs"
        component={ReceptionRejectedJobsStack}
        options={{
          title: 'Rejected Jobs',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Rejected Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Attendances"
        component={AttendancesStack}
        options={{
          title: 'Attendances',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Attendances
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="My Accounts"
        component={MyAccountsStack}
        options={{
          title: 'My Accounts',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                My Accounts
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Notifications
              </Text>
              <View style={[styles.drawerLabelBadgeContainer]}>
                <DrawerNotificationBadge
                  isMenuFocused={drawerLabelOptions.focused}
                  // menuFontColor={drawerLabelOptions.tintColor}
                />
              </View>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function SalesUserRoutes({initialRouteName}: any) {
  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName}
      // drawerContent={props => <CustomDrawerContentComponent {...props} />}
      // drawerContentOptions={{
      //   activeTintColor: activeDrawerIconColor,
      //   inactiveTintColor: inactiveDrawerIconColor,
      //   labelStyle: styles.drawerLabel,
      // }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={SalesDashboardStack}
        options={{
          title: 'Dashboard',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Customers"
        component={SalesCustomersStack}
        options={{
          title: 'Customers',
          // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Customers
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Brands"
        component={BrandsStack}
        options={{
          title: 'Brands',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Brands
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Products"
        component={CategoriesStack}
        options={{
          title: 'Products',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Products
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Pickup Request"
        component={CollectionCallsStack}
        options={{
          title: 'Pickup Request',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="add-shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Pickup Request
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Delivery Calls"
        component={DeliveryCallsStack}
        options={{
          title: 'Delivery Calls',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Delivery Calls
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Complaints"
        component={ComplaintsStack}
        options={{
          title: 'Complaints',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="remove-shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Complaints
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Leads"
        component={SalesLeadsStack}
        options={{
          title: 'Leads',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="bullhorn" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Leads
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Expenses"
        component={SalesExpensesStack}
        options={{
          title: 'Expenses',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="money" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Expenses
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Attendances"
        component={AttendancesStack}
        options={{
          title: 'Attendances',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Attendances
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="My Accounts"
        component={MyAccountsStack}
        options={{
          title: 'My Accounts',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                My Accounts
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Notifications
              </Text>
              <View style={[styles.drawerLabelBadgeContainer]}>
                <DrawerNotificationBadge
                  isMenuFocused={drawerLabelOptions.focused}
                  // menuFontColor={drawerLabelOptions.tintColor}
                />
              </View>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function SalesHeadUserRoutes({initialRouteName}: any) {
  return (
    <Drawer.Navigator
      initialRouteName={'Dashboard'}
      // drawerContent={props => <CustomDrawerContentComponent {...props} />}
      // drawerContentOptions={{
      //   activeTintColor: activeDrawerIconColor,
      //   inactiveTintColor: inactiveDrawerIconColor,
      //   labelStyle: styles.drawerLabel,
      // }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={SalesHeadDashboardStack}
        options={{
          title: 'Dashboard',
          headerShown: false,
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Sales Persons"
        component={SalesHeadSalesPersonsStack}
        options={{
          title: 'Sales Persons',
          // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Sales Persons
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Customers"
        component={SalesCustomersStack}
        options={{
          title: 'Customers',
          // drawerIcon:({tintColor}: any)=> <Icon name="users" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Customers
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Brands"
        component={BrandsStack}
        options={{
          title: 'Brands',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Brands
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Products"
        component={CategoriesStack}
        options={{
          title: 'Products',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Products
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Pickup Request"
        component={CollectionCallsStack}
        options={{
          title: 'Pickup Request',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="add-shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Pickup Request
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Delivery Calls"
        component={DeliveryCallsStack}
        options={{
          title: 'Delivery Calls',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Delivery Calls
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Complaints"
        component={ComplaintsStack}
        options={{
          title: 'Complaints',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="remove-shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Complaints
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Leads"
        component={SalesLeadsStack}
        options={{
          title: 'Leads',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="bullhorn" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Leads
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Expenses"
        component={SalesExpensesStack}
        options={{
          title: 'Expenses',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="money" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Expenses
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Employees Attendances"
        component={EmployeeAttendancesStack}
        options={{
          title: 'Employees Attendances',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Employees Attendances
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Attendances"
        component={AttendancesStack}
        options={{
          title: 'Attendances',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Attendances
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="My Accounts"
        component={MyAccountsStack}
        options={{
          title: 'My Accounts',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                My Accounts
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Notifications
              </Text>
              <View style={[styles.drawerLabelBadgeContainer]}>
                <DrawerNotificationBadge
                  isMenuFocused={drawerLabelOptions.focused}
                  // menuFontColor={drawerLabelOptions.tintColor}
                />
              </View>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function SupervisorUserRoutes({initialRouteName}: any) {
  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName}
      // drawerContent={props => <CustomDrawerContentComponent {...props} />}
      // drawerContentOptions={{
      //   activeTintColor: activeDrawerIconColor,
      //   inactiveTintColor: inactiveDrawerIconColor,
      //   labelStyle: styles.drawerLabel,
      // }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={SupervisorDashboardStack}
        options={{
          title: 'Dashboard',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Products"
        component={CategoriesStack}
        options={{
          title: 'Products',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Products
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Brands"
        component={BrandsStack}
        options={{
          title: 'Brands',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Brands
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Scan Qr Code"
        component={SupervisorScanQrCodeStack}
        options={{
          title: 'Scan Qr Code',
          // drawerIcon:({tintColor}: any)=> <MaterialCommunityIcons name="qrcode-scan" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Scan Qr Code
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Jobs"
        component={SupervisorJobsStack}
        options={{
          title: 'Jobs',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Reworks"
        component={SupervisorReworksStack}
        options={{
          title: 'Reworks',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Reworks
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Reopened Jobs"
        component={SupervisorReopensStack}
        options={{
          title: 'Reopened Jobs',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Reopened Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Ongoing Jobs"
        component={SupervisorOngoingJobsStack}
        options={{
          title: 'Ongoing Jobs',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Ongoing Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Attendances"
        component={AttendancesStack}
        options={{
          title: 'Attendances',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="calendar" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Attendances
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="My Accounts"
        component={MyAccountsStack}
        options={{
          title: 'My Accounts',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                My Accounts
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Notifications
              </Text>
              <View style={[styles.drawerLabelBadgeContainer]}>
                <DrawerNotificationBadge
                  isMenuFocused={drawerLabelOptions.focused}
                  // menuFontColor={drawerLabelOptions.tintColor}
                />
              </View>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomerUserRoutes({initialRouteName}: any) {
  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName}
      // drawerContent={props => <CustomDrawerContentComponent {...props} />}
      // drawerContentOptions={{
      //   activeTintColor: activeDrawerIconColor,
      //   inactiveTintColor: inactiveDrawerIconColor,
      //   labelStyle: styles.drawerLabel,
      // }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={CustomerDashboardStack}
        options={{
          title: 'Dashboard',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="tachometer" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Brands"
        component={BrandsStack}
        options={{
          title: 'Brands',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Brands
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Products"
        component={CategoriesStack}
        options={{
          title: 'Products',
          // drawerIcon:({tintColor}: any)=> <Icon name="cubes" size={20} style={[{color: tintColor}]} />
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Products
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Pickup Request"
        component={CustomerCollectionCallsStack}
        options={{
          title: 'Pickup Request',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="add-shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Pickup Request
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="My Orders"
        component={CustomerOrdersStack}
        options={{
          title: 'My Orders',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                My Orders
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="My Complaints"
        component={CustomerComplaintsStack}
        options={{
          title: 'My Complaints',
          // drawerIcon:({tintColor}: any)=> <MaterialIcons style={[{color: tintColor}]} name="remove-shopping-cart" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                My Complaints
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="My Accounts"
        component={CustomerMyAccountsStack}
        options={{
          title: 'My Accounts',
          // drawerIcon:({tintColor}: any)=> <Icon style={[{color: tintColor}]} name="user" size={20}/>
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                My Accounts
              </Text>
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          title: 'Notifications',
          drawerIcon: ({focused, tintColor}: any) => (
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
                  // {color: drawerLabelOptions.tintColor},
                ]}>
                Notifications
              </Text>
              <View style={[styles.drawerLabelBadgeContainer]}>
                <DrawerNotificationBadge
                  isMenuFocused={drawerLabelOptions.focused}
                  // menuFontColor={drawerLabelOptions.tintColor}
                />
              </View>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export function RootNavigator(
  signedIn = false,
  userType = null,
  appUserType = null,
  isDepartmentHead = false,
) {
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
  console.log(
    initialRouteName,
    'initialRouteNameinitialRouteNameinitialRouteNameinitialRouteName',
  );
  // initialRouteName = 'AdminQCHeadUserRoutes';
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="SignedIn" component={SignedInDrawer} />
        <Stack.Screen name="AdminQCUserRoutes" component={AdminQCUserRoutes} />
        <Stack.Screen
          name="AdminQCHeadUserRoutes"
          component={AdminQCHeadUserRoutes}
        />
        <Stack.Screen
          name="PackagingUserRoutes"
          component={PackagingUserRoutes}
        />
        <Stack.Screen
          name="PackagingHeadUserRoutes"
          component={PackagingHeadUserRoutes}
        />
        <Stack.Screen
          name="ProductionUserRoutes"
          component={ProductionUserRoutes}
        />
        <Stack.Screen
          name="ProductionHeadUserRoutes"
          component={ProductionHeadUserRoutes}
        />
        <Stack.Screen
          name="ReceptionUserRoutes"
          component={ReceptionUserRoutes}
        />
        <Stack.Screen name="SalesUserRoutes" component={SalesUserRoutes} />
        <Stack.Screen
          name="SalesHeadUserRoutes"
          component={SalesHeadUserRoutes}
        />
        <Stack.Screen
          name="SupervisorUserRoutes"
          component={SupervisorUserRoutes}
        />
        <Stack.Screen
          name="CustomerUserRoutes"
          component={CustomerUserRoutes}
        />
        <Stack.Screen name="SignedOut" component={SignedOut} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const drawerIconSize = 20;
const activeDrawerIconColor = '#fff';
const inactiveDrawerIconColor = circleBgColor;

const drawerWidth = Dimensions.get('window').width - 110;
const drawerLabelWidth = drawerWidth - 78;

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
