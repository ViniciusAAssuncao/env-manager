# Env Manager - Grootbit

**Env Manager** is a utility to manage and validate environment variables in your projects. It ensures your environment variables are correctly set up, reducing runtime errors caused by missing or invalid variables. 

---

## Features
- **Schema-based Validation**: Define required variables and their types in a schema.
- **Type Conversion**: Automatically converts strings to `integer`, `float`, `boolean`, or retains as `string`.
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

To use **Env Manager**, you must define a schema for your environment variables and instantiate the manager in your project’s entry point (e.g., `index.ts`).

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

const envManager = new EnvManager(schema);

try {
  const validatedEnv = envManager.validateAndLoad();
  console.log("Validated Environment Variables:", validatedEnv);
} catch (error) {
  console.error("Environment validation failed:", error.message);
  process.exit(1);
}
```

2. **Run Your Project**  
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

### Error Handling
- **Missing Variables**: Throws an error if required variables are missing.
- **Type Mismatch**: Throws an error if a variable’s value does not match the defined type.

---

## Environment Variable Cleanup

After validation, all environment variables defined in the schema are removed from `process.env` to prevent accidental access. Access them only through the object returned by `validateAndLoad`.

---

## Development Notes

This module does not run as a standalone process. Instead, it integrates into your project as a library. Include it in your main entry file, define the schema, and instantiate the `EnvManager` class. The validation process is triggered when the project starts.

---

## License

This project is licensed under the [MIT License](LICENSE).