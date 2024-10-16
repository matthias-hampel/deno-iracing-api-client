# deno-iracing-api-client 🦕

This project is a very small Deno application that authenticates against the iRacing API and fetch the tracks.

There are only three functions: `hashPassword`, `login` and `fetchData`.

The `login` function uses a [CookieJar](https://jsr.io/@jd1378/another-cookiejar) to store the returned cookies, including the authtoken set during login.

This CookieJar is then passed to the `fetchData` function that handles the data request.

> [**Make sure to enable Legacy Read Only Authentication**](https://support.iracing.com/support/solutions/articles/31000173894-enabling-or-disabling-legacy-read-only-authentication)

**Important**: This is only an example. If you're doing many requests against the iRacing API you should store the authentication data avoiding to re-authenticate with each request.

```bash
# install dependencies
$ deno install

# run (make sure you've enabled legacy read only authentication!)

# to avoid, that the command with your password is stored in the bash history, make sure that you add a leading space
$  deno run main.ts CLunky@iracing.Com MyPassWord


# run tests
$ deno test
```
