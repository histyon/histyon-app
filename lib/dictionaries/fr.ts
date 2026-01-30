export const fr = {
  metadata: {
    titleTemplate: '%s | Histyon',
    defaultTitle: 'Accueil | Histyon',
    description: "Diagnostic Médical Avancé",
    loginTitle: "Connexion",
    registerTitle: "Inscription"
  },
  landing: {
    hero: {
      badge: "HISTYON v1.0",
      title_line1: "Diagnostic numérique",
      title_line2: "sans compromis.",
      description: "La plateforme tout-en-un pour le stockage sécurisé de lames WSI et l'analyse morphométrique assistée.",
      ctaAccess: "Demander l'Accès",
      ctaDocs: "Documentation"
    },
    workflow: {
      title: "Votre flux de travail,",
      title_colored: "simplement plus rapide.",
      description: "Nous avons éliminé les temps morts. Téléchargez des gigaoctets de données histologiques en quelques secondes.",
      card_header_secure: "SÉCURISÉ HIPAA",
      card_patient_label: "PATIENT",
      card_patient_name: "Dupont, Jean",
      card_patient_id: "ID: #8492-BX",
      card_status: "ANALYSE PRÊTE",
      card_ai_active: "COUCHE IA ACTIVE",
      card_action_btn: "Voir Rapport",
      step1_title: "Ingestion Cloud",
      step1_desc: "Téléversement direct sur stockage chiffré.",
      step2_title: "Traitement IA",
      step2_desc: "Analyse tissulaire automatisée.",
      step3_title: "Rapports",
      step3_desc: "Accès instantané aux résultats."
    },
    features: {
      title: "Excellence Clinique",
      title_colored: "et Sécurité des Données.",
      subtitle: "La sécurité n'est pas une option. C'est le fondement de notre architecture.",
      feat1_title: "Archive WSI Illimitée",
      feat1_desc: "Espace cloud sécurisé pour toutes vos lames numériques.",
      feat2_title: "Second Avis",
      feat2_desc: "Algorithmes Deep Learning pour souligner les zones d'intérêt (ROI).",
      feat2_trusted: "Approuvé par les labos modernes",
      feat3_title: "Confidentialité dès la Conception",
      feat3_desc: "Données patients isolées et chiffrées."
    },
    footer: {
      copyright: "Histyon. Tous droits réservés.",
      legal: "Mentions Légales",
      docs: "Documentation",
      contact: "Contact",
      login: "Connexion",
      register: "Inscription"
    }
  },
  auth: {
    sidebar: {
      footer: "Console Histyon \u00A9 2026",
      secure: "Connexion Sécurisée",
      testimonials: [
        { text: "Une avancée incroyable dans la gestion des lames numériques.", author: "Dr. A. Blanc", role: "Pathologiste Senior" },
        { text: "L'IA réduit les temps de dépistage de 40%.", author: "Dr. M. Rouge", role: "Oncologie Clinique" },
        { text: "Sécurité et rapidité. Enfin.", author: "Ing. G. Vert", role: "DPO Hospitalier" }
      ]
    },
    login: {
      title: "Connexion",
      heading: "Accès Console",
      subheading: "Entrez vos identifiants institutionnels.",
      noCredentials: "Pas d'identifiants ?",
      requestAccess: "Demander l'Accès",
      medicalProfile: "Profil médical",
      btn: "Se connecter",
      forgotPassword: "Mot de passe oublié ?",
      successRedirect: "Compte vérifié. Veuillez vous connecter.",
      emailConfirmed: "Email confirmé avec succès. Vous pouvez maintenant vous connecter.",
      linkInvalid: "Lien invalide ou expiré."
    },
    forgotPassword: {
      title: "Récupération",
      heading: "Mot de passe oublié ?",
      subheading: "Entrez votre email institutionnel. Nous vous enverrons un lien de réinitialisation.",
      btn: "Envoyer le lien",
      backToLogin: "Retour",
      successTitle: "Email Envoyé",
      successDesc: "Si l'adresse existe, vous recevrez les instructions sous peu.",
      errorGeneric: "Une erreur est survenue."
    },
    updatePassword: {
      title: "Nouveau Mot de Passe",
      heading: "Définir Nouveau Mot de Passe",
      subheading: "Choisissez un mot de passe sécurisé.",
      btn: "Mettre à jour",
      success: "Mot de passe mis à jour. Redirection...",
      errorMatch: "Les mots de passe ne correspondent pas."
    },
    register: {
      title: "Inscription",
      heading: "Nouveau Profil",
      subheading: "Configuration guidée.",
      alreadyAccount: "Déjà un compte ?",
      accessConsole: "Accéder à la Console",
      steps: {
        one: "Étape 1", two: "Étape 2", three: "Étape 3",
        registry: "État Civil", residence: "Résidence", profession: "Profession"
      },
      buttons: { back: "Retour", next: "Suivant", complete: "Terminer" },
      success: {
        title: "Vérifiez votre Email",
        desc: "Nous vous avons envoyé un lien de confirmation. Vous devez vérifier votre email pour accéder au tableau de bord.",
        spamNotice: "Pas reçu ? Vérifiez les Spams ou Promotions.",
        backToLogin: "Retour à la page de Connexion"
      }
    },
    form: {
      labels: {
        firstName: "Prénom", lastName: "Nom", fiscalCode: "Code Fiscal", gender: "Genre",
        dob: "Date de Naissance", birthPlace: "Lieu de Naissance", phone: "Mobile",
        country: "Pays", address: "Adresse", civic: "N°", zip: "Code Postal", city: "Ville", province: "Région",
        medicalLicense: "N° Licence", hospital: "Institution", email: "Email Institutionnel", password: "Mot de Passe",
        emailSimple: "Email", passwordSimple: "Mot de Passe", confirmPassword: "Confirmer Mot de Passe"
      },
      placeholders: {
        name: "Jean", surname: "Dupont", cf: "Numéro fiscal...", city: "Ville", address: "Rue", civic: "N°",
        zip: "75000", municipality: "Commune", province: "Région", license: "Ex. 12345",
        hospital: "Ex. Hôpital Général...", select: "Sélectionner", day: "Jour", month: "Mois", year: "Année",
        phonePlaceholder: "+33 6...", emailPlaceholder: "email@patient.com"
      },
      options: { male: "Masculin", female: "Féminin", other: "Autre" },
      sections: { credentials: "Identifiants", identity: "Identité", contacts: "Contacts", domicile: "Domicile" },
      warnings: { attention: "Attention", required: "Obligatoire", requiredSymbol: "*", loading: "Chargement..." }
    }
  },
  dashboard: {
    header: { console: "Console", unassigned: "Non assigné", logout: "Déconnexion" },
    tabs: { patients: "Patients", analysis: "Analyses", profile: "Données Personnelles" },
    titles: {
      main: "Console Médicale", patientRegistry: "Registre Patients", globalHistory: "Historique Global",
      uploadHistory: "Historique Téléversements", patientFolder: "Dossier Personnel"
    },
    patients: {
      empty: { title: "Aucun patient.", subtitle: "Commencez par en ajouter un.", btnNew: "Nouveau Patient" },
      card: { openFolder: "Ouvrir Dossier" },
      modal: {
        title: "Registre Patient", subtitle: "Remplir les champs obligatoires (*)",
        btnSave: "Créer Dossier", btnSaving: "Enregistrement..."
      }
    },
    tickets: {
      empty: "Aucune analyse archivée.",
      table: { id: "ID Ticket", patient: "Patient", file: "Fichier", date: "Date", status: "Statut" },
      status: {
        completed: "Terminé", processing: "Traitement", queued: "En file", uploading: "Envoi...", error: "Erreur",
        failedAnalysis: "ÉCHEC ANALYSE"
      },
      steps: { uploading: "Envoi", queued: "File Cloud", processing: "Analyse IA", completed: "Terminé" },
      detail: { analysis: "Analyse", patient: "Patient" }
    },
    upload: {
      title: "Nouvelle Analyse Histologique", dragDrop: "Glisser fichier (SVS, NDPI, TIFF)", remove: "Retirer",
      notesPlaceholder: "Notes cliniques (optionnel)...", btnStart: "Démarrer Envoi et Analyse",
      sending: "Envoi sécurisé...", successTitle: "Ticket Créé", successMsg: "En attente IA...",
      errorTitle: "Erreur Envoi", retry: "Réessayer"
    },
    realtime: {
      sourceData: "Données Source", inputFile: "Fichier Entrée", size: "Taille", date: "Date",
      clinicalNotes: "Notes Cliniques", noNotes: "Aucune note.",
      errorAnalysis: "Erreur Analyse", completedAnalysis: "Analyse Terminée", progressStatus: "Progression",
      statusLabel: "STATUT", processInterrupted: "Processus Interrompu", errorDetails: "Détails:",
      genericError: "Erreur générique.", retryUpload: "Réessayer Envoi",
      outputFile: "Fichier Généré", download: "Télécharger", resultsJson: "Résultats IA (JSON)",
      noJson: "Aucune donnée structurée.",
      queuedTitle: "En file d'attente", processingTitle: "Analyse en cours",
      queuedDesc: "Fichier sécurisé. En attente du moteur IA.",
      processingDesc: "Analyse des tissus et génération JSON.",
      outputNotReady: "Sortie non prête."
    },
    results: {
      title: "Résultats Analyse IA", tissueView: "Visualisation Tissu",
      previewNote: "Aperçu rapide. Pour analyse approfondie, téléchargez le projet.",
      sickTissue: "Tissu Malade", totalGlom: "Glomérules Totaux", scleroGlom: "Glomérules Sclérosés",
      fullProject: "Projet QuPath Complet", downloadZip: "Téléchargez le .zip pour ouvrir sur PC.",
      btnDownload: "Télécharger Projet (.zip)"
    },
    profile: { dob: "Date de Naissance", birthPlace: "Lieu de Naissance", residence: "Résidence", contacts: "Contacts" },
    settings: {
      title: "Paramètres Profil",
      subtitle: "Gérez vos données et la sécurité.",
      tabs: { profile: "Données Personnelles", security: "Sécurité" },
      sections: {
        personal: "Informations Personnelles",
        residence: "Résidence",
        professional: "Données Professionnelles",
        email: "Email",
        password: "Mot de Passe"
      },
      form: {
        updateBtn: "Enregistrer",
        success: "Profil mis à jour.",
        emailNotice: "Changer l'email requiert confirmation.",
        passwordNotice: "Laisser vide pour conserver l'actuel.",
        savePassword: "Définir Nouveau MdP",
        newPassword: "Nouveau Mot de Passe",
        confirmPassword: "Confirmer Mot de Passe",
        updating: "Enregistrement..."
      }
    }
  },
  legal: {
    title: "Centre Légal et Confidentialité",
    subtitle: "Transparence du diagnostic médical.",
    update: "Dernière mise à jour : 21 Janvier 2026",
    tabs: { privacy: "Confidentialité", terms: "Conditions", cookie: "Cookies", dpa: "Traitement (DPA)" },
    content: {
      privacyTitle: "Politique de Confidentialité", privacySub: "Règlement UE 2016/679 (GDPR)",
      termsTitle: "Conditions Générales", termsSub: "Règlement d'utilisation",
      cookieTitle: "Politique Cookies", cookieSub: "Transparence traçage",
      dpaTitle: "Sécurité et DPA", dpaSub: "Annexe technique",
      disclaimer: "ATTENTION - AVIS MÉDICAL :",
      disclaimerText: "Histyon est un outil technique et ne remplace pas le jugement médical. L'IA doit être validée.",
      privacy: {
        sec1: { title: "1. Responsable", body: "Histyon Team est responsable des données de compte." },
        sec2: { title: "2. Données Collectées", body: "Données Pro et Données Santé Patients (chiffrées)." },
        sec3: { title: "3. Finalité", body: "Service SaaS, Support Diagnostic, Sécurité." },
        sec4: { title: "4. Lieu", body: "Données hébergées dans l'EEE (Espace Économique Européen)." }
      },
      terms: {
        sec1: { title: "1. Prérequis", body: "Accès réservé aux professionnels médicaux enregistrés." },
        sec2: { title: "2. Responsabilité", body: "L'Utilisateur garantit avoir obtenu le consentement éclairé." },
        sec3: { title: "3. Sécurité", body: "Identifiants personnels. Partage de compte interdit." }
      },
      cookie: {
        sec1: { title: "1. Qu'est-ce que c'est", body: "Petits fichiers texte pour améliorer l'expérience." },
        sec2: { title: "2. Techniques", body: "Strictement nécessaires (Session, Sécurité)." },
        sec3: { title: "3. Pas de Profilage", body: "Histyon n'utilise PAS de cookies de profilage." }
      },
      dpa: {
        cards: { 
            crypto: { title: "Chiffrement", body: "TLS 1.3 en transit. AES-256 au repos." }, 
            access: { title: "Contrôle Accès", body: "Politiques RLS strictes." } 
        },
        sec1: { title: "1. Sous-traitant", body: "L'Utilisateur désigne Histyon comme Sous-traitant (Art. 28 GDPR)." },
        sec2: { title: "2. Mesures Sécurité", body: "Défense en Profondeur : Auth, Isolation, Backups." }
      }
    }
  },
  validation: {
    passwordLength: "Minimum 8 caractères",
    passwordComplexity: "Doit contenir une Majuscule",
    passwordSpecial: "Doit contenir un caractère spécial",
    passwordRegexMsg: "Utilisez majuscule, chiffre et spécial",
    passwordMismatch: "Les mots de passe ne correspondent pas",
    name: "Lettres uniquement", nameAllowed: "Seules lettres autorisées",
    fiscalCodeLen: "16 car. alphanumériques", fiscalCodeFormat: "Format invalide",
    emailInvalid: "Email invalide", phoneShort: "Numéro trop court",
    required: "Obligatoire", genericError: "Erreur inattendue.",
    alreadyRegistered: "Cet email est déjà enregistré.",
    profileError: "Erreur sauvegarde profil : ",
    patientExists: "Patient existe déjà.",
    unauthorized: "Non autorisé",
    dbError: "Erreur DB : ",
    uploadError: "Erreur URL",
    cloudflareError: "Erreur envoi Cloudflare",
    networkError: "Erreur réseau",
    fileNotFound: "Fichier introuvable.",
    fileRetrievalError: "Impossible de récupérer le fichier",
    credentialsInvalid: "Identifiants invalides",
    linkSent: "Lien envoyé avec succès"
  }
}