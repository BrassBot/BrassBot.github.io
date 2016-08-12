"use strict";

// Create global namespace to put stuff

var RECODESIGN = RECODESIGN || {};

var headerElem = $('header[role="banner"]'),
    homepageIntroElem = $('section.homepage-intro'),
    windowHeight,
    headerHeight;

// Initialiser

RECODESIGN.initialiser = {

  removeIndexes: function() {
    $('a').each(function() {
      var href = $(this).attr('href').replace('index.html','');
      $(this).attr('href',href);
    });
  },

  getHeights: function() {
    windowHeight = $(window).height(),
    headerHeight = $(headerElem).height();
  },

  scrollTopClass: function() {
    $(window).scroll(function() {
      if ($(window).scrollTop() <= 0) {
        $('html').addClass('top');
      } else {
        $('html').removeClass('top');
      }
    });
  },

  checkTop: function() {
    if($(window).scrollTop() > 0) {
      $('html').removeClass('top');
      $('body').removeClass('nav-intro');
    }
  },

  mainElem: function() {
    $('body:not(.home) main[role="main"]').css('padding-top',(headerHeight+40));
  },

  mobileNav: function() {
    $('nav[role="navigation"] h2').on('click', 'a', function(e) {
      e.preventDefault();
      $('body').toggleClass('nav-open');
      $(this).toggleClass('icon-menu icon-times');

      if($('body').hasClass('nav-open')) {
        var mobileNavAdditional = '<div class="additional-nav"></div>';
        $(mobileNavAdditional).appendTo('nav[role="navigation"]');
        $('footer[role="contentinfo"] ul.social').clone().appendTo('.additional-nav');
        setTimeout(function() {
          $('div.additional-nav').addClass('show');
        }, 50);
      } else {
        $('div.additional-nav').removeClass('show');
        setTimeout(function() {
          $('div.additional-nav').remove();
        }, 500);
      }
    });
  },

  homepageIntro: function() {
    $(homepageIntroElem).css('height',windowHeight);

    if($('body').hasClass('home')) {

      if(($(window).scrollTop() < (homepageIntroElem.height() - headerHeight))) {
        $('body').addClass('nav-intro');
      }
    
      $(window).scroll(function() {
        if(($(window).scrollTop() < (homepageIntroElem.height() - headerHeight))) {
          $('body').addClass('nav-intro');
        } else {
          $('body').removeClass('nav-intro');
        }
      });
    }
  },

  scrollToPosition: function() {
    $('body').on('click', '.scroll', function(e) {
      e.preventDefault();
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - headerHeight
        }, 1000, 'easeInOutQuint');
      }
    });
  },

  workNavigation: function() {
    if($('body').hasClass('case-study')) {

      var workList = [
        //'deep-search',
        'bbc',
        'shedcode',
        'split-the-bills',
        'anne-saunders-physiotherapy',
        'folksy',
        'fit-property',
        'rattle',
        'mantra-medical',
        'peak-city-physio',
        'utility-warehouse',
        'hive-it',
        'caper',
        'delver',
        'bunnyfoot',
        'quba',
        'hotwoofy',
        'site-gallery'];

      var csClass = $('body').attr('class');
      csClass = csClass.replace('case-study ','');

      var position = $.inArray(csClass,workList);

      if(position !== -1) {

        var next = workList[position+1];
        var previous = workList[position-1];

        if(next == undefined) {
          next = workList[0];
        }

        if(previous == undefined) {
          previous = workList[workList.length-1];
        }

        var nextAnchor = '<a href="'+next+'.html" class="client next"><span class="'+next+'"><span>Next: '+next+'</span></span></a>';
        var previousAnchor = '<a href="'+previous+'.html" class="client previous"><span class="'+previous+'"><span>Previous: '+previous+'</span></span></a>';

        $('main[role="main"]').append('<div class="work-nav"><h2><a href="index.html">My work</a></h2>'+nextAnchor+previousAnchor+'</div');
 
        setTimeout(function(){
          $('div.work-nav').addClass('show');
        }, 250);
      }
    }
  },

  getYear: function() {
    var year = new Date().getFullYear();
    $('span.year').each(function() {
      $(this).text(year);
    });
  },

  swiperSetup: function() {
    $('.case-study .swiper-carousel').each(function() {
      var swiper = new Swiper($(this).find('.swiper-container'), {
        nextButton: $(this).find('.swiper-button-next'),
        prevButton: $(this).find('.swiper-button-prev'),
        pagination: $(this).find('.swiper-pagination'),
        paginationClickable: true,
        loop: true,
        slidesPerView: 2,
        slidesPerGroup: 2,
        breakpoints: {
          768: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
        }
      });
    });

    $('.featured-work.swiper-carousel').each(function() {
      var swiper = new Swiper($(this).find('.swiper-container'), {
        nextButton: $(this).find('.swiper-button-next'),
        prevButton: $(this).find('.swiper-button-prev'),
        pagination: $(this).find('.swiper-pagination'),
        paginationClickable: true,
        loop: true,
        slidesPerView: 2,
        breakpoints: {
          768: {
            slidesPerView: 1,
          },
        },
        onSlideChangeStart: function() {
          if($('.swiper-slide-active').hasClass('alt')) {
            $('body').addClass('pagination-alt');
          } else {
            $('body').removeClass('pagination-alt');
          }
        },
      });
    });
  },
};

// Resize

RECODESIGN.dom = {
  resizeUpdate: function() {},
};

// Call functions

$(document).ready(function () {
  var rdi = RECODESIGN.initialiser;

  rdi.getHeights();
  rdi.scrollTopClass();
  rdi.checkTop();
  rdi.mainElem();
  rdi.mobileNav();
  rdi.homepageIntro();
  rdi.scrollToPosition();
  rdi.workNavigation();
  rdi.getYear();
  rdi.swiperSetup();
});

$(window).resize(function() {
  var dom = RECODESIGN.dom,
      rdi = RECODESIGN.initialiser;

  rdi.getHeights();
  rdi.mainElem();
  rdi.homepageIntro();

  dom.resizeUpdate();
});