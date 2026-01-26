export const de = {
  metadata: {
    titleTemplate: '%s | Histyon',
    defaultTitle: 'Startseite | Histyon',
    description: "Fortschrittliche medizinische Diagnostik",
    loginTitle: "Anmelden",
    registerTitle: "Registrieren"
  },
  landing: {
    hero: {
      badge: "HISTYON v1.0",
      title_line1: "Digitale Diagnostik",
      title_line2: "ohne Kompromisse.",
      description: "Die All-in-One-Plattform für sichere Speicherung von WSI-Objektträgern und assistierte morphometrische Analyse.",
      ctaAccess: "Zugang anfordern",
      ctaDocs: "Dokumentation"
    },
    workflow: {
      title: "Ihr Arbeitsablauf,",
      title_colored: "einfach schneller.",
      description: "Wir haben Ausfallzeiten eliminiert. Laden Sie Gigabytes an histologischen Daten in Sekunden hoch.",
      card_header_secure: "HIPAA SICHER",
      card_patient_label: "PATIENT",
      card_patient_name: "Mustermann, Max",
      card_patient_id: "ID: #8492-BX",
      card_status: "ANALYSE BEREIT",
      card_ai_active: "KI-EBENE AKTIV",
      card_action_btn: "Bericht ansehen",
      step1_title: "Cloud-Ingestion",
      step1_desc: "Direkter Upload in verschlüsselten Speicher.",
      step2_title: "KI-Verarbeitung",
      step2_desc: "Automatisierte Gewebe-Analyse.",
      step3_title: "Berichte",
      step3_desc: "Sofortiger Zugriff auf Ergebnisse."
    },
    features: {
      title: "Klinische Exzellenz",
      title_colored: "und Datensicherheit.",
      subtitle: "Sicherheit ist keine Option. Sie ist das Fundament unserer Architektur.",
      feat1_title: "Unbegrenztes WSI-Archiv",
      feat1_desc: "Sicherer Cloud-Speicher für alle Ihre digitalen Objektträger.",
      feat2_title: "Zweitmeinung",
      feat2_desc: "Deep-Learning-Algorithmen markieren interessante Bereiche (ROI).",
      feat2_trusted: "Von modernen Laboren geschätzt",
      feat3_title: "Privacy by Design",
      feat3_desc: "Patientendaten isoliert und verschlüsselt."
    },
    footer: {
      copyright: "Histyon. Alle Rechte vorbehalten.",
      legal: "Rechtliche Hinweise",
      docs: "Dokumentation",
      contact: "Kontakt",
      login: "Login",
      register: "Registrieren"
    }
  },
  auth: {
    sidebar: {
      footer: "Histyon Konsole \u00A9 2026",
      secure: "Sichere Verbindung",
      testimonials: [
        { text: "Ein unglaublicher Fortschritt im digitalen Management.", author: "Dr. A. Weiss", role: "Leitender Pathologe" },
        { text: "KI reduziert Screening-Zeiten um 40%.", author: "Dr. M. Rot", role: "Klinische Onkologie" },
        { text: "Sicherheit und Geschwindigkeit. Endlich.", author: "Ing. G. Grün", role: "Krankenhaus-DSB" }
      ]
    },
    login: {
      title: "Anmelden",
      heading: "Konsolen-Zugriff",
      subheading: "Geben Sie Ihre institutionellen Zugangsdaten ein.",
      noCredentials: "Keine Zugangsdaten?",
      requestAccess: "Zugang anfordern",
      medicalProfile: "Ärztliches Profil",
      btn: "Anmelden",
      forgotPassword: "Passwort vergessen?",
      successRedirect: "Konto verifiziert. Bitte anmelden.",
      emailConfirmed: "E-Mail erfolgreich bestätigt. Sie können sich jetzt anmelden.",
      linkInvalid: "Ungültiger oder abgelaufener Link."
    },
    forgotPassword: {
      title: "Passwort-Wiederherstellung",
      heading: "Passwort vergessen?",
      subheading: "Geben Sie Ihre E-Mail ein. Wir senden Ihnen einen Link zum Zurücksetzen.",
      btn: "Link senden",
      backToLogin: "Zurück zum Login",
      successTitle: "E-Mail gesendet",
      successDesc: "Wenn die Adresse existiert, erhalten Sie in Kürze Anweisungen.",
      errorGeneric: "Ein Fehler ist aufgetreten."
    },
    updatePassword: {
      title: "Neues Passwort",
      heading: "Neues Passwort setzen",
      subheading: "Wählen Sie ein sicheres Passwort.",
      btn: "Passwort aktualisieren",
      success: "Passwort aktualisiert. Weiterleitung...",
      errorMatch: "Passwörter stimmen nicht überein."
    },
    register: {
      title: "Registrieren",
      heading: "Neues Profil",
      subheading: "Geführte Konfiguration.",
      alreadyAccount: "Bereits ein Konto?",
      accessConsole: "Konsole aufrufen",
      steps: {
        one: "Schritt 1", two: "Schritt 2", three: "Schritt 3",
        registry: "Register", residence: "Wohnsitz", profession: "Beruf"
      },
      buttons: { back: "Zurück", next: "Weiter", complete: "Abschließen" },
      success: {
        title: "Überprüfen Sie Ihre E-Mail",
        desc: "Wir haben Ihnen einen Bestätigungslink gesendet. Sie müssen Ihre E-Mail verifizieren, um auf das Dashboard zuzugreifen.",
        spamNotice: "Nicht erhalten? Prüfen Sie Spam oder Werbung.",
        backToLogin: "Zurück zur Login-Seite"
      }
    },
    form: {
      labels: {
        firstName: "Vorname", lastName: "Nachname", fiscalCode: "Steuernummer", gender: "Geschlecht",
        dob: "Geburtsdatum", birthPlace: "Geburtsort", phone: "Handy",
        country: "Land", address: "Adresse", civic: "Nr.", zip: "PLZ", city: "Stadt", province: "Bundesland",
        medicalLicense: "Lizenz-Nr.", hospital: "Einrichtung", email: "Dienst-E-Mail", password: "Passwort",
        emailSimple: "E-Mail", passwordSimple: "Passwort", confirmPassword: "Passwort bestätigen"
      },
      placeholders: {
        name: "Max", surname: "Mustermann", cf: "Steuer-ID...", city: "Stadt", address: "Straße", civic: "Nr.",
        zip: "10115", municipality: "Gemeinde", province: "Bundesland", license: "Z.B. 12345",
        hospital: "Z.B. Universitätsklinik...", select: "Auswählen", day: "Tag", month: "Monat", year: "Jahr",
        phonePlaceholder: "+49 1...", emailPlaceholder: "email@patient.de"
      },
      options: { male: "Männlich", female: "Weiblich", other: "Andere" },
      sections: { credentials: "Zugangsdaten", identity: "Identität", contacts: "Kontakte", domicile: "Wohnsitz" },
      warnings: { attention: "Achtung", required: "Erforderlich", requiredSymbol: "*", loading: "Lädt..." }
    }
  },
  dashboard: {
    header: { console: "Konsole", unassigned: "Nicht zugewiesen", logout: "Abmelden" },
    tabs: { patients: "Patienten", analysis: "Analysen", profile: "Stammdaten" },
    titles: {
      main: "Medizinische Konsole", patientRegistry: "Patientenregister", globalHistory: "Verlauf",
      uploadHistory: "Upload-Verlauf", patientFolder: "Persönliche Akte"
    },
    patients: {
      empty: { title: "Keine Patienten.", subtitle: "Beginnen Sie mit einem neuen.", btnNew: "Neuer Patient" },
      card: { openFolder: "Akte öffnen" },
      modal: {
        title: "Patient erfassen", subtitle: "Pflichtfelder ausfüllen (*)",
        btnSave: "Akte erstellen", btnSaving: "Speichern..."
      }
    },
    tickets: {
      empty: "Keine Analysen im Archiv.",
      table: { id: "Ticket ID", patient: "Patient", file: "Datei", date: "Datum", status: "Status" },
      status: {
        completed: "Abgeschlossen", processing: "Verarbeitung", queued: "In Warteschlange", uploading: "Upload...", error: "Fehler",
        failedAnalysis: "ANALYSE FEHLGESCHLAGEN"
      },
      steps: { uploading: "Upload", queued: "Cloud-Warte.", processing: "KI-Analyse", completed: "Fertig" },
      detail: { analysis: "Analyse", patient: "Patient" }
    },
    upload: {
      title: "Neue Histologische Analyse", dragDrop: "Datei hierher ziehen (SVS, NDPI, TIFF)", remove: "Entfernen",
      notesPlaceholder: "Klinische Notizen (optional)...", btnStart: "Upload & Analyse starten",
      sending: "Sicherer Upload...", successTitle: "Ticket erstellt", successMsg: "Warte auf KI...",
      errorTitle: "Upload-Fehler", retry: "Wiederholen"
    },
    realtime: {
      sourceData: "Quelldaten", inputFile: "Eingabedatei", size: "Größe", date: "Datum",
      clinicalNotes: "Klinische Notizen", noNotes: "Keine Notizen.",
      errorAnalysis: "Analysefehler", completedAnalysis: "Analyse abgeschlossen", progressStatus: "Fortschritt",
      statusLabel: "STATUS", processInterrupted: "Prozess unterbrochen", errorDetails: "Details:",
      genericError: "Allgemeiner Fehler.", retryUpload: "Upload wiederholen",
      outputFile: "Generierte Datei", download: "Herunterladen", resultsJson: "KI-Ergebnisse (JSON)",
      noJson: "Keine strukturierten Daten.",
      queuedTitle: "In Warteschlange", processingTitle: "Analyse läuft",
      queuedDesc: "Datei sicher. Warte auf KI-Engine.",
      processingDesc: "Gewebeanalyse und JSON-Generierung.",
      outputNotReady: "Ausgabe noch nicht bereit."
    },
    results: {
      title: "KI-Analyse Ergebnisse", tissueView: "Gewebe-Visualisierung",
      previewNote: "Schnellvorschau. Für Tiefenanalyse Projekt herunterladen.",
      sickTissue: "Erkranktes Gewebe", totalGlom: "Glomeruli Gesamt", scleroGlom: "Sklerosierte Glomeruli",
      fullProject: "Vollständiges QuPath-Projekt", downloadZip: ".zip laden für PC-Analyse.",
      btnDownload: "Projekt laden (.zip)"
    },
    profile: { dob: "Geburtsdatum", birthPlace: "Geburtsort", residence: "Wohnsitz", contacts: "Kontakte" },
    settings: {
      title: "Profileinstellungen",
      subtitle: "Verwalten Sie Daten und Sicherheit.",
      tabs: { profile: "Persönliche Daten", security: "Sicherheit" },
      sections: {
        personal: "Persönliche Informationen",
        residence: "Wohnsitz",
        professional: "Berufsdaten",
        email: "E-Mail",
        password: "Passwort"
      },
      form: {
        updateBtn: "Speichern",
        success: "Profil aktualisiert.",
        emailNotice: "E-Mail-Änderung erfordert Bestätigung.",
        passwordNotice: "Leer lassen für aktuelles.",
        savePassword: "Neues Passwort setzen",
        newPassword: "Neues Passwort",
        confirmPassword: "Bestätigen",
        updating: "Speichern..."
      }
    }
  },
  legal: {
    title: "Rechts- & Datenschutz",
    subtitle: "Transparenz in der medizinischen Diagnostik.",
    update: "Letztes Update: 21. Januar 2026",
    tabs: { privacy: "Datenschutz", terms: "AGB", cookie: "Cookies", dpa: "Verarbeitung (AVV)" },
    content: {
      privacyTitle: "Datenschutzerklärung", privacySub: "DSGVO (EU 2016/679)",
      termsTitle: "Nutzungsbedingungen", termsSub: "Regeln für die medizinische Konsole",
      cookieTitle: "Cookie-Richtlinie", cookieSub: "Tracking-Transparenz",
      dpaTitle: "Sicherheit & AVV", dpaSub: "Technischer Anhang",
      disclaimer: "ACHTUNG - MEDIZINISCHER HAFTUNGSAUSSCHLUSS:",
      disclaimerText: "Histyon ist ein technisches Hilfsmittel und ersetzt nicht das ärztliche Urteil. KI-Analysen müssen validiert werden.",
      privacy: {
        sec1: { title: "1. Verantwortlicher", body: "Histyon Team ist verantwortlich für Kontodaten." },
        sec2: { title: "2. Erhobene Daten", body: "Profidaten und Patientengesundheitsdaten (verschlüsselt)." },
        sec3: { title: "3. Zweck", body: "SaaS-Dienst, Diagnoseunterstützung, Sicherheit." },
        sec4: { title: "4. Standort", body: "Daten im EWR (Europäischer Wirtschaftsraum)." }
      },
      terms: {
        sec1: { title: "1. Voraussetzungen", body: "Zugang nur für registrierte Mediziner." },
        sec2: { title: "2. Verantwortung", body: "Der Nutzer garantiert das Vorliegen einer Einwilligung." },
        sec3: { title: "3. Sicherheit", body: "Persönliche Zugangsdaten. Account-Sharing verboten." }
      },
      cookie: {
        sec1: { title: "1. Was sind Cookies", body: "Kleine Textdateien für bessere Nutzung." },
        sec2: { title: "2. Technisch", body: "Streng notwendig (Session, Sicherheit)." },
        sec3: { title: "3. Kein Profiling", body: "Histyon nutzt KEINE Profiling-Cookies." }
      },
      dpa: {
        cards: { 
            crypto: { title: "Verschlüsselung", body: "TLS 1.3 Transit. AES-256 Ruhe." }, 
            access: { title: "Zugriffskontrolle", body: "Strenge RLS-Richtlinien." } 
        },
        sec1: { title: "1. Auftragsverarbeiter", body: "Nutzer ernennt Histyon zum Auftragsverarbeiter (Art. 28 DSGVO)." },
        sec2: { title: "2. Sicherheitsmaßnahmen", body: "Defense in Depth: Auth, Isolation, Backups." }
      }
    }
  },
  validation: {
    passwordLength: "Mindestens 8 Zeichen",
    passwordComplexity: "Muss Großbuchstaben enthalten",
    passwordSpecial: "Muss Sonderzeichen enthalten",
    passwordRegexMsg: "Großbuchstabe, Zahl und Sonderzeichen",
    passwordMismatch: "Passwörter stimmen nicht überein",
    name: "Nur Buchstaben", nameAllowed: "Nur Buchstaben erlaubt",
    fiscalCodeLen: "16 alphanumerische Zeichen", fiscalCodeFormat: "Format ungültig",
    emailInvalid: "Ungültige E-Mail", phoneShort: "Nummer zu kurz",
    required: "Erforderlich", genericError: "Unerwarteter Fehler.",
    alreadyRegistered: "E-Mail bereits registriert.",
    profileError: "Profil-Speicherfehler: ",
    patientExists: "Patient existiert bereits.",
    unauthorized: "Nicht autorisiert",
    dbError: "DB Fehler: ",
    uploadError: "URL Fehler",
    cloudflareError: "Cloudflare Upload-Fehler",
    networkError: "Netzwerkfehler",
    fileNotFound: "Datei nicht gefunden.",
    fileRetrievalError: "Dateiabruf unmöglich",
    credentialsInvalid: "Ungültige Zugangsdaten",
    linkSent: "Link erfolgreich gesendet"
  }
}