import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('[data-hero-reveal]', {
    yPercent: 22,
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)',
    duration: 1.05,
    stagger: .1,
    ease: 'power4.out',
    clearProps: 'transform,opacity,clipPath'
  });

  document.querySelectorAll('[data-bento]').forEach((grid) => {
    gsap.from(grid.children, {
      y: 50,
      opacity: 0,
      duration: .85,
      stagger: .08,
      ease: 'power3.out',
      scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
      clearProps: 'transform,opacity'
    });
  });

  document.querySelectorAll('[data-text-reveal]').forEach((element) => {
    gsap.from(element, {
      y: 35,
      opacity: 0,
      clipPath: 'inset(0 0 100% 0)',
      duration: .9,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 86%', once: true },
      clearProps: 'transform,opacity,clipPath'
    });
  });

  document.querySelectorAll('[data-scroll-image]').forEach((image) => {
    gsap.fromTo(image, { scale: 1.08, yPercent: -3 }, { scale: 1.02, yPercent: 3, ease: 'none', scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  document.querySelectorAll('[data-path-step]').forEach((step) => {
    gsap.from(step, {
      x: 60,
      opacity: 0,
      duration: .85,
      ease: 'power3.out',
      scrollTrigger: { trigger: step, start: 'top 86%', once: true },
      clearProps: 'transform,opacity'
    });
  });
}

const faqLinks = [...document.querySelectorAll('.faq-nav a')];
const faqGroups = [...document.querySelectorAll('.faq-group')];
if (faqLinks.length && faqGroups.length) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    faqLinks.forEach((link) => link.setAttribute('aria-current', String(link.getAttribute('href') === `#${visible.target.id}`)));
  }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, .25, .5] });
  faqGroups.forEach((group) => observer.observe(group));
}
