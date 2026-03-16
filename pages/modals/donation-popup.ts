const popingUp = (): void => {
    const IDSSTRING_BYSTEP: Array<string> = ['step_0', 'step_1', 'step_2'];
    const TITLES: Array<string> = [
        "Donation Information:",
        "Billing Information:",
        "Payment Information:"
    ]

    const steps: Array<HTMLElement> = IDSSTRING_BYSTEP.map((el: string) => {
        const a: HTMLElement | null = document.getElementById(el);
        if (!a) throw new Error(`No element ${el} found in DOM`);
        return a;
    });

    interface IPopUpElements {
        otherInput: HTMLInputElement,
        parentOfBtns: HTMLElement,
        dots: NodeListOf<HTMLElement>,
        nextBtn: HTMLElement,
        prevBtn: HTMLElement,
        completeBtn: HTMLElement,
        otherBtn: HTMLElement,
        feeBtns: NodeListOf<HTMLElement>,
        petBtn: HTMLElement,
        checkBoxMonthly: HTMLInputElement,
        firstNameInput: HTMLInputElement,
        secondNameInput: HTMLInputElement,
        sectionTitle: HTMLElement,
        valueFromSelect: HTMLSelectElement,
    }

    function getElementdByGenerics<T extends HTMLElement>(selector: string, byid: boolean, all: true): NodeListOf<T>;
    function getElementdByGenerics<T extends HTMLElement>(selector: string, byid: boolean, all?: false): T
    function getElementdByGenerics<T extends HTMLElement>(selector: string, byid: boolean): NodeListOf<T> | T {
        let element: T | null = null;
        if (byid) {
            element = document.getElementById(selector) as T;
        } else {
            element = document.querySelector<T>(selector);
        }

        if (!element) {
            throw new Error(`No element ${selector} found in DOM`);
        }

        return element;
    }

    const popUpElements: IPopUpElements = {
        otherInput: getElementdByGenerics<HTMLInputElement>('.other-input', false),
        parentOfBtns: getElementdByGenerics<HTMLElement>('.parent-of-btns', false),
        dots: getElementdByGenerics<HTMLElement>('.dot', false, true),
        nextBtn: getElementdByGenerics<HTMLButtonElement>('.next-btn', false),
        prevBtn: getElementdByGenerics<HTMLButtonElement>('.prev-btn', false),
        completeBtn: getElementdByGenerics<HTMLButtonElement>('.complete-btn', false),
        feeBtns: getElementdByGenerics<HTMLButtonElement>('.amt-btn', false, true),
        otherBtn: getElementdByGenerics<HTMLButtonElement>('.other-btn', false),
        petBtn: getElementdByGenerics<HTMLButtonElement>('.pet-btn', false),
        sectionTitle: getElementdByGenerics<HTMLElement>('.section-title', false),
        checkBoxMonthly: getElementdByGenerics<HTMLInputElement>('.monthly-donate', false),
        firstNameInput: getElementdByGenerics<HTMLInputElement>('firstName', true),
        secondNameInput: getElementdByGenerics<HTMLInputElement>('secondName', true),
        valueFromSelect: getElementdByGenerics<HTMLSelectElement>('pet-select', true),
    }
    interface IDonationState {
        selectedAmnt: number,
        currentStep: number,
        monthly: boolean,
        forWhom: string,
        firstName: string,
        seconName: string,
    }

    let state: IDonationState = {
        selectedAmnt: 0,
        currentStep: 0,
        monthly: false,
        forWhom: '',
        firstName: '',
        seconName: ''
    }

    function hoverButton(isHovered: boolean, targetBtn: HTMLButtonElement): void {
        const currentActivebtn = popUpElements.parentOfBtns.querySelector('.actives');
        if (currentActivebtn) {
            currentActivebtn.classList.remove('actives');
        }
        targetBtn.classList.add('actives');
    }

    function saveValueFromBtn(targetBtn: HTMLButtonElement): number {
        let amount: string | null;
        if (targetBtn.hasAttribute('data-amount')) {
            amount = targetBtn.getAttribute('data-amount');
            popUpElements.otherInput.value = '';
        } else {
            amount = popUpElements.otherInput.value;
            if (!amount) console.warn('Please fill the input!');
        }

        return !amount ? 0 : parseFloat(amount);
    }

    popUpElements.parentOfBtns.addEventListener('click', (e: MouseEvent) => {
        console.log('aa')
        const target = e.target as HTMLElement;
        const closestBtn = target.closest('button');
        if (!closestBtn || !popUpElements.parentOfBtns.contains(closestBtn)) return;

        hoverButton(true, closestBtn);

        state.selectedAmnt = saveValueFromBtn(closestBtn);
    } );

    popUpElements.otherInput.addEventListener('input', () => {
        if (!popUpElements.otherBtn.classList.contains('actives')) {
            popUpElements.parentOfBtns.querySelector('.actives')?.classList.remove('acitves');
            popUpElements.otherBtn.classList.add('actives');
        }

        state.selectedAmnt = parseFloat(popUpElements.otherInput.value) || 0;
    });

    function updateStep(): void {
        steps.forEach((step: HTMLElement, indx: number) => {
            step.style.display = (indx === state.currentStep) ? 'block' : 'none';
        });

        popUpElements.dots.forEach((dot: HTMLElement, ind: number) => {
            dot.classList.toggle('active', ind === state.currentStep);
        });

        popUpElements.sectionTitle.textContent = TITLES[state.currentStep] ?? null;

        popUpElements.prevBtn.style.display = (state.currentStep === 0) ? 'none' : 'inline-block';

        if (state.currentStep === steps.length - 1) {
            popUpElements.nextBtn.style.display = 'none';
            popUpElements.completeBtn.style.display = 'block';
        } else {
            popUpElements.nextBtn.style.display = 'inline-block';
            popUpElements.completeBtn.style.display = 'none';
        }
    }

    popUpElements.petBtn.addEventListener('click', (e: MouseEvent) => {
        if (!popUpElements.valueFromSelect || !popUpElements.valueFromSelect.value) {
            console.warn('No pet selected!');
        }

        state.forWhom = popUpElements.valueFromSelect.value;
    })

    popUpElements.checkBoxMonthly.addEventListener('change', () => {
        if (popUpElements.checkBoxMonthly.checked) {
            state.monthly = popUpElements.checkBoxMonthly.checked;
        }
    })


    popUpElements.nextBtn.addEventListener('click', (e: MouseEvent) => {
        if (state.currentStep < steps.length - 1) {
            state.currentStep++;
            updateStep();
        }
    });

    popUpElements.prevBtn.addEventListener('click', (e: MouseEvent) => {
        if (state.currentStep > 0) {
            state.currentStep--;
            updateStep();
        }
    });

    updateStep();


    popUpElements.completeBtn.onclick = async() => {
        const conatiner: HTMLElement | null = document.querySelector('.modal');
        if (!conatiner) throw new Error('NO element found');
        conatiner.innerHTML = '';
        conatiner.style.display = 'none'
        window.parent.postMessage({
            action: 'complete',
        }, 'http://127.0.0.1:5173/pages/landing/index.html') 
    };
}

popingUp();