import { useState, useEffect, useCallback } from 'react';
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function useGithubAuth() {
  const { siteConfig } = useDocusaurusContext();
  const firebaseConfig = siteConfig?.customFields?.firebaseConfig;

  if (!getApps().length && firebaseConfig) {
    initializeApp(firebaseConfig);
  }

  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [tokenExpire, setTokenExpire] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        const storedToken = localStorage.getItem("github_access_token") || "";
        const storedExpire = parseInt(localStorage.getItem("github_access_token_expire") || "0", 10);
        setToken(storedToken);
        setTokenExpire(storedExpire);
      } else {
        clearToken();
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const saveToken = (accessToken, expireTime) => {
    setToken(accessToken);
    setTokenExpire(expireTime);
    localStorage.setItem("github_access_token", accessToken);
    localStorage.setItem("github_access_token_expire", expireTime.toString());
  };

  const clearToken = () => {
    setToken("");
    setTokenExpire(0);
    localStorage.removeItem("github_access_token");
    localStorage.removeItem("github_access_token_expire");
  };

  const login = useCallback(async () => {
    const provider = new GithubAuthProvider().addScope('repo');
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const now = Date.now();
    // 8시간으로 수정
    const expire = now + 8 * 3600 * 1000;
    saveToken(credential.accessToken, expire);
  }, [auth]);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    clearToken();
  }, [auth]);

  const checkAndRefreshToken = useCallback(async () => {
    if (!user) return;
    const now = Date.now();
    if (!token || (tokenExpire && now > tokenExpire)) {
      await login();
    }
  }, [login, token, tokenExpire, user]);

  // 토큰 자동 갱신(원한다면)
  useEffect(() => {
    checkAndRefreshToken();
  }, [checkAndRefreshToken]);

  return {
    user,
    token,
    loading,
    login,
    logout,
    checkAndRefreshToken,
  };
}
