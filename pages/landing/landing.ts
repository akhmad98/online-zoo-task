const PETS_FETCH_PATH: string = 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets';
const FEEDS_FETCH_PATH: string = 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/feedback';

(function(): void {
    const ACTIVE_CLASS: string = 'header_nav-active';
    interface IBurgerMenuElements {
        navMenu: HTMLElement,
        closeBtn: HTMLElement,
        burgerTab: HTMLElement,
    }

    const getElementGenericly = <T extends HTMLElement>(selector: string): T => {
        const el = document.querySelector<T>(selector);

        if (!el) {
            throw new Error(`No selected ${el} found!`);
        }
        return  el;
    }

    const burgerElements: IBurgerMenuElements = {
        navMenu: getElementGenericly<HTMLElement>('.header_nav'),
        closeBtn: getElementGenericly<HTMLElement>('.header_nav-close'),
        burgerTab: getElementGenericly<HTMLElement>('.burger'),
    }


    const toggleMenu = (isOpenMenu: boolean): void => {
        if (isOpenMenu) {
            burgerElements.navMenu.classList.add(ACTIVE_CLASS);
        } else {
            burgerElements.navMenu.classList.remove(ACTIVE_CLASS);
        }
    }

    burgerElements.burgerTab.addEventListener('click', (): void => {        
        toggleMenu(true);
    })

    burgerElements.closeBtn.addEventListener('click', (e: MouseEvent) => {
        toggleMenu(false);
    })
})()

interface IMeetAnimal {
    id: number,
    name: string,
    commonName: string,
    description: string
}

interface IMeetAnimals {
    data: Array<IMeetAnimal>
}

interface IFeedback {
    id: number,
    city: string,
    month:  string,
    year: string,
    text: string,
    name: string,
}

interface IFeedbacks {
    data: Array<IFeedback>
}

