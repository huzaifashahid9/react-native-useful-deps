# React Native Useful Dependencies

A CLI tool to automatically install commonly used React Native libraries with their latest versions and scaffold a complete component structure for your project.

##  Quick Start

You can use this package directly with `npx` without installing it globally:

```bash
npx react-native-useful-deps
```

Or install it globally:

```bash
npm install -g react-native-useful-deps
rn-install-deps
```

##  What Gets Installed

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

### State Management
- `@reduxjs/toolkit`
- `react-redux`

### Utilities
- `axios`
- `@react-native-async-storage/async-storage`
- `@react-native-community/datetimepicker`
- `react-native-maps`
- `react-native-reanimated`
- `react-native-toast-message`

##  Component Scaffolding

This tool also creates a complete component structure with production-ready code:

```
src/
├── components/
│   ├── CustomButton/
│   │   └── CustomButton.jsx
│   ├── CustomDropdown/
│   │   └── CustomDropdown.jsx
│   ├── CustomInput/
│   │   └── CustomInput.jsx
│   ├── Header/
│   │   └── Header.jsx
│   ├── Modal/
│   │   └── Modal.jsx
│   └── Common/
│       ├── CircularProgressIndicator.jsx
│       ├── CustomToast.jsx
│       └── SearchInput.jsx
└── utils/
    └── color.js
```

All components come with:
- Complete, production-ready code
- Proper styling with StyleSheet
- Integration with react-native-vector-icons
- Color theming support
- Full customization options

###  Component Details

#### CustomButton
A versatile button component with gradient and solid color support.
-  Gradient background (default) or solid color
-  Disabled state handling
-  Customizable colors and styles
-  Built with `react-native-linear-gradient`

#### CustomDropdown
Advanced dropdown with smooth animations.
-  Auto-adjusts position (up/down) based on available space
-  Supports icons and images
-  Customizable label and placeholder
-  Scrollable options list

#### CustomInput
Feature-rich text input component.
-  Password visibility toggle
-  Icon and image support
-  Multiline support
-  Label display option

#### Header
Flexible header component with navigation.
-  Back button with custom action
-  Title/subtitle support
-  Optional description text
-  Customizable styling

#### Modal
Clean and simple modal dialog.
-  Fade animation
-  Close button
-  Confirmation action support
-  Customizable styling

#### CircularProgressIndicator (Common)
Beautiful animated loading indicator.
-  Smooth rotating animation
-  Jumping dots animation
-  Size options (small/medium/large)
-  Custom colors and messages

#### CustomToast (Common)
Toast notification utilities using `react-native-toast-message`.
-  `showSuccessToast(message)`
-  `showErrorToast(message)`
-   Auto-hide with 4s duration

#### SearchInput (Common)
Simple search input with icon.
-  Search icon integration
-  Clean styling
-  onChange callback support

#### Color Utility
Complete color palette in `src/utils/color.js` with 20+ predefined colors including primary, secondary, status colors, and gradients.

##  Post-Installation Steps

After installation, some packages may require additional configuration:

### For iOS (macOS only):
```bash
npx pod-install
```

### React Native Reanimated
Add the Reanimated plugin to your `babel.config.js`:
```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-worklets/plugin',]
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

##  Why Use This?

- **Time-Saving**: Install 27+ essential dependencies with a single command
- **Always Up-to-Date**: Automatically fetches the latest versions from npm
- **Zero Configuration**: No manual version management needed
- **Battle-Tested**: Includes only widely-used, production-ready libraries
- **Complete Structure**: Auto-generates production-ready components and utilities

##  Usage in Existing Projects

Run this command in your existing React Native project root:

```bash
npx react-native-useful-deps
```

The tool will automatically detect whether you're using npm or Yarn and use the appropriate package manager.

##  Contributing

Suggestions for additional packages? Open an issue or pull request!

##  License

MIT

##  Author

Huzaifa Shahid

---

**Note**: Always review and test new dependencies in your project before deploying to production.
