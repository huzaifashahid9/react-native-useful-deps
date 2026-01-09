const axios = require('axios');

const dependencies = [
  '@gorhom/bottom-sheet',
  '@react-native-async-storage/async-storage',
  '@react-native-community/datetimepicker',
  '@react-native-community/slider',
  '@react-navigation/bottom-tabs',
  '@react-navigation/drawer',
  '@react-navigation/native',
  '@react-navigation/native-stack',
  '@reduxjs/toolkit',
  'axios',
  'formik',
  'react-native-fast-image',
  'react-native-gesture-handler',
  'react-native-image-picker',
  'react-native-linear-gradient',
  'react-native-maps',
  'react-native-modal',
  'react-native-reanimated',
  'react-native-worklets',
  'react-native-safe-area-context',
  'react-native-screens',
  'react-native-size-matters',
  'react-native-toast-message',
  'react-native-vector-icons',
  'react-native-video',
  'react-redux',
  'rn-range-slider',
  'yup'
];


async function getLatestVersion(packageName) {
  try {
    const response = await axios.get(`https://registry.npmjs.org/${packageName}/latest`);
    return response.data.version;
  } catch (error) {
    console.error(`Failed to fetch version for ${packageName}:`, error.message);
    return 'latest';
  }
}


async function fetchLatestVersions() {
  const versions = {};
  
  for (const dep of dependencies) {
    const version = await getLatestVersion(dep);
    versions[dep] = version;
  }
  
  return versions;
}

module.exports = {
  dependencies,
  getLatestVersion,
  fetchLatestVersions
};
