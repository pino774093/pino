(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // A slightly longer exponential response adds gentle inertia while still
  // settling quickly when input stops.
  const SMOOTHING_TIME = 0.085;
  const UNDERWATER_SMOOTHING_MULTIPLIER = 1.14;
  const STOP_DISTANCE = 0.5;
  // Keep the page at the point where the final title has fully appeared.
  // This matches scroll-about-object.js's closing-copy reveal end value.
  const FINAL_TITLE_COMPLETE_PROGRESS = 0.9;
  const finalSection = document.querySelector('#scroll-final-home');
  const waterSequence = document.querySelector('#portfolio-water-sequence');
  let targetScroll = window.scrollY;
  let animationFrame = 0;
  let previousFrameTime = 0;

  function getMaximumScroll() {
    const documentMaximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    if (!finalSection) return documentMaximum;
    const rect = finalSection.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionScrollRange = Math.max(finalSection.offsetHeight - window.innerHeight, 1);
    const finalTitleCompleteScroll = sectionTop + sectionScrollRange * FINAL_TITLE_COMPLETE_PROGRESS;
    return Math.max(0, Math.min(documentMaximum, finalTitleCompleteScroll));
  }

  function clampScroll(value) {
    return Math.max(0, Math.min(getMaximumScroll(), value));
  }

  function canScrollInside(target, deltaY) {
    for (let element = target instanceof Element ? target : null; element && element !== document.body && element !== document.documentElement; element = element.parentElement) {
      const style = window.getComputedStyle(element);
      if (!/(auto|scroll|overlay)/.test(style.overflowY) || element.scrollHeight <= element.clientHeight + 1) continue;
      if (deltaY < 0 && element.scrollTop > 0) return true;
      if (deltaY > 0 && element.scrollTop + element.clientHeight < element.scrollHeight - 1) return true;
    }
    return false;
  }

  function animateScroll(time) {
    animationFrame = 0;
    if (document.documentElement.classList.contains('is-legacy-static-page')) {
      targetScroll = window.scrollY;
      previousFrameTime = 0;
      return;
    }
    const currentScroll = window.scrollY;
    const deltaTime = previousFrameTime ? Math.min((time - previousFrameTime) / 1000, 0.05) : 1 / 60;
    previousFrameTime = time;
    let underwater = false;
    if (waterSequence) {
      const start = waterSequence.getBoundingClientRect().top + currentScroll;
      const end = start + Math.max(waterSequence.offsetHeight, window.innerHeight);
      underwater = (currentScroll >= start && currentScroll <= end)
        || (targetScroll >= start && targetScroll <= end);
    }
    const smoothingTime = SMOOTHING_TIME * (underwater ? UNDERWATER_SMOOTHING_MULTIPLIER : 1);
    const blend = 1 - Math.exp(-deltaTime / smoothingTime);
    const distance = targetScroll - currentScroll;

    if (Math.abs(distance) <= STOP_DISTANCE) {
      window.scrollTo(0, targetScroll);
      previousFrameTime = 0;
      return;
    }

    window.scrollTo(0, currentScroll + distance * blend);
    animationFrame = window.requestAnimationFrame(animateScroll);
  }

  function queueScroll(value) {
    targetScroll = clampScroll(value);
    if (!animationFrame) animationFrame = window.requestAnimationFrame(animateScroll);
  }

  function onWheel(event) {
    if (document.documentElement.classList.contains('is-legacy-static-page')) {
      event.preventDefault();
      return;
    }
    if (reducedMotion.matches || event.ctrlKey || event.metaKey || !event.deltaY) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || canScrollInside(event.target, event.deltaY)) return;

    const multiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE
      ? 16
      : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
        ? window.innerHeight
        : 1;
    const currentTarget = animationFrame ? targetScroll : window.scrollY;
    const nextTarget = clampScroll(currentTarget + event.deltaY * multiplier);
    if (nextTarget === currentTarget) {
      if (event.deltaY > 0 && currentTarget >= getMaximumScroll() - STOP_DISTANCE) event.preventDefault();
      return;
    }

    event.preventDefault();
    queueScroll(nextTarget);
  }

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('scroll', () => {
    const allowedScroll = clampScroll(window.scrollY);
    if (window.scrollY <= allowedScroll + STOP_DISTANCE) return;
    targetScroll = allowedScroll;
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    previousFrameTime = 0;
    window.scrollTo(0, allowedScroll);
  }, { passive: true });
  window.addEventListener('resize', () => { targetScroll = clampScroll(targetScroll); });
  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches || !animationFrame) return;
    window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    previousFrameTime = 0;
    targetScroll = window.scrollY;
  });
})();
