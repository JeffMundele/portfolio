export function initAOS() {
  if (!window.AOS) return;

  AOS.init({
    duration: 1000,
    once: true,
  });
}