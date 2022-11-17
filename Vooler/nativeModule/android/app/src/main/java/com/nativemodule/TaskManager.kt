package com.nativemodule

import android.util.Log
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class TaskManager(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  private val TAG = "react android module"
  override fun getName(): String {
    return "TaskManager"
  }

  @ReactMethod fun createEvent() {
    Log.d(TAG, "createEvent: android module")
  }

  @ReactMethod(isBlockingSynchronousMethod = true)


}
