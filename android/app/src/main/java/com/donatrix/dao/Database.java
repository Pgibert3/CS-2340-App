//if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
        //parse("File Header.java")
package com.donatrix.dao;

import android.util.Log;

import java.util.ArrayList;


public class Database {
    private static Database ourInstance;
    private ArrayList<String> userList;
    private ArrayList<String> passList;
    private ArrayList<String> lockedList;
    private ArrayList<String> nameList;

    public static Database getInstance() {
        if (Database.ourInstance != null) {
            return ourInstance;
        }
        return ourInstance = new Database();
    }

    private Database() {
        userList = new ArrayList<>();
        passList = new ArrayList<>();
        lockedList = new ArrayList<>();
        nameList = new ArrayList<>();
    }

    public ArrayList<String> getUserList() {
        return userList;
    }

    public ArrayList<String> getPassList() {
        return passList;
    }

    public ArrayList<String> getLockedList() {
        return lockedList;
    }

    public ArrayList<String> getNameList() {
        return nameList;
    }

    public void registerUser(String username, String password, String locked, String name) {
        Log.d("ReactNative", "" + username + password + name);
        if (!(userList.contains(username))) {
            userList.add(username);
            passList.add(password);
            lockedList.add(locked);
            nameList.add(name);
        } else {
            throw new IllegalArgumentException("Username or password not correct");
        }
    }

    public boolean checkRegisteredUser(String username, String password) {
        return userList.contains(username) && passList.contains(password)
                && userList.indexOf(username) == passList.indexOf(password) && !(lockedList.get(userList.indexOf(username)).equals("1"));
    }
}
