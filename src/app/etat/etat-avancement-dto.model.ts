import { InformerARDTO } from "../informer/informer-ar-dto.model";
import { RaisonInobservationDTO } from "../raison/raison-observation-dto.model";

export interface EtatAvancementDTO {
    idEtat: number;                 // ID de l'état d'avancement
    nbCorrespondanceAL: number;     // Nombre de correspondances AL
    dateCorrespondanceAL: string;   // Date de correspondance AL (format ISO string)
    nbReponseAL: number;            // Nombre de réponses AL
    dateReponseAL: string;          // Date de réponse AL (format ISO string)
    informerAR : InformerARDTO;
    raisonInobservation : RaisonInobservationDTO;
  }

  