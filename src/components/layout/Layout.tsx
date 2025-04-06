import { memo, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = memo(({ children }: LayoutProps) => {
  return (
    <div className="game-layout">
      <header>
        <h1>Atomas</h1>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;