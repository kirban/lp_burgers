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
