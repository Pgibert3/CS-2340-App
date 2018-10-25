package com.donatrix.dao;

public class ItemDao {

    public static addItem(LocationEmployee employee, String sDescription, String fDescription,
                          double value, ItemCategory category, String comments, Context context) {
        Date date = Date.from(Instant.now());
        Timestamp timestamp = new Timestamp(date.getTime());
        Item item = new Item(timestamp, employee.getLocation(), sDescription, fDescription,
                value, category, comments);
        Database.getInstance(context).addItem(item, employee);
    }
}