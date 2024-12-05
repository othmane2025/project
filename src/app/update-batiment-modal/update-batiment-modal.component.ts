import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BatimentService } from '../batiment/batiment.service';
import { AppercuService } from '../appercu/appercu.service';
import { ExpertiseService } from '../expertise/expertise.service';
import { DecisionService } from '../decision/decision.service';
import { CommuniquerService } from '../communiquer/communiquer.service';
import { RelogementService } from '../relogement/relogement.service';
import { StatutService } from '../statut/statut.service';
import { EtatService } from '../etat/etat.service';
import { InformerService } from '../informer/informer.service';
import { RaisonService } from '../raison/raison.service';

@Component({
  selector: 'app-update-batiment-modal',
  templateUrl: './update-batiment-modal.component.html',
  styleUrls: ['./update-batiment-modal.component.css'],
})
export class UpdateBatimentModalComponent {
  batimentForm: FormGroup;
  appercuRapportForm: FormGroup;
  expertiseForm: FormGroup;
  decisionForm: FormGroup;
  communiquerForm:FormGroup;
  relogementForm:FormGroup;
  statutActuelForm:FormGroup;
  etatAvancementForm :FormGroup;
  informerARForm: FormGroup;
  raisonInobservationForm : FormGroup;
  selectedFileBatiment: File | null = null;
  selectedFileAppercu: File | null = null;
  selectedFileExpertise: File | null = null;
  selectedFileDecision: File | null = null;
  selectedFileRelogement: File | null = null;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateBatimentModalComponent>,
    private batimentService: BatimentService,
    private appercuService: AppercuService,
    private expertiseService:ExpertiseService,
    private decisionService:DecisionService,
    private communiquerService:CommuniquerService,
    private relogementService:RelogementService,
    private statutService : StatutService,
    private etatService : EtatService,
    private informerService: InformerService,
    private raisonService: RaisonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialiser les formulaires séparément
    this.batimentForm = this.fb.group({
      adresse: [data.adresse || ''],
      surface: [data.surface || '', [Validators.min(0)]],
      nbetage: [data.nbetage || ''],
      nomPrenomProprietaire: [data.nomPrenomProprietaire || ''],
      nbFamilleResident: [data.nbFamilleResident || '', [Validators.min(0)]],
      nomPrenomResident: [data.nomPrenomResident || ''],
      situationChefFamille: [data.situationChefFamille || ''],
      nbMagasin: [data.nbMagasin || '', [Validators.min(0)]],
      nomPrenomExploitantMagasin: [data.nomPrenomExploitantMagasin || ''],
      situationExploitant: [data.situationExploitant || ''],
      filetelechargerImage: [null],
    });

    this.appercuRapportForm = this.fb.group({
      idApp: [data.appercuRapport?.idApp || ''],
      nbRecommandation: [data.appercuRapport?.nbRecommandation || '', [Validators.min(0)]],
      dateInspection: [this.formatDate(data.appercuRapport?.dateInspection) || ''],
      recommandation: [data.appercuRapport?.recommandation || ''],
      nbNotificationRapportInspection: [data.appercuRapport?.nbNotificationRapportInspection || '', [Validators.min(0)]],
      dateNotification: [this.formatDate(data.appercuRapport?.dateNotification) || ''],
      filerapportInspection: [null],
    });

    this.expertiseForm = this.fb.group({
      idExp: [data.expertise?.idExp || ''],
      bureauEtude: [data.appercuRapport?.expertise?.bureauEtude || ''],
      date: [this.formatDate(data.appercuRapport?.expertise?.date) || ''],
      recommandationExpertise: [data.appercuRapport?.expertise?.recommandationExpertise || ''],
      fileExpertise: [null],
    });

    this.decisionForm = this.fb.group({
      nbDec: [data.appercuRapport?.decision?.nbDec || '', [Validators.min(0)]],
      dateDec: [this.formatDate(data.appercuRapport?.decision?.dateDec) || ''],
      recommandationDecision: [data.appercuRapport?.decision?.recommandationDecision || ''],
    });

    this.communiquerForm = this.fb.group({
      //idCom: [data.appercuRapport?.decision?.communiquer?.idCom || ''],
      nbDec: [data.appercuRapport?.decision?.communiquer?.nbDec || '', [Validators.min(0)]],
      dateDec: [this.formatDate(data.appercuRapport?.decision?.communiquer?.dateDec) || ''],
    });

