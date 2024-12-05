import { Component } from '@angular/core';
import { NomAnnexe } from '../enumeration/nom-annexe';
import { NomArrondissement } from '../enumeration/nom-arrondissement';
import { BatimentService } from '../batiment/batiment.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppercuService } from '../appercu/appercu.service';
import { ExpertiseService } from '../expertise/expertise.service';
import { RecommandationExpertise } from '../expertise/recommandation-expertise.enum';
import { DecisionService } from '../decision/decision.service';
import { RecommandationDecision } from '../enumeration/recommandation-decision.enum';
import { CommuniquerService } from '../communiquer/communiquer.service';
import { CommuniquerDecisionDTO } from '../communiquer/communiquer-decision-dto.model';
import { SituationExploitant } from '../enumeration/situation-exploitant.enum';
import { SituationChefFamille } from '../enumeration/situation-chef-famille.enum';
import { EtatAvancementDTO } from '../etat/etat-avancement-dto.model';
import { EtatService } from '../etat/etat.service';
import { InformerARDTO } from '../informer/informer-ar-dto.model';
import { InformerService } from '../informer/informer.service';
import { RaisonInobservationDTO } from '../raison/raison-observation-dto.model';
import { RaisonService } from '../raison/raison.service';
import { RelogementDTO } from '../relogement/relogement-dto.model';
import { RelogementService } from '../relogement/relogement.service';
import { StatutActuelDTO } from '../statut/statut-actuel-dto.model';
import { StatutService } from '../statut/statut.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Router, RouterModule } from '@angular/router';
import { BatimentComponent } from '../batiment/batiment.component';
import { ExpertiseTechnique } from '../expertise/expertise.model';
import { UpdateBatimentModalComponent } from '../update-batiment-modal/update-batiment-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AppercuRapport } from '../appercu/AppercuRapport.model';
@Component({
  selector: 'app-montableau',
  templateUrl: './montableau.component.html',
  styleUrls: ['./montableau.component.css']
})
export class MonTableauComponent {


  isSearchActive: boolean = false;

  filteredBatiments: any[] = []; // Bâtiments filtrés par recommandation
  expertises: any[] = [];
  recommandation: string = '';
  baseUrl: any;
  selectedBatiments: any[] = [];
  selectedAppercuRapports: any[] = [];
  selectedExpertiseTechniques: any[] = [];
  selectedDecisionCollectives: any[] = [];
  selectedInformerAR:( InformerARDTO| null)[] = []; // Variable pour stocker les données récupérées
  currentPage: number = 0;
  pageSize: number = 8;
  selectedRelogements: (RelogementDTO | undefined)[] = [];
  selectedCommuniquerDecisions: (CommuniquerDecisionDTO | null)[] = [];
  // Déclarez les variables pour stocker les données d'état d'avancement
  selectedEtatAvancements:(EtatAvancementDTO| null)[] = [];
   // Accès à l'énumération depuis le composant
   public RecommandationDecision = RecommandationDecision;
  // Déclarez les variables pour stocker les données de RaisonInobservation
  selectedRaisons: (RaisonInobservationDTO| null)[] = [];
  selectedStatutActuels: StatutActuelDTO[] = [];


  //affichage de tableau à partir de annexe et arrondissment
  groupedData: { arrondissement: string, annexes: string[] }[] = [];
  rows = [
    { numero: NomAnnexe.ANNEXE_56, arrondissement: NomArrondissement.BenMsick, nom: '56', nomArrr: 'ابن مسيك' },
    { numero: NomAnnexe.ANNEXE_57, arrondissement: NomArrondissement.BenMsick, nom: '57', nomArrr: 'ابن مسيك' },
    { numero: NomAnnexe.ANNEXE_57Bis, arrondissement: NomArrondissement.BenMsick, nom: '57Bis', nomArrr: 'ابن مسيك' },
    { numero: NomAnnexe.ANNEXE_58, arrondissement: NomArrondissement.BenMsick, nom: '58', nomArrr: 'ابن مسيك' },
    { numero: NomAnnexe.ANNEXE_58Bis, arrondissement: NomArrondissement.BenMsick, nom: '58Bis', nomArrr: 'ابن مسيك' },
    { numero: NomAnnexe.ANNEXE_59, arrondissement: NomArrondissement.BenMsick, nom: '59', nomArrr: 'ابن مسيك' },
    { numero: NomAnnexe.ANNEXE_60, arrondissement: NomArrondissement.Sbata, nom: '60', nomArrr: 'سباتة' },
    { numero: NomAnnexe.ANNEXE_60Bis, arrondissement: NomArrondissement.Sbata, nom: '60Bis', nomArrr: 'سباتة' },
    { numero: NomAnnexe.ANNEXE_61, arrondissement: NomArrondissement.Sbata, nom: '61', nomArrr: 'سباتة' },
    { numero: NomAnnexe.ANNEXE_62, arrondissement: NomArrondissement.Sbata, nom: '62', nomArrr: 'سباتة' },
    { numero: NomAnnexe.ANNEXE_SAB, arrondissement: NomArrondissement.Sbata, nom: 'سيدي أحمد بلحسن', nomArrr: 'سباتة' },
  ];

