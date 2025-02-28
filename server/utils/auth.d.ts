declare module "#auth-utils" {
  interface User {
    id: number;
    name: string;
    role: string;
  }

  interface UserSession {}

  interface SecureSessionData {}
}

export {};
