package com.donatrix.bridge;

import com.donatrix.dao.LocationDao;
import com.donatrix.dao.UserDao;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;

public class RNAndroidBridge extends ReactContextBaseJavaModule {
    public RNAndroidBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNAndroidBridge";
    }

    @ReactMethod
    public void registerUser(String email, String password, String name, boolean locked, String type, Promise promise) {
        try {
            UserDao.registerUser(email, password, name, locked, type, this.getCurrentActivity());
            promise.resolve("SUCCESS");
        } catch (Exception e) {
            promise.reject("E_LAYOUT_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void checkRegisteredUser(String email, String password, Promise promise) {
        try {
            promise.resolve(UserDao.checkRegisteredUser(email, password, this.getCurrentActivity()));
        } catch (Exception e) {
            promise.reject("E_LAYOUT_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getLocations(Promise promise) {
        try {
            LocationDao.getLocations(this.getCurrentActivity());
            
        } catch (Exception e) {
            promise.reject("E_LAYOUT_ERROR", e.getMessage());
        }
    }
}
