package com.donatrix.bridge;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.donatrix.dao.UserDao;
import com.donatrix.dao.UserDaoService;
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
    public void registerUser(String email, String password, String name, boolean locked, String type, Promise promise) {
        try {
//            Intent intent = new Intent(this.getCurrentActivity(), UserDaoService.class);
//            intent.putExtra("EMAIL", email);
//            intent.putExtra("PASS", password);
//            intent.putExtra("NAME", name);
//            intent.putExtra("LOCKED", locked);
//            intent.putExtra("TYPE", type);
//            this.getCurrentActivity().startService(intent);
            UserDao.registerUser(email, password, name, locked, type, this.getCurrentActivity().getBaseContext());
            promise.resolve("Welcome " + type.charAt(0) + type.substring(1).toLowerCase());
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
}
