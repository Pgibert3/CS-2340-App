package com.donatrix.dao;

import android.content.Context;

import com.donatrix.model.Location;

import java.util.HashMap;

public class LocationDao {
    public static HashMap<Integer, Location> getLocations(Context context) {
        return Database.getInstance(context).getLocations();
    }
}
