# React Native Useful Dependencies

A CLI tool to automatically install commonly used React Native libraries with their latest versions.

## 🚀 Quick Start

You can use this package directly with `npx` without installing it globally:

```bash
npx react-native-useful-deps
```

Or install it globally:

```bash
npm install -g react-native-useful-deps
rn-install-deps
```

## 📦 What Gets Installed

This tool automatically installs the following popular React Native packages with their latest versions:

### Navigation
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`
- `@react-navigation/drawer`
- `react-native-screens`
- `react-native-safe-area-context`
- `react-native-gesture-handler`

### UI Components
- `@gorhom/bottom-sheet`
- `react-native-modal`
- `react-native-vector-icons`
- `react-native-linear-gradient`
- `react-native-size-matters`
- `@react-native-community/slider`
- `rn-range-slider`

### Media & Files
- `react-native-fast-image`
- `react-native-image-picker`
- `react-native-video`

### Forms & Validation
- `formik`
- `yup`

### Utilities
- `axios`
- `@react-native-async-storage/async-storage`
- `@react-native-community/datetimepicker`
- `react-native-maps`
- `react-native-reanimated`

## 🛠️ Post-Installation Steps

After installation, some packages may require additional configuration:

### For iOS (macOS only):
```bash
npx pod-install
```

### React Native Reanimated
Add the Reanimated plugin to your `babel.config.js`:
```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

### React Native Vector Icons
Follow the [setup instructions](https://github.com/oblador/react-native-vector-icons#installation) for linking fonts.

### React Native Gesture Handler
Wrap your app entry point with `GestureHandlerRootView`:
```javascript
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app code */}
    </GestureHandlerRootView>
  );
}
```

## 🤔 Why Use This?

- **Time-Saving**: Install all common dependencies with a single command
- **Always Up-to-Date**: Automatically fetches the latest versions from npm
- **Zero Configuration**: No manual version management needed
- **Battle-Tested**: Includes only widely-used, production-ready libraries

## 📝 Usage in Existing Projects

Run this command in your existing React Native project root:

```bash
npx react-native-useful-deps
```

The tool will automatically detect whether you're using npm or Yarn and use the appropriate package manager.

## 🤝 Contributing

Suggestions for additional packages? Open an issue or pull request!

## 📄 License

MIT

## 👨‍💻 Author

Huzaifa Shahid

---

**Note**: Always review and test new dependencies in your project before deploying to production.