const movingCardsAndGrids = (): void => {
    interface GridLayoutWithChildElement {
        parent: HTMLElement,
        childs: Array<Element>,
    }
    interface ICardMoverElements {
        meetGridLayout: GridLayoutWithChildElement,
        feedGridLayout: GridLayoutWithChildElement,
        nextFeedbtn: HTMLElement,
        prevFeedbtn: HTMLElement,
        nextMeetbtn: HTMLElement,
        prevMeetBtn: HTMLElement,
        animalGridLayout: GridLayoutWithChildElement,
        dots: NodeListOf<HTMLElement>,
    }

    function getElementsParentChild<T extends HTMLElement>(selector: string): GridLayoutWithChildElement {
        const parent: T | null = document.querySelector<T>(selector);

        if (!parent) {
            throw new Error(`No ${selector} element found`);
        }

        parent.children[0]?.id
        return {
            parent: parent,
            childs: [...parent.children],
        }
    }
    function getElementGenericly<T extends HTMLElement>(selector: string, all: true): NodeListOf<T>;
    function getElementGenericly<T extends HTMLElement>(selector: string, all?: false): T;
    function getElementGenericly<T extends HTMLElement>(selector: string, all = false): NodeListOf<T> | T {
        if (all) {
            const el = document.querySelectorAll<T>(selector);
            if (el.length === 0) throw new Error(`Not dot element found`);
            return el;
        }

        const el = document.querySelector<T>(selector);
        
        if (!el) {
            throw new Error(`No element ${selector} found in DOM`);
        }

        return el;
    }

    const cardMoverElements: ICardMoverElements = {
        meetGridLayout: getElementsParentChild<HTMLElement>('.meet-animal-grid'),
        feedGridLayout: getElementsParentChild<HTMLElement>('.feed-grid'),
        nextMeetbtn: getElementGenericly<HTMLButtonElement>('.next-btn'),
        prevMeetBtn: getElementGenericly<HTMLButtonElement>('.prev-btn'),
        nextFeedbtn: getElementGenericly<HTMLButtonElement>('.next'),
        prevFeedbtn: getElementGenericly<HTMLButtonElement>('.prev'),
        animalGridLayout: getElementsParentChild<HTMLElement>('.animal-grid'),
        dots: getElementGenericly<HTMLElement>('.dot', true),
    }

    function scrollCardsSlowly(gapWidth: number, scrollToLeft: boolean, gridEl: GridLayoutWithChildElement) {
        let cardWidth: number = 0;
        if (gridEl.childs.length > 0
                && gridEl.childs[0]
        ) {
            if (scrollToLeft) {
                cardWidth = gridEl.childs[0]?.clientWidth;
                gridEl.parent.scrollLeft += (cardWidth + gapWidth);
            } else {
                cardWidth = gridEl.childs[0]?.clientWidth;
                gridEl.parent.scrollLeft -= (cardWidth + gapWidth);
            }
        }
    }
    
    function scrollCardsOver(gapWidth: number, scrlPost: number, gridEl: GridLayoutWithChildElement, direction: number): number {
        let cardWidth: number = 0;
        const maxScroll: number = gridEl.parent.scrollWidth - gridEl.parent.clientWidth;

        if (gridEl.childs.length > 0
                && gridEl.childs[0]
        ) {
            cardWidth = gridEl.childs[0].clientWidth + gapWidth;
            let newPos = scrlPost + (cardWidth * direction);
            
            if (newPos < -maxScroll) {
                newPos = -maxScroll;
            } 
            if (newPos > 0) {
                newPos = 0;
            }

            scrlPost = newPos;
            gridEl.parent.style.transform = `translateX(${scrlPost}px)`
        }

        return scrlPost;
    }

    function tipByDot(gapWidth: number, indiceDOT: number, gridEl: GridLayoutWithChildElement) {
        let cardWidth: number = 0;
        if (gridEl.childs.length > 0
                && gridEl.childs[0]
        ) {
            cardWidth = gridEl.childs[0].clientWidth;
            const scrlAmnt: number = indiceDOT * (cardWidth + gapWidth);

            cardMoverElements.animalGridLayout.parent.scrollTo({
                left: scrlAmnt,
                behavior: 'smooth',
            });
        }
    }

    function updateActiveDot(actIndx: number) {
        cardMoverElements.dots.forEach((dot: HTMLElement, i: number) => {
            if (i === actIndx) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        })
    }

    const gapColumnOfMeetGrid: number = parseFloat(window.getComputedStyle(cardMoverElements.meetGridLayout.parent).columnGap);
    const gapColumnOfFeedGrid: number = parseFloat(window.getComputedStyle(cardMoverElements.feedGridLayout.parent).columnGap);
    const gapColumnOfAnimalGrid: number = parseFloat(window.getComputedStyle(cardMoverElements.animalGridLayout.parent).columnGap);

    cardMoverElements.nextMeetbtn.addEventListener('click', (e: MouseEvent) => {
        console.log('ameet')
        scrollCardsSlowly(gapColumnOfMeetGrid, true, cardMoverElements.meetGridLayout);
    })

    cardMoverElements.prevMeetBtn.addEventListener('click', (e: MouseEvent) => {
        console.log('bmeet')
        scrollCardsSlowly(gapColumnOfMeetGrid, false, cardMoverElements.meetGridLayout);
    })

    let scrollPosition: number = 0;

    cardMoverElements.nextFeedbtn.addEventListener('click', (e: MouseEvent) => {
        console.log('afeed')
        scrollPosition = scrollCardsOver(gapColumnOfFeedGrid, scrollPosition, cardMoverElements.feedGridLayout, -1);
    })

    cardMoverElements.prevFeedbtn.addEventListener('click', (e: MouseEvent) => {
        console.log('bfeed')
        scrollPosition = scrollCardsOver(gapColumnOfFeedGrid, scrollPosition, cardMoverElements.feedGridLayout, 1);
    })

    cardMoverElements.dots.forEach(((dot: HTMLElement, index: number) => {
        dot.addEventListener('click', (e: MouseEvent) => {
            tipByDot(gapColumnOfAnimalGrid, index, cardMoverElements.animalGridLayout);

            updateActiveDot(index);
        })
    }))
}

retrieveDataFromBack(PETS_FETCH_PATH).catch(err => {
    console.warn(err);
});
retrieveDataFromBack(FEEDS_FETCH_PATH).catch(err => {
    console.warn(err);
});

movingCardsAndGrids();

