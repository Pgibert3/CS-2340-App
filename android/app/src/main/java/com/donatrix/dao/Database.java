//if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
        //parse("File Header.java")
package com.donatrix.dao;

import android.content.Context;
import android.util.Log;

import com.donatrix.R;
import com.donatrix.model.Location;
import com.donatrix.model.User;
import com.donatrix.model.UserType;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;


public class Database {
    private static Database ourInstance;
    private static Map<String, User> userMap;
    private static Map<Integer, Location> locationMap;
    private static Map<Location, ArrayList<Item>> itemMap;
    private static Map<LocationEmployee, Location> employeeMap;

    public static final String USER = "USERS";
    public static final String LOC = "LOCATION";
    public static final String INVENTORY = "IMVENTORY";
    public static final String EMPLOYEE = "EMPLOYEE";

    public static Database getInstance(Context context) {
        if (Database.ourInstance != null) {
            return ourInstance;
        }
        return ourInstance = new Database(context);
    }

    private Database(Context context) {
        load(context);
    }

    private void writeFile(String filename, HashMap map, Context context) throws Exception {
        FileOutputStream fos = context.openFileOutput(filename, Context.MODE_PRIVATE);
        ObjectOutputStream os = new ObjectOutputStream(fos);
        os.writeObject(map);
        os.close();
        fos.close();
    }

    private void readFile(String filename, String flag, Context context) throws Exception {
        FileInputStream fis = context.openFileInput(filename);
        ObjectInputStream is = new ObjectInputStream(fis);

        switch (flag) {
            case USER:
                userMap = (HashMap<String, User>) is.readObject();
                break;
            case LOC:
                locationMap = (HashMap<Integer, Location>) is.readObject();
                break;
            case INVENTORY:
                itemMap = (HashMap<Location, ArrayList<Item>> ) is.readObject();
                break;
            case EMPLOYEE:
                employeeMap = (HashMap<LocationEmployee, Location>) is.readObject();
                break;
        }

        is.close();
        fis.close();
    }

    private void save(Context context) {
        try {
            writeFile("users.db", userMap, context);
            writeFile("locations.db", locationMap, context);
            writeFile("items.db", itemMap, context);
            writeFile("employees.db", employeeMap, context);
        } catch (Exception e) {
            Log.d("Donatrix", e.getMessage());
        }
    }

    private void load(Context context) {
        try {
            readFile("users.db", USER, context);
            readFile("locations.db", LOC, context);
            readFile("items.db", INVENTORY, context);
            readFile("employees.db", EMPLOYEE, context);
        } catch (Exception e) {
            Log.d("Donatrix", e.getMessage());
            userMap = new HashMap<>();
            locationMap = new HashMap<>();
            itemMap = new HashMap<>();
            employeeMap = new HashMap<>();
        }
    }

    public void registerUser(String username, String password, String name, boolean locked, UserType type, Context context) {
        if (!userMap.containsKey(username)) {
            userMap.put(username, new User(username, password, name, locked, type));
            save(context);
        } else {
            throw new IllegalArgumentException("Username already taken");
        }
    }

    public boolean checkRegisteredUser(String username, String password) {
        User user = userMap.get(username);
        return user != null && user.getPassword().equals(password) && !user.getLocked();
    }

    public void loadLocations(Context context) {
        if (locationMap.isEmpty()) {
            try {
                InputStream is = context.getResources().openRawResource(R.raw.location_data);
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                String line;
                int counter = 0;


                while ((line = br.readLine()) != null) {
                    if (counter > 0) {
                        Log.d("Donatrix", line);
                        String[] info = line.split(",");
                        locationMap.put(Integer.parseInt(info[0]), new Location(info));
                    }
                    counter++;
                }
                save(context);
                br.close();
                is.close();
            } catch (Exception e) {
                Log.d("Donatrix", e.getMessage());
            }
        }
    }

    public List<Location> getLocations() {
        return (ArrayList<Location>) locationMap.values();
    }

    public void addItem(Item item, LocationEmployee employee) {
        itemMap.get(employeeMap.get(employee)).add(item);
    }
}
