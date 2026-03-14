import type { IPageDataFields } from "../interfaces/IPageDataFields";
import type { IAnimalPageData } from "../interfaces/IAnimalData";
import type { IPageData } from "../interfaces/IPageData";
import { api } from "../utils/api.ts";
import type { IPet } from "../interfaces/api.interface/pet.interface.ts";
import type { ICamera, ICameras } from "../interfaces/api.interface/cameras.interface.ts";
import { BASE_URL } from "../constants/constants.ts";
import type { CameraAndPet } from "../interfaces/camera.dtos/camera.dto.ts";
const cameraUrl = `/cameras`;
import { regexAnimal } from "../constants/constants.ts";
import { capitalizeFirstLetter } from "../utils/util.ts";

let ANIMAL_PAGE_DATA: IAnimalPageData = {};
(async (): Promise<void> => {
    await getFirstFourCameraDetails(cameraUrl);
    const wrapper = getElementGenericWay<HTMLElement>('.sidebar', false);
    createButtonsForSidebar(wrapper);
})()

async function getFirstFourCameraDetails(cameraUrl: string): Promise<void> {
    try {
        const getFirstFourData = await api.requestFirstFourCamersAndPetsById(cameraUrl);
        getFirstFourData.forEach((el: ICamera) => {
            ANIMAL_PAGE_DATA[`camera${el.id}-pet${el.petId}`] = {
                title: el.text,
                video: 'https://www.youtube.com/watch?v=lx0AU7nAyeM',
                donTitle: `make donation to `,
                donText: el.text,
                infoDesc: '',
                lastInfo: '',
                img: '/assets/images/contentimg.png',
                statsInfo: `<p><strong>Common Name:</strong></p><p><string>Specific Name:</strong></p><p><strong>Type:</strong></p><p><strong>Diet:</strong></p>`,
            }
        });
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}

async function showAllCameras(camerasUrl: string): Promise<void> {
        try {
        const allData = await api.request<ICameras>(cameraUrl);
        allData.data.forEach((el: ICamera) => {
            ANIMAL_PAGE_DATA[`camera${el.id}-pet${el.petId}`] = {
                title: el.text,
                video: 'https://www.youtube.com/watch?v=lx0AU7nAyeM',
                donTitle: `make donation to `,
                donText: el.text,
                infoDesc: '',
                lastInfo: '',
                img: '/assets/images/contentimg.png',
                statsInfo: `<p><strong>Common Name:</strong></p><p><string>Specific Name:</strong></p><p><strong>Type:</strong></p><p><strong>Diet:</strong></p>`,
            }
        });
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}
function getElementGenericWay<T extends HTMLElement>(selector: string, byId: boolean, all: true): NodeListOf<T>;
function getElementGenericWay<T extends HTMLElement>(selector: string, byId: boolean, all?: false): T;
function getElementGenericWay<T extends HTMLElement>(selector: string, byId: boolean, all = false): NodeListOf<T> | T {
    if (all) {
        const els = document.querySelectorAll<T>(selector) as NodeListOf<T>;
        if (els.length === 0) throw new Error(`Not dot element found`);
        return els;
    }
    
    let el: T | null;

    if (byId) {
        el = document.getElementById(selector) as T;
    } else {
        el = document.querySelector<T>(selector);
    }

    if (!el) {
        throw new Error(`No selected ${el} found!`);
    }

    return  el;
}
function createButtonsForSidebar(wrapper: HTMLElement) {
    Object.keys(ANIMAL_PAGE_DATA).forEach((el, ind) => {
        let label: string = '';
        if (ANIMAL_PAGE_DATA[el]?.title?.match(regexAnimal)) {
            const strInArr: Array<string> | null = ANIMAL_PAGE_DATA[el]?.title?.match(regexAnimal);
            if (strInArr && strInArr.length > 0 && strInArr[0]) {
                label = capitalizeFirstLetter(strInArr[0]);
            }
        }
        const btns: HTMLButtonElement = document.createElement('button');
        if (ind === 0) {
            btns.classList.add('first-ch');
        }
        btns.id = 'animal-cam-btn';
        btns.setAttribute('aria-label', `View ${label}`);
        btns.setAttribute('onclick', `updateContent('${el}')`);
        wrapper.appendChild(btns);
    });
    if (wrapper.children.length < 6) {
        const showAllBTns: HTMLElement = document.createElement('div');
        showAllBTns.className = 'next-cam';
        showAllBTns.innerHTML = `
                    <div class="next-cam">
                        <button id="next-cam" onclick="updateContent('showAll')" aria-label="Next All Cam">
                            <div class="below-perist">
                                <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.34091 0L0 1.36504L7.5 9L15 1.36504L13.6591 0L7.5 6.26992L1.34091 0Z" fill="white"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                    `;
        wrapper.appendChild(showAllBTns);
    }
}

(window as any).updateContent = async function(trigger: string): Promise<void> {
    const animalElementsByPage: IPageDataFields = {
        sidebar: getElementGenericWay<HTMLElement>('.sidebar', false),
        animalTitle: getElementGenericWay<HTMLElement>('animal-title', true),
        animalDetailsImg: getElementGenericWay<HTMLImageElement>('animal-details-img', true),
        animalLastInfo: getElementGenericWay<HTMLElement>('.infoP p', false),
        infoDesc: getElementGenericWay<HTMLElement>('.info-animal p', false),
        animalVideoFrame: getElementGenericWay<HTMLIFrameElement>('video-stream', true),
        donationTitle: getElementGenericWay<HTMLElement>('.don-title', false),
        donationText: getElementGenericWay<HTMLElement>('.don-text', false),
        animalStatsInfo: getElementGenericWay<HTMLElement>('.stats', false),
        sidebarButtons: getElementGenericWay<HTMLButtonElement>('.sidebar button', false, true),
    }
    try {
        if (trigger === 'showAll') {
            await showAllCameras(cameraUrl);
            createButtonsForSidebar(animalElementsByPage.sidebar);
        }

        const matchedString = trigger.split('-')[1]?.match(/\d/)?.[0];
        if (!matchedString) console.error('No camera found');
        const getIdFromAttr = matchedString ? parseInt(matchedString) : 0;
        // retrieve by id
        const petByID = await api.requestById<IPet>('/pets', getIdFromAttr);
        if (petByID) {
            console.log(petByID, 'data')
            if (ANIMAL_PAGE_DATA[trigger]) {
                ANIMAL_PAGE_DATA[trigger].donText = 'yesssss';
                console.log(ANIMAL_PAGE_DATA[trigger])
            }
                //ANIMAL_PAGE_DATA[trigger].donTitle += `${petByID.commonName}`;
            if (ANIMAL_PAGE_DATA[trigger]) ANIMAL_PAGE_DATA[trigger].infoDesc = `${petByID.description}`;
            if (ANIMAL_PAGE_DATA[trigger]) ANIMAL_PAGE_DATA[trigger].lastInfo = `${petByID.detailedDescription}`;
            if (ANIMAL_PAGE_DATA[trigger]) ANIMAL_PAGE_DATA[trigger].donText = `${petByID.description}`;
        }
        // if (ANIMAL_PAGE_DATA[trigger]) ANIMAL_PAGE_DATA[trigger].statsInfo = `${petByID.commonName}`;
        
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }

    const data = ANIMAL_PAGE_DATA[trigger] as IPageData;
    if (!data) return;

    if (animalElementsByPage.animalTitle)  animalElementsByPage.animalTitle.textContent = data.title;
    if (animalElementsByPage.animalStatsInfo) animalElementsByPage.animalStatsInfo.innerHTML = data.statsInfo ? data.statsInfo : '';
    if (animalElementsByPage.animalVideoFrame) animalElementsByPage.animalVideoFrame.src = data.video;
    if (animalElementsByPage.donationText) animalElementsByPage.donationText.textContent = data.donText;
    if (animalElementsByPage.donationTitle) animalElementsByPage.donationTitle.textContent = data.donTitle;
    if (animalElementsByPage.infoDesc) animalElementsByPage.infoDesc.textContent = data.infoDesc;
    if (animalElementsByPage.animalLastInfo) animalElementsByPage.animalLastInfo.textContent = data.lastInfo ? data.lastInfo : '';
    if (animalElementsByPage.animalDetailsImg) {
        animalElementsByPage.animalDetailsImg.src = data.img;
        animalElementsByPage.animalDetailsImg.alt = data.title;
    }



    animalElementsByPage.sidebarButtons.forEach((btn) => {
        btn.classList.remove('active');

        const regexStr = `View\s${trigger}`;
        if (btn.ariaLabel?.match(new RegExp(regexStr))) {
            btn.classList.add('active');
        }
    })
}