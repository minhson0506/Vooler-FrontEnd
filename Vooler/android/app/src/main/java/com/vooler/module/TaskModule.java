package com.vooler.module;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class TaskModule extends ReactContextBaseJavaModule implements SensorEventListener {
  public String TAG = "Task manager from android module";
  private SensorManager sensorManager;
  private Sensor stepSensor;
  private int steps = 200;


  public TaskModule(ReactApplicationContext context) {
    super(context);
    sensorManager = (SensorManager) context.getSystemService(Context.SENSOR_SERVICE);
    for (Sensor sensor : sensorManager.getSensorList(Sensor.TYPE_ALL)) {
      Log.d(TAG, "TaskModule: sensor is " + sensor.getName());
    }
    stepSensor = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);
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

  @NonNull
  @Override
  public String getName() {
    return "TaskModule";
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean createTaskEvent(String name) {
    Log.d(TAG, "createTaskEvent with name: " + name);
    return true;
  }

  @ReactMethod
  public Boolean getSteps() {
    Log.d(TAG, "getSteps: " + steps);
    if (steps < 300) return false;
    return true;
  }
}
