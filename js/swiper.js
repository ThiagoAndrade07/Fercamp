if (screen.width <=760) {

    const swiper = new Swiper('.swiper', {

    speed: 2000,

    spaceBetween: 10,

    slidesPerView: 1,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    autoplay: {

        delay: 150,

    },
    centeredSlides: true

    });

}



if (screen.width > 760 && screen.width <= 1024) {

    const swiper = new Swiper('.swiper', {

        speed: 1000,

        spaceBetween: 10,

        slidesPerView: 2,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        autoplay: {

            delay: 1500,

        },
        centeredSlides: true

    });

} else if (screen.width > 1024 && screen.width <= 1500){

    const swiper = new Swiper('.swiper', {

        speed: 1000,

        spaceBetween: 60,

        slidesPerView: 3,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        autoplay: {

            delay: 1500,

        },

        centeredSlides: true
    });

} else if (screen.width > 1500){

    const swiper = new Swiper('.swiper', {

        speed: 1000,

        spaceBetween: 40,

        slidesPerView: 3,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        autoplay: {

            delay: 1500,

        },

        centeredSlides: true

    });

}