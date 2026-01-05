#!/usr/bin/env node

const { execSync } = require('child_process');
const { dependencies, fetchLatestVersions } = require('./index');
const chalk = require('chalk');
const ora = require('ora');

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
