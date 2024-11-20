# ESLint Configuration Documentation

## Overview
The project uses ESLint for static code analysis and enforcing consistent code quality standards. The configuration is optimized for React and TypeScript development, with specific rules for maintaining code quality and preventing common errors.

## Configuration Structure

### Environment Configuration
```json
{
  "root": true,
  "env": {
    "browser": true,
    "es2022": true,
    "node": true
  }
}
```
- `root`: Marks this as the root configuration
- `browser`: Enables browser globals
- `es2022`: Supports latest ECMAScript features
- `node`: Enables Node.js globals

### Extended Configurations
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ]
}
```
- Base ESLint recommendations
- TypeScript-specific rules
- React best practices
- React Hooks guidelines

### Parser Configuration
```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```
- Uses TypeScript parser
- Latest ECMAScript features
- Module-based code
- JSX support

### Plugins
```json
{
  "plugins": [
    "@typescript-eslint",
    "react",
    "react-hooks"
  ]
}
```
- TypeScript-specific linting
- React-specific rules
- React Hooks rules

### React Settings
```json
{
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```
- Automatic React version detection
- Configures React-specific rules

## Custom Rules

### React Rules
```json
{
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```
- Disables React import requirement (using new JSX transform)
- Disables prop-types (using TypeScript instead)
- Enforces Hooks rules
- Warns about missing dependencies in Hooks

### TypeScript Rules
```json
{
  "rules": {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", {
      "argsIgnorePattern": "^_"
    }]
  }
}
```
- Allows implicit return types
- Warns about `any` usage
- Warns about unused variables (ignores underscore prefixed)

### General Rules
```json
{
  "rules": {
    "no-console": ["warn", {
      "allow": ["warn", "error"]
    }]
  }
}
```
- Warns about console usage
- Allows console.warn and console.error

## Test File Configuration
```json
{
  "overrides": [
    {
      "files": ["*.test.ts", "*.test.tsx"],
      "env": {
        "jest": true
      }
    }
  ]
}
```
- Special rules for test files
- Enables Jest environment

## Best Practices

### 1. Code Style
- Use consistent naming conventions
- Follow React component guidelines
- Maintain clean import structure
- Document complex logic

### 2. TypeScript Usage
- Avoid `any` type when possible
- Use explicit types for public APIs
- Leverage type inference when appropriate
- Document complex types

### 3. React Development
- Follow Hooks rules strictly
- Maintain dependency arrays
- Use functional components
- Keep components focused

### 4. Performance
- Remove unused imports
- Clean up console logs
- Optimize dependencies
- Follow React best practices

## Troubleshooting

### Common Issues

1. **React Import Errors**
   ```typescript
   // Error: Missing React import
   // Solution: Using new JSX transform, no import needed
   const Component = () => <div>Content</div>;
   ```

2. **Unused Variables**
   ```typescript
   // Warning: Unused variable
   // Solution: Prefix with underscore
   const Component = ({ _unused, used }) => <div>{used}</div>;
   ```

3. **Hook Dependencies**
   ```typescript
   // Warning: Missing dependency
   // Solution: Add to dependency array
   useEffect(() => {
     console.warn(value);
   }, [value]); // Add missing dependency
   ```

### Solutions

1. **ESLint Disable Comments**
   ```typescript
   // Use sparingly and document why
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const handleData = (data: any) => {
     // Complex data handling
   };
   ```

2. **Rule Configuration**
   ```json
   {
     "rules": {
       "rule-name": "off" // Disable rule
       // or
       "rule-name": ["warn", { options }] // Configure rule
     }
   }
   ```

## Integration

### 1. Editor Setup
- Install ESLint extension
- Enable auto-fix on save
- Configure format on save

### 2. Git Hooks
- Use with Husky
- Run before commits
- Ensure clean code

### 3. CI/CD
- Include in build process
- Fail builds on errors
- Generate reports
