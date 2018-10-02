
# react-native-toast-lib

## Getting started

`$ npm install react-native-toast-lib --save`

### Mostly automatic installation

`$ react-native link react-native-toast-lib`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-toast-lib` and add `RNToastLib.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNToastLib.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNToastLibPackage;` to the imports at the top of the file
  - Add `new RNToastLibPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-toast-lib'
  	project(':react-native-toast-lib').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-toast-lib/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-toast-lib')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNToastLib.sln` in `node_modules/react-native-toast-lib/windows/RNToastLib.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Toast.Lib.RNToastLib;` to the usings at the top of the file
  - Add `new RNToastLibPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNToastLib from 'react-native-toast-lib';

// TODO: What to do with the module?
RNToastLib;
```
  