# TypeScript Configuration Documentation

## Overview
The project uses TypeScript with strict configuration settings to ensure type safety and maintainable code. The configuration is split across multiple files to handle different environments:
- `tsconfig.json`: Main TypeScript configuration
- `tsconfig.node.json`: Node-specific configuration
- `tsconfig.test.json`: Test environment configuration

## Main Configuration (tsconfig.json)

### Compiler Options

#### Language and Environment
- `target`: "ESNext" - Latest ECMAScript features
- `lib`: ["DOM", "DOM.Iterable", "ESNext"] - Browser and modern JavaScript APIs
- `jsx`: "react-jsx" - React 17+ JSX transform

#### Modules
- `module`: "ESNext" - Modern module system
- `moduleResolution`: "bundler" - Optimized for bundlers like Vite
- `baseUrl`: "." - Root directory for module resolution
- `paths`: Maps "@/*" to "src/*" for clean imports

#### Type Checking
- `strict`: true - Enables all strict type checking options
- `noImplicitAny`: true - Disallow implicit any types
- `noImplicitThis`: true - Raise error on 'this' with implied 'any' type
- `strictNullChecks`: true - Enable strict null checks
- `strictFunctionTypes`: true - Enable strict checking of function types
- `strictBindCallApply`: true - Enable strict 'bind', 'call', and 'apply' methods
- `strictPropertyInitialization`: true - Ensure class properties are initialized
- `noImplicitReturns`: true - Report error when not all code paths return
- `noFallthroughCasesInSwitch`: true - Report errors for fallthrough cases in switch
- `noUncheckedIndexedAccess`: true - Include undefined in index signature results
- `useUnknownInCatchVariables`: true - Type catch clause variables as 'unknown'
- `exactOptionalPropertyTypes`: true - Differentiate between undefined and optional

#### Code Quality
- `noUnusedLocals`: true - Report errors on unused locals
- `noUnusedParameters`: true - Report errors on unused parameters
- `forceConsistentCasingInFileNames`: true - Ensure consistent casing in imports

#### Interop and Compatibility
- `allowJs`: true - Allow JavaScript files to be imported
- `skipLibCheck`: true - Skip type checking of declaration files
- `esModuleInterop`: true - Enable ES Module interop
- `allowSyntheticDefaultImports`: true - Allow default imports from modules
- `resolveJsonModule`: true - Allow importing JSON modules
- `isolatedModules`: true - Ensure files can be safely transpiled in isolation

#### Build Options
- `noEmit`: true - Do not emit outputs (Vite handles this)
- `incremental`: true - Enable incremental compilation

### Project Structure
```
include: ["src"]
exclude: ["node_modules", "dist", "backup-portfolio"]
references: [{ "path": "./tsconfig.node.json" }]
```

## Node Configuration (tsconfig.node.json)
Specialized configuration for Node.js environment, used for build scripts and configuration files.

### Key Settings
- Targets Node.js environment
- Enables CommonJS modules
- Includes build configuration files

## Test Configuration (tsconfig.test.json)
Configuration optimized for testing environment with Vitest.

### Key Settings
- Includes test-specific types
- Configured for test file patterns
- Maintains strict type checking

## Best Practices
1. **Path Aliases**
   - Use `@/*` imports for clean module paths
   - Avoid relative paths for deep imports

2. **Type Safety**
   - Leverage strict type checking
   - Avoid type assertions unless necessary
   - Use explicit return types for public APIs

3. **Module Resolution**
   - Prefer named exports over default exports
   - Use ES modules consistently
   - Leverage path aliases for organization

4. **Performance**
   - Enable incremental compilation
   - Skip declaration file checking
   - Use project references for better build times

## Troubleshooting

### Common Issues

1. **Module Not Found Errors**
   - Check path aliases in both TypeScript and Vite configs
   - Verify file extensions in imports
   - Ensure file exists in the included paths

2. **Type Errors**
   - Check strict null checks
   - Verify proper initialization of class properties
   - Review function return types

3. **Build Performance**
   - Use incremental compilation
   - Leverage project references
   - Exclude test files from main build

### Solutions

1. **Path Resolution**
   ```typescript
   // Correct usage of path aliases
   import { Component } from '@/components/Component';
   // Avoid
   import { Component } from '../../../components/Component';
   ```

2. **Type Safety**
   ```typescript
   // Correct
   function getData(): Promise<Data> {
     return fetch('/api/data').then(res => res.json());
   }
   // Avoid
   function getData(): any {
     return fetch('/api/data').then(res => res.json());
   }
   ```

3. **Module Exports**
   ```typescript
   // Prefer named exports
   export const Component = () => {};
   // Instead of
   export default () => {};
   ```
