import { useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isSignup = mode === "signup";

  const resetFeedback = () => {
    setMessage("");
    setError("");
  };

  const switchMode = (nextMode) => {
    resetFeedback();
    setMode(nextMode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetFeedback();

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanEmail || !password) {
      setError("Enter your email and password.");
      return;
    }

    if (isSignup && !cleanName) {
      setError("Enter your name.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              name: cleanName,
            },
          },
        });

        if (signUpError) throw signUpError;

        if (!data.session) {
          setMessage(
            "Account created. Check your email and confirm your account, then come back and log in."
          );
          setMode("login");
          setPassword("");
        } else {
          setMessage("Account created. Signing you in…");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (signInError) throw signInError;
      }
    } catch (authError) {
      setError(authError?.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="arcos-auth-page">
      <div className="arcos-auth-bg" aria-hidden="true" />
      <div className="arcos-auth-overlay" aria-hidden="true" />

      <section className="arcos-auth-shell">
        <div className="arcos-auth-brand">
          <div className="arcos-auth-mark">
            <span />
          </div>
          <div>
            <strong>ArcOS</strong>
            <small>Your Life Operating System</small>
          </div>
        </div>

        <div className="arcos-auth-copy">
          <span>PERSONAL OPERATING SYSTEM</span>
          <h1>
            Build your system.
            <br />
            Keep your momentum.
          </h1>
          <p>
            Your tasks, systems, goals, projects and intelligence — now tied to your own ArcOS account.
          </p>
        </div>

        <section className="arcos-auth-card">
          <div className="arcos-auth-card-head">
            <span>{isSignup ? "CREATE ACCOUNT" : "WELCOME BACK"}</span>
            <h2>{isSignup ? "Start your ArcOS." : "Enter your ArcOS."}</h2>
            <p>
              {isSignup
                ? "Create your account to keep your ArcOS data private and ready for cloud sync."
                : "Sign in to continue to your personal operating system."}
            </p>
          </div>

          <div className="arcos-auth-tabs" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => switchMode("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => switchMode("signup")}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <label>
                <span>Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
            )}

            <label>
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimum 6 characters"
                autoComplete={isSignup ? "new-password" : "current-password"}
              />
            </label>

            {error && <div className="arcos-auth-feedback error">{error}</div>}
            {message && <div className="arcos-auth-feedback success">{message}</div>}

            <button className="arcos-auth-submit" type="submit" disabled={loading}>
              {loading
                ? "Please wait…"
                : isSignup
                ? "Create ArcOS account"
                : "Login to ArcOS"}
            </button>
          </form>

          <div className="arcos-auth-footnote">
            <span className="arcos-auth-dot" />
            Secure authentication powered by Supabase
          </div>
        </section>
      </section>
    </main>
  );
}
