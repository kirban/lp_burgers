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