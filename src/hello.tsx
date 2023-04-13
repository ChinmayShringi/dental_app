import React from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
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
import {primaryBlueHexColor} from './constants/themeColors';
import EditProfile from './pages/EditProfile';

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
        <View style={headerStyles.headerMenuicon}>
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

// export const EditProfileStack = createStackNavigator({
//   // EditProfile: {
//   //   screen: EditProfile,
//   //   navigationOptions: ({navigation}) => {
//   //     return {
//   //       headerTitle: () => (
//   //         <NavigationDrawerStructure
//   //           navigation={navigation}
//   //           title="Edit Profile"
//   //           isShowDrawerToggleButton={true}
//   //           isShowLogoInsteadOfTitle={false}
//   //         />
//   //       ),
//   //       headerRight: () => (
//   //         <HeaderSaveButton
//   //           buttonType="solid"
//   //           onPress={() => navigation?.state?.params?.handleSave()}
//   //           title="Save"
//   //           buttonColor={primaryBlueHexColor}
//   //           bgColor={primaryBlueHexColor}
//   //           color="#ffffff"
//   //         />
//   //       ),
//   //       headerStyle: headerStyle,
//   //     };
//   //   },
//   // },
// });

const CategoriesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Products}
        options={({navigation}) => ({
          headerTitle: () => (
            <NavigationDrawerStructure
              navigation={navigation}
              // title="Home"
              isShowDrawerToggleButton={true}
              isShowLogoInsteadOfTitle={true}
            />
          ),
        })}
      />
    </Stack.Navigator>
    // <Stack.Navigator>
    //   {/* <Stack.Screen
    //     name="Categories"
    //     component={Categories}
    //     // options={({navigation}) => ({
    //     //   headerTitle: () => (
    //     //     <NavigationDrawerStructure
    //     //       navigation={navigation}
    //     //       title="Products"
    //     //       isShowDrawerToggleButton={true}
    //     //       isShowLogoInsteadOfTitle={false}
    //     //     />
    //     //   ),
    //     //   headerRight: () => (
    //     //     <HeaderSearchButton
    //     //       onPress={() => navigation?.state?.params?.toggleSearch()}
    //     //     />
    //     //   ),
    //     //   headerStyle: headerStyle,
    //     // })}
    //   /> */}
    //   {/* <Stack.Screen
    //     name="SubCategories"
    //     component={Categories}
    //     // options={({navigation}) => ({
    //     //   headerTitle: () => (
    //     //     <NavigationDrawerStructure
    //     //       navigation={navigation}
    //     //       title={navigation?.state?.params?.pageHeading}
    //     //       isShowDrawerToggleButton={false}
    //     //       isShowLogoInsteadOfTitle={false}
    //     //     />
    //     //   ),
    //     //   headerStyle: headerStyle,
    //     // })}
    //   />
    //   <Stack.Screen
    //     name="Products"
    //     component={Products}
    //     // options={({navigation}) => ({
    //     //   headerTitle: () => (
    //     //     <NavigationDrawerStructure
    //     //       navigation={navigation}
    //     //       title={navigation?.state?.params?.pageHeading}
    //     //       isShowDrawerToggleButton={false}
    //     //       isShowLogoInsteadOfTitle={false}
    //     //     />
    //     //   ),
    //     //   headerStyle: headerStyle,
    //     // })}
    //   /> */}
    //   {/* <Stack.Screen
    //     name="ProductDetails"
    //     component={ProductDetails}
    //     // options={({navigation}) => ({
    //     //   headerTitle: () => (
    //     //     <NavigationDrawerStructure
    //     //       navigation={navigation}
    //     //       title={navigation?.state?.params?.pageHeading}
    //     //       isShowDrawerToggleButton={false}
    //     //       isShowLogoInsteadOfTitle={false}
    //     //     />
    //     //   ),
    //     //   headerStyle: headerStyle,
    //     // })}
    //   /> */}
    // </Stack.Navigator>
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
      {/* Categories: {
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
  }, */}
    </SignedInDrawerStack.Navigator>
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
  return (
    <NavigationContainer>
      <SignedInDrawer initialRouteName={'initialRouteName'} />
    </NavigationContainer>
  );
}
