package com.donatrix.dao;

import android.content.Context;

import com.donatrix.model.UserType;
import com.donatrix.model.User;

public class UserDao {
    public static void registerUser(String email, String password, String name, boolean locked, String type, Context context) throws IllegalArgumentException {
        Database.getInstance(context).registerUser(email, password, name, locked, UserType.valueOf(type), context);
    }

    public static boolean checkRegisteredUser(String email, String password, Context context) {
        return Database.getInstance(context).checkRegisteredUser(email, password);
    }
}
