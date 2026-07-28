import { useEffect, useRef } from 'react';

/** Hook to animate elements on scroll using IntersectionObserver */
export function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('bs-animate-hidden');
            entry.target.classList.add('bs-animate-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe the element and its children with data-animate
    const targets = el.querySelectorAll('[data-animate]');
    targets.forEach((t) => {
      t.classList.add('bs-animate-hidden');
      observer.observe(t);
    });

    // Also observe the element itself if it has data-animate
    if (el.hasAttribute('data-animate')) {
      el.classList.add('bs-animate-hidden');
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
