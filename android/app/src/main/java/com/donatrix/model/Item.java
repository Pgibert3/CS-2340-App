package com.donatrix.model;

import android.media.Image;

import java.sql.Timestamp;

public class Item {

    private Timestamp time;
    private Location location;
    private String sDescription;
    private String fDescription;
    private double value;
    private ItemCategory category;
    private String comments;
    private Image image;

    public Item(Timestamp time, Location location, String sDescription, String fDescription,
                double value, ItemCategory category, String comments, Image image) {
        this.time = time;
        this.location = location;
        this.sDescription = sDescription;
        this.fDescription = fDescription;
        this.value = value;
        this.category = category;
        this.comments = comments;
        this.image = image;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getsDescription() {
        return sDescription;
    }

    public void setsDescription(String sDescription) {
        this.sDescription = sDescription;
    }

    public String getfDescription() {
        return fDescription;
    }

    public void setfDescription(String fDescription) {
        this.fDescription = fDescription;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public ItemCategory getCategory() {
        return category;
    }

    public void setCategory(ItemCategory category) {
        this.category = category;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

}