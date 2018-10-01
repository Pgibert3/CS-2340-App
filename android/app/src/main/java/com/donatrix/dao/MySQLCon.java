package com.donatrix.dao;

import java.sql.*;

public class MySQLCon {
//    String username = "awarrier@gatech.edu";
//    String password = "password";
//    String locked = "0";
//    String name = "Ashvin Warrier";
//
//    String sql = String.format("insert into donatrix.users values('%s','%s','%s','%s')", username, password, locked, name);

    public MySQLCon() {

    }

    public static ResultSet startConnectionForData(String sql) throws ClassNotFoundException, SQLException {
        ResultSet rs = null;
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/Donatrix", "root",
                "password");
//            System.out.println("Connected to database");
//            System.out.println(sql);
        Statement stmt = con.createStatement();
//            stmt.executeUpdate(sql);
        rs = stmt.executeQuery(sql);
//            System.out.println(rs);
        return rs;
    }

    public static void startConnectionForUpdate(String sql) throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/Donatrix", "root",
                "password");
//            System.out.println("Connected to database");
//            System.out.println(sql);
        Statement stmt = con.createStatement();
        stmt.executeUpdate(sql);
//            ResultSet rs = stmt.executeQuery(sql);
    }

    public static void main(String[] args) {
        MySQLCon me = new MySQLCon();
//        me.registerUser("dpoole@gatech.edu", "password", "0", "Davidson Poole");
        // me.checkRegisteredUser("dpoole@gatech.edu");

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
