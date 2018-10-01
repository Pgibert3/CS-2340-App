package com.donatrix.dao;

import com.donatrix.reactnative.RNAndroidBridgeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.sql.SQLException;

public class UserDao extends RNAndroidBridgeModule {
    public UserDao(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void registerUser(String username, String password, String locked, String name, Promise promise) {
        String sql = String.format("insert into donatrix.users values('%s'," +
                "'%s','%s','%s')", username, password, locked, name);
        try {
            MySQLCon.startConnectionForUpdate(sql);
            promise.resolve(Status.SUCCESS.toString());
        } catch (SQLException sqle) {
            promise.reject("E_LAYOUT_ERROR", sqle.getMessage());
        } catch (ClassNotFoundException cnfe) {
            cnfe.printStackTrace();
            promise.reject("E_LAYOUT_ERROR", cnfe.getMessage());
        }
    }

    @ReactMethod
    public void checkRegisteredUser(String username, Promise promise) {
        String sql = String.format("select * from donatrix.users where email = '%s';", username);

        try {
            if (MySQLCon.startConnectionForData(sql) != null) {
                promise.resolve(true);
            } else {
                promise.resolve(false);
            }
        } catch (SQLException sqle) {
            promise.reject("E_LAYOUT_ERROR", Status.SQL_ERROR.toString(), sqle);
        } catch (ClassNotFoundException cnfe) {
            promise.reject("E_LAYOUT_ERROR", Status.JDBC_ERROR.toString(), cnfe);
        }

    }

    @Override
    public String getName() {
        return "UserDao";
    }
}
