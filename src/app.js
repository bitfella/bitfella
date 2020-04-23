let activeIndex = 0;
const main = document.querySelector('main');
const wrapper = document.querySelector('.slides');
const slides = [...document.querySelectorAll('.slide')];
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center'
}

function handleIntersect(entries) {
  const entry = entries.find(e => e.isIntersecting);

  if (entry) {
    activeIndex = slides.findIndex(e => e === entry.target);

    if (activeIndex === 0) {
      main.classList.add('first');
    } else {
      main.classList.remove('first');
    }

    if (activeIndex === slides.length - 1) {
      main.classList.add('last');
    } else {
      main.classList.remove('last');
    }
  }
}

const observer = new IntersectionObserver(handleIntersect, {
  root: wrapper,
  rootMargin: '0px',
  threshold: 0.75
});

function handlePrevButtonClick() {
  if (activeIndex > 0) slides[activeIndex - 1].scrollIntoView(scrollIntoViewOptions);
}

function handleNextButtonClick() {
  let targetIndex = 0;

  if (activeIndex < slides.length - 1) targetIndex = activeIndex + 1;
  slides[targetIndex].scrollIntoView(scrollIntoViewOptions);
}

function observeUI() {
  slides.forEach(el => {
    observer.observe(el);
  });
}

function appendNavDom() {
  const main = document.querySelector('main');
  const prevButton = document.createElement('button');
  const nextButton = document.createElement('button');

  prevButton.classList.add('goto', 'prev', 'hide');
  nextButton.classList.add('goto', 'next', 'hide');
  prevButton.setAttribute('aria-label', 'go to previous slide');
  nextButton.setAttribute('aria-label', 'go to next slide');
  prevButton.addEventListener('click', handlePrevButtonClick);
  nextButton.addEventListener('click', handleNextButtonClick);
  main.appendChild(prevButton);
  main.appendChild(nextButton);

  setTimeout(() => {
    prevButton.classList.remove('hide');
    nextButton.classList.remove('hide');
  }, 1000);
}

function bindKeyEvents() {
  document.addEventListener('keyup', e => {
    const key = e.keyCode;

    (key === 37 || key === 38) && handlePrevButtonClick();
    (key === 39 || key === 40) && handleNextButtonClick();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const isTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

  console.log(isTouch);

  if (!isTouch) {
    appendNavDom();
    observeUI();
    bindKeyEvents();
  }
});
