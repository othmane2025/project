export interface ExpertiseTechnique {
    idExp: number; // Identifiant unique de l'expertise
    bureauEtude: string; // Nom du bureau d'études
    date: Date; // Date de l'expertise
    recommandationExpertise: string; // Recommandation issue de l'expertise
    fileExpertise: File | null; // Fichier associé à l'expertise (peut être null si aucun fichier n'est lié)
    batiment?: any; // Ajoutez ceci si une relation avec le bâtiment existe
    
  }
  