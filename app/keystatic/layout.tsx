import KeystaticAuth from "./auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <KeystaticAuth requiredPassword={process.env.ADMIN_PASSWORD}>
          {children}
        </KeystaticAuth>
      </body>
    </html>
  );
}
