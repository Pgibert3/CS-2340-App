package com.donatrix.bridge;

import com.donatrix.dao.LocationDao;
import com.donatrix.dao.UserDao;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;

import com.donatrix.model.ItemCategory;
import com.donatrix.model.LocationEmployee;
import android.content.Context;
import com.donatrix.model.User;
import com.donatrix.model.Admin;
import com.donatrix.model.LocationEmployee;
import com.donatrix.model.UserType;
import com.donatrix.model.Location;
import com.donatrix.dao.ItemDao;
import com.donatrix.model.Item;

import java.util.List;
import java.util.ArrayList;



public class RNAndroidBridge extends ReactContextBaseJavaModule {
    Context context = this.getCurrentActivity();
    public RNAndroidBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNAndroidBridge";
    }

    @ReactMethod
    public void registerUser(String email, String password, String name, boolean locked, String type, Integer id, Promise promise) {
        try {
            if (type == "USER") {
                User user = new User(email, password, name, locked, UserType.USER);
                UserDao.registerUser(user, context);
                promise.resolve("SUCCESS");
            } else if (type == "ADMIN") {
                User user = new Admin(email, password, name);
                UserDao.registerUser(user, context);
                promise.resolve("SUCCESS");
            } else if (type == "LOCATION_EMPLOYEE") {
                Location location = LocationDao.getLocationByID(id, context);
                User user = new LocationEmployee(email, password, name, location);
                UserDao.registerUser(user, context);
                promise.resolve("SUCCESS");
            }
        } catch (Exception e) {
            promise.reject("E_LAYOUT_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void checkRegisteredUser(String email, String password, Promise promise) {
        try {
            promise.resolve(UserDao.checkRegisteredUser(email, password, context));
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

    @ReactMethod
    public void addItem(String username, String sDescription, String fDescription,
                        double value, ItemCategory category, String comments) {
        User user = UserDao.getUser(username, context);
        ItemDao.addItem((LocationEmployee) user, sDescription, fDescription, value, category, comments, context);
    }

    public List<Item> getItemByLocation(String name, List<Integer> locations, List<String> categories) {
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
