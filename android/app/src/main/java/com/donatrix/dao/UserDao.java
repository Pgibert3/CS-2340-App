package com.donatrix.dao;

import android.util.Log;

import com.donatrix.model.UserType;
import com.donatrix.model.User;

public class UserDao {
    public static void registerUser(String email, String password, boolean locked, String name, String type) throws IllegalArgumentException {
        Database.getInstance().registerUser(email, password, locked, name, UserType.valueOf(type));
        for (User user: Database.getInstance().getUserList()) {
            Log.d("ReactNative", "" + user);
        }
    }

    public static boolean checkRegisteredUser(String email, String password) {
        return Database.getInstance().checkRegisteredUser(email, password);
    }
}
