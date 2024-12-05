import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppercuService } from './appercu.service';
import { StatutService } from '../statut/statut.service';
import { ActivatedRoute } from '@angular/router';
import { ExpertiseService } from '../expertise/expertise.service';
import { DecisionService } from '../decision/decision.service';
import { CommuniquerService } from '../communiquer/communiquer.service';
import { RelogementService } from '../relogement/relogement.service';
import { EtatService } from '../etat/etat.service';
import { InformerService } from '../informer/informer.service';
import { RaisonService } from '../raison/raison.service';

@Component({
  selector: 'app-appercu',
  templateUrl: './appercu.component.html',
  styleUrls: ['./appercu.component.css']
})
export class AppercuComponent implements OnInit {
  // Messages pour le formulaire AppercuRapport
successMessageAppercu: string | null = null;
errorMessageAppercu: string | null = null;

// Messages pour le formulaire Expertise
successMessageExpertise: string | null = null;
errorMessageExpertise: string | null = null;

// Messages pour le formulaire StatutActuel
successMessageStatut: string | null = null;
errorMessageStatut: string | null = null;

decisionForm: FormGroup;
successMessageDecision: string | null = null;
errorMessageDecision: string | null = null;

communiquerDecisionForm: FormGroup;
successMessageCommuniquer: string | null = null;
errorMessageCommuniquer: string | null = null;

etatAvancementForm: FormGroup;
successMessageEtatAvancement: string | null = null;
errorMessageEtatAvancement: string | null = null;

informerArForm: FormGroup;
successMessageInformerAr: string | null = null;
errorMessageInformerAr: string | null = null;

// Formulaire pour RaisonInobservation
raisonInobservationForm: FormGroup;
// Messages pour les formulaires
successMessageRaison: string | null = null; // Message de succès pour RaisonInobservation
errorMessageRaison: string | null = null; // Message d'erreur pour RaisonInobservation

relogementForm: FormGroup;
successMessageRelogement: string | null = null;
errorMessageRelogement: string | null = null;

  appercuForm: FormGroup;
  statutForm: FormGroup;
  file: File | null = null;
  expertiseForm: FormGroup;
  adresse: string | null = null;
  idBat: number | null = null;
  adresses: string[] = [];
  idApp: number | null = null; // ID d'aperçu dynamique
  entierementDemoliOptions = [
    { value: 'مالك', label: 'مالك' },
    { value: 'مكتري', label: 'مكتري' }
  ];
  
  partiellementDemoliOptions = [
    { value: 'مالك', label: 'مالك' },
    { value: 'مكتري', label: 'مكتري' }
  ];

  recommandationExpertiseOptions = [
    { value: 'الهدم الكلي', label: 'الهدم الكلي' },
    { value: 'الهدم الجزئي', label: 'الهدم الجزئي' },
    { value: 'التدعيم و الاصلاح', label: 'التدعيم و الاصلاح' },
    { value: 'الترميم', label: 'الترميم' },
    { value: 'بناية سليمة', label: 'بناية سليمة' }
  ];
  

  recommandationDecisionOptions = [
    { value: 'الهدم الكلي', label: 'الهدم الكلي' },
    { value: 'الهدم الجزئي', label: 'الهدم الجزئي' },
    { value: 'التدعيم و الاصلاح', label: 'التدعيم و الاصلاح' },
    { value: 'الترميم', label: 'الترميم' },
    { value: 'الافراغ الفوري', label: 'الافراغ الفوري' }
  ];

  societeSurveillanceOptions = [
    { value: 'الدارالبيضاء',label:'الدارالبيضاء'},
    { value: 'العمران',label: 'العمران' },
  ];
  
  isLoading = false; // Indicateur de chargement pour éviter les soumissions multiples

