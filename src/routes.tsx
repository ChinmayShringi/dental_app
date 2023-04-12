import {createStackNavigator} from '@react-navigation/stack';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import Home from './pages/Home';
import Dashboard from './pages/sales/Dashboard';
import Products from './pages/CategoriesAndProducts/Products';
import EditProfile from './pages/EditProfile';

const Stack = createStackNavigator();
export const NavigationDrawerStructure = ({navigation}: any) => {
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return null;
};

export const SignedIn = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
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
        {/* <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Profile" component={Products} /> */}
        <Stack.Screen name="Settings" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const createRootNavigator = (
  signedIn = false,
  userType = null,
  appUserType = null,
  isDepartmentHead = false,
) => {
  console.log('jhdckjfdsfj');
  let initialRouteName = '';
  // if (signedIn && userType !== null && appUserType !== null) {
  //   console.log('1');
  //   // Customer
  //   if (userType === 4 || userType === '4') {
  //     initialRouteName = 'CustomerUserRoutes';
  //   } else {
  //     switch (appUserType) {
  //       // Admin QC User
  //       case 1:
  //       case '1':
  //         initialRouteName = isDepartmentHead
  //           ? 'AdminQCHeadUserRoutes'
  //           : 'AdminQCUserRoutes';
  //         break;
  //       // Packaging User
  //       case 2:
  //       case '2':
  //         initialRouteName = isDepartmentHead
  //           ? 'PackagingHeadUserRoutes'
  //           : 'PackagingUserRoutes';
  //         break;
  //       // Production User
  //       case 3:
  //       case '3':
  //         initialRouteName = isDepartmentHead
  //           ? 'ProductionHeadUserRoutes'
  //           : 'ProductionUserRoutes';
  //         break;
  //       // Reception User
  //       case 4:
  //       case '4':
  //         initialRouteName = isDepartmentHead
  //           ? 'ReceptionUserRoutes'
  //           : 'ReceptionUserRoutes';
  //         break;
  //       // Sales User
  //       case 5:
  //       case '5':
  //         initialRouteName = isDepartmentHead
  //           ? 'SalesHeadUserRoutes'
  //           : 'SalesUserRoutes';
  //         break;
  //       // Supervisor User
  //       case 6:
  //       case '6':
  //         initialRouteName = isDepartmentHead
  //           ? 'SupervisorUserRoutes'
  //           : 'SupervisorUserRoutes';
  //         break;
  //       // Default
  //       default:
  //         initialRouteName = 'SignedOut';
  //         break;
  //     }
  //   }
  // } else {
  //   console.log('2');
  //   initialRouteName = 'SignedOut';
  // }

  const RootNavigator = createSwitchNavigator(
    {
      SignedIn: SignedIn,
      // AdminQCUserRoutes: AdminQCUserRoutes,
      // AdminQCHeadUserRoutes: AdminQCHeadUserRoutes,
      // PackagingUserRoutes: PackagingUserRoutes,
      // PackagingHeadUserRoutes: PackagingHeadUserRoutes,
      // ProductionUserRoutes: ProductionUserRoutes,
      // ProductionHeadUserRoutes: ProductionHeadUserRoutes,
      // ReceptionUserRoutes: ReceptionUserRoutes,
      // SalesUserRoutes: SalesUserRoutes,
      // SalesHeadUserRoutes: SalesHeadUserRoutes,
      // SupervisorUserRoutes: SupervisorUserRoutes,
      // CustomerUserRoutes: CustomerUserRoutes,
      // SignedOut: SignedOut,
    },
    {
      initialRouteName: initialRouteName,
    },
  );

  const AppContainer = createAppContainer(RootNavigator);
  return AppContainer;
};
export default createRootNavigator;
