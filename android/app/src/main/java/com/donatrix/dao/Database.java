//if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
        //parse("File Header.java")
package com.donatrix.dao;

import android.util.Log;

import com.donatrix.model.UserType;

import java.util.ArrayList;
import com.donatrix.model.User;


public class Database {
    private static Database ourInstance;
    private ArrayList<User> userList;
//    private ArrayList<String> passList;
//    private ArrayList<Boolean> lockedList;
//    private ArrayList<String> nameList;
//    private ArrayList<UserType> typeList;

    public static Database getInstance() {
        if (Database.ourInstance != null) {
            return ourInstance;
        }
        return ourInstance = new Database();
    }

    private Database() {
        userList = new ArrayList<>();
//        passList = new ArrayList<>();
//        lockedList = new ArrayList<>();
//        nameList = new ArrayList<>();
//        typeList = new ArrayList<>();
    }

    public ArrayList<User> getUserList() {
        return userList;
    }

//    public ArrayList<String> getPassList() {
//        return passList;
//    }
//
//    public ArrayList<Boolean> getLockedList() {
//        return lockedList;
//    }
//
//    public ArrayList<String> getNameList() {
//        return nameList;
//    }
//
//    public ArrayList<UserType> getTypeList() {
//        return typeList;
//    }

    public void registerUser(String username, String password, boolean locked, String name, UserType type) {
        Log.d("ReactNative", "" + username + password + name);
        User n = new User(username, password, name, locked, type);
        if (!(userList.contains(n))) {
            userList.add(n);
        } else {
            throw new IllegalArgumentException("Username or password not correct");
        }
    }

    public boolean checkRegisteredUser(String username, String password) {
        User m = new User(username, password);
        for (User u : Database.getInstance().getUserList()) {
            if (u.getEmail().equals(m.getEmail()) && u.getPassword().equals(m.getPassword())) {
                return true;
            }
        }
        return false;
    }
}
