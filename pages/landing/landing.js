(function() {
    const burgerTab = document.querySelector('.burger');
    const menu = document.querySelector('.header_nav');
    const socialLinks = document.querySelector('.social_links');
    const closeButton = document.querySelector('.header_nav-close');

    console.log(burgerTab)
    burgerTab.addEventListener('click', () => {
        menu.classList.add('header_nav-active');
    });
    closeButton.addEventListener('click', () => {
        menu.classList.remove('header_nav-active');
    })
}());
