# Bestdit (bestdit)

The best content from Reddit showcased in one app.

Check it out here: https://bestdit.vercel.app/

100% cross-platform with a single codebase.

Made with [Quasar Framework](https://quasar.dev/) - A [VueJS](https://vuejs.org/) framework.

## Features

- 100% cross-platform with a single open-source codebase
- Dark mode
- Infinite scroll
- Pull down to refresh
- i18n
  - EN
  - PT

## Builds

Check [releases](https://github.com/nunogois/bestdit/releases).

### [PWA (Progressive Web App - Web app that anyone can optionally install through the browser)](https://quasar.dev/quasar-cli/developing-pwa/introduction)

<img src="https://github.com/nunogois/bestdit/blob/master/demo_screenshots/chrome_pwa.jpg?raw=true" height="400" alt="Bestdit PWA on Google Chrome" />
<img src="https://github.com/nunogois/bestdit/blob/master/demo_screenshots/chrome_mobile_pwa_emulator.jpg?raw=true" height="400" alt="Bestdit running on Android Studio emulator" />

The images show Bestdit on Google Chrome, on desktop and mobile. On the desktop screenshot, in the top right corner you can see the default option to install the PWA. On the second image you can see "Add to Home screen" at the bottom.

This is the default web app. You can "install" the PWA through the options on the right drawer.

### [Capacitor (Mobile - Android, iOS)](https://quasar.dev/quasar-cli/developing-capacitor-apps/introduction)

<img src="https://github.com/nunogois/bestdit/blob/master/demo_screenshots/android_studio_emulator.jpg?raw=true" height="400" alt="Bestdit running on Android Studio emulator" />

The image shows Bestdit running on Android Studio's emulator. You may try the app on your Android phone after installing the **.apk**.

I can't build iOS apps because I don't have a Mac at the moment. If you have one, simply follow the steps if you wish to build the app.

### [Electron (Desktop - Windows, Linux, MacOS)](https://quasar.dev/quasar-cli/developing-electron-apps/introduction)

<img src="https://github.com/nunogois/bestdit/blob/master/demo_screenshots/windows_electron.jpg?raw=true" height="400" alt="Bestdit running on Windows" />

The image shows Bestdit running on Windows after installing the **.exe**.

I will only build for Windows because that's the platform I'm using at the moment. Feel free to build for other platforms.

## Using

- TypeScript
- Vue-i18n
- Axios
- Sass (indented syntax)
- ESLint
- Prettier

## Other

[Bestdit icon](https://www.flaticon.com/free-icon/trophy_3112946) made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>

## To Do

- [x] Main page
- [x] Main layout
- [x] User drawer (on the right)
- [x] Dark theme
- [x] Post component
- [x] Loading skeleton
- [x] Load posts
- [x] Infinite scroll
- [x] Pull down to refresh
- [x] Vue-i18n (EN + PT)
- [x] App icon
- [x] Add meta tags
- [x] GitHub repo
- [x] Basic video support
- [x] Setup builds (PWA, Windows, Android, etc)
- [ ] Welcome page
- [ ] Add options to user drawer (on the right)
- [ ] Local storage
- [ ] Configure subreddits
- [ ] Like / favorite
- [ ] Show favorites
- [ ] Virtual scroll?
- [ ] Share component
- [ ] Auth
- [ ] Advanced video support