    // Initialisation du formulaire Etat Avancement
    this.etatAvancementForm = this.fb.group({
      nbCorrespondanceAL: [data.appercuRapport?.decision?.communiquer?.etatAvancement?.nbCorrespondanceAL || '', [Validators.min(0)]],
      dateCorrespondanceAL: [this.formatDate(data.appercuRapport?.decision?.communiquer?.etatAvancement?.dateCorrespondanceAL) || ''],
      nbReponseAL: [data.appercuRapport?.decision?.communiquer?.etatAvancement?.nbReponseAL || '', [Validators.min(0)]],
      dateReponseAL: [this.formatDate(data.appercuRapport?.decision?.communiquer?.etatAvancement?.dateReponseAL) || '']
    });
    
    // Add InformerAR form group
    this.informerARForm = this.fb.group({
    nbAR: [data.informerAR?.nbAR || '', [Validators.min(0)]],
    dateAr: [this.formatDate(data.informerAR?.dateAr) || ''],
  });
    
  this.raisonInobservationForm = this.fb.group({
    nomRai: [data.appercuRapport?.decision?.communiquer?.etatAvancement?.raisonInobservation?.nomRai || ''],
  });

  
    this.relogementForm = this.fb.group({
      //idRel: [data.appercuRapport?.decision?.communiquer?.relogement?.idRel || null],
      nbFamilleExplusees: [data.appercuRapport?.decision?.communiquer?.relogement?.nbFamilleExplusees || '', [Validators.min(0)]],
      nbFamillePrestations: [data.appercuRapport?.decision?.communiquer?.relogement?.nbFamillePrestations || '', [Validators.min(0)]],
      nomPrenomPrestations: [data.appercuRapport?.decision?.communiquer?.relogement?.nomPrenomPrestations || ''],
      nbFamilleBeneficiaire: [data.appercuRapport?.decision?.communiquer?.relogement?.nbFamilleBeneficiaire || '', [Validators.min(0)]],
      nomPrenomBeneficiaire: [data.appercuRapport?.decision?.communiquer?.relogement?.nomPrenomBeneficiaire || ''],
      dateTirageSort: [this.formatDate(data.appercuRapport?.decision?.communiquer?.relogement?.dateTirageSort) || ''],
      lieuPrestation: [data.appercuRapport?.decision?.communiquer?.relogement?.lieuPrestation || ''],
      relocalisation: [data.appercuRapport?.decision?.communiquer?.relogement?.relocalisation || ''],
      societeSurveillance: [data.appercuRapport?.decision?.communiquer?.relogement?.societeSurveillance || ''],
      fileRapportTirage: [null], // Gestion des fichiers, sera mis à jour avec un input
    });

    this.statutActuelForm = this.fb.group({
      idStatut: [this.data.statut?.idStatut || null],
      vide: [this.data.statut?.vide || ''],
      vacant: [this.data.statut?.vacant || ''],
      entierementDemoli: [this.data.statut?.entierementDemoli || ''],
      partiellementDemoli: [this.data.statut?.partiellementDemoli || ''],
      renforce: [this.data.statut?.renforce || ''],
      restaurer: [this.data.statut?.restaurer || '']
    });
  }

  // Gestion des fichiers
  onFileChangeBatiment(event: any): void {
    this.selectedFileBatiment = event.target.files[0];
  }

  onFileChangeAppercu(event: any): void {
    this.selectedFileAppercu = event.target.files[0];
  }

  onFileChangeExpertise(event: any): void {
    this.selectedFileExpertise = event.target.files[0];
}

onFileChangeDecision(event: any): void {
  this.selectedFileDecision = event.target.files[0];
}

