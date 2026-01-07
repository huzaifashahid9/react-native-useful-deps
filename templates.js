// Component templates for project scaffolding

const templates = {
  customButton: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/color';

const CustomButton = ({
  title,
  onPress,
  disabled = false,
  style,
  backgroundColor,
  textColor,
}) => {
  // If backgroundColor is provided, use solid color instead of gradient
  if (backgroundColor) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={[
          styles.button,
          style,
          {
            backgroundColor: disabled ? '#ccc' : backgroundColor,
            padding: 20,
            borderColor: colors.black,
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: textColor || colors.black }]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  // Default gradient behavior
  return (
    <LinearGradient
      colors={disabled ? ['#ccc', '#ccc'] : ['#FFD601', '#E19502']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.button, style, { padding: 0, width: '100%' }]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={{
          padding: 20,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
`,

  customDropdown: `import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../utils/color.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const screenHeight = Dimensions.get('window').height;
const DROPDOWN_MAX_HEIGHT = 200;
const DROPDOWN_ITEM_HEIGHT = 40;

const CustomDropdown = ({
  data,
  placeholder,
  onSelect,
  icon,
  iconType = 'MaterialIcons',
  iconColor = '#AAA',
  iconSize = 20,
  label,
  image,
  wrapper_style,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || placeholder || 'Select',
  );
  const [dropdownDirection, setDropdownDirection] = useState('down');
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, [isOpen]);


  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);


  const handleSelect = item => {
    setSelectedValue(item);
    onSelect(item);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (containerRef.current) {
      containerRef.current.measure((x, y, width, height, pageX, pageY) => {
        const spaceBelow = screenHeight - pageY - height;

        const estimatedDropdownHeight = Math.min(
          DROPDOWN_MAX_HEIGHT,
          data.length * DROPDOWN_ITEM_HEIGHT + 20,
        );

        if (
          spaceBelow < estimatedDropdownHeight &&
          pageY > estimatedDropdownHeight
        ) {
          setDropdownDirection('up');
        } else {
          setDropdownDirection('down');
        }

        setIsOpen(!isOpen);
      });
    } else {
      setIsOpen(!isOpen);
    }
  };

  const renderLeftIcon = () => {
    if (!icon && !image) return null;

    return (
      <View style={styles.leftIconWrapper}>
        {image ? (
          <Image source={image} style={styles.leftImage} resizeMode="contain" />
        ) : (
          (() => {
            const IconComponent =
              iconType === 'FontAwesome' ? FontAwesome : MaterialIcons;
            return (
              <IconComponent name={icon} size={iconSize} color={iconColor} />
            );
          })()
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, wrapper_style]} ref={containerRef}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Dropdown Button */}
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        {renderLeftIcon()}

        <Text
          style={[
            styles.selectedText,
            icon && styles.selectedTextWithIcon,
            selectedValue === placeholder || selectedValue === 'Select'
              ? styles.placeholderText
              : styles.selectedValueText,
          ]}
        >
          {selectedValue}
        </Text>

        <View style={styles.arrow_icons_wrapper}>
          <MaterialIcons
            name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            style={styles.arrow}
          />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View
          style={[
            styles.dropdownOptions,
            dropdownDirection === 'up'
              ? styles.dropdownOptionsUp
              : styles.dropdownOptionsDown,
          ]}
        >
          <ScrollView
            nestedScrollEnabled
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  selectedValue === item && styles.selectedOption,
                ]}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 8,
    height: 60,
  },
  leftIconWrapper: {
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftImage: {
    width: 20,
    height: 20,
  },
  arrow_icons_wrapper: {
    width: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    fontSize: 14,
    flex: 1,
  },
  selectedTextWithIcon: {
    marginLeft: 0,
  },
  placeholderText: {
    color: '#AAA',
  },
  selectedValueText: {
    color: '#000',
  },
  arrow: {
    fontSize: 20,
    color: '#AAA',
  },
  dropdownOptions: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 10,
    paddingVertical: 5,
    maxHeight: DROPDOWN_MAX_HEIGHT,
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownOptionsDown: {
    top: 45,
    marginTop: 45,
  },
  dropdownOptionsUp: {
    bottom: 55,
    marginBottom: 5,
  },
  scrollView: {
    maxHeight: DROPDOWN_MAX_HEIGHT,
  },
  scrollViewContent: {
    paddingVertical: 5,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 12,
    color: '#000',
  },
  selectedOption: {
    backgroundColor: '#E0E0E0',
  },
});

export default CustomDropdown;
`,

  customInput: `import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../utils/color';

const CustomInput = ({
  islabelshown,
  label,
  placeholder,
  icon,
  isPassword,
  disabled,
  onChange,
  onChangeText,
  style,
  numberOfLines,
  iconType,
  multiline,
  value,
  keyboardType,
  image,
}) => {
  const [isSecure, setIsSecure] = useState(isPassword);

  return (
    <View style={styles.container}>
      {islabelshown && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          multiline && styles.inputContainerMultiline,
        ]}
      >
        {icon && (
          <FontAwesome
            name={icon}
            size={20}
            color={colors.white}
            style={styles.icon}
          />
        )}
        {image && <Image source={image} style={styles.image} />}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#AAA"
          style={[styles.input, style, multiline && styles.inputMultiline]}
          secureTextEntry={isSecure}
          autoCapitalize="none"
          editable={!disabled}
          onChangeText={onChangeText || onChange}
          value={value}
          keyboardType={keyboardType}
          numberOfLines={numberOfLines}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}

        />
        {isPassword && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <FontAwesome
              name={isSecure ? 'eye' : 'eye-slash'}
              size={20}
              color="#AAA"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    // paddingHorizontal: 20,
  },
  label: {
    color: colors.black,
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 18 : 10,
  },
  inputContainerMultiline: {
    alignItems: 'flex-start',
    minHeight: 100,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  image: {
    marginRight: 10,
    marginLeft: 5,
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: 14,
  },
  inputMultiline: {
    minHeight: 80,
    paddingTop: 8,
  },
  eyeIcon: {
    marginLeft: 10,
  },
});
`,

  header: `// components/CustomHeader/CustomHeaders.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/color';

const Header = ({ title, subTitle, description, onBack, extrastyle }) => {
  return (
    <View style={[styles.headerWrapper, extrastyle]}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>

        {!subTitle && <Text style={styles.headerTitle}>{title}</Text>}

        <View style={styles.rightSpace} />
      </View>

      {subTitle ? <Text style={styles.subTitle}>{subTitle}</Text> : null}

      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: colors.white,
    marginTop: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 2,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
  },
  rightSpace: {
    width: 40,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'left',
    color: colors.black,
  },
  description: {
    fontSize: 13,
    fontWeight: '400',
    marginVertical: 4,
    textAlign: 'left',
    color: colors.description,
  },
});
`,

  modal: `import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/color';
