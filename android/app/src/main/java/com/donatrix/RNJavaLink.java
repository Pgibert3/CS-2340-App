package com.donatrix;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.util.Map;
import java.util.HashMap;

public class RNJavaLink extends ReactContextBaseJavaModule {

    public RNJavaLink(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNJavaLink";
    }

    @ReactMethod
    public void registerUser(String email, String password, String locked, String name) {
        MySQLCon conn = new MySQLCon();
        conn.registerUser(email, password, locked, name);
    }
}
