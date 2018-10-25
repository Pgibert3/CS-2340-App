package com.donatrix.dao;

import android.content.Context;

import com.donatrix.model.UserType;
import com.donatrix.model.User;


public class UserDao {
    public static void registerUser(User user, Context context) throws IllegalArgumentException {
        Database.getInstance(context).registerUser(user, context);
    }
    public static boolean checkRegisteredUser(String email, String password, Context context) {
        return Database.getInstance(context).checkRegisteredUser(email, password);
    }
    public static User getUser(String email, Context context) {
        return Database.getInstance(context).getUser(email);
    }
}
