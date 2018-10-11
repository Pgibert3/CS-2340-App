package com.donatrix.bridge;

import com.donatrix.dao.UserDao;
import com.donatrix.model.UserType;
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
    public void registerUser(String email, String password, boolean locked, String name, String type, Promise promise) {
        try {
            UserDao.registerUser(email, password, locked, name, type);
            promise.resolve("Welcome " + type.charAt(0) + type.substring(1).toLowerCase());
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
