interface IAnimalData {
    readonly [key: string]: string,
}

export interface IAnimalPageData {
    readonly [key: string]: IAnimalData,
}