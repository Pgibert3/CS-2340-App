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

    public void addItem(Item item) {
        this.items.add(item);
    }

    public Item removeItem(Item item) {
        this.items.remove(item);
    }
}