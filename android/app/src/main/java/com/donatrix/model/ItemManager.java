package com.donatrix.model;

import java.util.ArrrayList;

public class ItemManager {
    private ArrayList<Item> items;

    public ItemManager() {
        this.items = new ArrayList<>();
    }
    public ArrayList<Item> getItems() {
        return this.items;
    }

    public void addItem(Timestamp timestamp, Location, location, String sDescription,
                        String fDescription, double value, ItemCategory category,
                        String comments)) {
        Item item = new Item(timestamp, location, sDescription, fDescription,
                value, category, comments);
        this.items.add(item);
    }

    public Item removeItem(Item item) {
        this.items.remove(item);
    }
}