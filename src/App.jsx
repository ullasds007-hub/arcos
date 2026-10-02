import { useEffect, useState } from "react";
import ArcOSV6 from "./pages/ArcOSV6.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import { supabase } from "./lib/supabaseClient.js";
import "./pages/AuthPage.css";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) {
        console.error("Failed to restore Supabase session:", error);
      }
      setSession(data?.session ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out failed:", error);
      setSigningOut(false);
    }
  };

  if (loading) {
    return (
      <div className="arcos-auth-loading">
        <div className="arcos-auth-loader" />
        <span>Starting ArcOS…</span>
      </div>
    );
  }

  if (!session) {
    return <AuthPage />;
  }

  return (
    <div className="arcos-authenticated-app">
      <ArcOSV6 user={session.user} />

      <div className="arcos-account-pill" title={session.user.email ?? "ArcOS account"}>
        <div className="arcos-account-copy">
          <span>ARCOS ACCOUNT</span>
          <strong>{session.user.email ?? "Signed in"}</strong>
        </div>

        <button type="button" onClick={handleSignOut} disabled={signingOut}>
          {signingOut ? "Signing out…" : "Logout"}
        </button>
      </div>
    </div>
  );
}
