import type { IGridLaytouWithChildren } from "../interfaces/IGridLaytouWithChildren";

export function showLoader(cnt: number, grid: HTMLElement) {
    grid.innerHTML = '';
    for (let i = 0; i < cnt; i++) {
        const sk: HTMLDivElement = document.createElement('div');
        sk.className = 'skeleton-card';
        sk.style.width = `${grid.clientWidth}px`;
        sk.style.height = `${grid.clientHeight}px`;
        grid.appendChild(sk);
    }
}

export function hideLoader(grid: HTMLElement) {
    const skeletons = grid.querySelectorAll('.skeleton-card');
    skeletons.forEach(el => el.remove());
}

export function tipByDot(gapWidth: number, indiceDOT: number, gridEl: IGridLaytouWithChildren) {
    let cardWidth: number = 0;
    if (gridEl.childs.length > 0
         && gridEl.childs[0]
    ) {
        cardWidth = gridEl.childs[0].clientWidth;
        const scrlAmnt: number = indiceDOT * (cardWidth + gapWidth);

        gridEl.parent.scrollTo({
            left: scrlAmnt,
            behavior: 'smooth',
        });
    }
}

export function capitalizeFirstLetter(str: string) {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function normalize(parentElement: HTMLElement, isMovedBelow: boolean) {
    const lastChild: HTMLDivElement = document.createElement('div');
    lastChild.className = 'above-persist';
    
    if (isMovedBelow) {
        lastChild.innerHTML = `
                    <div class="short-cam">
                        <button id="short-cam" onclick="updateContent('showFour')" aria-label="Short Cam">
                            <div class="above-perist">
                                <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.6591 7.63496L15 6.26992L7.5 0L0 6.26992L1.34091 7.63496L7.5 2.50342L13.6591 7.63496Z" fill="white"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                    `;
    } else {
        lastChild.innerHTML = `
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
    }

    parentElement.appendChild(lastChild);
}