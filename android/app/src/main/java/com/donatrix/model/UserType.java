package com.donatrix.model;

public enum UserType {
    ADMIN("ADMIN"),
    LOCATION_EMPLOYEE("LOCATION_EMPLOYEE"),
    MANAGER("MANAGER"),
    USER("USER");

    private String type;

    public String getType() {
        return this.type;
    }

    UserType(String type) {
        this.type = type;
    }
}
