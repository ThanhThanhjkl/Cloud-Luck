export default function ({ req, res, redirect }) {
  if (process.server) {
    const sessionCookie = req.headers.cookie
      ? req.headers.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith("session="))
      : null;
    const httpOnly = sessionCookie?.includes("HttpOnly");
    if (!httpOnly) {
      redirect("/login");
    }
  }
}
