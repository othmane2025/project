import { EtatAvancementDTO } from "../etat/etat-avancement-dto.model";
import { RelogementDTO } from "../relogement/relogement-dto.model";

// models/communiquer-decision-dto.model.ts
export interface CommuniquerDecisionDTO {
    idCom: number;
    nbDec: number;
    dateDec: Date;
    // Ajoutez d'autres attributs selon votre besoin
    relogement:RelogementDTO;
    etatAvancement: EtatAvancementDTO; // Correctement nommé
  }
  