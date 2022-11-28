package com.vooler.module;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.ContextParams;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import expo.modules.ReactActivityDelegateWrapper;

public class MainActivity extends ReactActivity implements SensorEventListener {
  public String TAG = "React Native Android Module";
  private SensorManager sensorManager;
  private Sensor stepSensor;
  private int steps = 200;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // Set the theme to AppTheme BEFORE onCreate to support
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
    requestPermission(this);
    super.onCreate(null);
    Log.d(TAG, "onCreate: start app in android module");
    sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
    for (Sensor sensor : sensorManager.getSensorList(Sensor.TYPE_ALL)) {
      Log.d(TAG, "TaskModule: sensor is " + sensor.getName());
    }
    stepSensor = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);
    Log.d(TAG, "onCreate: using sensor" + stepSensor.getName());
    sensorManager.registerListener(this, stepSensor, SensorManager.SENSOR_DELAY_UI);
  }

  public void requestPermission(Activity activity) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      if (activity.checkSelfPermission(Manifest.permission.ACTIVITY_RECOGNITION) != PackageManager.PERMISSION_GRANTED) {
        String[] request = new String[]{Manifest.permission.ACTIVITY_RECOGNITION};
        activity.requestPermissions(request, 1);
      }
    }
  }

  @Override
  public void onSensorChanged(SensorEvent sensorEvent) {
    if (sensorEvent.sensor == stepSensor) {
      steps = (int) sensorEvent.values[0];
      Log.d(TAG, "onSensorChanged: step " + sensorEvent.values[0]);
    } else Log.d(TAG, "onSensorChanged: another sensor");
  }

  @Override
  public void onAccuracyChanged(Sensor sensor, int i) {
    Log.d(TAG, "onAccuracyChanged: " + sensor + " :" + i);
  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "main";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
      new MainActivityDelegate(this, getMainComponentName())
    );
  }

  /**
   * Align the back button behavior with Android S
   * where moving root activities to background instead of finishing activities.
   * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
   */
  @Override
  public void invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        // For non-root activities, use the default implementation to finish them.
        super.invokeDefaultOnBackPressed();
      }
      return;
    }

    // Use the default back button implementation on Android S
    // because it's doing more than {@link Activity#moveTaskToBack} in fact.
    super.invokeDefaultOnBackPressed();
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

    @Override
    protected boolean isConcurrentRootEnabled() {
      // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
      // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }
  }
}
