import type { IGridLaytouWithChildren } from "../../interfaces/IGridLaytouWithChildren";

export class SliderByScroll<T extends { id: number, name: string }> {
    private grid: IGridLaytouWithChildren;
    private cardsAsInput: Array<T>;
    private gap: number;
    private renderCard: (data: T) => string;

    constructor(gridLayout: IGridLaytouWithChildren, cards: Array<T>, gap: number = 30, renderCard: (data: T) => string) {
        this.grid = gridLayout as IGridLaytouWithChildren;
        this.gap = gap;
        this.cardsAsInput = cards;
        this.renderCard = renderCard;
        this.initiate();
    }

    private initiate() {
        this.handleCardsAsInput();
    }

    private handleCardsAsInput() {
        this.cardsAsInput.forEach((el: T, ind: number) => {
            const newCard: HTMLDivElement = document.createElement('div');
            newCard.className = 'meet-animal-card';
            newCard.innerHTML = this.renderCard(el);
            this.grid.parent.appendChild(newCard);
        })
    }

    public scroll(scrollLeft: boolean) {
        let cards = this.grid.childs;
        if (cards.length === 0 && this.cardsAsInput.length > 0) {
            const wrapper = document.querySelector(`.${this.grid.parent.className}`);
            if (wrapper && wrapper.children) {
                cards = [...wrapper?.children];
            }
        }
        this.cardsAsInput.length > 0
        if (cards.length === 0) return;
        
        const cardWidth: number = (cards[0] as HTMLElement).clientWidth;
        const scrlAmnt: number = cardWidth + this.gap;

        if (scrollLeft) {
            this.grid.parent.scrollLeft += scrlAmnt;

            if (this.grid.parent.scrollLeft + this.grid.parent.offsetWidth >= this.grid.parent.scrollWidth - 10) {
                setTimeout(() => {
                    const firstChild = this.grid.parent.firstElementChild as HTMLElement;
                    this.grid.parent.appendChild(firstChild);
                    this.grid.parent.scrollTo({ left: this.grid.parent.scrollLeft - scrlAmnt, behavior: 'auto' });
                }, 400);
            }
        } else {
            if (this.grid.parent.scrollLeft <= 0) {
                const lastChild = this.grid.parent.lastElementChild!;
                this.grid.parent.prepend(lastChild);
                this.grid.parent.scrollTo({ left: scrlAmnt, behavior: 'auto' });
            }

            setTimeout(() => {
                this.grid.parent.scrollLeft -= scrlAmnt;
            }, 10);
        }
    }
}