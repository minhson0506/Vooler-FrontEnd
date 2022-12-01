import React, {useContext, useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import Navigator from './navigators/Navigator';
import {MainProvider} from './contexts/MainContext';

import {NativeModules} from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';

const pedometer = NativeModules.Pedometer;
console.log(pedometer);
// pedometer.backgroundTasks((value) => {
//   console.log('Background task' + value);
// });
const stepTest = () => {
  pedometer
    .getSteps()
    .then((ret) => console.log(ret))
    .catch((e) => console.log(e.message));
};
stepTest();

export default function App() {
  const [state, setState] = useState({events: []});
  const taskId = 'com.vooler.ios-module.task';
  useEffect(() => {
    const initBackgroundFetch = async () => {
      const onEvent = async (taskId) => {
        console.log('[BackgroundFetch] task: ', taskId);
        pedometer.backgroundTasks((value) => {
          console.log('Background task' + value + new Date());
        });
        pedometer.test((value) => {
          console.log('test background, count is: ', value);
        });
        pedometer
          .getSteps()
          .then((ret) => console.log(ret))
          .catch((e) => console.log(e.message));

        // Do your background work...
        await addEvent(taskId);
        // IMPORTANT:  You must signal to the OS that your task is complete.
        BackgroundFetch.finish(taskId);
      };
      // Timeout callback is executed when your Task has exceeded its allowed running-time.
      const onTimeout = async (taskId) => {
        console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
        BackgroundFetch.finish(taskId);
      };

      // Initialize BackgroundFetch only once when component mounts.
      let status = await BackgroundFetch.configure(
        {minimumFetchInterval: 15},
        onEvent,
        onTimeout
      );
      console.log('[BackgroundFetch] configure status: ', status);
      // BackgroundFetch.scheduleTask({
      //   taskId: 'com.vooler.ios-module.task',
      //   delay: 1 * 60 * 1000,
      // });
    };
    initBackgroundFetch();
  }, []);

  const addEvent = (taskId) => {
    return new Promise((resolve, reject) => {
      setState((state) => ({
        events: [
          ...state.events,
          {
            taskId: taskId,
            timestamp: new Date().toString(),
          },
        ],
      }));
      resolve();
    });
  };

  return (
    <>
      <MainProvider>
        <Navigator></Navigator>
      </MainProvider>
      <StatusBar style="auto" />
    </>
  );
}
