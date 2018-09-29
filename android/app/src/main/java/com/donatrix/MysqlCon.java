package com.donatrix;

import java.sql.*;

public class MysqlCon {
//    String username = "awarrier@gatech.edu";
//    String password = "password";
//    String locked = "0";
//    String name = "Ashvin Warrier";
//
//    String sql = String.format("insert into donatrix.users values('%s','%s','%s','%s')", username, password, locked, name);

    public MysqlCon() {

    }

    private void startConnection(String sql) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/Donatrix", "root",
                    "password");
//            System.out.println("Connected to database");
//            System.out.println(sql);
            Statement stmt = con.createStatement();
            stmt.executeUpdate(sql);
//            ResultSet rs = stmt.executeQuery(sql);
        } catch(Exception e) {
            System.out.println(e);
        }
    }
    public void registerUser(String username, String password, String locked, String name) {
        String sql = String.format("insert into donatrix.users values('%s'," +
                "'%s','%s','%s')", username, password, locked, name);
        startConnection(sql);
    }

    public static void main(String[] args) {
        MysqlCon me = new MysqlCon();
        me.registerUser("dpoole@gatech.edu", "password", "0", "Davidson Poole");

//        try {
//            Class.forName("com.mysql.jdbc.Driver");
//            Connection con = DriverManager.getConnection(
//                    "jdbc:mysql://localhost:3306/Donatrix", "root",
//                    "password");
//
//            Statement stmt = con.createStatement();
//            ResultSet rs = stmt.executeQuery("select * from emp");
//        } catch(Exception e) {
//            System.out.println(e);
//        }
//    }
    }
}
