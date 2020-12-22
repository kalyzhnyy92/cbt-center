'use strict';

jQuery($ => {

    $(document).ready(function () {
        $('.popup-with-form').magnificPopup({
            type: 'inline',
            preloader: false,
            focus: '#name',

            callbacks: {
                beforeOpen: function () {
                    if ($(window).width() < 700) {
                        this.st.focus = false;
                    } else {
                        this.st.focus = '#name';
                    }
                }
            }
        });
    });

    $(document).ready(function () {
        $.validator.addMethod("firstname", function (value, element) {
            return this.optional(element) || /^[А-Яа-яіA-Za-z\s-]*$/.test(value);
        }, "Имя должно состоять только с букв, пробелов или дефисов");
        $.validator.addMethod("checkMask", function (value, element) {
            return this.optional(element) || /\+\d{2}\(\d{3}\)\s\d{3}-\d{2}-\d{2}/g.test(value);
        });
        $.validator.addMethod("email", function (value, element) {
            return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        }, "Некорректный Email");
        $('form').each(function () {
            $(this).validate({
                submitHandler: (form) => {

                    if (form.classList.contains('participate__form')) {

                        const popup = $('.request__wrapper');
                        const closeButton = $('.request__close');

                        closeButton.click(function () {
                            popup.removeClass('request__wrapper--open');
                        });

                        popup.addClass('request__wrapper--open');

                        form.reset(() => {
                            popup.removeClass('request__wrapper--open');
                        });

                        // setTimeout(() => {
                        //     popup.removeClass('request__wrapper--open');
                        // }, 2000)
                    }
                    return false
                },
                rules: {
                    name: {
                        required: true,
                        firstname: true,
                        rangelength: [2, 20]
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    phone: {
                        required: true,
                        checkMask: true,
                    },
                },
                messages: {
                    name: {
                        required: "Введите имя",
                        rangelength: "Имя должно быть от {0} до {1} символов"
                    },
                    email: {
                        required: "Введите Email",
                        email: "Некорректный Email"
                    },
                    phone: {
                        required: "Введите телефон",
                        checkMask: "Неверный формат номера телефона"
                    }
                }
            });
        });

        $('.js-phone').mask("+38(999) 999-99-99", {
            autoclear: false
        });

    });

    document.querySelector(".master__photo, .video__photo, .thanks__photo").onclick = function () {
        this.style.display = "none";
    }

    $(document).ready(function () {
        $('.share__toggle').click(function () {
            $('.share__toggle').toggleClass('active');
            $('.share__list').toggleClass('active')
        })
    });

    $(document).ready(function () {
        $('.reviews__slider').slick({
            arrows: true,
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 1000,
            rows: 0,
            adaptiveHeight: true,
            infinite: true,
            appendArrows: $('.reviews__btn'),
            prevArrow: "<button class='reviews__prev'><svg class='reviews__icon' width='20' height='20' viewBox='0 0 20 20'><use xlink:href='img/svg/btn-left-arrow.svg#btn-left'></use></svg></button>",
            nextArrow: "<button class='reviews__next'><svg class='reviews__icon' width='20' height='20' viewBox='0 0 20 20'><use xlink:href='img/svg/btn-right-arrow.svg#btn-right'></use></svg></button>",
            responsive: [{
                breakpoint: 961,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 721,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                }
            }]
        });
    });

});

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
    var daysProgress = clock.querySelector('.days__progress');
    var hoursProgress = clock.querySelector('.hours__progress');
    var minutesProgress = clock.querySelector('.minutes__progress');
    var secondsProgress = clock.querySelector('.seconds__progress');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        daysProgress.style.width = (t.days / 60) * 100 + '%';
        hoursProgress.style.width = (t.hours / 60) * 100 + '%';
        minutesProgress.style.width = (t.minutes / 60) * 100 + '%';
        secondsProgress.style.width = (t.seconds / 60) * 100 + '%';

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = "November 28 2020 00:00:00 GMT+0300";
var deadline = new Date(Date.parse(new Date()) + 11 * 24 * 60 * 60 * 1000);
initializeClock('countdown', deadline);









// $('.menu-btn').on('click', function (e) {
//     $(this).toggleClass('menu-btn_active');
// });


$('.js-toggle-menu').click(function (e) {
    e.preventDefault();
    $('.mobile__nav').slideToggle();
    $(this).toggleClass('open');
});






const accordionItems = document.querySelectorAll('.products__lable');

function toggleAccordion() {
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('active');
}

accordionItems.forEach(item => item.addEventListener('click', toggleAccordion))