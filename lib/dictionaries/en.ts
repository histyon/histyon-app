// lib/dictionaries/en.ts
import { it } from './it'

export const en: typeof it = {
  metadata: {
    titleTemplate: '%s | Histyon',
    defaultTitle: 'Home | Histyon',
    description: "Advanced Medical Diagnostics",
    loginTitle: "Login",
    registerTitle: "Register"
  },
  landing: {
    hero: {
      title: "Diagnostics",
      subtitle: "Next-Gen.",
      description: "The ultimate platform for secure storage and AI-assisted histological analysis. Designed for clinical excellence.",
      ctaAccess: "Request Access",
      ctaDocs: "Documentation"
    },
    features: {
      security: { title: "HIPAA Security", desc: "End-to-End Encryption." },
      storage: { title: "Cloud Storage", desc: "Unlimited WSI Archive." },
      ai: { title: "AI Analysis", desc: "Active Neural Engine." },
      console: "Console"
    },
    footer: {
      copyright: "Histyon. All rights reserved.",
      legal: "Legal Info",
      docs: "Documentation",
      contact: "Contact Us",
      login: "Login",
      register: "Register"
    }
  },
  auth: {
    sidebar: {
      footer: "Histyon Console \u00A9 2026",
      secure: "Secure Connection",
      testimonials: [
        { text: "An incredible step forward in digital slide management.", author: "Dr. A. White", role: "Senior Pathologist" },
        { text: "AI reduces screening time by 40%.", author: "Dr. M. Red", role: "Clinical Oncology" },
        { text: "Data security and speed. Finally.", author: "Eng. G. Green", role: "Hospital DPO" }
      ]
    },
    login: {
      title: "Login",
      heading: "Console Access",
      subheading: "Enter your institutional credentials.",
      noCredentials: "No credentials?",
      requestAccess: "Request Access",
      medicalProfile: "Medical Profile",
      btn: "Login",
      successRedirect: "Account verified. Please login."
    },
    register: {
      title: "Register",
      heading: "New Profile",
      subheading: "User setup wizard.",
      alreadyAccount: "Already have an account?",
      accessConsole: "Access Console",
      steps: {
        one: "Step 1", two: "Step 2", three: "Step 3",
        registry: "Registry", residence: "Residence", profession: "Profession & Account"
      },
      buttons: { back: "Back", next: "Next", complete: "Complete Registration" },
      success: {
        title: "Registration Completed",
        desc: "Your professional profile has been created successfully. We are preparing your secure workspace.",
        redirect: "Redirecting to login page..."
      }
    },
    form: {
      labels: {
        firstName: "First Name", lastName: "Last Name", fiscalCode: "Fiscal Code", gender: "Gender",
        dob: "Date of Birth", birthPlace: "Place of Birth", phone: "Mobile Phone",
        country: "Country", address: "Address", civic: "Unit/Apt", zip: "ZIP Code", city: "City", province: "State/Province",
        medicalLicense: "License No.", hospital: "Hospital", email: "Institutional Email", password: "Secure Password",
        emailSimple: "Email", passwordSimple: "Password"
      },
      placeholders: {
        name: "John", surname: "Doe", cf: "RSSMRA...", city: "City", address: "Street Name", civic: "No.",
        zip: "10001", municipality: "Municipality", province: "State", license: "Ex. 12345/NY",
        hospital: "Ex. General Hospital...", select: "Select", day: "Day", month: "Month", year: "Year",
        phonePlaceholder: "+1 555...", emailPlaceholder: "email@hospital.com"
      },
      options: { male: "Male", female: "Female", other: "Other" },
      sections: { credentials: "Access Credentials", identity: "Identity", contacts: "Contacts", domicile: "Domicile" },
      warnings: { attention: "Attention", required: "Required", requiredSymbol: "*", loading: "Loading..." }
    }
  },
  dashboard: {
    header: { console: "Console", unassigned: "Unassigned", logout: "Logout" },
    tabs: { patients: "Patients", analysis: "Analysis", profile: "Registry Data" },
    titles: {
      main: "Medical Console", patientRegistry: "Patient Registry", globalHistory: "Global Analysis History",
      uploadHistory: "Upload History", patientFolder: "Personal Folder"
    },
    patients: {
      empty: { title: "No patients registered.", subtitle: "Start by adding one.", btnNew: "New Patient" },
      card: { openFolder: "Open Folder" },
      modal: {
        title: "Patient Registry", subtitle: "Fill in all required fields (*)",
        btnSave: "Create Patient Folder", btnSaving: "Saving..."
      }
    },
    tickets: {
      empty: "No analysis in archive.",
      table: { id: "Ticket ID", patient: "Patient", file: "File", date: "Upload Date", status: "Status" },
      status: {
        completed: "Completed", processing: "Processing", queued: "Queued", uploading: "Uploading...", error: "Error",
        failedAnalysis: "ANALYSIS FAILED"
      },
      steps: { uploading: "Uploading", queued: "Cloud Queue", processing: "AI Analysis", completed: "Completed" },
      detail: { analysis: "Analysis", patient: "Patient" }
    },
    upload: {
      title: "New Histological Analysis", dragDrop: "Drag file here (SVS, NDPI, TIFF)", remove: "Remove",
      notesPlaceholder: "Add clinical notes (optional)...", btnStart: "Start Upload & Analysis",
      sending: "Secure sending to Cloud...", successTitle: "Ticket Created", successMsg: "Waiting for AI...",
      errorTitle: "Upload Error", retry: "Retry"
    },
    realtime: {
      sourceData: "Source Data", inputFile: "Input File Name", size: "Size", date: "Date",
      clinicalNotes: "Clinical Notes", noNotes: "No clinical notes inserted.",
      errorAnalysis: "Analysis Error", completedAnalysis: "Analysis Completed", progressStatus: "Progress Status",
      statusLabel: "STATUS", processInterrupted: "Process Interrupted", errorDetails: "Error Details:",
      genericError: "Generic error during file processing.", retryUpload: "Retry Upload",
      outputFile: "Generated Output File", download: "Download", resultsJson: "AI Results (JSON)",
      noJson: "No structured data (ai_results) available.",
      queuedTitle: "Queued on Cloud", processingTitle: "Analysis in Progress",
      queuedDesc: "File is safe. Waiting for AI engine pickup.",
      processingDesc: "Analyzing tissues and generating JSON results.",
      outputNotReady: "Output file not ready yet."
    },
    results: {
      title: "AI Analysis Results", tissueView: "Tissue Visualization",
      previewNote: "Quick preview. For deep analysis, download the project below.",
      sickTissue: "Diseased Tissue", totalGlom: "Total Glomeruli", scleroGlom: "Sclerotic Glomeruli",
      fullProject: "Full QuPath Project", downloadZip: "Download .zip to open analysis on your PC.",
      btnDownload: "Download Project (.zip)"
    },
    profile: { dob: "Date of Birth", birthPlace: "Place of Birth", residence: "Residence", contacts: "Contacts" }
  },
  legal: {
    title: "Legal Center & Privacy",
    subtitle: "Transparency is fundamental in medical diagnostics. Here you find all info on how we protect your data and your patients'.",
    update: "Last updated: January 21, 2026",
    tabs: { privacy: "Privacy Policy", terms: "Terms of Service", cookie: "Cookie Policy", dpa: "Data Processing (DPA)" },
    content: {
      privacyTitle: "Privacy Policy", 
      privacySub: "Under EU Regulation 2016/679 (GDPR)",
      termsTitle: "Terms & Conditions", 
      termsSub: "Rules for using the Medical Console",
      cookieTitle: "Cookie Policy", 
      cookieSub: "Transparency on tracking",
      dpaTitle: "Data Processing & Security", 
      dpaSub: "Technical appendix on data security",
      disclaimer: "ATTENTION - MEDICAL DISCLAIMER:",
      disclaimerText: "Histyon is a technical support tool and does not replace professional medical judgment. AI analysis is probabilistic and must always be validated by a human pathologist. Histyon is not responsible for misdiagnoses based solely on software output.",
      
      privacy: {
        sec1: { 
            title: "1. Data Controller", 
            body: "The Data Controller for Doctor registration data (Account Data) is Histyon Team, based in Italy.\n\nRegarding Patient Health Data (including registry data and WSI histological images) uploaded to the platform, the registered Professional Doctor acts as Data Controller under Art. 4 of GDPR. Histyon acts exclusively as Data Processor, processing data on behalf of the Controller solely to provide storage and AI analysis services." 
        },
        sec2: { 
            title: "2. Types of Data Collected", 
            body: "The platform collects and processes the following data categories:\n\n- Professional Data: Name, Surname, Institutional Email, License Number, Hospital Affiliation.\n- Usage Data: Access logs, IP addresses, file upload timestamps (retained for security and audit trail purposes).\n- Special Categories (Patients): Pseudonymized registry data and high-resolution diagnostic images. This data is encrypted and accessible solely via the authorized doctor's credentials." 
        },
        sec3: { 
            title: "3. Purpose and Legal Basis", 
            body: "Data is processed for the following purposes:\n\n- SaaS Service Provision: Secure storage and remote viewing of images (Contractual Execution).\n- Diagnostic Support: Automated processing via Artificial Intelligence algorithms for tissue counting and segmentation (Contract and Legitimate Interest).\n- Security and Compliance: Monitoring anomalous access and protection against fraud or abuse (Legal Obligation and Legitimate Interest)." 
        },
        sec4: { 
            title: "4. Place of Processing and Vendors", 
            body: "Data is hosted on cloud infrastructures located within the European Economic Area (EEA) or in countries ensuring an adequate level of protection.\n\nMain Vendors:\n- Supabase (Database & Auth): Frankfurt, Germany (AWS).\n- Cloudflare R2 (WSI Storage): Server-side encryption and secure distribution." 
        }
      },
      terms: {
        sec1: { 
            title: "1. Access Requirements", 
            body: "Access to the Histyon Medical Console is reserved exclusively for surgeons, pathologists, and clinical researchers regularly registered with their respective professional orders.\n\nDuring registration, the medical license number is required. Histyon reserves the right to perform random checks and to suspend or cancel accounts that do not meet professional eligibility requirements. Use of the platform for non-clinical or unauthorized research purposes is strictly prohibited." 
        },
        sec2: { 
            title: "2. Responsibility for Uploaded Data", 
            body: "The User (Doctor) declares and warrants having obtained informed consent from the patient for uploading data and histological images to the platform, in compliance with applicable laws (GDPR, HIPAA, local laws).\n\nThe User is solely responsible for the legitimacy, veracity, and accuracy of the uploaded data. Histyon does not perform merit checks on uploaded clinical content, limiting itself to providing technological infrastructure." 
        },
        sec3: { 
            title: "3. Account Security", 
            body: "Access credentials (Email and Password) are strictly personal and non-transferable. The User is responsible for safeguarding their credentials and must promptly notify Histyon of any unauthorized use or suspected security breach.\n\nAccount sharing between multiple professionals is prohibited. Each doctor must have a unique account to ensure operation traceability (Audit Logging)." 
        }
      },
      cookie: {
        sec1: { 
            title: "1. What are cookies", 
            body: "Cookies are small text files that visited sites send to the user's terminal, where they are stored to be re-transmitted to the same sites on the next visit. Histyon uses similar technologies (such as LocalStorage) to improve user experience." 
        },
        sec2: { 
            title: "2. Technical Cookies (Essential)", 
            body: "The platform uses exclusively technical cookies strictly necessary for service operation, including:\n\n- Session Cookies: To keep the user authenticated during navigation (managed by Supabase Auth).\n- Security Cookies: To prevent CSRF (Cross-Site Request Forgery) attacks.\n- Preferences: To store selected language (e.g. 'histyon-lang').\n\nPrior user consent is not required for the installation of such cookies." 
        },
        sec3: { 
            title: "3. Absence of Profiling", 
            body: "Histyon does NOT use profiling cookies for advertising or marketing purposes, nor does it share navigation data with third parties for such purposes. Any error monitoring tools (e.g. Sentry) collect technical data in anonymized and aggregated form solely for technical diagnosis." 
        }
      },
      dpa: {
        cards: { 
            crypto: { title: "Encryption", body: "All data in transit uses TLS 1.3 protocol. Data at rest (Database and Object Storage) is protected by AES-256 encryption." }, 
            access: { title: "Access Control", body: "We implement strict Row Level Security (RLS) policies at the database level, ensuring each doctor can access ONLY patient data associated with their own user ID." } 
        },
        sec1: { 
            title: "1. DPA Appointment", 
            body: "By accepting these Terms of Service, the User (Controller) appoints Histyon as Data Processor under Art. 28 of GDPR.\n\nHistyon commits to:\n- Process personal data only on documented instructions from the Controller.\n- Ensure authorized persons have committed to confidentiality.\n- Adopt all security measures required by Art. 32 of GDPR." 
        },
        sec2: { 
            title: "2. Technical Security Measures", 
            body: "Data security is guaranteed by a 'Defense in Depth' approach:\n\n- Authentication: Support for complex passwords and secure session management.\n- Isolation: Patient data is logically isolated via RLS.\n- Backup: Automatic daily backups with defined retention policy.\n- Audit Log: Tracking of all upload, analysis, and download operations performed on the platform." 
        }
      }
    }
  },
  validation: {
    passwordLength: "Password must be at least 8 chars",
    passwordComplexity: "Must contain at least one Uppercase letter",
    passwordSpecial: "Must contain at least one special character",
    passwordRegexMsg: "Insert uppercase, number and special char",
    name: "Letters only", nameAllowed: "Only letters allowed",
    fiscalCodeLen: "16 alphanumeric chars", fiscalCodeFormat: "Wrong format",
    emailInvalid: "Invalid email", phoneShort: "Number too short",
    required: "Required", genericError: "!",
    alreadyRegistered: "This email is already registered.",
    profileError: "Profile save error: ",
    patientExists: "Patient already exists in archive.",
    unauthorized: "Unauthorized",
    dbError: "DB Error: ",
    uploadError: "URL Error",
    cloudflareError: "Cloudflare upload error",
    networkError: "Network error",
    fileNotFound: "Cannot find file in storage.",
    fileRetrievalError: "Cannot retrieve file",
    credentialsInvalid: "Invalid credentials"
  }
}