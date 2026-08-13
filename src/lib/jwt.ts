interface JwtClaims {
  sub: string;
  role: "admin" | "customer";
  customer_id: string | null;
  iat: number;
  exp: number;
}

export function decodeJwtPayload(token: string): JwtClaims {
  const payload = token.split(".")[1];
  if (!payload) {
    throw new Error("Malformed token");
  }

  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return JSON.parse(atob(padded)) as JwtClaims;
}