onFileChangeRelogement(event: any): void {
  this.selectedFileRelogement = event.target.files[0];
}


  // Soumission pour le bâtiment
  onSubmitBatiment(): void {
    if (this.batimentForm.invalid) {
        alert('يرجى ملء نموذج المبنى بشكل صحيح.');
        return;
    }

    const formData = new FormData();
    formData.append('batiment', JSON.stringify(this.batimentForm.value));
    if (this.selectedFileBatiment) {
        formData.append('filetelechargerImage', this.selectedFileBatiment);
    }

    this.batimentService.updateBatiment(this.data.idBat, formData).subscribe({
        next: (response) => {
            alert('تم تحديث بيانات المبنى بنجاح.');
        },
        error: (error) => {
            console.error('حدث خطأ أثناء تحديث بيانات المبنى:', error);
        },
    });
}
  // Soumission pour AppercuRapport
  onSubmitAppercu(): void {
    if (this.appercuRapportForm.invalid) {
        alert('يرجى ملء نموذج تقرير المعاينة بشكل صحيح.');
        return;
    }

    const idApp = this.data?.appercuRapport?.idApp;
    if (!idApp) {
        console.error('معرف تقرير المعاينة مفقود.');
        alert('خطأ: معرف تقرير المعاينة غير محدد.');
        return;
    }

    const formData = new FormData();
    formData.append('appercuRapport', JSON.stringify(this.appercuRapportForm.value));
    if (this.selectedFileAppercu) {
        formData.append('filerapportInspection', this.selectedFileAppercu);
    }

    this.appercuService.updateAppercuRapport(idApp, formData).subscribe({
        next: (response) => {
            alert('تم تحديث تقرير المعاينة بنجاح.');
        },
        error: (error) => {
            console.error('حدث خطأ أثناء تحديث تقرير المعاينة:', error);
        },
    });
}
  

onSubmitExpertise(): void {
  if (this.expertiseForm.invalid) {
      alert('يرجى ملء نموذج التقرير الفني بشكل صحيح.');
      return;
  }

  const idExp = this.data?.appercuRapport?.expertise?.idExp;
  if (!idExp) {
      console.error('معرف التقرير الفني مفقود.');
      alert('خطأ: معرف التقرير الفني غير محدد.');
      return;
  }

  const formData = new FormData();
  formData.append('expertiseTechnique', JSON.stringify(this.expertiseForm.value));

  if (this.selectedFileExpertise) {
      formData.append('fileExpertise', this.selectedFileExpertise);
  }

  this.expertiseService.updateExpertise(idExp, formData).subscribe({
      next: (response) => {
          alert('تم تحديث التقرير الفني بنجاح.');
      },
      error: (error) => {
          console.error('حدث خطأ أثناء تحديث التقرير الفني:', error);
      },
  });
}
  
onSubmitDecision(): void {
  if (this.decisionForm.invalid) {
      alert('يرجى ملء نموذج القرار الجماعي بشكل صحيح.');
      return;
  }

  const idDec = this.data?.appercuRapport?.decision?.idDec;
  if (!idDec) {
      console.error('معرف القرار الجماعي مفقود.');
      alert('خطأ: معرف القرار الجماعي غير محدد.');
      return;
  }

  const formData = new FormData();
  formData.append('decisionCollective', JSON.stringify(this.decisionForm.value));

  if (this.selectedFileDecision) {
      formData.append('fileRapport', this.selectedFileDecision);
  }

  this.decisionService.updateDecision(idDec, formData).subscribe({
      next: (response) => {
          alert('تم تحديث القرار الجماعي بنجاح.');
      },
      error: (error) => {
          console.error('حدث خطأ أثناء تحديث القرار الجماعي:', error);
      },
  });
}

onSubmitCommuniquerDecision(): void {
  if (this.communiquerForm.invalid) {
      alert('يرجى ملء نموذج الإبلاغ بشكل صحيح.');
      return;
  }

  const idCom = this.data?.appercuRapport?.decision?.communiquer?.idCom;
  if (!idCom) {
      console.error('معرف الإبلاغ مفقود.');
      alert('خطأ: معرف الإبلاغ غير محدد.');
      return;
  }

  const data = this.communiquerForm.value;

  this.communiquerService.updateCommuniquerDecision(idCom, data).subscribe({
      next: (response) => {
          alert('تم تحديث بيانات الإبلاغ بنجاح.');
      },
      error: (error) => {
          console.error('حدث خطأ أثناء تحديث بيانات الإبلاغ:', error);
      },
  });
}

