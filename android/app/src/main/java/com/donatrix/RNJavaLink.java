
package com.donatrix;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNJavaLink extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNJavaLink(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNJavaLink";
    }

     @ReactMethod
     public void addUser(String email, String fname, String lname, String pass, String confPass, Callback callback) {
          boolean success = true;
          //do database stuff and update the value of 'success' if necessary

          //finally call the correct callback based off the updated value of 'success'
          if (success) {
              callback.invoke("added user");
          } else {
              callback.invoke("nice try buddy");
          }
     }

     @ReactMethod
     public void tryLogin(String email, String pass, Callback callback) {
          boolean valid = true;
          //do database stuff and update the value of 'valid' if necessary

          //finally call the correct callback based off the updated value of 'valid'
          if (valid) {
              callback.invoke("valid");
          } else {
              callback.invoke("not valid");
          }
     }
}
