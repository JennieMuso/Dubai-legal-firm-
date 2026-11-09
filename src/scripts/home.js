import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateDubaiTime() {
  const node = document.querySelector('[data-dubai-time]');
  if (!node) return;
  const time = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
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

document.querySelectorAll('[data-faq]').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!(item instanceof HTMLDetailsElement) || !item.open) return;
    document.querySelectorAll('[data-faq]').forEach((other) => {
      if (other instanceof HTMLDetailsElement && other !== item) other.open = false;
    });
  });
});

if (!reducedMotion) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-copy > *', { y: 24, opacity: 0, duration: .85, stagger: .09, ease: 'power3.out', clearProps: 'transform,opacity' });
  gsap.from('.hero-facts > *', { y: 16, opacity: 0, duration: .7, delay: .35, stagger: .07, ease: 'power3.out', clearProps: 'transform,opacity' });
  gsap.to('.hero-image', { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  document.querySelectorAll('[data-reveal]').forEach((element) => {
    gsap.from(element, { y: 24, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true }, clearProps: 'transform,opacity' });
  });

  document.querySelectorAll('[data-image-reveal] img').forEach((image) => {
    gsap.from(image, { scale: 1.1, duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: image, start: 'top 84%', once: true }, clearProps: 'transform' });
  });

  gsap.utils.toArray('[data-service]').forEach((panel, index, panels) => {
    if (index === panels.length - 1) return;
    gsap.to(panel, { scale: .965, opacity: .48, ease: 'none', scrollTrigger: { trigger: panel, start: 'top 8%', end: 'bottom 12%', scrub: true } });
  });

  gsap.to('.place > img', { scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.place', start: 'top bottom', end: 'bottom top', scrub: true } });
}
