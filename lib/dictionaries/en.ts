export const en = {
  metadata: {
    titleTemplate: '%s | Histyon',
    defaultTitle: 'Home | Histyon',
    description: "Advanced Medical Diagnostics",
    loginTitle: "Login",
    registerTitle: "Register"
  },
  landing: {
    hero: {
      badge: "HISTYON v1.0",
      title_line1: "Digital diagnostics",
      title_line2: "without compromise.",
      description: "The all-in-one platform for secure storage of WSI slides and assisted morphometric analysis. Designed to support, not replace, the pathologist.",
      ctaAccess: "Request Access",
      ctaDocs: "Documentation"
    },
    workflow: {
      title: "Your workflow,",
      title_colored: "simply faster.",
      description: "We eliminated downtime. Upload gigabytes of histological data in seconds and let our algorithms work in the background while you focus on patients.",
      card_header_secure: "HIPAA SECURE",
      card_patient_label: "PATIENT",
      card_patient_name: "Doe, John",
      card_patient_id: "ID: #8492-BX",
      card_status: "ANALYSIS READY",
      card_ai_active: "AI LAYER ACTIVE",
      card_action_btn: "View Report",
      step1_title: "Cloud Ingestion",
      step1_desc: "Direct upload to encrypted storage.",
      step2_title: "AI Processing",
      step2_desc: "Automated tissue analysis on dedicated servers.",
      step3_title: "Reporting",
      step3_desc: "Instant access to results anywhere."
    },
    features: {
      title: "Clinical Excellence",
      title_colored: "and Data Security.",
      subtitle: "Data security is not an optional feature. It is the foundation of our architecture.",
      feat1_title: "Unlimited WSI Archive",
      feat1_desc: "Forget external hard drives. A secure cloud space, accessible everywhere, for all your digital slides.",
      feat2_title: "Second Opinion",
      feat2_desc: "Deep Learning algorithms highlight Regions of Interest (ROI) to speed up preliminary screening.",
      feat2_trusted: "Trusted by modern labs",
      feat3_title: "Privacy by Design",
      feat3_desc: "Patient data is isolated and encrypted. You are the sole owner of your clinical information."
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
        { text: "AI reduces screening times by 40%.", author: "Dr. M. Red", role: "Clinical Oncology" },
        { text: "Data security and speed. Finally.", author: "Eng. G. Green", role: "Hospital DPO" }
      ]
    },
    login: {
      title: "Login",
      heading: "Console Access",
      subheading: "Enter your institutional credentials.",
      noCredentials: "Don't have credentials?",
      requestAccess: "Request Access",
      medicalProfile: "Medical Profile",
      btn: "Sign In",
      forgotPassword: "Forgot password?",
      successRedirect: "Account verified. Please sign in.",
      emailConfirmed: "Email successfully confirmed. You can now login.",
      linkInvalid: "Invalid or expired link."
    },
    forgotPassword: {
      title: "Password Recovery",
      heading: "Forgot password?",
      subheading: "Enter your institutional email. We will send you a secure link to reset your password.",
      btn: "Send Reset Link",
      backToLogin: "Back to Login",
      successTitle: "Email Sent",
      successDesc: "If the address is in our system, you will receive reset instructions shortly.",
      errorGeneric: "An error occurred. Please try again later."
    },
    updatePassword: {
      title: "New Password",
      heading: "Set New Password",
      subheading: "Choose a secure password for your account.",
      btn: "Update Password",
      success: "Password updated successfully. Redirecting...",
      errorMatch: "Passwords do not match."
    },
    register: {
      title: "Register",
      heading: "New Profile",
      subheading: "User configuration wizard.",
      alreadyAccount: "Already have an account?",
      accessConsole: "Access Console",
      steps: {
        one: "Step 1", two: "Step 2", three: "Step 3",
        registry: "Registry", residence: "Residence", profession: "Profession & Account"
      },
      buttons: { back: "Back", next: "Next", complete: "Complete Registration" },
      success: {
        title: "Check your Email",
        desc: "We have sent you a confirmation link. To activate your account and access the dashboard, you must verify your email address.",
        spamNotice: "Didn't receive the email? Check your Spam or Promotions folder.",
        backToLogin: "Back to Login page"
      }
    },
    form: {
      labels: {
        firstName: "First Name", lastName: "Last Name", fiscalCode: "Fiscal Code", gender: "Gender",
        dob: "Date of Birth", birthPlace: "Place of Birth", phone: "Mobile Phone",
        country: "Country", address: "Address", civic: "Unit/Apt", zip: "ZIP Code", city: "City", province: "State/Province",
        medicalLicense: "License No.", hospital: "Institution", email: "Institutional Email", password: "Secure Password",
        emailSimple: "Email", passwordSimple: "Password", confirmPassword: "Confirm Password"
      },
      placeholders: {
        name: "John", surname: "Doe", cf: "Tax ID...", city: "City", address: "Street", civic: "No.",
        zip: "00000", municipality: "Municipality", province: "State", license: "Ex. 12345/NY",
        hospital: "Ex. General Hospital...", select: "Select", day: "Day", month: "Month", year: "Year",
        phonePlaceholder: "+1 555...", emailPlaceholder: "email@patient.com"
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
        title: "Patient Registry", subtitle: "Fill in all mandatory fields (*)",
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
      steps: { uploading: "Uploading", queued: "Cloud Queued", processing: "AI Analysis", completed: "Completed" },
      detail: { analysis: "Analysis", patient: "Patient" }
    },
    upload: {
      title: "New Histological Analysis", dragDrop: "Drag file here (SVS, NDPI, TIFF)", remove: "Remove",
      notesPlaceholder: "Add clinical notes (optional)...", btnStart: "Start Upload & Analysis",
      sending: "Secure upload to Cloud...", successTitle: "Ticket Created", successMsg: "Waiting for AI...",
      errorTitle: "Upload Error", retry: "Retry"
    },
    realtime: {
      sourceData: "Source Data", inputFile: "Input File Name", size: "Size", date: "Date",
      clinicalNotes: "Clinical Notes", noNotes: "No clinical notes entered.",
      errorAnalysis: "Analysis Error", completedAnalysis: "Analysis Completed", progressStatus: "Progress Status",
      statusLabel: "STATUS", processInterrupted: "Process Interrupted", errorDetails: "Error Details:",
      genericError: "Generic error during file processing.", retryUpload: "Retry Upload",
      outputFile: "Generated Output File", download: "Download", resultsJson: "AI Results (JSON)",
      noJson: "No structured data (ai_results) available.",
      queuedTitle: "Queued on Cloud", processingTitle: "Analysis in Progress",
      queuedDesc: "File is secure. Waiting for AI engine pickup.",
      processingDesc: "Analyzing tissues and generating JSON results.",
      outputNotReady: "Output file not yet ready."
    },
    results: {
      title: "AI Analysis Results", tissueView: "Tissue Visualization",
      previewNote: "Quick preview. For deep analysis, download the project below.",
      sickTissue: "Diseased Tissue", totalGlom: "Total Glomeruli", scleroGlom: "Sclerotic Glomeruli",
      fullProject: "Full QuPath Project", downloadZip: "Download the .zip file to open analysis on your PC.",
      btnDownload: "Download Project (.zip)"
    },
    profile: { dob: "Date of Birth", birthPlace: "Place of Birth", residence: "Residence", contacts: "Contacts" },
    settings: {
      title: "Profile Settings",
      subtitle: "Manage your personal data, preferences, and account security.",
      tabs: { profile: "Personal Data", security: "Security" },
      sections: {
        personal: "Personal Information",
        residence: "Residence",
        professional: "Professional Data",
        email: "Email Address",
        password: "Password"
      },
      form: {
        updateBtn: "Save Changes",
        success: "Profile updated successfully.",
        emailNotice: "Changing email requires confirmation.",
        passwordNotice: "Leave blank to keep current password.",
        savePassword: "Set New Password",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
        updating: "Saving..."
      }
    }
  },
  legal: {
    title: "Legal & Privacy Center",
    subtitle: "Transparency is fundamental in medical diagnostics. Here you find all info on how we protect your data and your patients' data.",
    update: "Last updated: January 21, 2026",
    tabs: { privacy: "Privacy Policy", terms: "Terms of Service", cookie: "Cookie Policy", dpa: "Data Processing (DPA)" },
    content: {
      privacyTitle: "Privacy Policy",
      privacySub: "Pursuant to EU Regulation 2016/679 (GDPR)",
      termsTitle: "Terms and Conditions",
      termsSub: "Regulation for Medical Console usage",
      cookieTitle: "Cookie Policy",
      cookieSub: "Tracking transparency",
      dpaTitle: "Data Processing & Security",
      dpaSub: "Technical appendix on data security",
      disclaimer: "ATTENTION - MEDICAL DISCLAIMER:",
      disclaimerText: "Histyon is a technical support tool and does not replace professional medical judgment. AI analysis is probabilistic and must always be validated by a human pathologist.",
      privacy: {
        sec1: { title: "1. Data Controller", body: "The Data Controller for Doctor registration data is Histyon Team." },
        sec2: { title: "2. Collected Data", body: "Professional Data, Usage Data, and Patient Health Data (encrypted)." },
        sec3: { title: "3. Purpose", body: "SaaS Service delivery, Diagnostic Support, Security and Compliance." },
        sec4: { title: "4. Location", body: "Data is hosted within the EEA (European Economic Area)." }
      },
      terms: {
        sec1: { title: "1. Access Requirements", body: "Access is reserved for registered medical professionals." },
        sec2: { title: "2. Responsibility", body: "The User (Doctor) warrants having obtained informed consent from patients." },
        sec3: { title: "3. Security", body: "Credentials are personal. Account sharing is prohibited." }
      },
      cookie: {
        sec1: { title: "1. What are cookies", body: "Small text files used to improve user experience." },
        sec2: { title: "2. Technical Cookies", body: "Strictly necessary for service operation (Session, Security)." },
        sec3: { title: "3. No Profiling", body: "Histyon does NOT use profiling cookies for marketing." }
      },
      dpa: {
        cards: { 
            crypto: { title: "Encryption", body: "TLS 1.3 in transit. AES-256 at rest." }, 
            access: { title: "Access Control", body: "Strict Row Level Security (RLS) policies." } 
        },
        sec1: { title: "1. Processor Appointment", body: "User appoints Histyon as Data Processor (Art. 28 GDPR)." },
        sec2: { title: "2. Security Measures", body: "Defense in Depth approach: Authentication, Isolation, Backups, Audit Logs." }
      }
    }
  },
  validation: {
    passwordLength: "Password must be at least 8 characters",
    passwordComplexity: "Must contain at least one Uppercase letter",
    passwordSpecial: "Must contain at least one special character",
    passwordRegexMsg: "Use uppercase, number, and special character",
    passwordMismatch: "Passwords do not match",
    name: "Letters only", nameAllowed: "Only letters allowed",
    fiscalCodeLen: "16 alphanumeric chars", fiscalCodeFormat: "Invalid format",
    emailInvalid: "Invalid email", phoneShort: "Number too short",
    required: "Required", genericError: "An unexpected error occurred.",
    alreadyRegistered: "This email is already registered.",
    profileError: "Profile save error: ",
    patientExists: "Patient already exists in archive.",
    unauthorized: "Unauthorized",
    dbError: "DB Error: ",
    uploadError: "URL Error",
    cloudflareError: "Cloudflare upload error",
    networkError: "Network error",
    fileNotFound: "File not found in storage.",
    fileRetrievalError: "Cannot retrieve file",
    credentialsInvalid: "Invalid credentials",
    linkSent: "Link sent successfully"
  }
}