package com.donatrix.dao;

import android.content.Context;

import com.donatrix.model.Location;

import java.util.ArrayList;
import java.util.List;

public class LocationDao {
    public static List<Location> getLocations(Context context) {
        return Database.getInstance(context).getLocations();
    }
    public static Location getLocationByID(Integer i, Context context) {
        return Database.getInstance(context).getLocationByID(i);
    }
}
