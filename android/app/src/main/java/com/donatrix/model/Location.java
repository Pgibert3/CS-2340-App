package com.donatrix.model;

import java.io.Serializable;

public class Location implements Serializable {
    private String name;
    private String latitude;
    private String longitude;
    private String address;
    private String city;
    private String state;
    private String zip;
    private LocationType locationType;
    private String number;
    private String website;

    public Location(String[] info) {
        this.setName(info[1]);
        this.setLatitude(info[2]);
        this.setLongitude(info[3]);
        this.setAddress(info[4]);
        this.setCity(info[5]);
        this.setState(info[6]);
        this.setZip(info[7]);
        this.setLocationType(LocationType.valueOf(info[8].replace(" ", "").toUpperCase()));
        this.setNumber(info[9]);
        this.setWebsite(info[10]);
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCity() {
        return city;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getZip() {
        return zip;
    }

    public void setLocationType(LocationType locationType) {
        this.locationType = locationType;
    }

    public LocationType getLocationType() {
        return locationType;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getNumber() {
        return number;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getWebsite() {
        return website;
    }

    @Override
    public String toString() {
        return String.format("%s | %s | %s | %s | %s | %s | %s | %s | %s | %s", name, latitude, longitude, address, city, state, zip, locationType.getType(), number, website);
    }
}
