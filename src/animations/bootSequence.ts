import gsap from 'gsap';

export function runBootSequence(root: HTMLElement) {
  const context = gsap.context(() => {
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .fromTo('[data-boot-line]', { scaleX: 0 }, { scaleX: 1, duration: 1.2, stagger: 0.08 })
      .fromTo('[data-hero-kicker]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.45')
      .fromTo('[data-hero-title]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, '-=0.4')
      .fromTo('[data-hero-copy]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.45')
      .fromTo('[data-hero-meta]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.35');
  }, root);

  return () => context.revert();
}
