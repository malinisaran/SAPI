/**
 * Common Page Layout Wrapper
 * Provides consistent page background and font settings
 */
export function PageLayout({ children, className = "" }) {
  return (
    <div className={`min-h-screen bg-sapi-void text-sapi-parchment font-serif ${className}`}>
      {children}
    </div>
  );
}

export default PageLayout;
