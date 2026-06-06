module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",

        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",

        primary: {
          DEFAULT: "#6aece1",
          foreground: "#0a0b14",
        },

        secondary: {
          DEFAULT: "#4fd1c5",
          foreground: "#0a0b14",
        },

        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",

        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",

        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        textColor: "#8e8e93",
        slateText: "#0a0b14",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      backgroundImage: {
        "gradient-purple-blue":
          // "linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #4F46E5 100%)",
          "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",

        "primary-gradient":
          "linear-gradient(90deg, #63E7DC 0%, #56DCD2 35%, #46D3C9 70%, #26BDB3 100%)",
      },
      boxShadow: {
        "glow-purple":
          "0 0 20px 4px rgba(139, 92, 246, 0.6), 0 0 40px 8px rgba(99, 102, 241, 0.3)",

        "glow-sky-bottom": "0 10px 25px rgba(59, 130, 246, 0.35)",

        "primary-glow": "0 6px 20px rgba(38, 189, 179, 0.35)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },

      animation: {
        "gradient-x": "gradient 8s ease infinite",
      },
    },
  },
  plugins: [],
};