onSubmitRelogement(): void {
  if (this.relogementForm.invalid) {
      alert('يرجى ملء نموذج إعادة التوطين بشكل صحيح.');
      return;
  }

  const idRel = this.data?.appercuRapport?.decision?.communiquer?.relogement?.idRel;
  if (!idRel) {
      console.error('معرف إعادة التوطين مفقود.');
      alert('خطأ: معرف إعادة التوطين غير محدد.');
      return;
  }

  const formData = new FormData();
  formData.append('relogement', JSON.stringify(this.relogementForm.value));

  if (this.selectedFileRelogement) {
      formData.append('fileRapportTirage', this.selectedFileRelogement);
  }

  this.relogementService.updateRelogement(idRel, formData).subscribe({
      next: (response) => {
          alert('تم تحديث بيانات إعادة التوطين بنجاح.');
      },
      error: (error) => {
          console.error('حدث خطأ أثناء تحديث بيانات إعادة التوطين:', error);
      },
  });
}

onSubmitEtatAvancement(): void {
  if (this.etatAvancementForm.invalid) {
      alert('يرجى ملء نموذج حالة التقدم بشكل صحيح.');
      return;
  }
  const idEtat = this.data?.appercuRapport?.decision?.communiquer?.etatAvancement?.idEtat;
  if (!idEtat) {
      console.error('معرف حالة التقدم مفقود.');
      alert('خطأ: معرف حالة التقدم غير محدد.');
      return;
  }
  const etatData = this.etatAvancementForm.value;
  this.etatService.updateEtatAvancement(idEtat, etatData).subscribe({
      next: (response) => {
          alert('تم تحديث حالة التقدم بنجاح.');
          //this.dialogRef.close();
      },
      error: (error) => {
          console.error('حدث خطأ أثناء تحديث حالة التقدم:', error);
      }
  });
}

onSubmitInformerAR(): void {
  if (this.informerARForm.invalid) {
      alert('يرجى ملء نموذج إخبار وكيل الملك بشكل صحيح.');
      return;
  }

  const idAR = this.data?.informerAR?.idAR;
  if (!idAR) {
      console.error('معرف إخبار وكيل الملك مفقود.');
      alert('خطأ: معرف إخبار وكيل الملك غير محدد.');
      return;
  }

  const formData = this.informerARForm.value;

  this.informerService.updateInformerAR(idAR, formData).subscribe({
      next: (response) => {
          alert('تم تحديث InformerAR بنجاح.');
      },
      error: (error) => {
          console.error('حدث خطأ أثناء تحديث InformerAR:', error);
      },
  });
}

onSubmitRaisonInobservation(): void {
  if (this.raisonInobservationForm.invalid) {
      alert('يرجى ملء نموذج سبب عدم الملاحظة بشكل صحيح.');
      return;
  }

  const idRaison = this.data?.appercuRapport?.decision?.communiquer?.etatAvancement?.raisonInobservation?.idRaison;
  if (!idRaison) {
      console.error('معرف سبب عدم الملاحظة مفقود.');
      alert('خطأ: معرف سبب عدم الملاحظة غير محدد.');
      return;
  }

  const formData = this.raisonInobservationForm.value;

  this.raisonService.updateRaisonInobservation(idRaison, formData).subscribe({
      next: (response) => {
          alert('تم تحديث سبب عدم الملاحظة بنجاح.');
      },
      error: (error) => {
          console.error('حدث خطأ أثناء تحديث سبب عدم الملاحظة:', error);
      },
  });
}


onSubmitStatutActuel(): void {
  if (this.statutActuelForm.invalid) {
      alert('يرجى ملء نموذج الحالة الحالية بشكل صحيح.');
      return;
  }

  const idStatut = this.data?.statut?.idStatut;
  if (!idStatut) {
      console.error('معرف الحالة الحالية مفقود.');
      alert('خطأ: معرف الحالة الحالية غير محدد.');
      return;
  }

  const statutData = this.statutActuelForm.value;

  this.statutService.updateStatutActuel(idStatut, statutData).subscribe({
      next: (response) => {
          alert('تم تحديث الحالة الحالية بنجاح.');
      },
      error: (error) => {
          console.error('حدث خطأ أثناء تحديث الحالة الحالية:', error);
      },
  });
}
  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onCancel() {
    this.dialogRef.close(); // Fermer la modal sans sauvegarder
  }

  
}
