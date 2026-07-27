/* fewvar — портфолио: появление секций, состояние шапки, год в подвале */

(() => {
  "use strict";

  /* ── Год в подвале ── */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ── Шапка меняет вид после первого экрана ── */
  const topbar = document.querySelector(".topbar");
  if (topbar) {
    const onScroll = () => topbar.classList.toggle("is-stuck", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ── Появление блоков при скролле ── */
  const items = document.querySelectorAll(".reveal");
  const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || !motionOk) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
  );

  items.forEach((el) => io.observe(el));
})();
