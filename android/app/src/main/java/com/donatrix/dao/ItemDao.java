package com.donatrix.dao;

import com.donatrix.model.Item;
import com.donatrix.model.LocationEmployee;
import com.donatrix.model.ItemCategory;
import android.content.Context;
import java.sql.Timestamp;
import java.util.Date;
import java.time.Instant;

public class ItemDao {

    public static void addItem(LocationEmployee employee, String sDescription, String fDescription,
                          double value, ItemCategory category, String comments, Context context) {
        Date date = Date.from(Instant.now());
        Timestamp timestamp = new Timestamp(date.getTime());
        Item item = new Item(timestamp, employee.getLocation(), sDescription, fDescription,
                value, category, comments);
        Database.getInstance(context).addItem(item, employee);
    }
}