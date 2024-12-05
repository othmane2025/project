import { SituationChefFamille } from "../enumeration/situation-chef-famille.enum";
import { ExpertiseTechnique } from "../expertise/expertise.model";
import { StatutActuelDTO } from "../statut/statut-actuel-dto.model";

// models/batiment-dto.model.ts
export interface BatimentDTO {
    idBat: number;
    adresse: string;
    surface: number;
    nbetage: string;
    nomPrenomProprietaire: string;
    nbFamilleResident: number;
    nomPrenomResident: string;
    situationChefFamille: string;
    nbMagasin: number;
    nomPrenomExploitantMagasin: string;
    situationExploitant: string;
    filetelechargerImage: string;
    statut : StatutActuelDTO;
    expertise?: ExpertiseTechnique | null;
  }
  