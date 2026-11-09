import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateDubaiTime() {
  const node = document.querySelector('[data-dubai-time]');
  if (!node) return;
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dubai',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date());
  node.textContent = `Dubai · ${time} GST`;
}

updateDubaiTime();
window.setInterval(updateDubaiTime, 30_000);

/** @type {HTMLButtonElement | null} */
const toggle = document.querySelector('.menu-toggle');
/** @type {HTMLElement | null} */
const menu = document.querySelector('#mobile-menu');

toggle?.addEventListener('click', () => {
  if (!menu) return;
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  menu.hidden = open;
  document.body.classList.toggle('menu-open', !open);
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle?.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    document.body.classList.remove('menu-open');
  });
});

if (!reducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-copy > *', {
    y: 28,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    clearProps: 'transform,opacity'
  });

  gsap.to('.hero img', {
    yPercent: 7,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  document.querySelectorAll('[data-reveal]').forEach((element) => {
    gsap.from(element, {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      clearProps: 'transform,opacity'
    });
  });

  gsap.from('[data-image-reveal] img', {
    scale: 1.12,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: { trigger: '[data-image-reveal]', start: 'top 82%', once: true },
    clearProps: 'transform'
  });

  const panels = gsap.utils.toArray('.service-panel');
  panels.forEach((panel, index) => {
    if (index === panels.length - 1) return;
    gsap.to(panel, {
      scale: 0.91 + index * 0.02,
      opacity: 0.32,
      ease: 'none',
      scrollTrigger: {
        trigger: panel,
        start: 'top 12%',
        end: 'bottom 12%',
        scrub: true
      }
    });
  });

  gsap.to('.place img', {
    scale: 1.08,
    ease: 'none',
    scrollTrigger: { trigger: '.place', start: 'top bottom', end: 'bottom top', scrub: true }
  });
}
