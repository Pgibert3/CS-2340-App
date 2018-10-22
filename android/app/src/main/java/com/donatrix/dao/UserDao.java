package com.donatrix.dao;

import android.content.Context;
import com.donatrix.MysqlCon;
import com.donatrix.model.UserType;
import java.sql.*;

public class UserDao {
    public static void registerUser(String email, String password, String name, boolean locked, String type, Context context) throws IllegalArgumentException {
        Database.getInstance(context).registerUser(email, password, name, locked, UserType.valueOf(type));
    }

    public static boolean checkRegisteredUser(String email, String password, Context context) throws SQLException {
        return MysqlCon.checkRegisteredUser(email);
//        return Database.getInstance(context).checkRegisteredUser(email, password);
    }
}
