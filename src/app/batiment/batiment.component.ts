import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BatimentService } from '../batiment/batiment.service';
import { NomAnnexe } from '../enumeration/nom-annexe';
import { NomArrondissement } from '../enumeration/nom-arrondissement';
import { AnnexeService } from '../annexe/annexe.service';
import { Arrondissement } from '../arrondissment/arrondissement.model';
import { ArrondissmentService } from '../arrondissment/arrondissment.service';

// mapper Annexe dans BD
const annexeIdMap: { [key in NomAnnexe]: number } = {
  [NomAnnexe.ANNEXE_56]: 1,
  [NomAnnexe.ANNEXE_57]: 2,
  [NomAnnexe.ANNEXE_57Bis]: 3,
  [NomAnnexe.ANNEXE_58]: 4,
  [NomAnnexe.ANNEXE_58Bis]: 5,
  [NomAnnexe.ANNEXE_59]: 6,
  [NomAnnexe.ANNEXE_60]: 7,
  [NomAnnexe.ANNEXE_60Bis]: 8,
  [NomAnnexe.ANNEXE_61]: 9,
  [NomAnnexe.ANNEXE_62]: 10,
  [NomAnnexe.ANNEXE_SAB]: 11
};

@Component({
  selector: 'app-batiment',
  templateUrl: './batiment.component.html',
  styleUrls: ['./batiment.component.css']
})
export class BatimentComponent implements OnInit {
  rows = [
    { numero: NomAnnexe.ANNEXE_56, arrondissement: NomArrondissement.BenMsick, nom: '56', arrondissement_id: 1 },
    { numero: NomAnnexe.ANNEXE_57, arrondissement: NomArrondissement.BenMsick, nom: '57', arrondissement_id: 1 },
    { numero: NomAnnexe.ANNEXE_57Bis, arrondissement: NomArrondissement.BenMsick, nom: '57Bis', arrondissement_id: 1 },
    { numero: NomAnnexe.ANNEXE_58, arrondissement: NomArrondissement.BenMsick, nom: '58', arrondissement_id: 1 },
    { numero: NomAnnexe.ANNEXE_58Bis, arrondissement: NomArrondissement.BenMsick, nom: '58Bis', arrondissement_id: 1 },
    { numero: NomAnnexe.ANNEXE_59, arrondissement: NomArrondissement.BenMsick, nom: '59', arrondissement_id: 1 },
    { numero: NomAnnexe.ANNEXE_60, arrondissement: NomArrondissement.Sbata, nom: '60', arrondissement_id: 2},
    { numero: NomAnnexe.ANNEXE_60Bis, arrondissement: NomArrondissement.Sbata, nom: '60Bis', arrondissement_id: 2 },
    { numero: NomAnnexe.ANNEXE_61, arrondissement: NomArrondissement.Sbata, nom: '61', arrondissement_id: 2},
    { numero: NomAnnexe.ANNEXE_62, arrondissement: NomArrondissement.Sbata, nom: '62', arrondissement_id: 2 },
    { numero: NomAnnexe.ANNEXE_SAB, arrondissement: NomArrondissement.Sbata, nom: 'سيدي أحمد بلحسن', arrondissement_id: 2 },
  ];
  

  selectedAnnexe: any = null;
  selectedArrondissement: any = null;
  nouveauBatiment: any = {};  // Les données du nouveau bâtiment
  file: File | null = null;   // Fichier sélectionné
  arrondissements: Arrondissement[] = []; // Liste des arrondissements
  filteredAnnexes: any[] = []; // Liste des annexes filtrées pour l'arrondissement sélectionné
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private batimentService: BatimentService,
    private annexeService: AnnexeService,
    private arrondissmentService: ArrondissmentService
  ) {}

  ngOnInit() {
    this.arrondissmentService.getArrondissement().subscribe(
      (data: Arrondissement[]) => {
        // Mapper les noms en français de la base de données aux noms en arabe
        this.arrondissements = data.map(arrondissement => ({
          ...arrondissement,
          nomArrondissement: this.getNomArrondissementEnArabe(arrondissement.nomArrondissement)
        }));
        console.log("Arrondissements après mappage :", this.arrondissements);
      },
      error => {
        console.error("Erreur lors de la récupération des arrondissements :", error);
      }
    );
  
  }

  getSituationChefFamilleLabel(value: string): string {
    switch (value.toUpperCase()) {
        case 'PROPRIETAIRE':
            return 'مالك';
        case 'LOCATAIRE':
            return 'مكتري';
        default:
            return 'غير معروف'; // Pour gérer les valeurs non reconnues
    }
}

