import { EnvSchema, EnvType } from "./types";

export class EnvManager {
  private schema: EnvSchema;

  constructor(schema: EnvSchema) {
    this.schema = schema;
  }

  public validateAndLoad(): Record<string, any> {
    const loadedEnv: Record<string, any> = {};
  
    const extraKeys = Object.keys(process.env).filter(
      (key) => !(key in this.schema)
    );
    if (extraKeys.length > 0) {
      console.warn(`Warning: Extra environment variables detected: ${extraKeys.join(", ")}`);
    }
  
    for (const [key, config] of Object.entries(this.schema)) {
      const envValue = process.env[key];
  
      if (config.required && (envValue === undefined || envValue === null)) {
        throw new Error(`Environment variable "${key}" is required but not defined.`);
      }
  
      if (!config.required && (envValue === undefined || envValue === null)) {
        continue;
      }
  
      loadedEnv[key] = this.convertType(envValue!, config.type);
    }
  
    this.cleanupProcessEnv();
  
    return loadedEnv;
  }  

  private convertType(value: string, type: EnvType): any {
    switch (type) {
      case EnvType.INTEGER: {
        const intValue = parseInt(value, 10);
        if (isNaN(intValue)) {
          throw new Error(`Environment variable "${value}" must be of type integer, but got "${value}".`);
        }
        return intValue;
      }
      case EnvType.FLOAT: {
        const floatValue = parseFloat(value);
        if (isNaN(floatValue)) {
          throw new Error(`Environment variable "${value}" must be of type float, but got "${value}".`);
        }
        return floatValue;
      }
      case EnvType.BOOLEAN: {
        const lowerValue = value.toLowerCase();
        if (lowerValue !== "true" && lowerValue !== "false") {
          throw new Error(`Environment variable "${value}" must be of type boolean ("true" or "false"), but got "${value}".`);
        }
        return lowerValue === "true";
      }
      case EnvType.STRING:
        return value;
      default:
        throw new Error(`Unsupported type "${type}" for environment variable "${value}".`);
    }
  }  

  private cleanupProcessEnv(): void {
    for (const key of Object.keys(this.schema)) {
      delete process.env[key];
    }
  }
}
