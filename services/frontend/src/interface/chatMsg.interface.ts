export interface Message {
  role: "ai" | "user";
  content: string;
}

export interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  showSuggestions?: boolean;
  children?: React.ReactNode;
  inputClassName?: string;
}