  ngOnInit() {
    this.groupRows();
  }
  
  groupRows() {
    const map = new Map<string, string[]>();
    // Regroupez les données par arrondissement
    this.rows.forEach(row => {
      if (!map.has(row.nomArrr)) {
        map.set(row.nomArrr, []);
      }
      map.get(row.nomArrr)?.push(row.nom);
    });
    // Convertissez le Map en un tableau pour lier aux données
    this.groupedData = Array.from(map, ([arrondissement, annexes]) => ({ arrondissement, annexes }));
  }
  convertToNomAnnexe(value: string): NomAnnexe {
    const mapping: { [key: string]: NomAnnexe } = {
      '56': NomAnnexe.ANNEXE_56,
      '57': NomAnnexe.ANNEXE_57,
      '57Bis': NomAnnexe.ANNEXE_57Bis,
      '58': NomAnnexe.ANNEXE_58,
      '58Bis': NomAnnexe.ANNEXE_58Bis,
      '59': NomAnnexe.ANNEXE_59,
      '60': NomAnnexe.ANNEXE_60,
      '60Bis': NomAnnexe.ANNEXE_60Bis,
      '61': NomAnnexe.ANNEXE_61,
      '62': NomAnnexe.ANNEXE_62,
      'سيدي أحمد بلحسن': NomAnnexe.ANNEXE_SAB,
    };
    const nomAnnexe = mapping[value];
    if (!nomAnnexe) {
      console.error(`Invalid NomAnnexe value: ${value}`);
      throw new Error(`Invalid NomAnnexe value: ${value}`);
    }
    return nomAnnexe;
  }
  convertToNomArrondissement(value: string): NomArrondissement {
    return value as NomArrondissement;
  }
  //fini ici

  constructor(private batimentService: BatimentService, private appercuService: AppercuService, private expertiseService: ExpertiseService,
    private decisionService : DecisionService ,private communiquerService:CommuniquerService ,private informerService : InformerService ,
    private etatService:EtatService , private raisonService : RaisonService , private relogementService: RelogementService ,
    private statutService: StatutService , private router: Router,  private dialog: MatDialog,private http: HttpClient) {}

    
   
// Method to get the label of SituationChefFamille
getSituationChefFamilleLabel(value: string ): string {
  switch (value) {
    case SituationExploitant.PROPRIETAIRE:
      return 'مالك';
    case SituationExploitant.LOCATAIRE:
      return 'مكتري';
    default:
      return 'غير معروف';
  }
}

// Method to get the label of SituationExploitant
getSituationExploitantLabel(value: string): string {
  switch (value) {
    case SituationExploitant.PROPRIETAIRE:
      return 'مالك';
    case SituationExploitant.LOCATAIRE:
      return 'مكتري';
    default:
      return 'غير معروف';
  }
}

onArrondissementClick(arrondissement: NomArrondissement): void {
  this.selectedBatiments = [];
  this.selectedAppercuRapports = [];

  this.batimentService.getBatimentsByNomArrondissement(arrondissement).subscribe(
    (batiments: any[]) => {
      this.selectedBatiments = batiments;

      // Récupérer les rapports d'aperçu associés
      this.appercuService.getAppercuRapportsByArrondissement(arrondissement).subscribe(
        (appercuRapports: AppercuRapport[]) => {
          this.selectedAppercuRapports = appercuRapports;

          // Associer les rapports aux bâtiments
          this.selectedBatiments.forEach((batiment) => {
            const matchingRapport = appercuRapports.find(rapport => rapport.idApp === batiment.appercuRapport?.idApp);
            batiment.appercuRapport = matchingRapport || null;
          });
        },
        (error) => console.error("Erreur lors de la récupération des rapports :", error)
      );
    },
    (error) => console.error("Erreur lors de la récupération des bâtiments :", error)
  );

  // Récupération des expertises techniques via les AppercuRapports
  this.expertiseService.getExpertiseTechniquesByArrondissement(arrondissement).subscribe(
    data => {
      this.selectedExpertiseTechniques = data;
      console.log("Données reçues pour les expertises techniques :", this.selectedExpertiseTechniques);
    },
    error => {
      console.error("Erreur lors de la récupération des expertises techniques :", error);
    }
  );

  // Appel pour récupérer les décisions collectives
  this.decisionService.getDecisionCollectivesByArrondissement(arrondissement).subscribe(
    data => {
      this.selectedDecisionCollectives = data;
      console.log("Données reçues pour les décisions collectives :", this.selectedDecisionCollectives);
    },
    error => {
      console.error("Erreur lors de la récupération des décisions collectives :", error);
    }
  );
  
  // Appel pour récupérer les communiquer
  this.communiquerService.getCommuniquerDecisionsByArrondissement(arrondissement).subscribe(
    data => {
      this.selectedCommuniquerDecisions = data;
      console.log("Données reçues pour les CommuniquerDecision :", this.selectedCommuniquerDecisions);
    },
    error => {
      console.error("Erreur lors de la récupération des CommuniquerDecision :", error);
    }
  );

  // relogement  
  this.relogementService.getRelogementsByArrondissement(arrondissement).subscribe(
    (data: RelogementDTO[]) => {
       this.selectedRelogements = data;
    },
    (error) => {
       console.error("Erreur lors de la récupération des relogements :", error);
       this.selectedRelogements = []; // Évite l'usage de undefined
    }
 );

 // Appel pour récupérer les états
 this.etatService.getEtatAvancementsByArrondissement(arrondissement).subscribe(
  (data: EtatAvancementDTO[]) =>{
    this.selectedEtatAvancements = data || [];
    console.log("Données reçues pour EtatAvancement :", this.selectedEtatAvancements);
  },
  (error) => {
    console.error("Erreur lors de la récupération des informations d'état d'avancement :", error);
    this.selectedEtatAvancements = []; // Initialise un tableau vide en cas d'erreur
  }
);
 
}



