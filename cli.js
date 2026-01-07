#!/usr/bin/env node

const { execSync } = require('child_process');
const { dependencies, fetchLatestVersions } = require('./index');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const templates = require('./templates');

console.log(chalk.cyan.bold('\n🚀 React Native Useful Dependencies Installer\n'));

const spinner = ora('Fetching latest versions from npm...').start();

(async () => {
  try {
    // Fetch latest versions
    const versions = await fetchLatestVersions();
    spinner.succeed('Latest versions fetched successfully!');

    // Create install command
    const packagesToInstall = dependencies.map(dep => {
      return `${dep}@${versions[dep]}`;
    }).join(' ');

    console.log(chalk.yellow('\n📦 Installing the following packages:\n'));
    dependencies.forEach(dep => {
      console.log(chalk.gray(`  • ${dep}@${versions[dep]}`));
    });

    console.log(chalk.yellow('\n⏳ Installing dependencies... This may take a few minutes.\n'));

    const installSpinner = ora('Installing packages...').start();

    try {
      // Detect package manager
      const useYarn = checkYarnAvailable();
      const packageManager = useYarn ? 'yarn' : 'npm';
      
      if (useYarn) {
        installSpinner.text = 'Installing packages with Yarn...';
        execSync(`yarn add ${packagesToInstall}`, { stdio: 'inherit' });
      } else {
        installSpinner.text = 'Installing packages with npm...';
        execSync(`npm install ${packagesToInstall}`, { stdio: 'inherit' });
      }

      installSpinner.succeed(chalk.green('✅ All dependencies installed successfully!'));
      
      // Create folder structure
      console.log(chalk.yellow('\n📁 Creating project structure...\n'));
      const folderSpinner = ora('Setting up folders and components...').start();
      
      try {
        createProjectStructure();
        folderSpinner.succeed(chalk.green('✅ Project structure created successfully!'));
      } catch (error) {
        folderSpinner.fail('Failed to create project structure');
        console.error(chalk.red('Error:'), error.message);
      }
      
      console.log(chalk.cyan.bold('\n🎉 Setup Complete!\n'));
      console.log(chalk.gray('Note: Some packages may require additional setup:'));
      console.log(chalk.gray('  • Run `npx pod-install` for iOS dependencies'));
      console.log(chalk.gray('  • Follow setup instructions for react-native-vector-icons'));
      console.log(chalk.gray('  • Configure react-native-reanimated in babel.config.js\n'));

    } catch (error) {
      installSpinner.fail('Failed to install dependencies');
      console.error(chalk.red('\n❌ Installation failed:'), error.message);
      process.exit(1);
    }

  } catch (error) {
    spinner.fail('Failed to fetch package versions');
    console.error(chalk.red('\n❌ Error:'), error.message);
    process.exit(1);
  }
})();


function checkYarnAvailable() {
  try {
    execSync('yarn --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Creates the project folder structure
 */
function createProjectStructure() {
  const cwd = process.cwd();
  
  // Create src/components directory
  const componentsPath = path.join(cwd, 'src', 'components');
  const utilsPath = path.join(cwd, 'src', 'utils');
  
  // Create directories
  if (!fs.existsSync(componentsPath)) {
    fs.mkdirSync(componentsPath, { recursive: true });
  }
  
  if (!fs.existsSync(utilsPath)) {
    fs.mkdirSync(utilsPath, { recursive: true });
  }
  
  // Component configurations
  const components = [
    { name: 'CustomButton', file: 'CustomButton.jsx', template: templates.customButton },
    { name: 'CustomDropdown', file: 'CustomDropdown.jsx', template: templates.customDropdown },
    { name: 'CustomInput', file: 'CustomInput.jsx', template: templates.customInput },
    { name: 'Header', file: 'Header.jsx', template: templates.header },
    { name: 'Modal', file: 'Modal.jsx', template: templates.modal },
  ];
  
  // Common folder files
  const commonFiles = [
    { file: 'CircularProgressIndicator.jsx', template: templates.circularProgressIndicator },
    { file: 'CustomToast.jsx', template: templates.customToast },
    { file: 'SearchInput.jsx', template: templates.searchInput },
  ];
  
  // Create component folders and files
  components.forEach(({ name, file, template }) => {
    const componentPath = path.join(componentsPath, name);
    const filePath = path.join(componentPath, file);
    
    if (!fs.existsSync(componentPath)) {
      fs.mkdirSync(componentPath, { recursive: true });
    }
    
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, template, 'utf8');
    }
  });
  
  // Create Common folder and files
  const commonPath = path.join(componentsPath, 'Common');
  if (!fs.existsSync(commonPath)) {
    fs.mkdirSync(commonPath, { recursive: true });
  }
  
  commonFiles.forEach(({ file, template }) => {
    const filePath = path.join(commonPath, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, template, 'utf8');
    }
  });
  
  // Create utils/color.js
  const colorFilePath = path.join(utilsPath, 'color.js');
  if (!fs.existsSync(colorFilePath)) {
    fs.writeFileSync(colorFilePath, templates.colors, 'utf8');
  }
  
  // Display created files
  console.log(chalk.gray('\n  Created components:'));
  components.forEach(({ name, file }) => {
    console.log(chalk.gray(`  ✓ src/components/${name}/${file}`));
  });
  
  console.log(chalk.gray('\n  Created common utilities:'));
  commonFiles.forEach(({ file }) => {
    console.log(chalk.gray(`  ✓ src/components/Common/${file}`));
  });
  
  console.log(chalk.gray('\n  Created utils:'));
  console.log(chalk.gray(`  ✓ src/utils/color.js`));
}
