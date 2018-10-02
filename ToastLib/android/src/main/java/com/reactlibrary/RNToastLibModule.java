
package com.reactlibrary;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNToastLibModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNToastLibModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNToastLib";
  }

   @ReactMethod
   public void show(String message) {
     Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();
   }
}
