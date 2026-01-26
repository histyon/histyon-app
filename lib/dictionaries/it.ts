export const it = {
  metadata: {
    titleTemplate: '%s | Histyon',
    defaultTitle: 'Home | Histyon',
    description: "Diagnostica Medica Avanzata",
    loginTitle: "Accedi",
    registerTitle: "Registrati"
  },
  landing: {
    hero: {
      badge: "HISTYON v1.0",
      title_line1: "Diagnostica digitale",
      title_line2: "senza compromessi.",
      description: "La piattaforma all-in-one per l'archiviazione sicura di vetrini WSI e l'analisi morfometrica assistita. Progettata per supportare, non sostituire, il patologo.",
      ctaAccess: "Richiedi Accesso",
      ctaDocs: "Documentazione"
    },
    workflow: {
      title: "Il tuo flusso di lavoro,",
      title_colored: "semplicemente più veloce.",
      description: "Abbiamo eliminato i tempi morti. Carica gigabyte di dati istologici in secondi e lascia che i nostri algoritmi lavorino in background mentre ti dedichi ai pazienti.",
      card_header_secure: "HIPAA SECURE",
      card_patient_label: "PAZIENTE",
      card_patient_name: "Rossi, Mario",
      card_patient_id: "ID: #8492-BX",
      card_status: "ANALISI PRONTA",
      card_ai_active: "AI LAYER ACTIVE",
      card_action_btn: "Visualizza Report",
      step1_title: "Ingestione Cloud",
      step1_desc: "Upload diretto su storage crittografato.",
      step2_title: "Elaborazione AI",
      step2_desc: "Analisi tissutale automatica su server dedicati.",
      step3_title: "Refertazione",
      step3_desc: "Accesso istantaneo ai risultati ovunque."
    },
    features: {
      title: "Eccellenza Clinica",
      title_colored: "e Sicurezza Dati.",
      subtitle: "La sicurezza dei dati non è una feature opzionale. È il fondamento della nostra architettura.",
      feat1_title: "Archivio WSI Illimitato",
      feat1_desc: "Dimentica gli hard disk esterni. Uno spazio cloud sicuro, accessibile ovunque, per tutti i tuoi vetrini digitali.",
      feat2_title: "Seconda Opinione",
      feat2_desc: "Algoritmi di Deep Learning evidenziano le aree di interesse (ROI) per velocizzare lo screening preliminare.",
      feat2_trusted: "Fidato dai laboratori moderni",
      feat3_title: "Privacy by Design",
      feat3_desc: "I dati dei pazienti sono isolati e cifrati. Tu sei l'unico proprietario delle tue informazioni cliniche."
    },
    footer: {
      copyright: "Histyon. Tutti i diritti riservati.",
      legal: "Info Legali",
      docs: "Documentazione",
      contact: "Contattaci",
      login: "Login",
      register: "Registrati"
    }
  },
  auth: {
    sidebar: {
      footer: "Histyon Console \u00A9 2026",
      secure: "Connessione Sicura",
      testimonials: [
        { text: "Un passo avanti incredibile nella gestione dei vetrini digitali.", author: "Dr. A. Bianchi", role: "Patologo Senior" },
        { text: "L'AI riduce i tempi di screening del 40%.", author: "Dr. M. Rossi", role: "Oncologia Clinica" },
        { text: "Sicurezza dei dati e velocità. Finalmente.", author: "Ing. G. Verdi", role: "DPO Ospedaliero" }
      ]
    },
    login: {
      title: "Accedi",
      heading: "Accesso Console",
      subheading: "Inserisci le credenziali istituzionali.",
      noCredentials: "Non hai le credenziali?",
      requestAccess: "Richiedi Accesso",
      medicalProfile: "Profilo medico SSN",
      btn: "Accedi",
      forgotPassword: "Password dimenticata?",
      successRedirect: "Account verificato. Effettua l'accesso.",
      emailConfirmed: "Email confermata con successo. Ora puoi accedere.",
      linkInvalid: "Link non valido o scaduto."
    },
    forgotPassword: {
      title: "Recupero Password",
      heading: "Password dimenticata?",
      subheading: "Inserisci la tua email istituzionale. Ti invieremo un link sicuro per reimpostare la password.",
      btn: "Invia Link di Reset",
      backToLogin: "Torna al Login",
      successTitle: "Email Inviata",
      successDesc: "Se l'indirizzo è presente nei nostri sistemi, riceverai a breve le istruzioni per il reset.",
      errorGeneric: "Si è verificato un errore. Riprova più tardi."
    },
    updatePassword: {
      title: "Nuova Password",
      heading: "Imposta Nuova Password",
      subheading: "Scegli una password sicura per il tuo account.",
      btn: "Aggiorna Password",
      success: "Password aggiornata con successo. Reindirizzamento...",
      errorMatch: "Le password non coincidono."
    },
    register: {
      title: "Registrati",
      heading: "Nuovo Profilo",
      subheading: "Configurazione guidata utente.",
      alreadyAccount: "Possiedi già un account?",
      accessConsole: "Accedi alla Console",
      steps: {
        step: "Passaggio",
        registry: "Anagrafica", 
        residence: "Residenza", 
        profession: "Credenziali"
      },
      buttons: { back: "Indietro", next: "Continua", complete: "Crea Account" },
      success: {
        title: "Controlla la tua Email",
        desc: "Ti abbiamo inviato un link di conferma. Per attivare il tuo account e accedere alla dashboard, è necessario verificare l'indirizzo email.",
        spamNotice: "Non hai ricevuto l'email? Controlla nella cartella Spam o Promozioni.",
        backToLogin: "Torna al Login"
      }
    },
    form: {
      labels: {
        firstName: "Nome", lastName: "Cognome", fiscalCode: "Codice Fiscale", gender: "Sesso",
        dob: "Data di nascita", birthPlace: "Luogo di Nascita", phone: "Telefono Cellulare",
        country: "Paese", address: "Indirizzo", civic: "Civico", zip: "CAP", city: "Città", province: "Provincia",
        medicalLicense: "N. Ordine", hospital: "Struttura", email: "Email Istituzionale", password: "Password Sicura",
        emailSimple: "Email", passwordSimple: "Password", confirmPassword: "Conferma Password"
      },
      placeholders: {
        name: "Mario", surname: "Rossi", cf: "RSSMRA...", city: "Città", address: "Via/Piazza", civic: "N.",
        zip: "00100", municipality: "Comune", province: "Provincia/Stato", license: "Es. 12345/RM",
        hospital: "Es. Policlinico...", select: "Seleziona", day: "Giorno", month: "Mese", year: "Anno",
        phonePlaceholder: "+39 333...", emailPlaceholder: "email@paziente.it"
      },
      options: { male: "Maschio", female: "Femmina", other: "Altro" },
      sections: { credentials: "Credenziali Accesso", identity: "Identità", contacts: "Contatti", domicile: "Domicilio" },
      warnings: { attention: "Attenzione", required: "Obbligatorio", requiredSymbol: "*", loading: "Elaborazione..." }
    }
  },
  dashboard: {
    header: { console: "Console", unassigned: "Non assegnato", logout: "Esci" },
    tabs: { patients: "Pazienti", analysis: "Analisi", profile: "Dati Anagrafici" },
    titles: {
      main: "Console Medica", patientRegistry: "Anagrafica Pazienti", globalHistory: "Cronologia Globale Analisi",
      uploadHistory: "Storico Caricamenti", patientFolder: "Cartella Personale"
    },
    patients: {
      empty: { title: "Nessun paziente registrato.", subtitle: "Inizia aggiungendone uno.", btnNew: "Nuovo Paziente" },
      card: { openFolder: "Apri Cartella" },
      modal: {
        title: "Anagrafica Paziente", subtitle: "Compilare tutti i campi obbligatori (*)",
        btnSave: "Crea Cartella Paziente", btnSaving: "Salvataggio..."
      }
    },
    tickets: {
      empty: "Nessuna analisi presente in archivio.",
      table: { id: "Ticket ID", patient: "Paziente", file: "File", date: "Data Caricamento", status: "Stato" },
      status: {
        completed: "Completato", processing: "In Elaborazione", queued: "In Coda", uploading: "Caricamento...", error: "Errore",
        failedAnalysis: "ANALISI FALLITA"
      },
      steps: { uploading: "Caricamento", queued: "In Coda Cloud", processing: "Analisi AI", completed: "Completato" },
      detail: { analysis: "Analisi", patient: "Paziente" }
    },
    upload: {
      title: "Nuova Analisi Istologica", dragDrop: "Trascina qui il file (SVS, NDPI, TIFF)", remove: "Rimuovi",
      notesPlaceholder: "Aggiungi note cliniche (opzionale)...", btnStart: "Avvia Upload e Analisi",
      sending: "Invio sicuro al Cloud...", successTitle: "Ticket Creato", successMsg: "In attesa dell'AI...",
      errorTitle: "Errore Upload", retry: "Riprova"
    },
    realtime: {
      sourceData: "Dati Sorgente", inputFile: "Nome File Input", size: "Dimensione", date: "Data",
      clinicalNotes: "Note Cliniche", noNotes: "Nessuna nota clinica inserita.",
      errorAnalysis: "Errore Analisi", completedAnalysis: "Analisi Completata", progressStatus: "Stato Avanzamento",
      statusLabel: "STATUS", processInterrupted: "Processo Interrotto", errorDetails: "Dettagli Errore:",
      genericError: "Errore generico durante l'elaborazione del file.", retryUpload: "Riprova Caricamento",
      outputFile: "File Output Generato", download: "Scarica", resultsJson: "Risultati AI (JSON)",
      noJson: "Nessun dato strutturato (ai_results) disponibile.",
      queuedTitle: "In Coda sul Cloud", processingTitle: "Analisi in Corso",
      queuedDesc: "Il file è al sicuro. Aspettiamo che il motore AI lo prenda in carico.",
      processingDesc: "Sto analizzando i tessuti e generando i risultati JSON.",
      outputNotReady: "File di output non ancora pronto."
    },
    results: {
      title: "Risultati Analisi AI", tissueView: "Visualizzazione Tessuto",
      previewNote: "Anteprima rapida. Per l'analisi profonda, scarica il progetto qui sotto.",
      sickTissue: "Tessuto Malato", totalGlom: "Glomeruli Totali", scleroGlom: "Glomeruli Sclerotici",
      fullProject: "Progetto QuPath Completo", downloadZip: "Scarica il file .zip per aprire l'analisi sul tuo PC.",
      btnDownload: "Scarica Progetto (.zip)"
    },
    profile: { dob: "Data di Nascita", birthPlace: "Luogo di Nascita", residence: "Residenza", contacts: "Contatti" },
    settings: {
      title: "Impostazioni Profilo",
      subtitle: "Gestisci i tuoi dati personali, le preferenze e la sicurezza dell'account.",
      tabs: { profile: "Dati Personali", security: "Sicurezza" },
      sections: {
        personal: "Informazioni Personali",
        residence: "Residenza",
        professional: "Dati Professionali",
        email: "Indirizzo Email",
        password: "Password"
      },
      form: {
        updateBtn: "Salva Modifiche",
        success: "Profilo aggiornato con successo.",
        emailNotice: "Modificando l'email riceverai una conferma.",
        passwordNotice: "Lascia vuoto per mantenere la password attuale.",
        savePassword: "Imposta Nuova Password",
        newPassword: "Nuova Password",
        confirmPassword: "Conferma Password",
        updating: "Salvataggio..."
      }
    }
  },
  legal: {
    title: "Centro Legale & Privacy",
    subtitle: "La trasparenza è fondamentale nella diagnostica medica. Qui trovi tutte le informazioni su come proteggiamo i tuoi dati e quelli dei tuoi pazienti.",
    update: "Ultimo aggiornamento: 21 Gennaio 2026",
    tabs: { privacy: "Privacy Policy", terms: "Termini di Servizio", cookie: "Cookie Policy", dpa: "Trattamento Dati (DPA)" },
    content: {
      privacyTitle: "Informativa sulla Privacy", 
      privacySub: "Ai sensi del Regolamento UE 2016/679 (GDPR)",
      termsTitle: "Termini e Condizioni", 
      termsSub: "Regolamento per l'utilizzo della Console Medica",
      cookieTitle: "Cookie Policy", 
      cookieSub: "Trasparenza sui tracciamenti",
      dpaTitle: "Data Processing & Sicurezza", 
      dpaSub: "Appendice tecnica sulla sicurezza dei dati",
      disclaimer: "ATTENZIONE - DISCLAIMER MEDICO:",
      disclaimerText: "Histyon è uno strumento di supporto tecnico e non sostituisce in alcun modo il giudizio professionale del medico. L'analisi AI è probabilistica e deve essere sempre validata da un patologo umano. Histyon non è responsabile per diagnosi errate basate esclusivamente sull'output dell'software.",
      
      privacy: {
        sec1: { 
            title: "1. Titolare del Trattamento", 
            body: "Il Titolare del trattamento dei dati relativi alla registrazione dei Medici (Dati Account) è Histyon Team, con sede legale in Italia.\n\nPer quanto concerne i Dati Sanitari dei Pazienti (inclusi dati anagrafici e immagini istologiche WSI) caricati sulla piattaforma, il Medico professionista registrato agisce in qualità di Titolare del Trattamento (Data Controller) ai sensi dell'art. 4 del GDPR. Histyon agisce esclusivamente come Responsabile del Trattamento (Data Processor), trattando i dati per conto del Titolare al solo fine di fornire il servizio di archiviazione e analisi AI." 
        },
        sec2: { 
            title: "2. Tipologia di Dati Raccolti", 
            body: "La piattaforma raccoglie e processa le seguenti categorie di dati:\n\n- Dati del Professionista: Nome, Cognome, Email istituzionale, Numero di iscrizione all'ordine, Struttura di appartenenza.\n- Dati di Utilizzo: Log di accesso, indirizzi IP, timestamp di caricamento file (conservati per scopi di sicurezza e audit trail).\n- Dati Particolari (Pazienti): Dati anagrafici pseudonimizzati e immagini diagnostiche ad alta risoluzione. Questi dati sono criptati e accessibili esclusivamente tramite le credenziali del medico titolare." 
        },
        sec3: { 
            title: "3. Finalità e Base Giuridica", 
            body: "I dati sono trattati per le seguenti finalità:\n\n- Erogazione del servizio SaaS: Archiviazione sicura e visualizzazione remota delle immagini (Esecuzione contrattuale).\n- Supporto Diagnostico: Elaborazione automatizzata tramite algoritmi di Intelligenza Artificiale per il conteggio e la segmentazione tissutale (Contratto e Legittimo Interesse).\n- Sicurezza e Compliance: Monitoraggio di accessi anomali e protezione contro frodi o abusi (Obbligo di legge e Legittimo interesse)." 
        },
        sec4: { 
            title: "4. Luogo del Trattamento e Fornitori", 
            body: "I dati sono ospitati su infrastrutture cloud localizzate all'interno dello Spazio Economico Europeo (SEE) o in paesi che garantiscono un livello di protezione adeguato.\n\nFornitori principali:\n- Supabase (Database & Auth): Francoforte, Germania (AWS).\n- Cloudflare R2 (Storage WSI): Crittografia lato server e distribuzione sicura." 
        }
      },
      terms: {
        sec1: { 
            title: "1. Requisiti di Accesso", 
            body: "L'accesso alla Console Medica Histyon è riservato esclusivamente a medici chirurghi, patologi e ricercatori clinici regolarmente iscritti al rispettivo ordine professionale.\n\nDurante la fase di registrazione, è richiesto l'inserimento del numero di licenza medica. Histyon si riserva il diritto di effettuare verifiche a campione e di sospendere o cancellare account che non soddisfano i requisiti di idoneità professionale. È fatto divieto assoluto di utilizzare la piattaforma per scopi non clinici o di ricerca non autorizzata." 
        },
        sec2: { 
            title: "2. Responsabilità sui Dati Caricati", 
            body: "L'Utente (Medico) dichiara e garantisce di aver ottenuto il consenso informato dal paziente per il caricamento dei dati e delle immagini istologiche sulla piattaforma, in conformità con le leggi vigenti (GDPR, HIPAA, leggi locali).\n\nL'Utente è l'unico responsabile della legittimità, veridicità e accuratezza dei dati caricati. Histyon non effettua controlli di merito sui contenuti clinici caricati, limitandosi a fornire l'infrastruttura tecnologica." 
        },
        sec3: { 
            title: "3. Sicurezza dell'Account", 
            body: "Le credenziali di accesso (Email e Password) sono strettamente personali e non cedibili. L'Utente è responsabile della custodia delle proprie credenziali e deve notificare tempestivamente a Histyon qualsiasi utilizzo non autorizzato o sospetta violazione della sicurezza.\n\nÈ vietata la condivisione dell'account (Account Sharing) tra più professionisti. Ogni medico deve disporre di un proprio account univoco per garantire la tracciabilità delle operazioni (Audit Logging)." 
        }
      },
      cookie: {
        sec1: { 
            title: "1. Cosa sono i cookie", 
            body: "I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell'utente, dove vengono memorizzati per essere ritrasmessi agli stessi siti alla visita successiva. Histyon utilizza tecnologie simili (come LocalStorage) per migliorare l'esperienza utente." 
        },
        sec2: { 
            title: "2. Cookie Tecnici (Essenziali)", 
            body: "La piattaforma utilizza esclusivamente cookie tecnici strettamente necessari per il funzionamento del servizio, tra cui:\n\n- Cookie di Sessione: Per mantenere l'utente autenticato durante la navigazione (gestiti da Supabase Auth).\n- Cookie di Sicurezza: Per prevenire attacchi di tipo CSRF (Cross-Site Request Forgery).\n- Preferenze: Per memorizzare la lingua selezionata (es. 'histyon-lang').\n\nPer l'installazione di tali cookie non è richiesto il preventivo consenso degli utenti." 
        },
        sec3: { 
            title: "3. Assenza di Profilazione", 
            body: "Histyon NON utilizza cookie di profilazione per scopi pubblicitari o di marketing, né cede dati di navigazione a terze parti per tali scopi. Eventuali strumenti di monitoraggio errori (es. Sentry) raccolgono dati tecnici in forma anonimizzata e aggregata al solo fine di diagnosi tecnica." 
        }
      },
      dpa: {
        cards: { 
            crypto: { title: "Crittografia", body: "Tutti i dati in transito utilizzano il protocollo TLS 1.3. I dati a riposo (Database e Object Storage) sono protetti da crittografia AES-256." }, 
            access: { title: "Access Control", body: "Implementiamo rigorose policy di Row Level Security (RLS) a livello di database, garantendo che ogni medico possa accedere SOLO ai dati dei pazienti associati al proprio ID utente." } 
        },
        sec1: { 
            title: "1. Nomina a Responsabile (DPA)", 
            body: "Con l'accettazione dei presenti Termini di Servizio, l'Utente (Titolare) nomina Histyon come Responsabile del Trattamento (Data Processor) ai sensi dell'art. 28 del GDPR.\n\nHistyon si impegna a:\n- Trattare i dati personali solo su istruzione documentata del Titolare.\n- Garantire che le persone autorizzate al trattamento si siano impegnate alla riservatezza.\n- Adottare tutte le misure di sicurezza richieste dall'art. 32 del GDPR." 
        },
        sec2: { 
            title: "2. Misure di Sicurezza Tecniche", 
            body: "La sicurezza dei dati è garantita da un approccio 'Defense in Depth':\n\n- Autenticazione: Supporto per password complesse e gestione sicura delle sessioni.\n- Isolamento: I dati dei pazienti sono isolati logicamente tramite RLS.\n- Backup: Backup automatici giornalieri con retention policy definita.\n- Audit Log: Tracciamento di tutte le operazioni di upload, analisi e download effettuate sulla piattaforma." 
        }
      }
    }
  },
  validation: {
    passwordLength: "La password deve essere di almeno 8 caratteri",
    passwordComplexity: "Deve contenere almeno una lettera Maiuscola",
    passwordSpecial: "Deve contenere almeno un carattere speciale",
    passwordRegexMsg: "Inserire una maiuscola, numero e carattere speciale",
    passwordMismatch: "Le password non coincidono", 
    name: "Solo lettere", nameAllowed: "Solo lettere consentite",
    fiscalCodeLen: "16 car. alfanumerici", fiscalCodeFormat: "Formato errato",
    emailInvalid: "Email non valida", phoneShort: "Numero troppo corto",
    required: "Obbligatorio", genericError: "Si è verificato un errore imprevisto.", 
    alreadyRegistered: "Questa email è già registrata.",
    profileError: "Errore salvataggio profilo: ",
    patientExists: "Paziente già presente in archivio.",
    unauthorized: "Non autorizzato",
    dbError: "DB Error: ",
    uploadError: "Errore URL",
    cloudflareError: "Errore caricamento Cloudflare",
    networkError: "Errore di rete",
    fileNotFound: "Impossibile trovare il file nello storage.",
    fileRetrievalError: "Impossibile recuperare il file",
    credentialsInvalid: "Credenziali non valide",
    linkSent: "Link inviato correttamente" 
  }
}