package com.donatrix.dao;

import android.content.Context;

import com.donatrix.model.Location;
import java.util.List;
import java.util.HashMap;

//public class LocationDao {
//    public static List<Location> getLocations(Context context) {

public class LocationDao {
    public static HashMap<Integer, Location> getLocations(Context context) {
        return Database.getInstance(context).getLocations();
    }
    public static Location getLocationByID(Integer i, Context context) {
        return Database.getInstance(context).getLocationByID(i);
    }
}
