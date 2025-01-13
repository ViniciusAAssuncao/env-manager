export enum EnvType {
    STRING = "string",
    INTEGER = "integer",
    FLOAT = "float",
    BOOLEAN = "boolean",
  }
  
  export interface EnvSchema {
    [key: string]: {
      type: EnvType;
      required: boolean;
    };
  }
  