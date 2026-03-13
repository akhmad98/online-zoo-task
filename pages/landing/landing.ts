import { FEEDS_FETCH_PATH, PETS_FETCH_PATH, NUMBER_LOADER } from "../constants/constants";
import type { IFeedback } from "../interfaces/IFeedback";
import type { IFeedbacks } from "../interfaces/IFeedbacks";
import type { IMeetAnimal } from "../interfaces/IMeetAnimal";
import type { IMeetAnimals } from "../interfaces/IMeetAnimals";
import { SliderByScroll } from "./components/SliderByScroll.ts";
import type { ICardMoverElements } from "../interfaces/ICardMoverElements";
import type { IGridLaytouWithChildren } from "../interfaces/IGridLaytouWithChildren";
import { hideLoader, showLoader, tipByDot } from "../utils/util";
import { api } from "../utils/api.ts";
import type { IAnimals } from "../interfaces/api.interface/pets.interface.ts";

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

const movingCardsAndGrids = async (): Promise<void> => {
    function getElementsParentChild<T extends HTMLElement>(selector: string): IGridLaytouWithChildren {
        const parent: T | null = document.querySelector<T>(selector);

        if (!parent) {
            throw new Error(`No ${selector} element found`);
        }

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
    const gapColumnOfMeetGrid: number = parseFloat(window.getComputedStyle(cardMoverElements.meetGridLayout.parent).columnGap);
    const gapColumnOfFeedGrid: number = parseFloat(window.getComputedStyle(cardMoverElements.feedGridLayout.parent).columnGap);
    const gapColumnOfAnimalGrid: number = parseFloat(window.getComputedStyle(cardMoverElements.animalGridLayout.parent).columnGap);
    let feederSlider: SliderByScroll<IFeedback>;
    let meeterSlider: SliderByScroll<IMeetAnimal>;

    showLoader(NUMBER_LOADER, cardMoverElements.feedGridLayout.parent);
    showLoader(NUMBER_LOADER, cardMoverElements.meetGridLayout.parent);
    try {
        const resultFromFeeds: IFeedbacks = await api.request<IFeedbacks>('/feedback');
        const resultFromMeets: IMeetAnimals = await api.request<IAnimals>('/pets');

        feederSlider = new SliderByScroll<IFeedback>(
            cardMoverElements.feedGridLayout, 
            resultFromFeeds.data, 
            gapColumnOfFeedGrid, 
            (item) => {
                return `
                    <span class="quote">“</span>
                    <h3 class="location-date">${item.city}, ${item.month} ${item.year}</h3>
                    <p class="feed-text">${item.text}</p>
                    <p class="user-name">${item.name}</p>
                `;
            }
        );
        meeterSlider = new SliderByScroll<IMeetAnimal>(
            cardMoverElements.meetGridLayout, 
            resultFromMeets.data, 
            gapColumnOfMeetGrid, 
            (item) => {
                return `
                    <div class="meet-animal-card">
                        <div class="card-image-wrapper">
                            <span class="pet-name">${item.name}</span>
                            <img src="../../assets/images/koala.png" alt="${item.commonName}">
                        </div>
                        <div class="meet-content">
                            <h3>Giant Panda</h3>
                            <p>${item.description}</p>
                            <a href="#" class="feed-link">VIEW LIVE CAM →</a>
                        </div>
                    </div>
                `;
            }
        );
    } catch (error) {
        console.log(error)
        const divGrid = document.querySelector('.meet-animal-grid');
        const errorMsg = document.createElement('p');
        errorMsg.innerHTML = 'Something went wrong! Refresh the page.';
        errorMsg.classList.add('error-msg');
        divGrid?.appendChild(errorMsg);
    } finally {
        hideLoader(cardMoverElements.feedGridLayout.parent);
        hideLoader(cardMoverElements.meetGridLayout.parent);
    }
    
    function scrollCardsOver(gapWidth: number, scrlPost: number, gridEl: IGridLaytouWithChildren, direction: number): number {
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

    function updateActiveDot(actIndx: number) {
        cardMoverElements.dots.forEach((dot: HTMLElement, i: number) => {
            if (i === actIndx) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        })
    }

    cardMoverElements.nextMeetbtn.addEventListener('click', (e: MouseEvent) => {
        meeterSlider.scroll(true);
    })

    cardMoverElements.prevMeetBtn.addEventListener('click', (e: MouseEvent) => {
        meeterSlider.scroll(false);
    })

    let scrollPosition: number = 0;

    cardMoverElements.nextFeedbtn.addEventListener('click', (e: MouseEvent) => {
        // feederSlider.scroll(true);
        scrollPosition = scrollCardsOver(gapColumnOfFeedGrid, scrollPosition, cardMoverElements.feedGridLayout, -1);
    })

    cardMoverElements.prevFeedbtn.addEventListener('click', (e: MouseEvent) => {
        // feederSlider.scroll(false);
        scrollPosition = scrollCardsOver(gapColumnOfFeedGrid, scrollPosition, cardMoverElements.feedGridLayout, 1);
    })

    cardMoverElements.dots.forEach(((dot: HTMLElement, index: number) => {
        dot.addEventListener('click', (e: MouseEvent) => {
            tipByDot(gapColumnOfAnimalGrid, index, cardMoverElements.animalGridLayout);

            updateActiveDot(index);
        })
    }))
}

movingCardsAndGrids().catch((err) => {
    console.warn(err);
});

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