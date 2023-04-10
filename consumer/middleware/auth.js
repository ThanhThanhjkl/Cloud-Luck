export default function ({ req, res, redirect }) {
  // Check if the request is coming from a server
  if (process.server) {
    // Check if the "HttpOnly" flag is set on the session cookie
    const sessionCookie = req.headers.cookie
      ?.split(";")
      .find((cookie) => cookie.trim().startsWith("session="));
    const httpOnly = sessionCookie?.includes("HttpOnly");

    if (!httpOnly) {
      // If the "HttpOnly" flag is not set, redirect the user to a secure URL
      redirect("/login");
    }
  }
}