getSituationExploitantLabel(value: string): string {
    switch (value.toUpperCase()) {
        case 'PROPRIETAIRE':
            return 'مالك';
        case 'LOCATAIRE':
            return 'مكتري';
        default:
            return 'غير معروف'; // Valeur par défaut
    }
}

  
  onSelectArrondissement() {
    console.log("Arrondissement sélectionné :", this.selectedArrondissement);  // Vérifiez l'arrondissement sélectionné
  
    if (this.selectedArrondissement && this.selectedArrondissement.idArr) {
      // Utilisez `idArr` pour filtrer les annexes
      this.filteredAnnexes = this.rows.filter(
        annexe => annexe.arrondissement_id === this.selectedArrondissement.idArr
      );
      console.log("Annexes filtrées pour l'affichage :", this.filteredAnnexes);  // Vérifiez les annexes assignées
    } else {
      this.filteredAnnexes = [];
      console.log("Aucun arrondissement sélectionné ou ID non valide.");
    }
  }
  
  filterAnnexesByArrondissement() {
    if (this.selectedArrondissement && this.selectedArrondissement.id) {
      console.log("Filtrage des annexes pour arrondissement ID :", this.selectedArrondissement.id);
  
      // Convertir `selectedArrondissement.id` en nombre pour le comparer avec `arrondissement_id`
      this.filteredAnnexes = this.rows.filter(
        annexe => annexe.arrondissement_id === Number(this.selectedArrondissement.id)
      );
  
      if (this.filteredAnnexes.length === 0) {
        console.warn("Aucune annexe trouvée pour l'arrondissement sélectionné :", this.selectedArrondissement.nomArrondissement);
      } else {
        console.log("Annexes filtrées après le filtrage :", this.filteredAnnexes);
      }
    } else {
      // Si aucun arrondissement n'est sélectionné, afficher toutes les annexes
      this.filteredAnnexes = this.rows;
      console.log("Aucun arrondissement sélectionné, toutes les annexes sont affichées.");
    }
  }
  
  

  onAnnexeSelection() {
    console.log("Annexe sélectionnée :", this.selectedAnnexe);
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  ajouterBatiment() {
    this.successMessage = null; // Réinitialise les messages précédents
    this.errorMessage = null;

    // Validation des sélections obligatoires
    if (!this.selectedAnnexe || !this.selectedAnnexe.numero) {
        console.error("Annexe sélectionnée est incorrecte : ", this.selectedAnnexe);
        this.errorMessage = "الرجاء اختيار ملحق صحيح.";
        return;
    }
    if (!this.selectedArrondissement || !this.selectedArrondissement.idArr) {
        console.error("Arrondissement sélectionné est incorrect : ", this.selectedArrondissement);
        this.errorMessage = "الرجاء اختيار دائرة صحيحة.";
        return;
    }

    const formData = new FormData();

    // Ajout des champs facultatifs avec vérification
    if (this.nouveauBatiment.adresse) {
        formData.append('adresse', this.nouveauBatiment.adresse);
    }
    if (this.nouveauBatiment.surface != null) {
        formData.append('surface', this.nouveauBatiment.surface.toString());
    }
    if (this.nouveauBatiment.nbetage) {
        formData.append('nbetage', this.nouveauBatiment.nbetage);
    }
    if (this.nouveauBatiment.nomPrenomProprietaire) {
        formData.append('nomPrenomProprietaire', this.nouveauBatiment.nomPrenomProprietaire);
    }
    if (this.nouveauBatiment.nbFamilleResident != null) {
        formData.append('nbFamilleResident', this.nouveauBatiment.nbFamilleResident.toString());
    }
    if (this.nouveauBatiment.nomPrenomResident) {
        formData.append('nomPrenomResident', this.nouveauBatiment.nomPrenomResident);
    }
    if (this.nouveauBatiment.situationChefFamille) {
        formData.append('situationChefFamille', this.nouveauBatiment.situationChefFamille);
    }
    if (this.nouveauBatiment.nbMagasin != null) {
        formData.append('nbMagasin', this.nouveauBatiment.nbMagasin.toString());
    }
    if (this.nouveauBatiment.nomPrenomExploitantMagasin) {
        formData.append('nomPrenomExploitantMagasin', this.nouveauBatiment.nomPrenomExploitantMagasin);
    }
    if (this.nouveauBatiment.situationExploitant) {
        formData.append('situationExploitant', this.nouveauBatiment.situationExploitant);
    }

    // Ajout des sélections obligatoires avec vérification
    const idAnn = annexeIdMap[this.selectedAnnexe.numero as NomAnnexe];
    if (idAnn === undefined) {
        console.error("ID d'annexe introuvable pour : ", this.selectedAnnexe.numero);
        this.errorMessage = "خطأ: الملحق المحدد غير صالح.";
        return;
    }
    formData.append('idAnn', idAnn.toString());

    if (this.selectedArrondissement.idArr != null) {
        formData.append('idArr', this.selectedArrondissement.idArr.toString());
    }

    // Ajout du fichier s'il existe
    if (this.file) {
        formData.append('filetelechargerImage', this.file);
    }

    // Envoi des données au service
    this.batimentService.createBatiment(formData).subscribe(
        response => {
            console.log('Bâtiment ajouté avec succès:', response);
            this.successMessage = 'تم إضافة المبنى بنجاح!';
        },
        (error) => {
            console.error('Erreur lors de la création de Bâtiment', error);
            if (error.status === 400) {
                this.errorMessage = 'المبنى موجود بالفعل.';
            } else {
                this.errorMessage = 'حدث خطأ أثناء إضافة المبنى.';
            }
        }
    );
}


 getNomArrondissementEnArabe(nomEnFrancais: string): string {
    switch (nomEnFrancais) {
      case 'BenMsick':
        return NomArrondissement.BenMsick;
      case 'Sbata':
        return NomArrondissement.Sbata;
      default:
        return nomEnFrancais;  // Retourne le nom en français s'il n'est pas dans l'énumération
    }
}


}
