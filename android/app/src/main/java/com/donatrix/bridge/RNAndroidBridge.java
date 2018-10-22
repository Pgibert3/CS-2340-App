package com.donatrix.bridge;

import com.donatrix.dao.LocationDao;
import com.donatrix.dao.UserDao;
import com.donatrix.model.Location;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;

import java.util.HashMap;

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
            HashMap<Integer, Location> originalMap = LocationDao.getLocations(this.getCurrentActivity());
            WritableMap map = Arguments.createMap();
            for (Integer i: originalMap.keySet()) {
                WritableMap tempMap = Arguments.createMap();
                Location temp = originalMap.get(i);

                tempMap.putString("name", temp.getName());
                tempMap.putString("latitude", temp.getLatitude());
                tempMap.putString("longitude", temp.getLongitude());
                tempMap.putString("address", temp.getAddress());
                tempMap.putString("city", temp.getCity());
                tempMap.putString("state", temp.getState());
                tempMap.putString("zip", temp.getZip());
                tempMap.putString("locationType", temp.getLocationType().getType());
                tempMap.putString("number", temp.getNumber());
                tempMap.putString("website", temp.getWebsite());

                map.putMap(i.toString(), tempMap);
            }
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("E_LAYOUT_ERROR", e.getMessage());
        }
    }
}
