import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from '../views/Dashboard';
import Settings from '../views/Setting';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colorSet, useStyles} from '../utils/GlobalStyle';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            justifyContent: 'center',
            alignContent: 'center',
            height: '7%',
            border: 0,
            margin: 0,
            paddingTop: 5,
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings';
            }
            return <Ionicons name={iconName} size={30} color={color} />;
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
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabScreen}
        options={{headerShown: false}}
      ></Stack.Screen>
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
