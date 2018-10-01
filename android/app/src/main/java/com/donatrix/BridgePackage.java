package com.donatrix;

import com.donatrix.dao.UserDao;
import com.donatrix.reactnative.RNAndroidBridgePackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.Arrays;
import java.util.List;

public class BridgePackage extends RNAndroidBridgePackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(new UserDao(reactContext));
    }
}
