import { CookieJar, wrapFetch } from "jsr:@jd1378/another-cookiejar";
import { encodeBase64 } from "jsr:@std/encoding/base64";

export async function hashPassword(email: string, password: string): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password + email.toLowerCase()));

  return encodeBase64(hashBuffer);
}

export async function login(email: string, password: string): Promise<CookieJar> {
  const cookieJar = new CookieJar();

  const body = JSON.stringify({ email, password });
  const fetch = wrapFetch({ cookieJar });

  const response = await fetch("https://members-ng.iracing.com/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const data = await response.json();

  if (data.authcode === 0) {
    throw new Error("Login failed");
  }

  return cookieJar;
}

export async function fetchData(cookieJar: CookieJar, url: string) {
  const fetch = wrapFetch({ cookieJar });

  const linkResponse = await fetch(url);
  const linkData = await linkResponse.json();
  const link = linkData.link;

  const dataResponse = await fetch(link);
  const data = await dataResponse.json();

  return data;
}

if (import.meta.main) {
  const email = Deno.args[0];
  const password = Deno.args[1];

  try {
    const passwordHash = await hashPassword(email, password);
    const cookieJar = await login(email, passwordHash);
    const data = await fetchData(cookieJar, "https://members-ng.iracing.com/data/track/get");

    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log("An error occurred:", error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
}
