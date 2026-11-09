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

  document.querySelectorAll('[data-count]').forEach((counter) => {
    if (!(counter instanceof HTMLElement)) return;
    const target = Number(counter.dataset.count ?? 0);
    const state = { value: 0 };
    gsap.to(state, {
      value: target,
      duration: 1.35,
      ease: 'power2.out',
      snap: { value: 1 },
      scrollTrigger: { trigger: counter, start: 'top 88%', once: true },
      onUpdate: () => { counter.textContent = Math.round(state.value).toLocaleString('en-GB'); }
    });
  });

  gsap.utils.toArray('[data-service]').forEach((panel, index, panels) => {
    const image = panel.querySelector('.service-image img');
    if (image) gsap.from(image, { yPercent: 10, scale: 1.08, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: panel, start: 'top 82%', once: true }, clearProps: 'transform' });
    if (index === panels.length - 1) return;
    gsap.to(panel, { scale: .965, opacity: .48, ease: 'none', scrollTrigger: { trigger: panel, start: 'top 8%', end: 'bottom 12%', scrub: true } });
  });

  document.querySelectorAll('[data-process-step]').forEach((step) => {
    gsap.from(step, { y: 70, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: step, start: 'top 88%', once: true }, clearProps: 'transform,opacity' });
  });

  gsap.to('.place > img', { scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.place', start: 'top bottom', end: 'bottom top', scrub: true } });
}
