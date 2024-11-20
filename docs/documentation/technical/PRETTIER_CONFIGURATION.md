# Prettier Configuration Documentation

## Overview
This project uses Prettier for consistent code formatting across the codebase. The configuration is optimized for React and TypeScript development, with specific settings to ensure code readability and maintainability.

## Configuration Structure

### Basic Formatting
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80
}
```
- `semi`: Adds semicolons at the end of statements
- `singleQuote`: Uses single quotes for strings
- `tabWidth`: Sets indentation to 2 spaces
- `printWidth`: Limits line length to 80 characters

### Object and Array Formatting
```json
{
  "trailingComma": "es5",
  "bracketSpacing": true,
  "bracketSameLine": false
}
```
- `trailingComma`: Adds trailing commas in objects and arrays (ES5 compatible)
- `bracketSpacing`: Adds spaces between brackets in object literals
- `bracketSameLine`: Places closing brackets on new lines

### Function and Expression Formatting
```json
{
  "arrowParens": "always",
  "singleAttributePerLine": true,
  "quoteProps": "as-needed"
}
```
- `arrowParens`: Always adds parentheses around arrow function parameters
- `singleAttributePerLine`: Places JSX attributes on separate lines
- `quoteProps`: Only adds quotes around object properties when needed

### File and Text Handling
```json
{
  "endOfLine": "lf",
  "proseWrap": "preserve",
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css"
}
```
- `endOfLine`: Uses LF (Unix-style) line endings
- `proseWrap`: Preserves existing text wrapping
- `embeddedLanguageFormatting`: Automatically formats embedded code
- `htmlWhitespaceSensitivity`: Respects CSS display property in HTML formatting

### JSX and React
```json
{
  "jsxSingleQuote": false
}
```
- `jsxSingleQuote`: Uses double quotes for JSX attributes

### Plugins
```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```
- Includes Tailwind CSS plugin for proper class sorting

## Integration

### 1. Editor Integration
- Install Prettier extension in your editor
- Configure format on save
- Use editor-specific settings:
  ```json
  {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
  ```

### 2. Pre-commit Hooks
- Use with Husky for pre-commit formatting
- Example `.husky/pre-commit` configuration:
  ```bash
  #!/bin/sh
  npx prettier --write .
  ```

### 3. CI/CD Integration
- Add Prettier check to CI pipeline
- Example GitHub Actions step:
  ```yaml
  - name: Check formatting
    run: npx prettier --check .
  ```

## Best Practices

### 1. File Organization
- Keep configuration in root directory
- Use `.prettierignore` for excluding files
- Include configuration in version control

### 2. Code Style
- Don't override Prettier with ESLint rules
- Use consistent configuration across projects
- Document any non-standard settings

### 3. Workflow Integration
- Format before committing
- Run format check in CI
- Keep configuration synchronized with team

## Troubleshooting

### Common Issues

1. **Conflicts with ESLint**
   - Use `eslint-config-prettier` to disable conflicting rules
   - Add to ESLint configuration:
     ```json
     {
       "extends": ["prettier"]
     }
     ```

2. **Inconsistent Formatting**
   - Ensure same Prettier version across team
   - Use exact version in package.json
   - Share .prettierrc across team

3. **Format on Save Not Working**
   - Check editor configuration
   - Verify Prettier extension installation
   - Confirm file is not in .prettierignore

### Solutions

1. **Editor Configuration**
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "[javascript]": {
       "editor.defaultFormatter": "esbenp.prettier-vscode"
     },
     "[typescript]": {
       "editor.defaultFormatter": "esbenp.prettier-vscode"
     }
   }
   ```

2. **Ignore Specific Lines**
   ```javascript
   // prettier-ignore
   const unformattedCode = matrix(
     1, 0, 0,
     0, 1, 0,
     0, 0, 1
   );
   ```

## Version Control

### .prettierignore
Example configuration:
```plaintext
build/
dist/
coverage/
node_modules/
*.min.js
```

### Package.json Scripts
Recommended scripts:
```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```
