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

    public void addItem(Item item) {
        location.addItem(item);
    }
}