  onNumeroClick(nomAnnexe: NomAnnexe): void {
    this.selectedBatiments = []; // Reset data before fetching
  console.log("Fetching buildings for annex:", nomAnnexe);

   // Appel au service pour récupérer les bâtiments
   this.batimentService.getBatimentsByNomAnnexe(nomAnnexe).subscribe(
    (batiments: any[]) => {
      console.log("Données des bâtiments reçues :", batiments);
      this.selectedBatiments = batiments;

      // Vérification si des bâtiments ont été trouvés
      if (batiments.length === 0) {
        console.warn("Aucun bâtiment trouvé pour cette annexe :", nomAnnexe);
      }

      // Appel au service pour récupérer les rapports
      this.appercuService.getAppercuRapportsByNomAnnexe(nomAnnexe).subscribe(
        (appercuRapports: AppercuRapport[]) => {
          console.log("Données des rapports reçues :", appercuRapports);

          // Vérification si des rapports ont été récupérés
          if (appercuRapports.length === 0) {
            console.warn("Aucun rapport trouvé pour cette annexe :", nomAnnexe);
          }

          // Associer chaque rapport au bâtiment correspondant
          this.selectedBatiments.forEach((batiment) => {
            const matchingRapport = appercuRapports.find(
              (rapport: AppercuRapport) =>
                rapport.idApp === batiment.appercuRapport?.idApp
            );

            if (matchingRapport) {
              batiment.appercuRapport = matchingRapport;
            } else {
              console.warn(
                `Aucun rapport associé trouvé pour le bâtiment avec idBat: ${batiment.idBat} et idApp: ${batiment.appercuRapport?.idApp}`
              );
              batiment.appercuRapport = null; // Définit à `null` si aucun rapport correspondant n'est trouvé
            }
          });

          console.log(
            "Bâtiments après association des rapports :",
            this.selectedBatiments
          );
        },
        (error) => {
          console.error("Erreur lors de la récupération des rapports :", error);
        }
      );
    },
    (error) => {
      console.error(
        "Erreur lors de la récupération des informations des bâtiments :",
        error
      );
    }
  );
  
  
    
    this.appercuService.getAppercuRapportsByNomAnnexe(nomAnnexe).subscribe(
      data => {
        this.selectedAppercuRapports = data;
        console.log("Données reçues pour les aperçus de rapports :", this.selectedAppercuRapports);
      },
      error => {
        console.error("Erreur lors de la récupération des aperçus de rapports :", error);
      }
    );

    
     // Récupération des expertises techniques via les AppercuRapports
     this.expertiseService.getExpertiseTechniquesByNomAnnexe(nomAnnexe).subscribe(
      data => {
        this.selectedExpertiseTechniques = data;
        console.log("Données reçues pour les expertises techniques :", this.selectedExpertiseTechniques);
      },
      error => {
        console.error("Erreur lors de la récupération des expertises techniques :", error);
      }
    );

   
     // Appel pour récupérer les décisions collectives
     this.decisionService.getDecisionCollectivesByNomAnnexe(nomAnnexe).subscribe(
      data => {
        this.selectedDecisionCollectives = data;
        console.log("Données reçues pour les décisions collectives :", this.selectedDecisionCollectives);
      },
      error => {
        console.error("Erreur lors de la récupération des décisions collectives :", error);
      }
    );
    
    // Appel pour récupérer les communiquer
    this.communiquerService.getCommuniquerDecisionsByNomAnnexe(nomAnnexe).subscribe(
      data => {
        this.selectedCommuniquerDecisions = data;
        console.log("Données reçues pour les CommuniquerDecision :", this.selectedCommuniquerDecisions);
      },
      error => {
        console.error("Erreur lors de la récupération des CommuniquerDecision :", error);
      }
    );

    
    // Appel pour récupérer les états
    this.etatService.getEtatAvancementByNomAnnexe(nomAnnexe).subscribe(
      (data: EtatAvancementDTO[]) =>{
        this.selectedEtatAvancements = data || [];
        console.log("Données reçues pour EtatAvancement :", this.selectedEtatAvancements);
      },
      (error) => {
        console.error("Erreur lors de la récupération des informations d'état d'avancement :", error);
        this.selectedEtatAvancements = []; // Initialise un tableau vide en cas d'erreur
      }
    );
    
    // Méthode pour récupérer les données d'InformerAR par nomAnnexe
    this.informerService.getInformerARByNomAnnexe(nomAnnexe).subscribe(
      (data: InformerARDTO[])=> {
        this.selectedInformerAR = data;
        console.log("Données reçues pour InformerAR :", this.selectedInformerAR);
      },
      (error) => {
        console.error("Erreur lors de la récupération des informations d'InformerAR :", error);
      }
    );

     // Appel pour récupérer les raisons d'inobservation par nom d'annexe
     this.raisonService.getRaisonsByNomAnnexe(nomAnnexe).subscribe(
   (data: RaisonInobservationDTO[]) => {
      console.log("Données reçues pour les raisons d'observation :", data);
      this.selectedRaisons = data || [];
   },
   error => {
      console.error("Erreur lors de la récupération des raisons d'observation :", error);
      this.selectedRaisons = []; // Initialise un tableau vide en cas d'erreur
   }
);

    // relogement  
    this.relogementService.getRelogementsByNomAnnexe(nomAnnexe).subscribe(
      (data: RelogementDTO[]) => {
         this.selectedRelogements = data;
      },
      (error) => {
         console.error("Erreur lors de la récupération des relogements :", error);
         this.selectedRelogements = []; // Évite l'usage de undefined
      }
   );

    // Appel pour récupérer les statuts actuels
    this.statutService.getStatutActuelsByNomAnnexe(nomAnnexe).subscribe(
      (data: StatutActuelDTO[]) => {
        this.selectedStatutActuels = data;
        console.log("Données reçues pour StatutActuel :", this.selectedStatutActuels);
      },
      (error) => {
        console.error("Erreur lors de la récupération des statuts actuels :", error);
        this.selectedStatutActuels = []; // Initialiser un tableau vide en cas d'erreur
      }
    );
   
  }
  
  