  constructor(
    private appercuService: AppercuService,
    private statutService: StatutService,
    private expertiseService: ExpertiseService,
    private decisionService: DecisionService,
    private communiquerService: CommuniquerService,
    private etatService: EtatService,
    private informerService: InformerService,
    private raisonService:RaisonService,
    private relogementService: RelogementService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    // Formulaire pour AppercuRapport
    this.appercuForm = this.fb.group({
      adresse: [''], // Optionnel
      nbRecommandation: [null], // Optionnel
      dateInspection: [null], // Optionnel
      recommandation: [''], // Optionnel
      nbNotificationRapportInspection: [null], // Optionnel
      dateNotification: [null], // Optionnel
    });
    

    // Formulaire pour StatutActuel
    this.statutForm = this.fb.group({
      vide: [''], // Optionnel
      vacant: [''], // Optionnel
      entierementDemoli: [''], // Optionnel
      partiellementDemoli: [''], // Optionnel
      renforce: [''], // Optionnel
      restaurer: [''], // Optionnel
    });
    

    // Formulaire pour Expertise
    this.expertiseForm = this.fb.group({
      bureauEtude: [''],
      date: [null],
      recommandationExpertise: [''],
    });

     // Formulaire pour DecisionCollective
     this.decisionForm = this.fb.group({
      nbDec: [null], // Champ optionnel
      dateDec: [null], // Champ optionnel
      recommandationDecision: [''], // Champ optionnel
      file: [null], // Fichier optionnel
    });
    

  // Formulaire pour CommuniquerDecision
  this.communiquerDecisionForm = this.fb.group({
    nbDec: [null],
    dateDec: [null],
  });

  // Formulaire pour Etat
  this.etatAvancementForm = this.fb.group({
    nbCorrespondanceAL: [null], // Optional
    dateCorrespondanceAL: [null], // Optional
    nbReponseAL: [null], // Optional
    dateReponseAL: [null] // Optional
});

  // Formulaire pour InformerAR
  this.informerArForm = this.fb.group({
    nbAR: [null], // Champ optionnel
    dateAr: [null] // Champ optionnel
  });
  

// Initialisation du formulaire pour RaisonInobservation
this.raisonInobservationForm = this.fb.group({
  nomRai: ['']
});
  
  // Formulaire pour Relogement
  this.relogementForm = this.fb.group({
    NBFamilleExplusees: [null], // Optionnel
    NBfamillePrestations: [null], // Optionnel
    nomPrenomPrestations: [''], // Optionnel
    NBfamilleBeneficiaire: [null], // Optionnel
    nomPrenomBeneficiaire: [''], // Optionnel
    dateTirageSort: [null], // Optionnel
    lieuPrestation: [''], // Optionnel
    relocalisation: [''], // Optionnel
    societeSurveillance: [''], // Optionnel
    fileRapportTirage: [null], // Optionnel
});
  }

  ngOnInit(): void {
    this.idBat = Number(this.route.snapshot.paramMap.get('idBat'));
    if (this.idBat) {
      this.appercuService.getAdresseById(this.idBat).subscribe(
        (data) => {
          this.adresse = data.adresse;
          this.adresses = [this.adresse];
          this.appercuForm.get('adresse')?.setValue(this.adresse);
        },
        (error) => console.error('Erreur lors du chargement de l\'adresse', error)
      );
    }
    // Récupérer idApp depuis les paramètres de la route
    this.idApp = Number(this.route.snapshot.paramMap.get('idApp'));
    if (!this.idApp) {
      console.error("ID d'aperçu non trouvé dans les paramètres de la route.");
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0]; // Récupère le fichier sélectionné
    if (file) {
      this.file = file; // Stocke le fichier dans une variable
    }
  }
  

  onSubmitAppercu(): void {
    const fileToSend = this.file || undefined; // Transforme null en undefined
  
    if (this.appercuForm.valid && this.idBat) {
      this.appercuService.createAppercuRapport(this.idBat, this.appercuForm.value, fileToSend).subscribe({
        next: (response) => {
          this.successMessageAppercu = 'تم إضافة التقرير بنجاح!';
          this.errorMessageAppercu = null;
        },
        error: (error) => {
          this.successMessageAppercu = null;
          this.errorMessageAppercu = 'حدث خطأ أثناء إنشاء التقرير.';
          console.error(error);
        },
      });
    } else {
      this.successMessageAppercu = null;
      this.errorMessageAppercu = 'يرجى ملء الحقول الإلزامية.';
    }
  }
  
  
  
