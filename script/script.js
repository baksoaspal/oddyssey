const tabIcon = document.getElementById('tabIcon');
const navbar = document.getElementById('navbarMobile');

tabIcon.addEventListener('click', () => {
	navbar.classList.toggle('opened');
});

const navItems = document.querySelectorAll('.navbar-web-item');
const underline = document.getElementById('webUnderline');
const sections = document.querySelectorAll('.section');

function setUnderline(target) {
	if (!target || !underline) return;

	const rect = target.getBoundingClientRect();
	const navRect = target.parentElement.getBoundingClientRect();
	const leftPos =
		rect.left - navRect.left + target.offsetWidth / 2 - underline.offsetWidth / 2;

	underline.style.left = `${leftPos}px`;
}

navItems.forEach((item) => {
	item.addEventListener('click', () => {
		navItems.forEach((i) => i.classList.remove('active'));
		item.classList.add('active');
		setUnderline(item);

		const targetSection = document.getElementById(item.dataset.target);
		if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
	});
});

window.addEventListener('load', () => {
	const active = document.querySelector('.navbar-web-item.active');
	setUnderline(active);
});

window.addEventListener('scroll', () => {
	let current = '';
	sections.forEach((section) => {
		const sectionTop = section.offsetTop - 300;
		if (window.scrollY >= sectionTop) current = section.getAttribute('id');
	});

	navItems.forEach((item) => {
		item.classList.remove('active');
		if (item.dataset.target === current) {
			item.classList.add('active');
			setUnderline(item);
		}
	});
});

window.addEventListener('resize', () => {
	const active = document.querySelector('.navbar-web-item.active');
	setUnderline(active);
});

const mobileNavItems = document.querySelectorAll('.navbar-mobile-item');

mobileNavItems.forEach((item) => {
	item.addEventListener('click', () => {
		const target = item.dataset.target;

		if (item.textContent.trim() === 'PlayStore') {
			window.open(
				'https://play.google.com/store/apps/details?id=com.hyperbeard.odyssey&hl=en&gl=US',
				'_blank',
				'noopener,noreferrer'
			);
			return;
		}

		if (item.textContent.trim() === 'AppStore') {
			window.open(
				'https://apps.apple.com/by/app/tsukis-odyssey/id1564146071',
				'_blank',
				'noopener,noreferrer'
			);
			return;
		}

		if (target) {
			const targetSection = document.getElementById(target);
			if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
		}

		mobileNavItems.forEach((i) => i.classList.remove('active'));
		item.classList.add('active');

		const navbarMobile = document.getElementById('navbarmobile');
		const tabIcon = document.getElementById('tabIcon');
		if (navbarMobile && tabIcon) {
			navbarMobile.classList.remove('open');
			tabIcon.classList.remove('active');
		}
	});
});

const menuWrapper = document.getElementById('menuWrapper');
const menuToggle = document.getElementById('menuToggle');

menuToggle.addEventListener('click', () => {
    menuWrapper.classList.toggle('open');
});

const sliderWeb = document.getElementById('sliderWeb');
const nextWeb = document.getElementById('nextWeb');
const prevWeb = document.getElementById('prevWeb');

if (sliderWeb) {
    nextWeb.addEventListener('click', () => {
        sliderWeb.style.transform = 'translateX(-50%)';
        nextWeb.style.display = 'none';
        prevWeb.style.display = 'block';

        const features = document.querySelectorAll('.page2 .feature');
        features.forEach((f, i) => {
            f.style.animation = 'none';
            void f.offsetWidth;
            f.style.animation = `slideFromTop 0.8s ease ${i * 0.2}s forwards`;
        });
    });

    prevWeb.addEventListener('click', () => {
        sliderWeb.style.transform = 'translateX(0)';
        prevWeb.style.display = 'none';
        nextWeb.style.display = 'block';

        const features = document.querySelectorAll('.page1 .feature');
        features.forEach((f, i) => {
            f.style.animation = 'none';
            void f.offsetWidth;
            f.style.animation = `slideFromTop 0.8s ease ${i * 0.2}s forwards`;
        });
    });
}

const sliderMobile = document.getElementById('sliderMobile');
const nextMobile = document.getElementById('nextMobile');
const prevMobile = document.getElementById('prevMobile');

if (sliderMobile) {
    let currentPage = 0;
    const totalPages = 6;

    function updateSlider() {
        const movePercent = -(100 / totalPages) * currentPage;
        sliderMobile.style.transform = `translateX(${movePercent}%)`;

        prevMobile.style.display = currentPage === 0 ? 'none' : 'block';
        nextMobile.style.display = currentPage === totalPages - 1 ? 'none' : 'block';

        const features = document.querySelectorAll(
            `.page-mobile:nth-child(${currentPage + 1}) .feature-mobile`
        );

        features.forEach((f, i) => {
            f.style.animation = 'none';
            void f.offsetWidth;
            f.style.animation = `slideFromTop 0.8s ease ${i * 0.2}s forwards`;
        });
    }

    nextMobile.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateSlider();
        }
    });

    prevMobile.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateSlider();
        }
    });

    updateSlider();
}

document.addEventListener('DOMContentLoaded', () => {
    const detailBtn = document.querySelector('.event-button img[alt="Detail Button"]');
    if (!detailBtn) return;

    detailBtn.addEventListener('click', () => {
        window.open('https://tsukisodyssey.wiki.gg/wiki/Halloween', '_blank');
    });

    detailBtn.setAttribute('role', 'button');
    detailBtn.setAttribute('tabindex', '0');

    detailBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            detailBtn.click();
        }
    });
});