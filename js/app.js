//tablets or phones menu
let menu = (function(){

    let button = document.querySelector("#toggle");
    let menu = document.querySelector("#overlay");
    let body = document.body;

    let __toggleMenu = function(e){
        button.classList.toggle('hamburger-menu--active');
        menu.classList.toggle('overlay--open');
        body.classList.toggle('body-active-menu');
    }

    let addListeners = function() {
        button.addEventListener('click', __toggleMenu);
    }

    return {
        init: addListeners
    };
})({
    button: '#toggle',
    menu: '#overlay'
})

menu.init();

//team accordeon
$(document).ready(function () {
    $('.team__name').click(function (e) { 
        e.preventDefault();
        var $this = $(this), 
            item = $this.closest('.team__item'),
            list = $this.closest('#team__menu'),
            items = list.find('.team__item'),
            content = item.find('.team__desc-wrapper'),
            otherContent = list.find('.team__desc-wrapper'),
            duration = 300;
        
        if (!item.hasClass('visible')){
            items.removeClass('visible');
            content.slideDown(duration);
            item.addClass('visible');     
        } 
        else {            
            content.slideUp(duration);
            item.removeClass('visible');
        }
    });
});

//menu accordeon

$(function() {
    $('.menu__item-title').on('click', function (e) {

        e.preventDefault();
        var elem = $(e.target),
        item = elem.closest('.menu__item'),
        content = item.find('.menu__item-wrapper'),
        otherItems = item.siblings(),
        otherItemsContent = otherItems.find('.menu__item-wrapper'),
        itemsWidth = $('.menu__item').length * $('.menu__item-type').width();

        $(window).width() < 769 
        ? openWidth = $(window).width() - itemsWidth 
        : openWidth = $(window).width()*0.65 - itemsWidth
        
        if (!item.hasClass('active')) {
            otherItems.removeClass('active'),
            otherItemsContent.css('width', '0'),
            item.addClass('active'),
            content.css('width', openWidth)
        } else {
            item.removeClass('active'),
            content.css('width', '0')
        }

    })
})

//modal window
$(function() {
    $("[data-fancybox]").fancybox({
        smallBtn: false,
        toolbar: false
    });
        
    $('.popup__close').on('click', function(e) {
        e.preventDefault();
        $.fancybox.close()
    })
})

//one page scroll
$(function() {
    var sections = $('.section'),
        visible = $('.maincontent'),
        inScroll = false;

        const md = new MobileDetect(window.navigator.userAgent),
        isMobile = md.mobile();

    var performTransition = function (sectionEq) {
      
        if(!inScroll) {
            inScroll = true;

            var sectionEq = sectionEq - 1; /*Index starts counting from 0, eq from 1*/ //MB CHANGE ON +1
            var position = (sectionEq * -100) + '%';
            
            visible.css({
                'transform' : 'translateY(' + position + ')',
                '-webkit-transform' : 'translateY(' + position + ')'
            })

            sections.eq(sectionEq).addClass('active')
            .siblings().removeClass('active');

            setTimeout(function() {
                inScroll = false;
                $('.nav__points-list--item').eq(sectionEq).addClass('point-active')
                .siblings().removeClass('point-active');
            }, 300)

        }
            
    }

    var defineSections = function(sections) {
        var activeSection = sections.filter('.active');
        return {
            activeSection : activeSection,
            nextSection : activeSection.next(),
            prevSection : activeSection.prev()
        }
    }

    var scrollToSection = function(direction) {
        var section = defineSections(sections);
        
        if (direction == 'up' && section.nextSection.next().length) { /*вниз*/
            
            performTransition(section.nextSection.index());
        } 
        
        if (direction == 'down' && section.prevSection.prev().length) { /*вверх*/   
            performTransition(section.prevSection.index());
        }

    }



    $('.wrapper').on({
        'wheel': function(e) {
            var deltaY = e.originalEvent.deltaY,
            direction = "";
            
            var direction = deltaY > 0 ? direction = 'up': direction = 'down';

            scrollToSection(direction);
        },

        touchmove: function(e) {
            e.preventDefault();
        }
    })
        

    $(document).on('keydown', function (e) {
        var section = defineSections(sections);
        
        
        switch (e.keyCode) {
            case 38: /*вверх*/
                if (section.prevSection.prev().length) {
                    performTransition(section.prevSection.index());
                }
                break;
            case 40: /*вниз*/
                if (section.nextSection.length) {
                    performTransition(section.nextSection.index());
                }
                break;
        }


    })

    /*bullets*/    
        

    $('.nav__radio-fake').on('click', function (e) {
    
        e.preventDefault();

        var elem = $(e.target),
        bullets = $('.nav__points-list--item'),
        bulletTarget = elem.closest(bullets),            
        bulletEq = bulletTarget.index();

        performTransition(bulletEq + 1); /*Index starts counting from 0, eq from 1*/ 

    })

    $('.nav__link').on('click', function (e) {
        
        e.preventDefault();

        var elem = $(e.target),
        elemId = elem.attr('href'),
        sectionEq = parseInt(sections.filter(elemId).index());
        performTransition(sectionEq + 1);  
        
    })
    
    /* move to section */

    $('.main__arrow').on('click', function(e) {
        e.preventDefault();
        performTransition(2);
    });

    $('.header__btn, .btn--burger').on('click', function(e) {
        e.preventDefault();
        performTransition(7); /*Index starts counting from 0, eq from 1. First link is second screen*/ 

    });

    if (isMobile) {
        $(window).swipe({
            swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                scrollToSection(direction);
            }
        });            
    }
    
})