  get paginatedBatiments() {
    const start = this.currentPage * this.pageSize;
    return this.selectedBatiments.slice(start, start + this.pageSize);
  }

  get paginatedAppercuRapports() {
    const start = this.currentPage * this.pageSize;
    return this.selectedAppercuRapports.slice(start, start + this.pageSize);
  }

  get pageNumbers(): number[] {
    const totalPages = Math.ceil(this.selectedBatiments.length / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber - 1;
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.selectedBatiments.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  // Méthode pour télécharger le fichier de batiment
  downloadFile(idBat: number) {
    this.http.get(`http://localhost:8080/batiment/download/${idBat}`, { responseType: 'blob' }).subscribe(response => {
      const fileType = response.type;
      const blob = new Blob([response], { type: fileType });
      const url = window.URL.createObjectURL(blob);
      window.open(url); // Ouvre le fichier dans un nouvel onglet
      window.URL.revokeObjectURL(url);  // Libérer l'URL après utilisation
    }, error => {
      console.error('Erreur lors de l\'affichage du fichier:', error);
    });
  }
  
  // Méthode pour télécharger le fichier de appercu
  downloadReportFile(idBat: number) {
    this.http.get(`http://localhost:8080/appercu/downloadReportFromBatiment/${idBat}`, { responseType: 'blob' }).subscribe(response => {
      const fileType = response.type;
      const blob = new Blob([response], { type: fileType });
      const url = window.URL.createObjectURL(blob);
      window.open(url); // Ouvre le fichier dans un nouvel onglet
      window.URL.revokeObjectURL(url);  // Libérer l'URL après utilisation
    }, error => {
      console.error('Erreur lors de l\'affichage du fichier de rapport:', error);
    });
  }
  

  // Méthode pour mapper la valeur de l'énumération à la chaîne correspondante
  getRecommandationText(value: string): string {
    return RecommandationExpertise[value as keyof typeof RecommandationExpertise] || 'N/A';
  }

   // Méthode pour obtenir le libellé de RecommandationDecision
   getRecommandationDecisionLabel(key: string): string {
    return RecommandationDecision[key as keyof typeof RecommandationDecision] || 'N/A';
  }


  getRaisonData(i: number, key: keyof RaisonInobservationDTO): string {
    const value = this.selectedRaisons[i]?.[key];
    return value !== undefined && value !== null ? value.toString() : 'N/A';
}


  
  getRelogementData(i: number, key: keyof RelogementDTO): string {
    const value = this.selectedRelogements[i]?.[key];
    if (value === undefined || value === null) {
      return 'N/A';
    }
    // Handle different types and convert them to string
    if (value instanceof Date) {
      return value.toLocaleDateString(); // Format date as string
    }
    return value.toString(); // Convert number or string to string
  }
  
  

   // Méthode pour télécharger le fichier d'expertise
  downloadFileExpertise(idBat: number): void {
    this.expertiseService.downloadFileExpertise(idBat).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Ouvre le fichier dans un nouvel onglet
        window.URL.revokeObjectURL(url); // Libérer l'URL après utilisation
      },
      (error) => {
        console.error('Erreur lors de l\'affichage du fichier d\'expertise :', error);
      }
    );
  }

