How to run the Android Emulator:

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
