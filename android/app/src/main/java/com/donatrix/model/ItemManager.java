package com.donatrix.model;

import java.util.ArrayList;
import java.util.List;

public class ItemManager {
    private List<Item> items;

    public ItemManager() {
        this.items = new ArrayList<>();
    }
    public List<Item> getItems() {
        return this.items;
    }

    public void addItem(Item item) {
        this.items.add(item);
    }

    public void removeItem(Item item) {
        this.items.remove(item);
    }
}