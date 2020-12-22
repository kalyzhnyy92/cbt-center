import jQuery from 'jquery';
import 'magnific-popup/dist/jquery.magnific-popup.min';
import 'jquery-validation/dist/jquery.validate.min';
import 'jquery.maskedinput/src/jquery.maskedinput';
import 'slick-carousel/slick/slick';

import '../index.html';
import '../webinar.html';
import '../thanks.html';

import '../styles/style.scss';

import leftArrow from '../img/svg/btn-left-arrow.svg';
import rightArrow from '../img/svg/btn-left-arrow.svg';

jQuery($ => {

  $(document).ready(function () {
    const popups = $('.popup-with-form');
    if (popups.length) {
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
          },
        },
      });
    }
  });

  $(document).ready(function () {
    $.validator.addMethod('firstname', function (value, element) {
      return this.optional(element) || /^[А-Яа-яіA-Za-z\s-]*$/.test(value);
    }, 'Имя должно состоять только с букв, пробелов или дефисов');
    $.validator.addMethod('checkMask', function (value, element) {
      return this.optional(element) || /\+\d{2}\(\d{3}\)\s\d{3}-\d{2}-\d{2}/g.test(value);
    });
    $.validator.addMethod('email', function (value, element) {
      return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }, 'Некорректный Email');
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
          return false;
        },
        rules: {
          name: {
            required: true,
            firstname: true,
            rangelength: [2, 20],
          },
          email: {
            required: true,
            email: true,
          },
          phone: {
            required: true,
            checkMask: true,
          },
        },
        messages: {
          name: {
            required: 'Введите имя',
            rangelength: 'Имя должно быть от {0} до {1} символов',
          },
          email: {
            required: 'Введите Email',
            email: 'Некорректный Email',
          },
          phone: {
            required: 'Введите телефон',
            checkMask: 'Неверный формат номера телефона',
          },
        },
      });
    });

    $('.js-phone').mask('+38(999) 999-99-99', {
      autoclear: false,
    });

  });

  document.querySelector('.master__photo, .video__photo, .thanks__photo').onclick = function () {
    this.style.display = 'none';
  };

  $(document).ready(function () {
    $('.share__toggle').click(function () {
      $('.share__toggle').toggleClass('active');
      $('.share__list').toggleClass('active');
    });
  });

  const LEFT_BUTTON = `
      <button class='reviews__prev'>
        <svg class='reviews__icon' width='20' height='20' viewBox='0 0 20 20'>
            <path d="M14.146.57l1.14 1.139L6.993 10l8.291 8.292-1.139 1.139L4.716 10 14.146.57z"/>
            <path d="M14.146 0l1.708 1.709L7.565 10l8.29 8.291L14.146 20l-10-10 10-10zm.57 1.709l-.57-.57L5.285 10l8.86 8.861.57-.57L6.426 10l8.29-8.291z"/>
        </svg>
      </button>
  `;

  const RIGHT_BUTTON = `
        <button class='reviews__prev'>
          <svg class='reviews__icon' width='20' height='20' viewBox='0 0 20 20'>
              <path d="M5.85388 19.4303L4.71484 18.2913L13.0059 9.99982L4.71484 1.70837L5.85388 0.569336L15.2844 9.99982L5.85388 19.4303Z"/>
              <path d="M5.85406 20L4.14551 18.2914L12.4365 10L4.14551 1.70855L5.85406 0L15.8545 10L5.85406 20ZM5.28454 18.2914L5.85406 18.861L14.715 10L5.85406 1.13904L5.28454 1.70855L13.5756 10L5.28454 18.2914Z" />
             </svg>
        </button>
    `;

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
      prevArrow: LEFT_BUTTON,
      nextArrow: RIGHT_BUTTON,
      responsive: [{
        breakpoint: 961,
        settings: {
          slidesToShow: 2,
        },
      },
        {
          breakpoint: 721,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          },
        }],
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
    'seconds': seconds,
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

var deadline = new Date(Date.parse(new Date()) + 11 * 24 * 60 * 60 * 1000);
initializeClock('countdown', deadline);


// $('.menu-btn').on('click', function (e) {
//     $(this).toggleClass('menu-btn_active');
// });


jQuery('.js-toggle-menu').click(function (e) {
  e.preventDefault();
  jQuery('.mobile__nav').slideToggle();
  jQuery(this).toggleClass('open');
});


const accordionItems = document.querySelectorAll('.products__lable');

function toggleAccordion() {
  this.classList.toggle('active');
  this.nextElementSibling.classList.toggle('active');
}

accordionItems.forEach(item => item.addEventListener('click', toggleAccordion));
