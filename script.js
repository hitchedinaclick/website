// Small JS for interactive bits: lightbox, nav toggle, year
document.addEventListener('DOMContentLoaded', function () {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle (mobile)
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.style.display = expanded ? '' : 'block';
    });
  }

  // Lightbox
  const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('.lb-content img');
  const lbClose = lb.querySelector('.lb-close');
  const lbNext = lb.querySelector('.lb-next');
  const lbPrev = lb.querySelector('.lb-prev');
  let currentIndex = -1;

  function openLightbox(index){
    const img = galleryImgs[index];
    if (!img) return;
    const src = img.dataset.full || img.src;
    lbImg.src = src;
    lbImg.alt = img.alt || '';
    lb.setAttribute('aria-hidden','false');
    currentIndex = index;
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    lb.setAttribute('aria-hidden','true');
    lbImg.src = '';
    currentIndex = -1;
    document.body.style.overflow = '';
  }
  function showNext(){ openLightbox((currentIndex + 1) % galleryImgs.length) }
  function showPrev(){ openLightbox((currentIndex - 1 + galleryImgs.length) % galleryImgs.length) }

  galleryImgs.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(i);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', showNext);
  lbPrev.addEventListener('click', showPrev);

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lb.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });
});