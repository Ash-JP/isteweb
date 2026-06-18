import KeystaticApp from "./keystatic";
import KeystaticAuth from "./auth";

export default function Layout() {
  return (
    <html suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <KeystaticAuth requiredPassword={process.env.ADMIN_PASSWORD}>
          <KeystaticApp />
        </KeystaticAuth>
      </body>
    </html>
  );
}