  onSubmitStatut(): void {
    if (this.idBat) {
      this.statutService.createStatutActuel(this.idBat, this.statutForm.value).subscribe({
        next: (response) => {
          this.successMessageStatut = 'تم إضافة أو تحديث الحالة بنجاح!';
          this.errorMessageStatut = null;
        },
        error: (err) => {
          this.successMessageStatut = null;
          this.errorMessageStatut = 'حدث خطأ أثناء إنشاء أو تحديث الحالة.';
          console.error('Erreur:', err);
        }
      });
    } else {
      this.errorMessageStatut = 'معرف المبنى غير موجود.';
    }
  }
  
  onFileSelectedExpertise(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.file = file; // Stocker le fichier dans une variable
    }
  }
  

  onSubmitExpertise(): void {
    if (this.idBat) { // Vérifiez que l'ID du bâtiment est défini
      const formData = new FormData();
  
      // Ajouter des champs seulement s'ils contiennent des valeurs
      const bureauEtude = this.expertiseForm.get('bureauEtude')?.value;
      if (bureauEtude) {
        formData.append('bureauEtude', bureauEtude);
      }
  
      const date = this.expertiseForm.get('date')?.value;
      if (date) {
        formData.append('date', date);
      }
  
      const recommandationExpertise = this.expertiseForm.get('recommandationExpertise')?.value;
      if (recommandationExpertise) {
        formData.append('recommandationExpertise', recommandationExpertise);
      }
  
      // Ajouter le fichier seulement s'il existe
      if (this.file) {
        formData.append('fileExpertise', this.file);
      }
  
      // Ajouter l'ID du bâtiment
      formData.append('idBat', String(this.idBat));
  
      // Appeler le service pour envoyer les données
      this.expertiseService.createExpertise(formData).subscribe({
        next: (response) => {
          this.successMessageExpertise = 'تمت إضافة الخبرة بنجاح!';
          this.errorMessageExpertise = null;
        },
        error: (err) => {
          this.successMessageExpertise = null;
          if (err.status === 409) {
            this.errorMessageExpertise = 'الخبرة موجودة بالفعل لهذا المبنى.';
          } else {
            this.errorMessageExpertise = 'حدث خطأ أثناء إضافة الخبرة.';
          }
          console.error('Erreur lors de l\'ajout de l\'expertise', err);
        },
      });
    } else {
      this.successMessageExpertise = null;
      this.errorMessageExpertise = 'معرف المبنى غير موجود.';
    }
  }

  
  
  onFileSelectedDecision(event: any): void {
    const file = event.target.files[0];
    this.decisionForm.get('file')?.setValue(file); // Attach the selected file to the form
  }
  
  onSubmitDecision(): void {
    if (this.idBat) {
      const formData = new FormData();
  
      if (this.decisionForm.get('nbDec')?.value) {
        formData.append('nbDec', this.decisionForm.get('nbDec')?.value);
      }
      if (this.decisionForm.get('dateDec')?.value) {
        formData.append('dateDec', this.decisionForm.get('dateDec')?.value);
      }
      if (this.decisionForm.get('recommandationDecision')?.value) {
        formData.append('recommandationDecision', this.decisionForm.get('recommandationDecision')?.value);
      }
  
      const file = this.decisionForm.get('file')?.value;
      if (file) {
        formData.append('file', file);
      }
  
      formData.append('idBat', String(this.idBat));
  
      this.decisionService.addDecisionCollective(formData).subscribe({
        next: (response) => {
          this.successMessageDecision = 'تم إضافة القرار الجماعي بنجاح!';
          this.errorMessageDecision = null;
        },
        error: (err) => {
          this.successMessageDecision = null;
          if (err.status === 400) {
            this.errorMessageDecision = 'خطأ في البيانات: يرجى التحقق من المعلومات المدخلة.';
          } else if (err.status === 409) {
            this.errorMessageDecision = 'القرار الجماعي موجود بالفعل لهذا المبنى.';
          } else {
            this.errorMessageDecision = 'حدث خطأ أثناء إضافة القرار الجماعي.';
          }
          console.error('Erreur lors de l\'ajout de la DecisionCollective', err);
        }
      });
    } else {
      this.successMessageDecision = null;
      this.errorMessageDecision = 'معرف المبنى غير موجود.';
    }
  }
  
  
  onSubmitCommuniquerDecision(): void {
    if (this.idBat) { // Assurez-vous que l'ID du bâtiment est défini
      const formData = new FormData();
      formData.append('idBat', String(this.idBat));
      // Ajoutez les champs seulement s'ils contiennent des valeurs
      const nbDec = this.communiquerDecisionForm.get('nbDec')?.value;
      if (nbDec) {
        formData.append('nbDec', nbDec);
      }
      const dateDec = this.communiquerDecisionForm.get('dateDec')?.value;
      if (dateDec) {
        formData.append('dateDec', dateDec);
      }
      // Appeler le service pour envoyer les données
      this.communiquerService.addCommuniquerDecision(formData).subscribe({
        next: (response) => {
          this.successMessageCommuniquer = 'تمت إضافة التواصل بنجاح!';
          this.errorMessageCommuniquer = null;
        },
        error: (err) => {
          this.successMessageCommuniquer = null;
          if (err.status === 400) {
            this.errorMessageCommuniquer = 'خطأ في التحقق من صحة البيانات: يرجى مراجعة المدخلات.';
          } else if (err.status === 409) {
            this.errorMessageCommuniquer = 'التواصل موجود بالفعل لهذا القرار الجماعي.';
          } else {
            this.errorMessageCommuniquer = 'حدث خطأ أثناء إضافة التواصل.';
          }
          console.error('Erreur lors de l\'ajout de la communication', err);
        },
      });
    } else {
      this.successMessageCommuniquer = null;
      this.errorMessageCommuniquer = 'معرف المبنى غير موجود.';
    }
  }

  
  
  onFileSelectedRelogement(event: any): void {
    const file = event.target.files[0];
    this.relogementForm.get('fileRapportTirage')?.setValue(file);
  }

  onSubmitRelogement(): void {
    if (this.idBat) { // تحقق من وجود معرف المبنى
        const formData = new FormData();
        formData.append('idBat', String(this.idBat));
        // إضافة الحقول التي تحتوي على قيم فقط
        Object.entries(this.relogementForm.value).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                // تحقق إذا كانت القيمة سلسلة أو رقم أو قابلة للتحويل إلى سلسلة
                if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
                    formData.append(key, value.toString());
                }
            }
        });
        const file = this.relogementForm.get('fileRapportTirage')?.value;
        if (file) {
            formData.append('fileRapportTirage', file); // أضف الملف إذا كان موجودًا
        }
        this.relogementService.addRelogement(formData).subscribe({
            next: (response) => {
                this.successMessageRelogement = 'تمت إضافة إعادة التوطين بنجاح!';
                this.errorMessageRelogement = null;
            },
            error: (err) => {
                this.successMessageRelogement = null;

                if (err.status === 400) {
                    if (err.error.includes('Un relogement existe déjà')) {
                        this.errorMessageRelogement = 'إعادة التوطين موجودة بالفعل لهذا المبنى.';
                    } else {
                        this.errorMessageRelogement = 'خطأ في التحقق من صحة البيانات: يرجى التحقق من البيانات.';
                    }
                } else {
                    this.errorMessageRelogement = 'حدث خطأ أثناء إضافة إعادة التوطين.';
                }
                console.error('Erreur lors de l\'ajout du relogement', err);
            },
        });
    } else {
        this.successMessageRelogement = null;
        this.errorMessageRelogement = 'معرف المبنى غير موجود.';
    }
}



  
onSubmitEtatAvancement(): void {
  if (this.idBat) {
    const formData = new FormData();

    const nbCorrespondanceAL = this.etatAvancementForm.get('nbCorrespondanceAL')?.value;
    if (nbCorrespondanceAL !== null && nbCorrespondanceAL !== undefined) {
      formData.append('nbCorrespondanceAL', nbCorrespondanceAL.toString());
    }

    const dateCorrespondanceAL = this.etatAvancementForm.get('dateCorrespondanceAL')?.value;
    if (dateCorrespondanceAL) {
      formData.append('dateCorrespondanceAL', dateCorrespondanceAL);
    }

    const nbReponseAL = this.etatAvancementForm.get('nbReponseAL')?.value;
    if (nbReponseAL !== null && nbReponseAL !== undefined) {
      formData.append('nbReponseAL', nbReponseAL.toString());
    }

    const dateReponseAL = this.etatAvancementForm.get('dateReponseAL')?.value;
    if (dateReponseAL) {
      formData.append('dateReponseAL', dateReponseAL);
    }

    formData.append('idBat', this.idBat.toString());

    this.etatService.addEtatAvancement(formData).subscribe({
      next: (response) => {
        this.successMessageEtatAvancement = 'تم إضافة حالة التقدم بنجاح!';
        this.errorMessageEtatAvancement = null;
      },
      error: (err) => {
        this.successMessageEtatAvancement = null;
        this.errorMessageEtatAvancement = 'حدث خطأ أثناء إضافة حالة التقدم.';
      }
    });
  } else {
    this.errorMessageEtatAvancement = 'معرف المبنى غير موجود.';
  }
}

   
onSubmitInformerAr(): void {
  if (this.idBat) {
    const formData = new FormData();

    const nbAR = this.informerArForm.get('nbAR')?.value;
    if (nbAR !== null && nbAR !== undefined) {
      formData.append('nbAR', nbAR.toString());
    }

    const dateAr = this.informerArForm.get('dateAr')?.value;
    if (dateAr) {
      formData.append('dateAr', dateAr);
    }

    formData.append('idBat', String(this.idBat));

    this.informerService.addInformerAr(formData).subscribe({
      next: (response) => {
        this.successMessageInformerAr = 'تم إضافة InformerAR بنجاح!';
        this.errorMessageInformerAr = null;
      },
      error: (err) => {
        this.successMessageInformerAr = null;
        const errorMessage = err.error || 'حدث خطأ أثناء إضافة InformerAR.';
        this.errorMessageInformerAr = errorMessage;
      }
    });
  } else {
    this.errorMessageInformerAr = 'معرف المبنى غير موجود.';
  }
}
  
onSubmitRaisonInobservation(): void {
  if (this.idBat) {
    const formData = new FormData();

    const nomRai = this.raisonInobservationForm.get('nomRai')?.value;
    if (nomRai) {
      formData.append('nomRai', nomRai);
    }

    formData.append('idBat', String(this.idBat));

    this.raisonService.addRaisonInobservation(formData).subscribe({
      next: (response) => {
        this.successMessageRaison = 'تمت إضافة سبب عدم الملاحظة بنجاح!';
        this.errorMessageRaison = null;
      },
      error: (err) => {
        this.successMessageRaison = null;
        if (err.status === 409) {
          this.errorMessageRaison = 'سبب عدم الملاحظة موجود بالفعل لهذا المبنى.';
        } else {
          this.errorMessageRaison = 'حدث خطأ أثناء إضافة سبب عدم الملاحظة.';
        }
        console.error('Erreur lors de l\'ajout de la raison d\'inobservation', err);
      }
    });
  } else {
    this.successMessageRaison = null;
    this.errorMessageRaison = 'معرف المبنى غير موجود.';
  }
}
  
  
}
