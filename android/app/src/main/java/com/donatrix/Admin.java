package com.donatrix;

/**
 * Created by parkerharris on 10/11/18.
 */

public class Admin {
<<<<<<< HEAD

    private String name;
    private String email;
    private String password;

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
=======
    private String email;
    private String password;
    private String name;
    private boolean accountState;

    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail() {
        return this.email;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getPassword() {
        return this.password;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getName() {
        return this.name;
    }
    public void setAccountState(boolean accountState) {
        this.accountState = accountState;
    }
    public boolean getAccountState() {
        return this.accountState;
>>>>>>> ac285ecc880b2e463616fe1c929e2d653b884d32
    }
}
