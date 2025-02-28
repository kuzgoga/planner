declare module "#auth-utils" {
  interface User {
    name: string;
    role: string;
  }

  interface UserSession {
    // Add your own fields
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {};
