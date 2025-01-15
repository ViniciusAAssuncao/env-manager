# Env Manager - Grootbit

**Env Manager** is a utility to manage and validate environment variables in your projects. It ensures your environment variables are correctly set up, reducing runtime errors caused by missing or invalid variables.

---

## Features
- **Schema-based Validation**: Define required variables and their types in a schema.
- **Type Conversion**: Automatically converts strings to `integer`, `float`, `boolean`, or retains as `string`.
- **Singleton Pattern**: Ensures a single instance of the manager is used throughout the project.
- **Error Handling**: Alerts on missing or incorrectly formatted variables.
- **Environment Cleanup**: Clears loaded environment variables from `process.env` after validation.

---

## Installation

Install the package via npm:

```bash
npm install env-manager-grootbit
```

Or using yarn:

```bash
yarn add env-manager-grootbit
```

---

## Usage

To use **Env Manager**, define a schema for your environment variables, initialize the manager using the Singleton pattern, and access validated variables across your project.

### Example

1. **Create a Schema**  
Define a schema with the expected variables, their types, and whether they are required.

```typescript
import { EnvManager, EnvType } from "env-manager-grootbit";

const schema = {
  AWS_ACCESS_KEY: { type: EnvType.STRING, required: true },
  AWS_SECRET_KEY: { type: EnvType.STRING, required: true },
  PORT: { type: EnvType.INTEGER, required: false },
  DEBUG_MODE: { type: EnvType.BOOLEAN, required: false },
};

EnvManager.init(schema);

try {
  const envs = EnvManager.envys;
  console.log("Validated Environment Variables:", envs);
} catch (error) {
  console.error("Environment validation failed:", error.message);
  process.exit(1);
}
```

2. **Access the Singleton Instance**  
Once initialized, the `EnvManager` provides access to validated environment variables via the static `envys` property.

```typescript
const envs = EnvManager.envys;
console.log(envs.PORT); // Access validated variables safely
```

3. **Run Your Project**  
Set environment variables in your `.env` file or directly in your system’s environment. Example:

```plaintext
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
PORT=3000
DEBUG_MODE=true
```

Run the application:

```bash
npm start
```

---

## Key Concepts

### Singleton Pattern
The `EnvManager` now uses the Singleton pattern to ensure that a single instance of the manager is used throughout your project. You initialize the manager once with the `init` method and access the validated environment variables via the static `envys` property.

### Schema Definition
The schema is an object where each key represents an environment variable. Each variable has the following properties:
- **`type`**: The expected data type (`EnvType.STRING`, `EnvType.INTEGER`, `EnvType.FLOAT`, or `EnvType.BOOLEAN`).
- **`required`**: Boolean indicating whether the variable is mandatory.

### Supported Types
| Type          | Description                            |
|---------------|----------------------------------------|
| `EnvType.STRING`  | Standard string values.              |
| `EnvType.INTEGER` | Numeric values, parsed as integers. |
| `EnvType.FLOAT`   | Numeric values, parsed as floats.   |
| `EnvType.BOOLEAN` | `true` or `false` values.           |

### Environment Variable Cleanup
After validation, all environment variables defined in the schema are removed from `process.env` to prevent accidental access. Access them only through the `envys` property of the `EnvManager` class.

---

## Error Handling

- **Missing Variables**: Throws an error if required variables are missing.
- **Type Mismatch**: Throws an error if a variable’s value does not match the defined type.
- **Extra Variables**: Logs a warning if additional variables are detected that are not defined in the schema.

### Example Log:
```plaintext
Warning: Extra environment variables detected: UNSUPPORTED_KEY
```

---

## Development Notes

This module integrates into your project as a library. Include it in your main entry file, define the schema, and initialize the `EnvManager` class. The validation process is triggered automatically when accessing the `envys` property.

---

## Changelog

### v1.0.3
- Introduced the Singleton pattern to ensure a single instance of `EnvManager`.
- Added the static `envys` property for simplified access to validated variables.
- Enhanced error handling and logging for extra environment variables.

---

## License

This project is licensed under the [MIT License](LICENSE).

