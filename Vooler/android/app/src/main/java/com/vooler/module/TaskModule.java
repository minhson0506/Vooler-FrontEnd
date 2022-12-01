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

public class TaskModule extends ReactContextBaseJavaModule {
  public String TAG = "Task manager from android module";
  private SensorManager sensorManager;
  private Sensor stepSensor;
  private int steps = 200;


  public TaskModule(ReactApplicationContext context) {
    super(context);
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
  public void getToken(String token) {
    MainActivity.token = token;
    Log.d(TAG, "getToken: " + MainActivity.token);
  }
}
