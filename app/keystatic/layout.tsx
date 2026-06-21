import KeystaticAuth from "./auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const originalConsoleError = console.error;
              console.error = function(...args) {
                if (typeof args[0] === 'string' && args[0].includes('An empty string ("") was passed to the href attribute')) return;
                originalConsoleError.apply(console, args);
              };
            `
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <KeystaticAuth requiredPassword={process.env.ADMIN_PASSWORD}>
          {children}
        </KeystaticAuth>
      </body>
    </html>
  );
}
