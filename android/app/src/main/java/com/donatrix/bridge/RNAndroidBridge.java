package com.donatrix.bridge;

import android.util.Log;

import com.donatrix.dao.UserDao;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class RNAndroidBridge extends ReactContextBaseJavaModule {

    public RNAndroidBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNAndroidBridge";
    }

    @ReactMethod
    public void registerUser(String email, String password, String locked, String name, Promise promise) {
        try {
            UserDao.registerUser(email, password, locked, name);
            promise.resolve("SUCCESS");
        } catch (Exception e) {
            promise.reject("E_LAYOUT_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void checkRegisteredUser(String email, String password, Promise promise) {
        try {
            promise.resolve(UserDao.checkRegisteredUser(email, password));
        } catch (Exception e) {
            promise.reject("E_LAYOUT_ERROR", e.getMessage());
        }
    }
}
