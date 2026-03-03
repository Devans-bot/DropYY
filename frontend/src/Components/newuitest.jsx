import React from "react";

const styles = {
  screen: {
    height: "100vh",
    backgroundColor: "#F2F2F7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', Helvetica, Arial",
  },

  card: {
    width: "340px",
    backgroundColor: "#FFFFFF",
    borderRadius: "22px",
    padding: "28px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
    textAlign: "center",
  },

  memoji: {
    fontSize: "3.2rem",
    marginBottom: "12px",
  },

  title: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#000",
    marginBottom: "6px",
  },

  subtitle: {
    fontSize: "14px",
    color: "#8E8E93",
    marginBottom: "24px",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "none",
    backgroundColor: "#F2F2F7",
    fontSize: "15px",
    marginBottom: "12px",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    backgroundColor: "#007AFF",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "8px",
    cursor: "pointer",
  },

  footerText: {
    fontSize: "13px",
    color: "#8E8E93",
    marginTop: "18px",
  },

  link: {
    color: "#007AFF",
    fontWeight: "500",
    cursor: "pointer",
  },
};

export default function Login() {
  return (
    <div style={styles.screen}>
      <div style={styles.card}>
        <div style={styles.memoji}>👻</div>

        <h1 style={styles.title}>Welcome to DropYY</h1>
        <p style={styles.subtitle}>Sign in to continue</p>

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
        />

        <button style={styles.button}>Continue</button>

        <p style={styles.footerText}>
          Don’t have an account? <span style={styles.link}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
