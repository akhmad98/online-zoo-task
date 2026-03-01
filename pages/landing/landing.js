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
const feedGridLayout = document.querySelector('.feed-grid');
const nextFeedbtn = document.querySelector('.next');
const prevFeedbtn = document.querySelector('.prev');
const nextMeetbtn = document.querySelector('.next-btn');
const prevMeetBtn = document.querySelector('.prev-btn');
const animalGridLayout = document.querySelector('.animal-grid');
const dots = document.querySelectorAll('.dot');

nextMeetbtn.addEventListener('click', () => {
    const cardWidth = document.querySelector('.meet-animal-card').offsetWidth;
    meetGridLayout.scrollLeft += (cardWidth + 30);
})

prevMeetBtn.addEventListener('click', () => {
    const cardWidth = document.querySelector('.meet-animal-card').offsetWidth;
    meetGridLayout.scrollLeft -= (cardWidth + 30);
})

let scrollPosition = 0;

nextFeedbtn.addEventListener('click', () => {
    const gap = 30;
    const cardWidth = document.querySelector('.feed-card').offsetWidth;
    
    const maxScroll = feedGridLayout.scrollWidth - feedGridLayout.clientWidth;
    if (Math.abs(scrollPosition) < maxScroll) {
        scrollPosition -= (cardWidth + gap);
        feedGridLayout.style.transform = `translateX(${scrollPosition}px)`;
    }
})

prevFeedbtn.addEventListener('click', () => {
    const gap = 30;
    const cardWidth = document.querySelector('.feed-card').offsetWidth;

    const maxScroll = feedGridLayout.scrollWidth - feedGridLayout.clientWidth;
    if (scrollPosition < 0) {
        scrollPosition += (cardWidth + gap);
        feedGridLayout.style.transform = `translateX(${scrollPosition}px)`
    }
})

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const cardWidth = document.querySelector('.animal-card').offsetWidth;
        const gap = 30;
        const scrollAmnt = index * (cardWidth + gap);

        animalGridLayout.scrollTo({
            left: scrollAmnt,
            behavior: 'smooth'
        });

        updateActiveDot(index);
    })
})




function updateActiveDot(actIndx) {
    dots.forEach((dot, i) => {
        if (i === actIndx) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    })
}

const openBtn = document.querySelector('.donate_btn');
const openBtnA = document.querySelector('.donate-now-btn');
const openBtnB = document.querySelector('.donate-now');

const modalContainer = document.getElementById('modalContainer'); // Пустой div для модалки

openBtn.onclick = async () => {
    const response = await fetch('../modals/popup.html');
    const html = await response.text();
    
    modalContainer.innerHTML = html;

    const completeBtn = document.getElementById('completeBtn');
    if (completeBtn) {
        completeBtn.onclick = () => {
            modalContainer.innerHTML = '';
        };
    }
};
