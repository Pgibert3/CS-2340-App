Donatrix
========

Donatrix is an Android application built to benefit non-profit organizations
by tracking donations of goods. We want to answer questions like:
 - What is the donation rate at a particular location?
 - What is the distribution rate at a particular location?
 - What is the inventory turnover rate?
 - What were donations and distributions for a particular day?
 - What items were available at a particular location?

Features
--------

- Permission/role system for instancing different types of user (Admin, User, Location Employee, Manager)
- Location information including Unique Key, Location Name, Location, Type, Phone Number, and Website Link
- Donation info like Time Stamp of Donation, Location of Destination, Short Description of Item,
    Full Description of Item, Value, Category, Comments, and Picture
- A login page designed to restrict access to the Donatrix and lock user accounts for 3 failed login attempts
- A Search function that allows users to view items, categories, and locations
- Incorporating Google Maps into the Location screen

Installation
------------

Run the Android emulator:

1) install nodejs
2) navigate to source directory and run the following command:
     `npm install`
3) create a random Android Studio Project
     > Use API 26 Oreo 8.0 (You may have to download it tools > sdk manager)
     > Create a emulator that uses the above settings
4) run the emulator you just created
5) in terminal run: `npm run android`

Notes: After step 5, node will open a seperate terminal and attempt to build
the project. If the build fails it is unlikely the emulator will be unable to
reload the js (tapping 'r' twice normally reloads the js). You will have to
close the node terminal and repeat step 5. For reload via double tapping 'r'
or live reload, most of the time the emulator has to successfully build on
start up. Errors introduced to the code after the first sucessfull build
will not impact reloading.

Enter DEBUG mode:
    1) Run Emulator
    2) enter adb logcat *:S ReactNative:V ReactNativeJS:V
    see https://facebook.github.io/react-native/docs/debugging for troubleshooting
