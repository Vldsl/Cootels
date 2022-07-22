"use sctrict"
// ============== Header
const header = document.querySelector('.header');
const intro = document.querySelector('.intro');
const headerHeight = header.offsetHeight;
const introHeight = intro.offsetHeight;
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;
	if (scrollDistance >= introHeight + headerHeight && scrollDistance > lastScrollTop) {
		header.classList.add('fixed');
		intro.style.marginTop = `${headerHeight}px`;
	} else {
		header.classList.remove('fixed');
		intro.style.marginTop = null;
	}
	lastScrollTop = scrollDistance;
});

// ================== Replace header button
document.addEventListener('DOMContentLoaded', () => {
	const headerBtn = document.querySelector('.header__link');
	const menuList = document.querySelector('.menu__list');
	const headerInner = document.querySelector('.header__container');
	if (headerBtn) {
		function replaceBtn() {
			if (document.documentElement.offsetWidth <= 768) {
				menuList.append(headerBtn);
			} else {
				headerInner.append(headerBtn);
			}
		}
		window.addEventListener('resize', replaceBtn);
		replaceBtn();
	}
});

// =======================Menu
document.addEventListener('DOMContentLoaded', () => {
	const menuIcon = document.querySelector('.menu__icon');
	const menu = document.querySelector('.menu__body');
	if (menuIcon) {
		menuIcon.addEventListener('click', function (e) {
			menuIcon.classList.toggle('_active');
			document.body.classList.toggle('lock');
			menu.classList.toggle('_open');
		});
	}
});

// Scroll to Top
const scrollBtn = document.querySelector('.scroll_up');
scrollBtn.addEventListener('click', () => {
	window.scrollBy({
		top: -document.documentElement.scrollHeight,
		behavior: 'smooth'
	});
});
window.onscroll = function () {
	if (window.scrollY > introHeight) {
		scrollBtn.classList.add('active');
	} else {
		scrollBtn.classList.remove('active');
	}
}

// Dark mode
const btnTheme = document.querySelector('.toggle__theme');
btnTheme.addEventListener('click', (event) => {
	event.preventDefault();
	if (localStorage.getItem('theme') === 'dark') {
		localStorage.removeItem('theme');
	}
	else {
		localStorage.setItem('theme', 'dark')
	}
	addDarkClassToHTML()
});
function addDarkClassToHTML() {
	try {
		if (localStorage.getItem('theme') === 'dark') {
			document.querySelector('html').classList.add('dark_mode');
			btnTheme.classList.add('active');
		}
		else {
			document.querySelector('html').classList.remove('dark_mode');
			btnTheme.classList.remove('active');
		}
	} catch (err) { }
}
addDarkClassToHTML();

// ======================Spoiler
const accordions = document.querySelectorAll('.spoiler-room__item');
if (accordions) {
	accordions.forEach(el => {
		el.addEventListener('click', (e) => {
			const self = e.currentTarget;
			const content = self.querySelector('.spoiler-room__content');

			self.classList.toggle('open');

			if (self.classList.contains('open')) {
				content.style.maxHeight = content.scrollHeight + 'px';
			} else {
				content.style.maxHeight = null;
			}
		});
	});
}

// ==============================Slider
document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('.slider-testimonials__body');
	const track = document.querySelector('.slider-testimonials__track');
	const items = document.querySelectorAll('.slider-testimonials__item');
	const btnPrev = document.querySelector('.control__btn_prev');
	const btnNext = document.querySelector('.control__btn_next');
	const dots = document.querySelectorAll('.pagination__item');
	let width = container.offsetWidth;
	let count = 0;
	if (items.length > 0) {

		function init() {
			track.style.width = width * items.length + "px";
			items.forEach(item => {
				item.style.width = width + "px";
			});
			rollsSlider();
		}
		window.addEventListener('resize', init);
		init();
		const nextSlide = () => {
			count++;
			if (count >= items.length) {
				count = 0;
			}
			activeDot(count);
			rollsSlider();
		}
		const prevSlide = () => {
			count--;
			if (count < 0) {
				count = items.length - 1;
			}
			activeDot(count);
			rollsSlider();
		}
		function rollsSlider() {
			track.style.transform = 'translate(-' + count * width + 'px)';
		}
		function activeDot(n) {
			dots.forEach(function (item) {
				item.classList.remove('active');
			});
			dots[n].classList.add('active');
		}
		dots.forEach((item, indexDot) => {
			item.addEventListener('click', () => {
				count = indexDot;
				activeDot(count);
				rollsSlider();
			});
		});
		btnPrev.addEventListener('click', prevSlide);
		btnNext.addEventListener('click', nextSlide);

		setInterval(nextSlide, 2500);
	}
});

// =============== Footer list arrow
const arrows = document.querySelectorAll('.footer__list_arrow');
arrows.forEach(function (el) {
	el.addEventListener('click', function () {
		el.nextElementSibling.classList.toggle('open');
		el.classList.toggle('active');
	});
});

// Footer list
const wrapperList = document.querySelectorAll('.footer__wrapper-list');
if (wrapperList.length > 0) {
	wrapperList.forEach(el => {
		el.addEventListener('click', (e) => {



			const self = e.currentTarget;
			self.classList.toggle('_active');

			// wrapperList.forEach(item => {
			// item.classList.remove('_active');
			// 	if (item.classList.contains('_active') && e.target !== item) {
			// 		console.log('I did it');
			// 		wrapperList.forEach(item => {
			// 			item.classList.remove('_active');
			// 		})
			// 	}
			// })

		})
	})
}