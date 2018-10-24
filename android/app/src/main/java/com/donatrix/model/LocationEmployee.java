package com.donatrix.model;

public class LocationEmployee extends User {
    Location location;

    public class LocationEmployee(Location location) {
        this.location = location;
    }

    public Location getLocation() {
        return this.location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public void addItem(Timestamp time, String sDescription, String fDescription,
                        double value, ItemCategory category, String comments) {
        Item item = new Item(time, this.location, sDescription, fDescription,
                value, category, comments);
        location.addItem(item);
    }
}