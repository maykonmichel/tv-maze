# [TVMaze](https://www.tvmaze.com/)

###### An application for listing TV series, using the API provided by the TVMaze website.

## Setting up

To run the project you need to copy `.env.example` to `.env`

#### Run instructions for iOS:

 ```bash
npx react-native run-ios
```

or

- Open test/ios/test.xcodeproj in Xcode or run "xed -b ios"
- Hit the Run button

#### Run instructions for Android

Have an Android emulator running (quickest way to get started), or a device connected.

 ```bash
npx react-native run-android
```

## Features

- List all of the series contained in the API used by the paging scheme provided by the API
- Allow users to search series by name
- The listing and search views must show at least the name and poster image of the series
- After clicking on a series, the application should show the details of the series, showing the following information:
    - Name
    - Poster
    - Days and time during which the series airs
    - Genres
    - Summary
    - List of episodes separated by season
- After clicking on an episode, the application should show the episode’s information, including:
    - Name
    - Number
    - Season
    - Summary
    - Image, if there is one
- Icon
- Splash screen

## License

React Native is MIT licensed, as found in the [LICENSE](https://github.com/maykonmichel/tv-maze/blob/master/LICENSE) file.