const popUpDonationBox = () => {
    interface IPopUpBoxElements {
        openBtnFooter: HTMLElement,
        openBtnDonation: HTMLElement,
        openButtonQuieckie: HTMLElement,
        inputQueickie: HTMLElement,
        modalContainer: HTMLElement,
    }

    function getElementdByGenericWay<T extends HTMLElement>(selector: string, byid: boolean): T {
        if (byid) {
            const el: T | null = document.getElementById(selector) as T;
            if (!el) throw new Error(`No element ${selector} found in DOM`);
            return el
        }
        const el: T | null= document.querySelector<T>(selector);
        if (!el) throw new Error(`No element ${selector} found in DOM`);
        return el;
    }

    const donationPopUpElements: IPopUpBoxElements = {
        openBtnFooter: getElementdByGenericWay<HTMLButtonElement>('.donate_btn', false),
        openBtnDonation: getElementdByGenericWay<HTMLButtonElement>('.donate-now-btn', false),
        openButtonQuieckie: getElementdByGenericWay<HTMLButtonElement>('.donate-now', false),
        inputQueickie: getElementdByGenericWay<HTMLInputElement>('.donation_input_group', false),
        modalContainer: getElementdByGenericWay<HTMLElement>('modalContainer', true),

    }
}
// const openBtn = document.querySelector('.donate_btn');
// const openBtnA = document.querySelector('.donate-now-btn');
// const openBtnB = document.querySelector('.donate-now');

// const modalContainer = document.getElementById('modalContainer'); // Пустой div для модалки

// openBtn.onclick = async () => {
//     const response = await fetch('../modals/popup.html');
//     const html = await response.text();
    
//     modalContainer.innerHTML = html;

//     const completeBtn = document.getElementById('completeBtn');
//     if (completeBtn) {
//         completeBtn.onclick = () => {
//             modalContainer.innerHTML = '';
//         };
//     }
// };

async function retrieveDataFromBack (path: string): Promise<void> {
    let PREFIX: string = '';
    let grid: HTMLDivElement | null = null;

    if (path.includes('pets')) {
        grid = document.querySelector('.meet-animal-grid');
        PREFIX = 'pets';
    } else if (path.includes('feedback')) {
        grid = document.querySelector('.feed-grid');
        PREFIX = 'feedbacks';
    }

    if (!grid) throw new Error(`No element found!`);
    showLoader(6, grid);

    try {
        const response = await fetch(path);

        if (!response) {
            throw new Error(`No data found!`);
        }

        const content: IFeedbacks | IMeetAnimals = await response.json();
        renderConent(content, PREFIX);
    } catch (error) {
        grid.innerHTML = '<p>Something went wrong. Please, refresh the page</p>';
    }
}

function renderConent(content: IMeetAnimals | IFeedbacks, type: string): void {    
    let contentLayout: HTMLDivElement;
    if (type === 'pets') {
        const data = content.data as Array<IMeetAnimal>;

        contentLayout = document.querySelector('.meet-animal-grid') as HTMLDivElement;
        data.forEach((el: IMeetAnimal, ind: number) => {
            const card: HTMLDivElement = document.createElement('div');
            card.className = 'meet-animal-card';
            card.innerHTML = `
                <div class="meet-animal-card">
                    <div class="card-image-wrapper">
                        <span class="pet-name">${el.name}</span>
                        <img src="../../assets/images/koala.png" alt="${el.commonName}">
                    </div>
                    <div class="meet-content">
                        <h3>Giant Panda</h3>
                        <p>${el.description}</p>
                        <a href="#" class="feed-link">VIEW LIVE CAM →</a>
                    </div>
                </div>
            `;
            contentLayout.append(card);
        });
    } else if (type === 'feedbacks') {
        const data = content.data as Array<IFeedback>;
        contentLayout = document.querySelector('.feed-grid') as HTMLDivElement;
        data.forEach((el: IFeedback) => {
            const card: HTMLDivElement = document.createElement('div');
            card.className = 'feed-card';
            card.innerHTML = `
                <span class="quote">“</span>
                <h3 class="location-date">${el.city}, ${el.month} ${el.year}</h3>
                <p class="feed-text">${el.text}</p>
                <p class="user-name">${el.name}</p>
            `;
            contentLayout.append(card);
        });
    }
}

function showLoader(cnt: number, grid: HTMLDivElement) {
    grid.innerHTML = '';
    for (let i = 0; i < cnt; i++) {
        const sk: HTMLDivElement = document.createElement('div');
        sk.className = 'skeleton-card';
        sk.style.width = `${grid.clientWidth}`;
        sk.style.height = `${grid.clientHeight}`;
        grid.appendChild(sk);
    }
}