import CustomButton from '../CustomButton/CustomButton';

const CustomModal = ({
  visible,
  onClose,
  title,
  confirmText,
  onConfirm,
  confirmBtnStyle,
  confirmTextStyle,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Icon name="close-circle-outline" size={24} color={colors.black} />
          </TouchableOpacity>

          {/* Heading */}
          <Text style={styles.title}>{title}</Text>

          {/* Confirm Button */}
          <CustomButton
            title={confirmText}
            onPress={onConfirm}
            buttonStyle={[styles.confirmBtn, confirmBtnStyle]}
            textStyle={[styles.confirmText, confirmTextStyle]}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.black,
    textAlign: 'center',
    marginVertical: 25,
  },
  confirmBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    borderRadius: 22,
    width: '100%',
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 14,
    color: colors.black,
  },
});
`,

  circularProgressIndicator: `import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    Dimensions,
    StatusBar,
} from 'react-native';
import colors from '../../../utils/color.js';

const { width } = Dimensions.get('window');

const CircularProgressIndicator = ({
    visible = true,
    message = 'Loading...',
    showMessage = true,
    transparent = true,
    accentColor = colors.secondary,
    backgroundColor = 'rgba(0, 0, 0, 0.6)',
    size = 'medium',
    style,
    textStyle,
    ...props
}) => {
    // Animated values
    const rotate = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const dots = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]).current;

    // Size dimensions
    const getSize = () => {
        switch (size) {
            case 'small':
                return {
                    container: 70,
                    innerCircle: 60,
                    outerCircle: 70,
                    dotSize: 8,
                };
            case 'large':
                return {
                    container: 120,
                    innerCircle: 110,
                    outerCircle: 120,
                    dotSize: 14,
                };
            case 'medium':
            default:
                return {
                    container: 90,
                    innerCircle: 80,
                    outerCircle: 90,
                    dotSize: 10,
                };
        }
    };

    const sizeConfig = getSize();

    // Animation functions
    const startRotationAnimation = () => {
        const rotationAnimation = Animated.loop(
            Animated.timing(rotate, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        rotationAnimation.start();
        return rotationAnimation;
    };

    const startScaleAnimation = () => {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 400,
                easing: Easing.out(Easing.back(1.7)),
                useNativeDriver: true,
            }),
        ]).start();
    };

    const startDotsAnimation = () => {
        // Sequence of dots jumping animation
        const dotsAnimations = dots.map((dot, i) => {
            return Animated.sequence([
                Animated.delay(i * 120), // Staggered delay
                Animated.timing(dot, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
                    useNativeDriver: true,
                }),
                Animated.timing(dot, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.bezier(0.6, -0.28, 0.735, 0.045),
                    useNativeDriver: true,
                }),
            ]);
        });

        // Run the animations in a loop
        const dotsAnimation = Animated.loop(
            Animated.stagger(100, dotsAnimations)
        );
        dotsAnimation.start();
        return dotsAnimation;
    };

    // Start animations when the modal becomes visible
    useEffect(() => {
        let rotationAnimation;
        let dotsAnimation;

        if (visible) {
            rotationAnimation = startRotationAnimation();
            startScaleAnimation();
            dotsAnimation = startDotsAnimation();
        }

        return () => {
            if (rotationAnimation) {
                rotationAnimation.stop();
            }
            if (dotsAnimation) {
                dotsAnimation.stop();
            }
        };
    }, [visible]);

    // Animated styles
    const rotateInterpolate = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const scaleInterpolate = scale.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.8, 1.1, 1],
    });

    const dotTranslateY = dots.map(dot => {
        return dot.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, -15, 0],
        });
    });

    return (
        <Modal
            visible={visible}
            transparent={transparent}
            animationType="fade"
            statusBarTranslucent
            {...props}
        >
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.8)" barStyle="light-content" />
            <View style={[styles.modalContainer, { backgroundColor }]}>
                <Animated.View
                    style={[
                        styles.loaderContainer,
                        {
                            width: sizeConfig.container,
                            height: sizeConfig.container,
                            transform: [{ scale: scaleInterpolate }],
                            opacity: opacity,
                        },
                        style,
                    ]}
                >
                    {/* Outer rotating circle */}
                    <Animated.View
                        style={[
                            styles.outerCircle,
                            {
                                width: sizeConfig.outerCircle,
                                height: sizeConfig.outerCircle,
                                borderColor: accentColor,
                                transform: [{ rotate: rotateInterpolate }],
                            },
                        ]}
                    />

                    {/* Inner content */}
                    <View
                        style={[
                            styles.innerCircle,
                            {
                                width: sizeConfig.innerCircle,
                                height: sizeConfig.innerCircle,
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            },
                        ]}
                    >
                        {/* Animated dots in the center */}
                        <View style={styles.dotsContainer}>
                            {dots.map((_, index) => (
                                <Animated.View
                                    key={index}
                                    style={[
                                        styles.dot,
                                        {
                                            width: sizeConfig.dotSize,
                                            height: sizeConfig.dotSize,
                                            backgroundColor: accentColor,
                                            transform: [{ translateY: dotTranslateY[index] }],
                                        },
                                    ]}
                                />
                            ))}
                        </View>
                    </View>
                </Animated.View>

                {/* Loading message */}
                {showMessage && (
                    <Animated.Text
                        style={[
                            styles.loadingText,
                            {
                                opacity,
                                transform: [{ scale: scaleInterpolate }],
                                color: accentColor,
                            },
                            textStyle,
                        ]}
                        numberOfLines={2}
                        adjustsFontSizeToFit
                    >
                        {message}
                    </Animated.Text>
                )}
            </View>
        </Modal>
    );
};

