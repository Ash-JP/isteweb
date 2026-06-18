"use client";

import { useState, useEffect } from "react";

export default function KeystaticAuth({ children, requiredPassword }: { children: React.ReactNode, requiredPassword?: string }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Suppress non-fatal Keystar UI / React 19 hydration warnings in the console
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('BreadcrumbItem')) return;
      if (typeof args[0] === 'string' && args[0].includes('setProp')) return;
      originalConsoleError(...args);
    };

    setIsMounted(true);
    const auth = localStorage.getItem("keystatic_auth");
    if (auth === (requiredPassword || "admin123")) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === (requiredPassword || "admin123")) {
      localStorage.setItem("keystatic_auth", password);
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password");
    }
  };

  if (!isMounted) return null; // Avoid hydration mismatch

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', color: '#111827' }}>Keystatic Admin</h1>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Admin Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }}
            autoFocus
          />
        </div>
        {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', padding: '0.75rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Login
        </button>
      </form>
    </div>
  );
}
