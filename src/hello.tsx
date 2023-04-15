import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {headerStyles} from './assets/style';
import Home from './pages/Home';
import Dashboard from './pages/sales/Dashboard';
import Sales from './pages/sales/Sales';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Categories from './pages/CategoriesAndProducts/Categories';
import Products from './pages/CategoriesAndProducts/Products';
import ProductDetails from './pages/CategoriesAndProducts/ProductDetails';
import HeaderSearchButton from './components/HeaderSearchButton';
import HeaderSaveButton from './components/HeaderSaveButton';
import {circleBgColor, fontColor, primaryBlueHexColor, primaryHexColor} from './constants/themeColors';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import LocationTracker from './pages/LocationTracker';
import ShowLocationHistory from './pages/ShowLocationHistory';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import DrawerUserDetails from './components/DrawerUserDetails';
import DrawerLogoutButton from './components/DrawerLogoutButton';
import DrawerNotificationBadge from './components/DrawerNotificationBadge';

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
        options={({ navigation }) => ({
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
          ...contentOptions
        }}
      />
      {/* <Drawer.Screen
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
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name="circle"
              size={size}
              color={focused ? activeDrawerIconColor : inactiveDrawerIconColor}
            />
          ),
          drawerLabel: ({ focused, color }) => (
            <View style={[styles.commonDrawerLabelContainer]}>
              <Text
                style={[
                  styles.commonDrawerLabel,
                  { color: focused ? activeDrawerIconColor : inactiveDrawerIconColor },
                ]}
              >
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
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name="circle"
              size={size}
              color={focused ? activeDrawerIconColor : inactiveDrawerIconColor}
            />
          ),
          drawerLabel: ({ focused, color }) => (
            <View style={[styles.commonDrawerLabelContainer]}>
              <Text
                style={[
                  styles.commonDrawerLabel,
                  { color: focused ? activeDrawerIconColor : inactiveDrawerIconColor },
                ]}
              >
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
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name="circle"
              size={size}
              color={focused ? activeDrawerIconColor : inactiveDrawerIconColor}
            />
          ),
          drawerLabel: ({ focused, color }) => (
            <View style={[styles.commonDrawerLabelContainer]}>
              <Text
                style={[
                  styles.commonDrawerLabel,
                  { color: focused ? activeDrawerIconColor : inactiveDrawerIconColor },
                ]}
              >
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
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name="circle"
              size={drawerIconSize}
              color={focused ? activeDrawerIconColor : inactiveDrawerIconColor}
            />
          ),
          drawerLabel: ({ focused, color }) => (
            <View style={[styles.commonDrawerLabelContainer]}>
              <Text
                style={[
                  styles.commonDrawerLabel,
                  { color: focused ? activeDrawerIconColor : inactiveDrawerIconColor },
                ]}
              >
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
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name="circle"
              size={drawerIconSize}
              color={focused ? activeDrawerIconColor : inactiveDrawerIconColor}
            />
          ),
          drawerLabel: ({ focused, color }) => (
            <View style={[styles.drawerLabelContainer]}>
              <Text
                style={[
                  styles.drawerLabel,
                  { color: focused ? activeDrawerIconColor : inactiveDrawerIconColor },
                ]}
              >
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
      /> */}
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

  // BELOW FOR TESTING 
  initialRouteName='AdminQCUserRoutes'
  console.log(initialRouteName);
  switch (initialRouteName) {
    case 'SignedIn':
      //  SignedIn
      return (
        <NavigationContainer>
          <SignedInDrawer initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
    case 'AdminQCUserRoutes':
      //  AdminQCUserRoutes
      return (
        <NavigationContainer>
          <AdminQCUserRoutes initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
    case 'AdminQCHeadUserRoutes':
      //  AdminQCHeadUserRoutes
      return (
        <NavigationContainer>
          <SignedInDrawer initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
    case 'PackagingUserRoutes':
      //  PackagingUserRoutes
      return (
        <NavigationContainer>
          <SignedInDrawer initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
    case 'PackagingHeadUserRoutes':
      //  PackagingHeadUserRoutes
      return (
        <NavigationContainer>
          <SignedInDrawer initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
    case 'ProductionUserRoutes':
      //  ProductionUserRoutes
      return (
        <NavigationContainer>
          <SignedInDrawer initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
    case 'ProductionHeadUserRoutes':
      //  ProductionHeadUserRoutes
      return (
        <NavigationContainer>
          <SignedInDrawer initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
    case 'ReceptionUserRoutes':
      //  ReceptionUserRoutes
      return (
        <NavigationContainer>
          <SignedInDrawer initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
    case 'SalesUserRoutes':
      //  SalesUserRoutes
      return (
        <NavigationContainer>
          <SignedInDrawer initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
    case 'SalesHeadUserRoutes':
      //  SalesHeadUserRoutes
      return (
        <NavigationContainer>
          <SignedInDrawer initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
    case 'SupervisorUserRoutes':
      //  SupervisorUserRoutes
      return (
        <NavigationContainer>
          <SignedInDrawer initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
    case 'CustomerUserRoutes':
      //  CustomerUserRoutes
      return (
        <NavigationContainer>
          <SignedInDrawer initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
    case 'SignedOut':
      //  SignedOut,
      return (
        <NavigationContainer>
          <SignedOut initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
    default:
      return (
        <NavigationContainer>
          <SignedOut initialRouteName={'initialRouteName'} />
        </NavigationContainer>
      );
  }
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
