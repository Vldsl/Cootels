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
	const headerBtn = document.querySelector('.header__btn');
	const menuList = document.querySelector('.menu__list');
	const headerInner = document.querySelector('.header__inner');
	if (headerBtn) {
		function replaceBtn() {
			if (document.documentElement.offsetWidth <= 768) {
				menuList.append(headerBtn);
			} else {
				headerInner.append(headerBtn);
			}
		}
		window.addEventListener('resize', () => {
			replaceBtn();
		});
		replaceBtn();
	}
});

// =======================Menu
document.addEventListener('DOMContentLoaded', () => {
	const iconMenu = document.querySelector('.header__menu_icon');
	const menu = document.querySelector('.menu');
	if (iconMenu) {
		iconMenu.addEventListener("click", function (e) {
			document.body.classList.toggle('lock');
			iconMenu.classList.toggle('active');
			menu.classList.toggle('active');
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

// ======================Accordion
const accordionControl = document.querySelectorAll('.accordion__control');
if (accordionControl.length > 0) {
	accordionControl.forEach(el => {
		el.addEventListener('click', function () {
			const content = this.nextElementSibling;
			if (this.classList.contains('open')) {
				this.classList.remove('open');
				content.style.maxHeight = null;
			} else {
				for (el of accordionControl) {
					el.nextElementSibling.style.maxHeight = null;
					el.classList.remove('open');
				}
				this.classList.add('open');
				content.style.maxHeight = content.scrollHeight + 'px';
			}
		});
	});
}

// ==============================Slider
document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('.slider__container');
	const track = document.querySelector('.slider__track');
	const items = document.querySelectorAll('.slider__item');
	const btnPrev = document.querySelector('.btn__prev');
	const btnNext = document.querySelector('.btn__next');
	const dots = document.querySelectorAll('.dot');
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
		const nextSlide = () => { //Функция переключает на следующий слайд и сравнивает с последним слайдом
			count++;
			if (count >= items.length) {
				count = 0;
			}
			activeDot(count);
			rollsSlider();
		}
		const prevSlide = () => { // Функция переключает на предыдущий слайд и сравнивает с первым слайдом
			count--;
			if (count < 0) {
				count = items.length - 1;
			}
			activeDot(count);
			rollsSlider();
		}
		function rollsSlider() { // Функция перемещает слайд, индекс умножает на ширину слайда, чем больше индекс тем на большее значение происходит перемещение
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