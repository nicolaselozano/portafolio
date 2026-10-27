'use strict';

function setGreetings() {
  const h = new Date().getHours();

  const es = {
    greeting: h < 12 ? 'Buenos días!' : h < 19 ? 'Buenas tardes!' : 'Buenas noches!',
    day: h < 12 ? 'día' : h < 19 ? 'tarde' : 'noche'
  };

  const en = {
    greeting: h < 12 ? 'Good morning!' : h < 19 ? 'Good afternoon!' : 'Good evening!',
    day: h < 12 ? 'day' : h < 19 ? 'afternoon' : 'evening'
  };

  const set = (selector, value) => {
    document.querySelectorAll(selector).forEach((el) => (el.textContent = value));
  };

  set('[data-greeting-es]', es.greeting);
  set('[data-greeting-en]', en.greeting);
  set('[data-day-es]', es.day);
  set('[data-day-en]', en.day);
}
setGreetings();

function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  elements.forEach((el) => observer.observe(el));
}
revealOnScroll();

function sidebarScrollSpy() {
  const links = document.querySelectorAll('.sidebar a[href^="#"]');
  const sections = Array.from(
    document.querySelectorAll('main section[id]')
  );

  if (!('IntersectionObserver' in window) || !sections.length) return;

  const setActive = (id) => {
    links.forEach((a) =>
      a.classList.toggle('active', a.getAttribute('href') === `#${id}`)
    );
  };

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-35% 0px -55% 0px' }
  );

  sections.forEach((s) => spy.observe(s));

  links.forEach((a) =>
    a.addEventListener('click', () =>
      setActive(a.getAttribute('href').slice(1))
    )
  );
}
sidebarScrollSpy();