  // Méthode pour télécharger le fichier de décision collective
  downloadFileDecision(idBat: number): void {
    this.decisionService.downloadFileDecision(idBat).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Ouvre le fichier dans un nouvel onglet
        window.URL.revokeObjectURL(url); // Libérer l'URL après utilisation
      },
      (error) => {
        console.error('Erreur lors de l\'affichage du fichier de décision :', error);
      }
    );
  }
// Méthode pour télécharger le fichier de relogement
  downloadFileRelogement(idBat: number): void {
    this.relogementService.downloadFileRelogement(idBat).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Ouvre le fichier dans un nouvel onglet
        window.URL.revokeObjectURL(url); // Libérer l'URL après utilisation
      },
      (error) => {
        console.error('Erreur lors du téléchargement du fichier de relogement :', error);
      }
    );
  }

  //formater la date 
  formatDate(date: any): string {
    return date ? new Date(date).toLocaleDateString('fr-CA') : 'N/A';
  }
  
  // Méthode d'exportation en Excel
  exportExcel(): void {
    const data = this.paginatedBatiments.map((batiment, i) => ({
      // Building Info
      'رقم': batiment.idBat,
      'عنوان البناية': batiment.adresse,
      'المساحة': batiment.surface,
      'عدد الطوابق': batiment.nbetage,
      'الإسم العائلي والشخصي لمالك العقار': batiment.nomPrenomProprietaire,
      'عدد الأسر القاطنة': batiment.nbFamilleResident,
      'الاسم العائلي والشخصي للقاطنين': batiment.nomPrenomResident,
      'وضعية رب الأسرة': this.getSituationChefFamilleLabel(batiment.situationChefFamille),
      'عدد المحلات التجارية': batiment.nbMagasin,
      'الاسم العائلي والشخصي لمستغلي المحلات التجارية': batiment.nomPrenomExploitantMagasin,
      'وضعية مستغلي المحلات التجارية': this.getSituationExploitantLabel(batiment.situationExploitant),
      
      // Inspection Report Data
      'عدد التوصيات': this.paginatedAppercuRapports[i]?.nbRecommandation || 'N/A',
      'تاریخ المعاينة': this.formatDate(this.paginatedAppercuRapports[i]?.dateInspection),
      'التوصيات': this.paginatedAppercuRapports[i]?.recommandation || 'N/A',
      'عدد الاشعارات': this.paginatedAppercuRapports[i]?.nbNotificationRapportInspection || 'N/A',
      'تاريخ الاشعار': this.formatDate(this.paginatedAppercuRapports[i]?.dateNotification),
      
      // Technical Expertise Data
      'مكتب الدراسات': this.selectedExpertiseTechniques[i]?.bureauEtude || 'N/A',
      'تاريخ الخبرة': this.formatDate(this.selectedExpertiseTechniques[i]?.date),
      'توصيات الخبرة': this.getRecommandationText(this.selectedExpertiseTechniques[i]?.recommandationExpertise),
      
      // Collective Decision Data
      'عدد القرارات الجماعية': this.selectedDecisionCollectives[i]?.nbDec || 'N/A',
      'تاريخ القرار الجماعي': this.formatDate(this.selectedDecisionCollectives[i]?.dateDec),
      'توصيات القرار الجماعي': this.getRecommandationDecisionLabel(this.selectedDecisionCollectives[i]?.recommandationDecision),
      
      // Communiquer Decision Data
      'عدد البلاغات': this.selectedCommuniquerDecisions[i]?.nbDec || 'N/A',
      'تاريخ البلاغ': this.formatDate(this.selectedCommuniquerDecisions[i]?.dateDec),
      
      // Etat Avancement Data
      'عدد المراسلات': this.selectedEtatAvancements[i]?.nbCorrespondanceAL || 'N/A',
      'تاريخ المراسلة': this.formatDate(this.selectedEtatAvancements[i]?.dateCorrespondanceAL),
      'عدد الردود': this.selectedEtatAvancements[i]?.nbReponseAL || 'N/A',
      'تاريخ الرد': this.formatDate(this.selectedEtatAvancements[i]?.dateReponseAL),
      
      // Informer AR Data
      'عدد AR': this.selectedInformerAR[i]?.nbAR || 'N/A',
      'تاريخ AR': this.formatDate(this.selectedInformerAR[i]?.dateAr),
      
      // Reasons for Inobservation
      'أسباب عدم الإمتثال': this.selectedRaisons[i]?.nomRai || 'N/A',
      
      // Relogement Data
      'عدد الأسر التي تم إفراغها': this.getRelogementData(i, 'nbFamilleExplusees') || 'N/A',
      'عدد الأسر في انتظار الاستفادة': this.getRelogementData(i, 'nbFamillePrestations') || 'N/A',
      'اسم العائلي والشخصي للأسرة في انتظار الاستفادة': this.getRelogementData(i, 'nomPrenomPrestations') || 'N/A',
      'عدد الأسر المستفيدة': this.getRelogementData(i, 'nbFamilleBeneficiaire') || 'N/A',
      'اسم العائلي والشخصي للمستفيد': this.getRelogementData(i, 'nomPrenomBeneficiaire') || 'N/A',
      'تاريخ إجراء القرعة': this.formatDate(this.getRelogementData(i, 'dateTirageSort')),
      'مكان الاستفادة': this.getRelogementData(i, 'lieuPrestation') || 'N/A',
      'الترحيل': this.getRelogementData(i, 'relocalisation') || 'N/A',
      'الشركة المشرفة على الترحيل': this.getRelogementData(i, 'societeSurveillance') || 'N/A',
      
      // Current Status Data
      'فارغة': this.selectedStatutActuels[i]?.vide || 'N/A',
      'معتمرة': this.selectedStatutActuels[i]?.vacant || 'N/A',
      'هدمت كليا': this.selectedStatutActuels[i]?.entierementDemoli || 'N/A',
      'هدمت جزئيا': this.selectedStatutActuels[i]?.partiellementDemoli || 'N/A',
      'تم تدعيمها': this.selectedStatutActuels[i]?.renforce || 'N/A',
      'تم ترميمها': this.selectedStatutActuels[i]?.restaurer || 'N/A',
    }));
  
    // Export to Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'بيانات المباني');
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'معلومات الجدول.xlsx');
  }

 
  goToOtherPage(): void {
    this.router.navigate(['/autre-page']);
  }

  page: string = 'tableau';

  afficherTableau() {
    this.page = 'tableau';
  }

  afficherAutrePage() {
    this.page = 'autre-page';
  }
  
  deleteBatiment(idBat: number): void {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا المبنى؟')) {
      this.batimentService.deleteBatiment(idBat).subscribe(
        () => {
          alert('تم حذف المبنى بنجاح');
          this.selectedBatiments = this.selectedBatiments.filter(b => b.idBat !== idBat); // Met à jour la liste
        },
        error => {
          console.error('Erreur lors de la suppression du bâtiment :', error);
          alert('حدث خطأ أثناء الحذف');
        }
      );
    }
  }


  openUpdateModal(idBat: number, batiment: any): void {
    const dialogRef = this.dialog.open(UpdateBatimentModalComponent, {
        width: '600px',
        data: {
            idBat: idBat,
            adresse: batiment.adresse,
            surface: batiment.surface,
            nbetage: batiment.nbetage,
            nomPrenomProprietaire: batiment.nomPrenomProprietaire,
            nbFamilleResident: batiment.nbFamilleResident,
            nomPrenomResident: batiment.nomPrenomResident,
            situationChefFamille: batiment.situationChefFamille,
            nbMagasin: batiment.nbMagasin,
            nomPrenomExploitantMagasin: batiment.nomPrenomExploitantMagasin,
            situationExploitant: batiment.situationExploitant,
            filetelechargerImage: batiment.filetelechargerImage,
            appercuRapport: batiment.appercuRapport || null,
            statut: batiment.statut || null, // Passez l'objet complet 'statut'
            idApp: batiment.appercuRapport?.idApp || null, // Vérifiez que l'ID existe
            idExp: batiment.appercuRapport?.expertise?.idExp || null, // Vérifiez que l'ID existe
            idCom: batiment.appercuRapport?.decision?.communiquer?.idCom || null, // Vérifiez que l'ID existe
            idRel: batiment.appercuRapport?.decision?.communiquer?.relogement?.idRel || null, // Vérifiez que l'ID existe
            idEtat: batiment.appercuRapport?.decision?.communiquer?.etatAvancement?.idEtat || null, // Vérifiez que l'ID existe
            informerAR: batiment.appercuRapport?.decision?.communiquer?.etatAvancement?.informerAR || null, // Add InformerAR
            raisonInobservation: batiment.appercuRapport?.decision?.communiquer?.etatAvancement?.raisonInobservation || null,
        },
    });

    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
            this.updateBatiment(idBat, result);
        }
    });
}

  updateBatiment(idBat: number, batimentData: any): void {
    const formattedData = {
        ...batimentData,
        appercuRapport: {
            nbRecommandation: batimentData.appercuRapport?.nbRecommandation,
            dateInspection: batimentData.appercuRapport?.dateInspection,
            recommandation: batimentData.appercuRapport?.recommandation,
            nbNotificationRapportInspection: batimentData.appercuRapport?.nbNotificationRapportInspection,
            dateNotification: batimentData.appercuRapport?.dateNotification,
            expertise: {
                idExp: batimentData.appercuRapport?.expertise?.idExp,
                bureauEtude: batimentData.appercuRapport?.expertise?.bureauEtude,
                date: batimentData.appercuRapport?.expertise?.date,
                recommandationExpertise: batimentData.appercuRapport?.expertise?.recommandationExpertise,
                fileExpertise: batimentData.appercuRapport?.expertise?.fileExpertise
            },
            decision: {
              idDec: batimentData.appercuRapport?.decision?.idDec,
              nbDec: batimentData.appercuRapport?.decision?.nbDec,
             
          }
        }
    };
    console.log('Formatted Data:', formattedData);
    this.batimentService.updateBatiment(idBat, formattedData).subscribe(
        response => {
            alert('Le bâtiment a été mis à jour avec succès.');
            console.log('Réponse du backend :', response);
        },
        error => {
            console.error('Erreur lors de la mise à jour :', error);
        }
    );
}

