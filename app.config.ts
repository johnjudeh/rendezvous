export default {
  "name": "Rendez Vous",
  "description": "An app that helps friends connect in big cities",
  "slug": "rendezvous",
  "version": "1.0.0",
  "orientation": "portrait",
  "backgroundColor": "#FAFAFA",
  "primaryColor": "#F97958",
  "icon": "./assets/icon.png",
  "androidStatusBar": {
    "barStyle": "light-content",
    "backgroundColor": "#353745"
  },
  "androidNavigationBar": {
    "barStyle": "dark-content",
    "backgroundColor": "#F0F0EF"
  },
  "splash": {
    "image": "./assets/splash.png",
    "backgroundColor": "#353745"
  },
  "updates": {
    "fallbackToCacheTimeout": 0,
    "url": "https://u.expo.dev/1c669adb-c73b-407c-9f79-bb9a1d6a4555"
  },
  "assetBundlePatterns": ["**/*"],
  "ios": {
    "bundleIdentifier": "guide.rendezvous.rendezvous",
    "buildNumber": "1.0.4",
    "supportsTablet": false,
    "infoPlist": {
      "NSLocationWhenInUseUsageDescription": "Your location is used to find nearby places to meet friends"
    },
    "config": {
      "googleMapsApiKey": process.env.IOS_GOGGLE_MAPS_API_KEY,
      "usesNonExemptEncryption": false
    }
  },
  "android": {
    "package": "guide.rendezvous.rendezvous",
    "versionCode": 4,
    "adaptiveIcon": {
      "foregroundImage": "./assets/icon.foreground.png",
      "backgroundColor": "#F97958"
    },
    "permissions": ["ACCESS_FINE_LOCATION"],
    "config": {
      "googleMaps": {
        "apiKey": process.env.ANDROID_GOGGLE_MAPS_API_KEY
      }
    }
  },
  "plugins": ["expo-font"],
  "extra": {
    "eas": {
      "projectId": "1c669adb-c73b-407c-9f79-bb9a1d6a4555"
    },
    "googlePlacesApiKey": process.env.GOOGLE_PLACES_API_KEY,
  },
  "runtimeVersion": {
    "policy": "appVersion"
  }
}
