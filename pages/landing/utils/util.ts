import type { IGridLaytouWithChildren } from "../interfaces/IGridLaytouWithChildren.ts";

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