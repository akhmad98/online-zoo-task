(function() {
    const burgerTab = document.querySelector('.burger');
    const menu = document.querySelector('.header_nav');
    const socialLinks = document.querySelector('.social_links');
    const closeButton = document.querySelector('.header_nav-close');

    console.log(burgerTab)
    burgerTab.addEventListener('click', () => {
        console.log('a')
        menu.classList.add('header_nav-active');
    });
    closeButton.addEventListener('click', () => {
        menu.classList.remove('header_nav-active');
    })
}());


const meetGridLayout = document.querySelector('.meet-animal-grid');
const feedGridLayout = document.querySelector('feed-grid');
const nextFeedbtn = document.querySelector('.next');
const prevFeedbtn = document.querySelector('.prev');
const nextMeetbtn = document.querySelector('.next-btn');
const prevMeetBtn = document.querySelector('.prev-btn');

nextMeetbtn.addEventListener('click', () => {
    const cardWidth = document.querySelector('.meet-animal-card').offsetWidth;
    meetGridLayout.scrollLeft += (cardWidth + 30);
})

prevMeetBtn.addEventListener('click', () => {
    const cardWidth = document.querySelector('.meet-animal-card').offsetWidth;
    meetGridLayout.scrollLeft -= (cardWidth + 30);
})

nextFeedbtn.addEventListener('click', () => {
    console.log('b');
    const cardWidth = document.querySelector('.feed-card');
    feedGridLayout.scrollLeft += (cardWidth + 30);
})

prevFeedbtn.addEventListener('click', () => {
    console.log('bs');
    const cardWidth = document.querySelector('.feed-card');
    feedGridLayout.scrollLeft -= (cardWidth + 30);
})