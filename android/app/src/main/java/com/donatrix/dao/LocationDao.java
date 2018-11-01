package com.donatrix.dao;

import android.content.Context;

import com.donatrix.model.Location;
import com.donatrix.model.User;

import java.util.List;


public class LocationDao {
    public static List<Location> getLocations(Context context) {
        return Database.getInstance(context).getLocations();
    }
    public static Location getLocationByID(Integer i, Context context) {
        return Database.getInstance(context).getLocationByID(i);
    }
    public static void addLocationEmployee(User user, Location location, Context context) {
        Database.getInstance(context).addLocationEmployee(user, location);
    }
}
