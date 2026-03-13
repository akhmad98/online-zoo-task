import type { IGridLaytouWithChildren } from "./IGridLaytouWithChildren.ts";

export interface ICardMoverElements {
    meetGridLayout: IGridLaytouWithChildren,
    feedGridLayout: IGridLaytouWithChildren,
    nextFeedbtn: HTMLElement,
    prevFeedbtn: HTMLElement,
    nextMeetbtn: HTMLElement,
    prevMeetBtn: HTMLElement,
    animalGridLayout: IGridLaytouWithChildren,
    dots: NodeListOf<HTMLElement>,
}