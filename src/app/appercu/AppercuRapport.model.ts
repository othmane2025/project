import { Decision } from "../decision/decision.model";
import { ExpertiseTechnique } from "../expertise/expertise.model";

export interface AppercuRapport {
  idApp: number; // Identifiant unique pour l'AppercuRapport
  nbRecommandation: number;
  dateInspection: string; // ou Date
  recommandation: string;
  nbNotificationRapportInspection: number;
  dateNotification: string; // ou Date
  filerapportInspection: string;
  expertise?: ExpertiseTechnique; // L'expertise associée, optionnelle
  decision?: Decision; // Decision associée, optionnelle
  idBat: number;
}