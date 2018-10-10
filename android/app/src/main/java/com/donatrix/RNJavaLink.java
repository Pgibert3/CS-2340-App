package com.donatrix;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.util.Map;
import java.util.HashMap;
import com.donatrix.Database;

public class RNJavaLink extends ReactContextBaseJavaModule {

    public RNJavaLink(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNJavaLink";
    }

    @ReactMethod
    public void registerUser(String email, String password, String locked, String name, Promise promise) {
        Database conn = Database.getInstance();
        try {
            conn.registerUser(email, password, locked, name);
            promise.resolve("SUCCESS");
        } catch (Exception e) {
            promise.reject("E_LAYOUT_ERROR", e.getMessage());
        }
    }
}
