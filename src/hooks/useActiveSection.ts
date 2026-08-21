import { useEffect, useState } from 'react';

export type SectionId = 'hero' | 'projects' | 'skills' | 'research' | 'experience' | 'contact';

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = Array.from(document.querySelectorAll<HTMLElement>('[data-section-id]'));
      const viewportCenter = window.scrollY + window.innerHeight * 0.45;

      for (const el of sectionElements) {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (viewportCenter >= top && viewportCenter <= bottom) {
          const id = el.getAttribute('data-section-id') as SectionId;
          if (id) {
            setActiveSection(id);
          }
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return activeSection;
}
