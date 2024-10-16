import { assertEquals } from "jsr:@std/assert";
import { hashPassword } from "./main.ts";

Deno.test("test password hash", async () => {
  // this is obviously not a real login
  const passwordHash = await hashPassword("CLunky@iracing.Com", "MyPassWord");
  assertEquals(passwordHash, "xGKecAR27ALXNuMLsGaG0v5Q9pSs2tZTZRKNgmHMg+Q=");
});
