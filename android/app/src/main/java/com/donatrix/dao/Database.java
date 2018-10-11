//if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
        //parse("File Header.java")
package com.donatrix.dao;

import android.content.Context;
import android.util.Log;

import com.donatrix.model.User;
import com.donatrix.model.UserType;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.HashMap;


public class Database {
    private static Database ourInstance;
    private Context context;
    private HashMap<String, User> databaseMap;

    public static Database getInstance(Context context) {
        if (Database.ourInstance != null) {
            return ourInstance;
        }
        return ourInstance = new Database(context);
    }

    private Database(Context context) {
        this.context = context;
        load();
    }

    private void save() {
        try {
            FileOutputStream fos = this.context.openFileOutput("database.ser", Context.MODE_PRIVATE);
            ObjectOutputStream os = new ObjectOutputStream(fos);
            os.writeObject(this.databaseMap);
            os.close();
            fos.close();
        } catch (Exception e) {
            Log.d("Donatrix", e.getMessage());
        }
    }

    private void load() {
        try {
            FileInputStream fis = this.context.openFileInput("database.ser");
            ObjectInputStream is = new ObjectInputStream(fis);
            this.databaseMap = (HashMap<String, User>) is.readObject();
            is.close();
            fis.close();
        } catch (Exception e) {
            Log.d("Donatrix", e.getMessage());
            this.databaseMap = new HashMap<>();
        }
    }

    public void registerUser(String username, String password, String name, boolean locked, UserType type) {
        if (!(this.databaseMap.containsKey(username))) {
            this.databaseMap.put(username, new User(username, password, name, locked, type));
            save();
        } else {
            throw new IllegalArgumentException("Username already taken");
        }
    }

    public boolean checkRegisteredUser(String username, String password) {
        User user = this.databaseMap.get(username);
        return user != null && user.getPassword().equals(password) && !user.getLocked();
    }
}
