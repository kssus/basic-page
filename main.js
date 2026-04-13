'use strict';

// navbar transparent when It is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  console.log(window.scrollY);
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--out');
  } else {
    navbar.classList.remove('navbar--out');
  }
});

document.addEventListener('scroll', () => {
  console.log(window.scrollY);
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('logo--out');
  } else {
    navbar.classList.remove('logo--out');
  }
});

// Phone display

const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;

const phone_box = document.querySelector('.phone_box');

document.addEventListener('scroll', () => {
  console.log(homeHeight);
  if(window.scrollY > homeHeight) {
    phone_box.classList.remove('invisible');
  } else {
    phone_box.classList.add('invisible');
  }
});

// phone_box.addEventListener('click', () => {
//   scrollIntoView('#home');
// });

// click "contact me" button
const popupLayer = document.querySelector('.popup__contact');
const closeBtn = document.querySelector('.btn-close');

closeBtn.addEventListener('click', () => {
    popupLayer.style.display = 'none';
});

// Perspective animation

const images = document.querySelectorAll('.fade__img');
let currentIndex = 0;

function changeImage() {
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
}

setInterval(changeImage, 5000);

// Unit Plan
const sliderWrap = document.querySelector('.slide__wrap');
let slideItems = document.querySelectorAll('.slideItem');


// 계산된 이동 거리: 아이템 너비(390px) + 간결(25)
const itemswidth = 390;
const gap = 25;
const offset = itemswidth + gap; 
const speed = 300;
const itemsToClone = 3;
let isAnimating = false; // 누락된 변수 선언

/* 1. 복제 로직 수정 (정확한 순서로 복제) */
const originalCount = slideItems.length;

// 3개가 한 화면에 보이므로, 여유 있게 앞뒤로 복제본을 붙임.
for (let i = 0; i < itemsToClone; i++) {
  sliderWrap.append(slideItems[i].cloneNode(true));
}
for (let i = 1; i <= itemsToClone; i++) {
  sliderWrap.prepend(slideItems[originalCount - i].cloneNode(true));
}

// 복제 후 다시 설정
slideItems = document.querySelectorAll('.slideItem');
const totalCount = slideItems.length;
let currSlide = itemsToClone; // 인덱스 3부터 시작

/* 강조 효과 적용 함수 */
function updateActive() {
  slideItems.forEach(item => item.classList.remove('active'));

  let targetIdx = currSlide + 1;

  // 현재 화면 중앙의 아이템 active
  if (slideItems[targetIdx]) {
    slideItems[targetIdx].classList.add('active');

  // 위치가 11번(가짜 1번)이라면, 진짜 6번(6)에도 active를 준다.
  if (currSlide === totalCount - itemsToClone) {
    slideItems[itemsToClone + 1].classList.add('active');
    }
    //반대로 가짜 6번(0)이라면, 진짜 6번(6)에도 active를 준다.
    if (currSlide === 0) {
      slideItems[totalCount = (itemsToClone * 2) + 1].classList.add('active');
    }
  }
}


/* 이동 함수 */
function moveSlide() {
  if (isAnimating) return;
  isAnimating = true;

  sliderWrap.style.transition = `${speed}ms`;
  sliderWrap.style.transform = `translateX(-${offset * currSlide}px)`;
  updateActive();
  
  setTimeout(() => {
    isAnimating = false;

     // 무한 루프 체크 (오른쪽 가짜 1,2,3 도달 시)
    if (currSlide >= totalCount - itemsToClone) {   
      sliderWrap.style.transition = '0ms';
      currSlide = itemsToClone;
      sliderWrap.style.transform = `translateX(-${offset * currSlide}px)`;    
    }

    // 무한 루프 체크 (왼쪽 가짜 4,5,6 도달 시)
    if (currSlide <= 0) {   
      sliderWrap.style.transition = '0ms';
      currSlide = originalCount;
      sliderWrap.style.transform = `translateX(-${offset * currSlide}px)`;    
    } 
    updateActive();  
  }, speed);
}
  
// 초기 위치 설정 (앞에 3개이므로 인덱스 3부터 시작)
sliderWrap.style.transform = `translateX(-${offset * currSlide}px)`;
updateActive();

let autoPlayInterval;

function startAutoPlay() {
  stopAutoPlay();
  // 5000ms(5초)마다 currSlide를 키우고 이동 함.
  autoPlayInterval = setInterval(() => {
    if(!isAnimating) {
      currSlide++;
      moveSlide();
    }
  }, 3000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// 시작할 때 자동 재생 활성화
startAutoPlay();

/* 버튼 이벤트 */
// const nextBtn = document.querySelector('.nextBtn');
// const preBtn = document.querySelector('.preBtn');

// 수동으로 버튼을 누를 때는 자동 재생을 멈추었다가 다시 시작
document.querySelector('.nextBtn').addEventListener('click', () => {
  if (isAnimating) return;
  stopAutoPlay();
  currSlide++;
  moveSlide();
  startAutoPlay();
});

document.querySelector('.preBtn').addEventListener('click', () => {
  if (isAnimating) return;
  stopAutoPlay();
  currSlide--;
  moveSlide();
  startAutoPlay();
})

// 마우스를 슬라이더 위에 올리면 멈추고, 때면 다시 시작
const unitPlan = document.querySelector('.unit__plan');
unitPlan.addEventListener('mouseenter', stopAutoPlay);
unitPlan.addEventListener('mouseleave', startAutoPlay);

// utility function
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior : "smooth"});
}