// Méthode pour chercher des expertises
searchExpertises(): void {
  this.isSearchActive = true; // Recherche activée

  // Appel au service pour rechercher par recommandation
  this.expertiseService.searchByRecommandation(this.recommandation).subscribe(
    (data: any[]) => {
      console.log('Données API reçues:', data);

      // Récupérer les bâtiments, rapports d'aperçu, expertises et autres données associées
      this.filteredBatiments = data.map(dto => dto.batiment).filter(batiment => batiment);
      this.selectedAppercuRapports = data.map(dto => dto.appercuRapport).filter(appercu => appercu);
      this.selectedExpertiseTechniques = data.map(dto => dto.expertise).filter(expertise => expertise);

      // Récupérer les autres entités associées
      this.selectedDecisionCollectives = data.map(dto => dto.decisionCollective).filter(decision => decision);
      this.selectedCommuniquerDecisions = data.map(dto => dto.communiquerDecision).filter(communiquer => communiquer);
      this.selectedRelogements = data.map(dto => dto.relogement).filter(relogement => relogement);
      this.selectedEtatAvancements = data.map(dto => dto.etatAvancement).filter(etat => etat);
      this.selectedRaisons = data.map(dto => dto.raisonsInobservation).filter(raison => raison);
      this.selectedInformerAR = data.map(dto => dto.informerAR).filter(informer => informer);
      this.selectedStatutActuels = data.map(dto => dto.statutActuel).filter(statut => statut);

      console.log('Bâtiments filtrés:', this.filteredBatiments);
      console.log('Rapports d\'aperçu filtrés:', this.selectedAppercuRapports);
      console.log('Expertises filtrées:', this.selectedExpertiseTechniques);
      console.log('Décisions collectives filtrées:', this.selectedDecisionCollectives);
      console.log('Communiquer décisions filtrées:', this.selectedCommuniquerDecisions);
      console.log('Relogements filtrés:', this.selectedRelogements);
      console.log('EtatAvancements filtrés:', this.selectedEtatAvancements);
      console.log('Raisons d\'inobservation filtrées:', this.selectedRaisons);
      console.log('InformerAR filtrés:', this.selectedInformerAR);
      console.log('StatutActuels filtrés:', this.selectedStatutActuels);
    },
    (error) => {
      console.error('Erreur lors de la recherche:', error);
      this.filteredBatiments = [];
      this.selectedAppercuRapports = [];
      this.selectedExpertiseTechniques = [];
      this.selectedDecisionCollectives = [];
      this.selectedCommuniquerDecisions = [];
      this.selectedRelogements = [];
      this.selectedEtatAvancements = [];
      this.selectedRaisons = [];
      this.selectedInformerAR = [];
      this.selectedStatutActuels = [];
    }
  );
}

