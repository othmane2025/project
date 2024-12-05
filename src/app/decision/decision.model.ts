import { CommuniquerDecisionDTO } from "../communiquer/communiquer-decision-dto.model";

export interface Decision {
    idDec: number; // Identifiant unique pour l'AppercuRapport
    nbDec: number;
    dateDec: Date; // ou Date
    recommandationDecision: string;
    fileRapport: File | null;
    communiquer: CommuniquerDecisionDTO;
  }