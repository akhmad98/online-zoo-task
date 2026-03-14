export class Pet {
    readonly id: number | null;
    readonly commonName: string;
    readonly scientificName: string;
    readonly type: string;
    readonly size: string;
    readonly diet: string;
    readonly habitat: string;
    readonly range: string;
    readonly latitude: string;
    readonly longitude: string;
    readonly description: string;
    readonly detailedDescription: string;

    constructor(
        commonName : string,
        scientificName : string,
        type: string,
        size: string,
        diet: string,
        habitat: string,
        range: string,
        latitude: string,
        longitude: string,
        description: string,
        detailedDescription: string,
        id: number | null = null
    ) {
        this.id = id;
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.type = type;
        this.size = size;
        this.diet = diet;
        this.habitat = habitat;
        this.range = range;
        this.latitude = latitude;
        this.longitude= longitude;
        this.description = description;
        this.detailedDescription = detailedDescription;
    }
}