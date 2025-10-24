import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: Readonly<React.ComponentProps<typeof NextThemesProvider>>): React.ReactNode {
  return (
    <NextThemesProvider attribute="class" enableSystem disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  );
}
