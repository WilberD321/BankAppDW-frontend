export interface AuthSession {
  token: string;
  role: "admin" | "customer";
  customerId: string | null;
  username: string;
  exp: number;
}

const STORAGE_KEY = "bankappdw_auth";

export function readAuthSession(): AuthSession | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as AuthSession;
    if (session.exp * 1000 < Date.now()) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function writeAuthSession(session: AuthSession): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}
