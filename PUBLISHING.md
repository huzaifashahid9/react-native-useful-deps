# Publishing Guide for react-native-useful-deps

## Before Publishing

### 1. Update package.json
- Replace `"author": "Your Name"` with your actual name
- Update the repository URLs with your GitHub username/repo
- Consider updating the version to `0.1.0` for initial beta release

### 2. Create an npm Account
If you don't have one:
1. Go to https://www.npmjs.com/signup
2. Create your account
3. Verify your email

### 3. Login to npm from Terminal
```bash
npm login
```
Enter your credentials when prompted.

## Publishing Steps

### 1. Test Locally First
Test your package locally before publishing:
```bash
# In the package directory
npm link

# In a test React Native project
npm link react-native-useful-deps
rn-install-deps
```

### 2. Check Package Contents
See what will be published:
```bash
npm pack --dry-run
```

### 3. Publish to npm
For first-time publishing:
```bash
npm publish
```

For subsequent updates:
```bash
# Update version first
npm version patch  # or minor, or major
npm publish
```

## Post-Publishing

### 1. Test Installation
```bash
npx react-native-useful-deps
```

### 2. Create GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/react-native-useful-deps.git
git push -u origin main
```

### 3. Add GitHub Topics
Add these topics to your GitHub repo for better discoverability:
- react-native
- cli
- npm-package
- dependencies
- automation
- boilerplate

## Version Management

Follow semantic versioning (semver):
- **Patch** (1.0.X): Bug fixes
- **Minor** (1.X.0): New features (backwards compatible)
- **Major** (X.0.0): Breaking changes

Update version:
```bash
npm version patch -m "Fix: bug description"
npm version minor -m "Feature: new feature description"
npm version major -m "Breaking: description of breaking change"
```

Then publish:
```bash
npm publish
git push --tags
```

## Maintenance

### Adding New Dependencies
1. Edit `index.js` and add the package name to the `dependencies` array
2. Test locally
3. Update version in package.json
4. Publish update

### Updating Documentation
Keep README.md updated with:
- New packages added
- Usage examples
- Configuration requirements
- Known issues

## Marketing Your Package

1. **Create a demo GIF** showing the installation process
2. **Write a blog post** about why you created this
3. **Share on social media**:
   - Twitter/X
   - Reddit (r/reactnative)
   - Dev.to
   - Hashnode
4. **Add badges to README**:
   ```markdown
   ![npm version](https://badge.fury.io/js/react-native-useful-deps.svg)
   ![npm downloads](https://img.shields.io/npm/dm/react-native-useful-deps.svg)
   ```

## Tips

- **Start with version 0.1.0** to indicate it's in beta
- **Test thoroughly** in multiple React Native projects before advertising
- **Respond quickly** to issues on GitHub
- **Keep dependencies updated** - your tool's dependencies (chalk, ora, axios)
- **Consider adding a CLI flag** for selecting specific categories (e.g., --navigation-only)

## Unpublishing (if needed)

You can unpublish within 72 hours:
```bash
npm unpublish react-native-useful-deps@<version>
```

After 72 hours, you can only deprecate:
```bash
npm deprecate react-native-useful-deps@<version> "Reason for deprecation"
```
