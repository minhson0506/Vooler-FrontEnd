import React, {useContext} from 'react';
import {StatusBar} from 'expo-status-bar';
import Navigator from './navigators/Navigator';
import {MainProvider} from './contexts/MainContext';

import {NativeModules} from 'react-native';
const pedometer = NativeModules.Pedometer;
console.log(pedometer);
pedometer.test((value) => {
  console.log('The count is ' + value);
});
console.log(pedometer.getConstants());

export default function App() {
  return (
    <>
      <MainProvider>
        <Navigator></Navigator>
      </MainProvider>
      <StatusBar style="auto" />
    </>
  );
}
