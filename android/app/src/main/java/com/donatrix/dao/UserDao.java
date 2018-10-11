package com.donatrix.dao;

public class UserDao {
    public static void registerUser(String email, String password, String locked, String name) throws IllegalArgumentException {
        Database.getInstance().registerUser(email, password, locked, name);
    }

    public static boolean checkRegisteredUser(String email, String password) {
        return Database.getInstance().checkRegisteredUser(email, password);
    }
}
