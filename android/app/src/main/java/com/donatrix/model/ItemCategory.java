package com.donatrix.model;

public enum ItemCategory {
    CLOTHING("Clothing"),
    HAT("Hat"),
    KITCHEN("Kitchen"),
    ELECTRONICS("Electronics"),
    HOUSEHOLD("Household"),
    OTHER("Other");

    private String category;

    public ItemCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return this.category;
    }
}
