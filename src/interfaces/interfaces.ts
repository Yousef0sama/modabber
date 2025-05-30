// Theme state type
export type ThemeState = {
  mode: "light" | "dark";
};

// Interface for input fields in forms
export interface InputField {
  name: string;
  value: string;
  validators: ((value: string) => string | null)[];
  isErr: boolean;
  error: string;
}

// Interfce for Notification

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}
