package com.donatrix.dao;

import android.content.Context;

import com.donatrix.model.Location;

import java.util.ArrayList;

public class LocationDao {
    public static ArrayList<Location> getLocations(Context context) {
        return Database.getInstance(context).getLocations();
    }
}
