package com.donatrix.dao;

import android.app.IntentService;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;

import com.donatrix.MainApplication;
import com.donatrix.model.UserType;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;

public class UserDaoService extends IntentService {
    private Context context;

    public UserDaoService() {
        super("UserDaoService");
    }

    private void registerUser(String email, String password, String name, boolean locked, String type) throws IllegalArgumentException {
        Database.getInstance(this.context).registerUser(email, password, name, locked, UserType.valueOf(type));
    }

    private boolean checkRegisteredUser(String email, String password) {
        return Database.getInstance(this.context).checkRegisteredUser(email, password);
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        MainApplication application = (MainApplication) this.getApplication();
        ReactNativeHost reactNativeHost = application.getReactNativeHost();
        ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
        this.context = reactInstanceManager.getCurrentReactContext();

        Intent response = new Intent("RESPONSE");

        switch(intent.getStringExtra("METHOD")) {
            case "Register":
                String email = intent.getStringExtra("EMAIL");
                String password = intent.getStringExtra("PASS");
                String name = intent.getStringExtra("NAME");
                boolean locked = intent.getBooleanExtra("LOCKED", false);
                String type = intent.getStringExtra("TYPE");
                try {
                    this.registerUser(email, password, name, locked, type);
                    response.putExtra("RESPONSE", "SUCCESS");
                } catch (Exception e) {
                    response.putExtra("RESPONSE", e.getMessage());
                }
                break;
            case "Login":
                email = intent.getStringExtra("EMAIL");
                password = intent.getStringExtra("PASS");
                response.putExtra("RESPONSE", this.checkRegisteredUser(email, password));
                break;
        }
        sendBroadcast(response);
    }
}
