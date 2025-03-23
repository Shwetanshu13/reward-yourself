# Task Progress & Reward App

A simple **React Native** app built with **Expo** that helps track progress towards a goal. Once the user reaches a count of 10, they have a 50% chance to receive a reward. The progress is stored locally using SQLite for offline access, and it resets at midnight or when a reward is claimed.

## Features 🚀

- Track progress with a **count system** (max: 10)
- **Animated progress bar** that fills up with each increment
- **Rewards system** with a 50% chance of success
- **Persistent storage** using SQLite (via `expo-sqlite`)
- **Auto-reset** of progress at midnight or after reward claim
- **Smooth UI/UX** with React Native styling

---

## Building for Android & iOS 📱

### **Android (APK)**

To generate an APK:

```sh
eas build -p android --profile preview
```

- Once built, download the APK and share it with friends.

### **iOS (IPA - TestFlight)**

⚠️ Requires Mac & Apple Developer Account

```sh
eas build -p ios
```

- Upload the generated `.ipa` to TestFlight for distribution.

---

## Tech Stack 🛠️

- **React Native** (Expo)
- **SQLite** (`expo-sqlite` for offline storage)
- **Animated API** (for smooth progress bar animation)
- **Expo EAS** (for builds & deployment)

---

## Screenshots 📸

(Attach relevant images here)

---

## Future Enhancements 🔥

- **Custom Rewards**: Users can set their own rewards.
- **Push Notifications**: Reminder notifications to complete tasks.
- **Dark Mode**: UI theme support for better accessibility.

---

## Author 💡

- **Your Name** ([GitHub](https://github.com/Shwetanshu13))
