/// <reference types="expo/types" />

declare var global: {
  __DEV__: boolean;
};

interface Process {
  env: {
    [key: string]: string | undefined;
    EXPO_PUBLIC_API_URL?: string;
  };
}

declare var process: Process;

declare module 'expo-constants' {
  export default interface Constants {
    expoConfig: {
      extra: {
        apiUrl: string;
      };
    };
  }
}
