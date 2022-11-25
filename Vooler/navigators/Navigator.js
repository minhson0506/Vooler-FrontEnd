import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from '../views/Dashboard';
import Settings from '../views/Setting';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colorSet, useStyles} from '../utils/GlobalStyle';
import Register from '../views/Register';
import Login from '../views/Login';
import Step from '../views/Step';
import TeamRank from '../views/TeamRank';
import Badges from '../views/Badges';
import UserRank from '../views/UserRank';
import {MainContext} from '../contexts/MainContext';
import BadgesDetail from '../views/BadgeDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colorSet.primary,
          tabBarLabelStyle: {fontSize: 18, fontFamily: 'Nunito-SemiBold'},
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Home"
          component={Dashboard}
          options={{headerShown: false}}
        ></Tab.Screen>
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        ></Tab.Screen>
      </Tab.Navigator>
    );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Main"
            component={TabScreen}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name="Step"
            component={Step}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name="UserRank"
            component={UserRank}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name="TeamRank"
            component={TeamRank}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name="Badges"
            component={Badges}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name="BadgesDetail"
            component={BadgesDetail}
            options={{headerShown: false}}
          ></Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          ></Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen></StackScreen>
    </NavigationContainer>
  );
};

export default Navigator;
