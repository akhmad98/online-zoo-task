import { Pet } from "./pet.dto";

export class CameraAndPet {
    readonly petId: number | null;
    readonly text: string;
    readonly id: number | null;
    Pet: Pet;

    constructor(petId: number | null = null, text: string, id: number | null = null, objectPet: Pet) {
        this.petId = petId;
        this.text = text;
        this.id = id;
        this.Pet = objectPet;
    }
}