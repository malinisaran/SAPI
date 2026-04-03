import { SAPIGlobe } from "./Logo";

/**
 * Common Header Component - Used across landing and other pages
 * @param {Object} props
 * @param {boolean} props.showAdmin - Whether to show the admin button
 * @param {React.ReactNode} props.rightContent - Custom content to show on the right side
 */
export function PageHeader({ showAdmin = true, rightContent }) {
  return (
    <header className="border-b border-sapi-bronze py-7 pb-6">
      <div className="max-w-container mx-auto px-8 flex items-center gap-5">
        <SAPIGlobe size={56} />
        <div className="font-serif text-[13px] font-normal tracking-extra-wide text-sapi-parchment uppercase leading-normal">
          The Sovereign AI<br />Power Index
        </div>
        <div className="ml-auto font-serif text-[10px] tracking-extra-wide text-sapi-muted uppercase border border-sapi-bronze px-2.5 py-1">
          For Government & Sovereign Institutions
        </div>
        {rightContent}
      </div>
    </header>
  );
}

export default PageHeader;
