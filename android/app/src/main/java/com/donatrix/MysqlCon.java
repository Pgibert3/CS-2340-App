package com.donatrix;

import java.sql.*;

public class MysqlCon {

    public MysqlCon() {

    }

    private static ResultSet startConnectionForRead(String sql) {
        ResultSet rs = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://127.0.0.1:3306/Donatrix", "root",
                    "password");
            Statement stmt = con.createStatement();
//            stmt.executeUpdate(sql);
            rs = stmt.executeQuery(sql);
//            ResultSetMetaData rsmd = rs.getMetaData();
//            int columnNumer = rsmd.getColumnCount();
//            while (rs.next()) {
//                for (int i = 1; i <= columnNumer; i++ ) {
//                    if (i > 1) System.out.print(", ");
//                    String columnValue = rs.getString(i);
//                    System.out.print(columnValue + " " + rsmd.getColumnName(i));
//                }
//                System.out.println("");
//            }
//            System.out.println(rs);
        } catch(Exception e) {
            rs = null;
            System.out.println(e);
        }
        return rs;
    }

    private void startConnectionForWrite(String sql) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/Donatrix", "root",
                    "password");
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
        startConnectionForWrite(sql);
    }

    public static boolean checkRegisteredUser(String username) throws SQLException {
        String sql = String.format("select * from donatrix.users where email = '%s';", username);

        if (startConnectionForRead(sql).next()) {
            System.out.println("true");
            return true;
        }
        System.out.println("False");
        return false;
    }

//    public static void main(String[] args) throws SQLException {
//        MysqlCon me = new MysqlCon();
////        me.registerUser("dpoole@gatech.edu", "password", "0", "Davidson Poole");
//        me.registerUser("pgibert@gatech.edu", "password", "0", "Paul Gibert");
//
////        try {
////            Class.forName("com.mysql.jdbc.Driver");
////            Connection con = DriverManager.getConnection(
////                    "jdbc:mysql://localhost:3306/Donatrix", "root",
////                    "password");
////
////            Statement stmt = con.createStatement();
////            ResultSet rs = stmt.executeQuery("select * from emp");
////        } catch(Exception e) {
////            System.out.println(e);
////        }
////    }
//    }
}
