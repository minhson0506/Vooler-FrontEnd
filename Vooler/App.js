import React, {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import Navigator from './navigators/Navigator';
import {MainProvider} from './contexts/MainContext';
import {Platform, NativeModules} from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';

const iosPedometer = NativeModules.Pedometer;
console.log(iosPedometer);

export default function App() {
  const [state, setState] = useState({events: []});
  useEffect(() => {
    if (Platform.OS === 'ios') {
      const initBackgroundFetch = async () => {
        const onEvent = async (taskId) => {
          // Do background work
          console.log('[BackgroundFetch] task: ', taskId);
          iosPedometer
            .runPedometerBackgroundTasks()
            .then((ret) => console.log(ret))
            .catch((e) => console.log(e.message));
          await addEvent(taskId);
          // signal to the OS that your task is complete.
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
      };
      initBackgroundFetch();
    }
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
