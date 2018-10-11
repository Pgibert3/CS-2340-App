package com.donatrix.dao;

import android.util.Log;

public class UserDao {
    public static void registerUser(String email, String password, String locked, String name) throws IllegalArgumentException {
        Database.getInstance().registerUser(email, password, locked, name);
        for (String user: Database.getInstance().getUserList()) {
            Log.d("ReactNative", "" + user);
        }
    }

    public static boolean checkRegisteredUser(String email, String password) {
        return Database.getInstance().checkRegisteredUser(email, password);
    }
}
