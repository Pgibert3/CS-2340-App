package com.donatrix;

public class User {

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
    }
}
