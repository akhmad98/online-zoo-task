interface IAnimalData {
    readonly [key: string]: string,
}

export interface IPageData extends IAnimalData {
    title: string,
    video: string,
    donTitle: string,
    donText: string,
    infoDesc: string,
    stats: string,
    statInfo: string,
    img: string,
}