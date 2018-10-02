package com.donatrix.dao;

import java.sql.*;

public class MySQLCon {

    public MySQLCon() {

    }

    public static ResultSet startConnectionForRead(String sql) throws ClassNotFoundException, SQLException {
        ResultSet rs = null;
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/Donatrix", "root",
                "Pomfret18925!");
        Statement stmt = con.createStatement();
        rs = stmt.executeQuery(sql);
        return rs;
    }

    public static void startConnectionForWrite(String sql) throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/Donatrix", "root",
                "Pomfret18925!");
        Statement stmt = con.createStatement();
        stmt.executeUpdate(sql);
    }

//     public static void main(String[] args) {
//         MySQLCon me = new MySQLCon();
//        me.registerUser("dpoole@gatech.edu", "password", "0", "Davidson Poole");
//         me.checkRegisteredUser("dpoole@gatech.edu");
//
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
//     }
}
