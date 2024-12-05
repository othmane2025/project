import { Annexe } from "../annexe/annexe.model";
import { NomArrondissement } from "../enumeration/nom-arrondissement";


export interface Arrondissement {
  idArr?: number;
  nomArrondissement: NomArrondissement | string; // Accepte NomArrondissement ou string
  annexes?: Annexe[];
}
