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
        scrollCardsSlowly(gapColumnOfMeetGrid, true, cardMoverElements.meetGridLayout);
    })

    cardMoverElements.prevMeetBtn.addEventListener('click', (e: MouseEvent) => {
        scrollCardsSlowly(gapColumnOfMeetGrid, false, cardMoverElements.meetGridLayout);
    })

    let scrollPosition: number = 0;

    cardMoverElements.nextFeedbtn.addEventListener('click', (e: MouseEvent) => {
        scrollPosition = scrollCardsOver(gapColumnOfFeedGrid, scrollPosition, cardMoverElements.feedGridLayout, -1);
    })

    cardMoverElements.prevFeedbtn.addEventListener('click', (e: MouseEvent) => {
        scrollPosition = scrollCardsOver(gapColumnOfFeedGrid, scrollPosition, cardMoverElements.feedGridLayout, 1);
    })

    cardMoverElements.dots.forEach(((dot: HTMLElement, index: number) => {
        dot.addEventListener('click', (e: MouseEvent) => {
            tipByDot(gapColumnOfAnimalGrid, index, cardMoverElements.animalGridLayout);

            updateActiveDot(index);
        })
    }))
}

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
