import { SocieteSurveillance } from '../enumeration/societe-surveillance.enum';

export interface RelogementDTO {
  idRel: number;
  nbFamilleExplusees: number;
  nbFamillePrestations: number;
  nomPrenomPrestations: string;
  nbFamilleBeneficiaire: number;
  nomPrenomBeneficiaire: string;
  dateTirageSort: Date;
  lieuPrestation: string;
  relocalisation: string;
  societeSurveillance: SocieteSurveillance; // Utilisation de l'énumération
  fileRapportTirage: string;

  
}
