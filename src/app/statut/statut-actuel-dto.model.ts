import { BatimentDTO } from "../batiment/batiment-dto.model";
import { EntierementDemoli } from "../enumeration/entierement-enums";
import { PartiellementDemoli } from "../enumeration/partiellement-enums";

export interface StatutActuelDTO {
    idStatut: number;
    vide: string;
    vacant: string;
    entierementDemoli: string;
    partiellementDemoli: string;
    renforce: string;
    restaurer: string;
    batiment : BatimentDTO;
  }