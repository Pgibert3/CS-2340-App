//if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
        //parse("File Header.java")
package com.donatrix;

import java.util.ArrayList;


public class Database {
    private static Database ourInstance;
    private ArrayList userList;
    private ArrayList passList;
    private ArrayList lockedList;
    private ArrayList nameList;

    public static Database getInstance() {
        if (Database.ourInstance != null) {
            return ourInstance;
        }
        return ourInstance = new Database();
    }

    private Database() {
        userList = new ArrayList();
        passList = new ArrayList();
        lockedList = new ArrayList();
        nameList = new ArrayList();
    }

    public ArrayList getUserList() {
        return userList;
    }

    public ArrayList getPassList() {
        return passList;
    }

    public ArrayList getLockedList() {
        return lockedList;
    }

    public ArrayList getNameList() {
        return nameList;
    }

    public void registerUser(String username, String password, String locked, String name) {
        if (!(userList.contains(username)) && !(passList.contains(password))) {
            userList.add(username);
            passList.add(password);
            lockedList.add(locked);
            nameList.add(name);
        } else {
            throw new IllegalArgumentException("Username or password not correct");
        }
    }

    public boolean checkRegisteredUser(String username, String password) {
        if (userList.contains(username) && passList.contains(password)
                && userList.indexOf(username) == passList.indexOf(password) && !(lockedList.get(userList.indexOf(username)).equals("1"))) {
            return true;
        }
        return false;
    }
}