export default CircularProgressIndicator;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    outerCircle: {
        borderWidth: 3,
        borderRadius: 100,
        borderTopColor: 'transparent',
        borderRightColor: 'rgba(255, 255, 255, 0.3)',
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
        borderLeftColor: 'rgba(255, 255, 255, 0.3)',
        position: 'absolute',
    },
    innerCircle: {
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        // Elevation for Android
        elevation: 8,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        borderRadius: 100,
        marginHorizontal: 3,
    },
    loadingText: {
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
        letterSpacing: 0.5,
        lineHeight: 22,
    },
});
`,

  customToast: `import Toast from 'react-native-toast-message';

export const showSuccessToast = message => {
  Toast.show({
    text1: 'Successfull!',
    text2: message ?? '',
    visibilityTime: 4000,
    autoHide: true,
    type: 'success', // Default type is 'success' if not provided
  });
};

export const showErrorToast = message => {
  Toast.show({
    text1: 'Error!',
    text2: message ?? '',
    visibilityTime: 4000,
    autoHide: true,
    type: 'error', // Default type is 'success' if not provided
  });
};
`,

  searchInput: `import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchInput = ({ placeholder, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#ccc" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#ccc"
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#fff',
    // marginVertical:5
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
});

export default SearchInput;
`,

  colors: `const colors = {
  primary: '#291E5A',
  secondary: '#E29501',
  secondaryGradient: ['#F4E22F', '#F9EF8B'],
  lightPurple: '#9C75CC',
  purple: '#9C75CC1A',
  link: '#7E48E2',
  white: '#ffffff',
  sky: '#1B9ADB',
  black: '#000000',
  orange: '#FF6A00',
  parrot: '#14C042',
  lightGreen: '#14C0421A',
  green: '#035D1B',
  darkGreen: '#022C35',
  lightSkyBlue: '#7ACBDD1A',
  lightSky: '#7ACBDD',
  btnsecondary: '#7ACBDD',
  skyblue: '#7ACBDD1A',
  grey: '#5F5C771A',
  description: '#737373', 
  transparent: 'transparent',
  lightYellow: '#FFD601',
  red: '#FF0000',
};

export default colors;
`,
};

module.exports = templates;
