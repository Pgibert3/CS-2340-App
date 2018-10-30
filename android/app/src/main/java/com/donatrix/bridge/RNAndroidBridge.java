package com.donatrix.bridge;

import com.donatrix.dao.LocationDao;
import com.donatrix.dao.UserDao;
import com.donatrix.model.Location;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import com.donatrix.model.ItemCategory;
import com.donatrix.model.LocationEmployee;
import android.content.Context;
import android.util.Log;

import com.donatrix.model.User;
import com.donatrix.model.Admin;
import com.donatrix.model.LocationEmployee;
import com.donatrix.model.UserType;
import com.donatrix.model.Location;
import com.donatrix.dao.ItemDao;
import com.donatrix.model.Item;

import java.util.List;
import java.util.ArrayList;

import java.util.HashMap;

public class RNAndroidBridge extends ReactContextBaseJavaModule {
    Context context = this.getCurrentActivity();
    String user;
    public RNAndroidBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNAndroidBridge";
    }

    @ReactMethod
    public void registerUser(String email, String password, String name, boolean locked, String type, Integer id, Promise promise) {
        Log.d("Donatrix", "Start");
        try {
            if (type.equals("USER")) {
                User user = new User(email, password, name, locked, UserType.USER);
                UserDao.registerUser(user, context);
                promise.resolve("SUCCESS");
            } else if (type.equals("ADMIN")) {
                User user = new Admin(email, password, name);
                UserDao.registerUser(user, context);
                promise.resolve("SUCCESS");
            } else if (type.equals("LOCATION_EMPLOYEE")) {
                Log.d("Donatrix", "kinda working");
                Location location = LocationDao.getLocationByID(id, context);
                User user = new LocationEmployee(email, password, name, location);
                UserDao.registerUser(user, context);
                promise.resolve("SUCCESS");
            }
        } catch (Exception e) {
            Log.d("Donatrix", e.getMessage(), e);
            promise.reject("E_LAYOUT_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void checkRegisteredUser(String email, String password, Promise promise) {
        try {
            this.user = email;
            promise.resolve(UserDao.checkRegisteredUser(email, password, context));
        } catch (Exception e) {
            Log.d("Donatrix", e.getMessage(), e);
            promise.reject("E_LAYOUT_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getLocations(Promise promise) {
        try {
            List<Location> locationList = LocationDao.getLocations(context);
            WritableArray arr = Arguments.createArray();
            for (Location temp: locationList) {
                WritableMap tempMap = Arguments.createMap();

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

                arr.pushMap(tempMap);
            }
            promise.resolve(arr);
        } catch (Exception e) {
            Log.d("Donatrix", e.getMessage(), e);
            promise.reject("E_LAYOUT_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getItems(Promise promise) {
        try {
            List<Item> itemList = ItemDao.getAllItems(context);
            WritableArray arr = Arguments.createArray();
            for (Item temp : itemList) {
                WritableMap tempMap = Arguments.createMap();

                tempMap.putString("timestamp", temp.getTime().toString());
                tempMap.putString("location", temp.getLocation().getName());
                tempMap.putString("sDescription", temp.getsDescription());
                tempMap.putString("fDescription", temp.getfDescription());
                tempMap.putString("value", "" + temp.getValue());
                tempMap.putString("category", temp.getCategory().getCategory());
                tempMap.putString("comments", temp.getComments());

                arr.pushMap(tempMap);
            }
            promise.resolve(arr);
        } catch (Exception e) {
            Log.d("Donatrix", e.getMessage(), e);
            promise.reject("E_LAYOUT_ERROR", e.getMessage());
        }
    }

    //Paul Look Here
    @ReactMethod
    public void addItem(String sDescription, String fDescription,
                        double value, ItemCategory category/*, String comments*/) {
        User user = UserDao.getUser(this.user, context);
        ItemDao.addItem((LocationEmployee) user, sDescription, fDescription, value, category, ""/*comments*/, context);
    }

    //Paul Look Here
    @ReactMethod
    public List<Item> getItemBySearch(String name, List<Integer> locations, List<String> categories) {
        List<Item> itemList = new ArrayList<>();
        if (locations != null) {
            for (Integer location : locations) {
                Location newLocation = LocationDao.getLocationByID(location, context);
                List<Item> items = ItemDao.getItemsFromLocation(newLocation, context);
                for (Item item : items) {
                    itemList.add(item);
                }
            }
        } else {
            for(Item item: ItemDao.getAllItems(context)) {
                if (!(itemList.contains(item))) {
                    itemList.add(item);
                }
            }
        }
        if (categories != null) {
            for (Item item : itemList) {
                if (!(categories.contains(item.getCategory().getCategory()))) {
                    itemList.remove(item);
                }
            }
        }
        if (name != null) {
            for (Item item: itemList) {
                if (!(item.getsDescription().equals(name))) {
                    itemList.remove(item);
                }
            }
        }
        return itemList;
    }
}
