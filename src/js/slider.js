const sliderElement = document.querySelector('[data-course-slider]');
const cardsWrapperElement = document.querySelector('[data-course-wrapper]');
const paginationElement = document.querySelector('[data-course-pagination]');
const cardElements = Array.from(document.querySelectorAll('[data-course-card]'));
const mobileBreakpoint = window.matchMedia('(max-width: 864px)');

let swiperInstance = null;

const desktopBulletClassName = 'courses__bullet';
const desktopBulletActiveClassName = 'courses__bullet--active';
const cardActiveClassName = 'courses__card--active';
const initialActiveIndex = Math.max(0, cardElements.findIndex((cardElement) => cardElement.classList.contains(cardActiveClassName)));

const mobileSliderClasses = {
    container: 'swiper',
    wrapper: 'swiper-wrapper',
    slide: 'swiper-slide',
};

const restoreDesktopCardLayout = () => {
    cardElements.forEach((cardElement, index) => {
        cardElement.style.setProperty('--card-index', index);
    });
};

const setDesktopActiveSlide = (slideIndex) => {
    cardElements.forEach((cardElement, index) => {
        cardElement.classList.toggle(cardActiveClassName, index === slideIndex);
    });

    const desktopBullets = paginationElement.querySelectorAll(`.${desktopBulletClassName}`);

    desktopBullets.forEach((bulletElement, index) => {
        bulletElement.classList.toggle(desktopBulletActiveClassName, index === slideIndex);
    });
};

const renderDesktopPagination = () => {
    paginationElement.innerHTML = '';

    cardElements.forEach((_, index) => {
        const bulletElement = document.createElement('button');
        bulletElement.type = 'button';
        bulletElement.className = desktopBulletClassName;
        bulletElement.setAttribute('aria-label', `Показать карточку ${index + 1}`);

        bulletElement.addEventListener('click', () => {
            if (swiperInstance) {
                return;
            }

            setDesktopActiveSlide(index);
        });

        paginationElement.append(bulletElement);
    });
};

const initializeDesktopControls = () => {
    restoreDesktopCardLayout();
    renderDesktopPagination();
    setDesktopActiveSlide(initialActiveIndex);
};

const applyMobileClasses = () => {
    sliderElement.classList.add(mobileSliderClasses.container);
    cardsWrapperElement.classList.add(mobileSliderClasses.wrapper);

    cardElements.forEach((cardElement) => {
        cardElement.classList.add(mobileSliderClasses.slide);
    });
};

const removeMobileClasses = () => {
    sliderElement.classList.remove(mobileSliderClasses.container);
    cardsWrapperElement.classList.remove(mobileSliderClasses.wrapper);

    cardElements.forEach((cardElement) => {
        cardElement.classList.remove(mobileSliderClasses.slide);
    });
};

const enableMobileSlider = () => {
    if (swiperInstance || !window.Swiper || !sliderElement || !cardsWrapperElement || !paginationElement) {
        return;
    }

    paginationElement.innerHTML = '';
    applyMobileClasses();

    swiperInstance = new window.Swiper(sliderElement, {
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 500,
        pagination: {
            el: paginationElement,
            clickable: true,
        },
    });
};

const disableMobileSlider = () => {
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
    }

    removeMobileClasses();
    initializeDesktopControls();
};

const handleBreakpointChange = (event) => {
    if (event.matches) {
        enableMobileSlider();
        return;
    }

    disableMobileSlider();
};

if (sliderElement && cardsWrapperElement && paginationElement && cardElements.length > 0) {
    cardElements.forEach((cardElement, index) => {
        cardElement.addEventListener('click', () => {
            if (swiperInstance) {
                return;
            }

            setDesktopActiveSlide(index);
        });
    });

    if (mobileBreakpoint.matches) {
        enableMobileSlider();
    } else {
        initializeDesktopControls();
    }

    mobileBreakpoint.addEventListener('change', handleBreakpointChange);
}