resetSearch(): void {
  this.isSearchActive = false; // Désactiver la recherche
  this.filteredBatiments = []; // Réinitialiser les résultats de recherche
  this.recommandation = ''; // Effacer l'entrée utilisateur
}


// Méthode pour chercher des decision
recommandationDecision: string = ''; // Entrée de l'utilisateur pour la recommandation des décisions collectives
filteredDecisionBatiments: any[] = [];
isDecisionSearchActive: boolean = false;

searchDecisionCollectives(): void {
  this.isDecisionSearchActive = true; // Activer l'indicateur de recherche

  // Appel au service pour rechercher par recommandation
  this.decisionService.searchByRecommandationDecision(this.recommandationDecision).subscribe(
    (data: any[]) => {
      console.log('Données API reçues pour les décisions collectives:', data);

      // Récupérer les entités liées
      this.filteredDecisionBatiments = data.map(dto => dto.batiment).filter(batiment => batiment);
      this.selectedAppercuRapports = data.map(dto => dto.appercuRapport).filter(appercu => appercu);
      this.selectedExpertiseTechniques = data.map(dto => dto.expertise).filter(expertise => expertise);

      // Récupérer les autres entités associées
      this.selectedDecisionCollectives = data.map(dto => dto.decisionCollective).filter(decision => decision);
      this.selectedCommuniquerDecisions = data.map(dto => dto.communiquerDecision).filter(communiquer => communiquer);
      this.selectedRelogements = data.map(dto => dto.relogement).filter(relogement => relogement);
      this.selectedEtatAvancements = data.map(dto => dto.etatAvancement).filter(etat => etat);
      this.selectedRaisons = data.map(dto => dto.raisonsInobservation).filter(raison => raison);
      this.selectedInformerAR = data.map(dto => dto.informerAR).filter(informer => informer);
      this.selectedStatutActuels = data.map(dto => dto.statutActuel).filter(statut => statut);

      console.log('Bâtiments filtrés pour décisions:', this.filteredDecisionBatiments);
      console.log('Rapports d\'aperçu filtrés:', this.selectedAppercuRapports);
      console.log('Expertises filtrées:', this.selectedExpertiseTechniques);
      console.log('Décisions collectives filtrées:', this.selectedDecisionCollectives);
      console.log('Communiquer décisions filtrées:', this.selectedCommuniquerDecisions);
      console.log('Relogements filtrés:', this.selectedRelogements);
      console.log('EtatAvancements filtrés:', this.selectedEtatAvancements);
      console.log('Raisons d\'inobservation filtrées:', this.selectedRaisons);
      console.log('InformerAR filtrés:', this.selectedInformerAR);
      console.log('StatutActuels filtrés:', this.selectedStatutActuels);
    },
    (error) => {
      console.error('Erreur lors de la recherche des décisions collectives:', error);
      this.resetDecisionSearch();
    }
  );
}

resetDecisionSearch(): void {
  this.isDecisionSearchActive = false; // Désactiver la recherche
  this.filteredDecisionBatiments = []; // Réinitialiser les résultats de recherche
  this.recommandationDecision = ''; // Effacer l'entrée utilisateur
}


}
