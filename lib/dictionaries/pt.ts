export const pt = {
  metadata: {
    titleTemplate: '%s | Histyon',
    defaultTitle: 'Início | Histyon',
    description: "Diagnóstico Médico Avançado",
    loginTitle: "Entrar",
    registerTitle: "Registrar"
  },
  landing: {
    hero: {
      badge: "HISTYON v1.0",
      title_line1: "Diagnóstico digital",
      title_line2: "sem compromissos.",
      description: "A plataforma tudo-em-um para armazenamento seguro de lâminas WSI e análise morfométrica assistida.",
      ctaAccess: "Solicitar Acesso",
      ctaDocs: "Documentação"
    },
    workflow: {
      title: "Seu fluxo de trabalho,",
      title_colored: "simplesmente mais rápido.",
      description: "Eliminamos o tempo de inatividade. Carregue gigabytes de dados histológicos em segundos.",
      card_header_secure: "HIPAA SEGURO",
      card_patient_label: "PACIENTE",
      card_patient_name: "Silva, João",
      card_patient_id: "ID: #8492-BX",
      card_status: "ANÁLISE PRONTA",
      card_ai_active: "CAMADA IA ATIVA",
      card_action_btn: "Ver Relatório",
      step1_title: "Ingestão na Nuvem",
      step1_desc: "Upload direto para armazenamento criptografado.",
      step2_title: "Processamento IA",
      step2_desc: "Análise tecidual automatizada.",
      step3_title: "Relatórios",
      step3_desc: "Acesso instantâneo aos resultados."
    },
    features: {
      title: "Excelência Clínica",
      title_colored: "e Segurança de Dados.",
      subtitle: "Segurança não é opcional. É a base da nossa arquitetura.",
      feat1_title: "Arquivo WSI Ilimitado",
      feat1_desc: "Espaço em nuvem seguro para todas as suas lâminas digitais.",
      feat2_title: "Segunda Opinião",
      feat2_desc: "Algoritmos de Deep Learning destacam áreas de interesse (ROI).",
      feat2_trusted: "Confiado por laboratórios modernos",
      feat3_title: "Privacidade por Design",
      feat3_desc: "Dados de pacientes isolados e criptografados."
    },
    footer: {
      copyright: "Histyon. Todos os direitos reservados.",
      legal: "Info Legal",
      docs: "Documentação",
      contact: "Contato",
      login: "Entrar",
      register: "Registrar"
    }
  },
  auth: {
    sidebar: {
      footer: "Console Histyon \u00A9 2026",
      secure: "Conexão Segura",
      testimonials: [
        { text: "Um passo incrível na gestão de lâminas digitais.", author: "Dr. A. Branco", role: "Patologista Sênior" },
        { text: "A IA reduz tempos de triagem em 40%.", author: "Dr. M. Vermelho", role: "Oncologia Clínica" },
        { text: "Segurança e velocidade. Finalmente.", author: "Eng. G. Verde", role: "DPO Hospitalar" }
      ]
    },
    login: {
      title: "Entrar",
      heading: "Acesso ao Console",
      subheading: "Insira credenciais institucionais.",
      noCredentials: "Sem credenciais?",
      requestAccess: "Solicitar Acesso",
      medicalProfile: "Perfil médico",
      btn: "Entrar",
      forgotPassword: "Esqueceu a senha?",
      successRedirect: "Conta verificada. Faça login.",
      emailConfirmed: "E-mail confirmado com sucesso. Agora você pode entrar.",
      linkInvalid: "Link inválido ou expirado."
    },
    forgotPassword: {
      title: "Recuperar Senha",
      heading: "Esqueceu a senha?",
      subheading: "Insira seu e-mail institucional. Enviaremos um link para redefinição.",
      btn: "Enviar Link",
      backToLogin: "Voltar ao Login",
      successTitle: "E-mail Enviado",
      successDesc: "Se o endereço existir, você receberá instruções em breve.",
      errorGeneric: "Ocorreu um erro. Tente novamente."
    },
    updatePassword: {
      title: "Nova Senha",
      heading: "Definir Nova Senha",
      subheading: "Escolha uma senha segura.",
      btn: "Atualizar Senha",
      success: "Senha atualizada. Redirecionando...",
      errorMatch: "As senhas não coincidem."
    },
    register: {
      title: "Registrar",
      heading: "Novo Perfil",
      subheading: "Configuração guiada.",
      alreadyAccount: "Já tem conta?",
      accessConsole: "Acessar Console",
      steps: {
        one: "Passo 1", two: "Passo 2", three: "Passo 3",
        registry: "Registro", residence: "Residência", profession: "Profissão"
      },
      buttons: { back: "Voltar", next: "Próximo", complete: "Concluir" },
      success: {
        title: "Verifique seu E-mail",
        desc: "Enviamos um link de confirmação. Você deve verificar seu e-mail para acessar o painel.",
        spamNotice: "Não recebeu? Verifique Spam ou Promoções.",
        backToLogin: "Voltar à página de Login"
      }
    },
    form: {
      labels: {
        firstName: "Nome", lastName: "Sobrenome", fiscalCode: "CPF/NIF", gender: "Gênero",
        dob: "Data de Nascimento", birthPlace: "Local de Nascimento", phone: "Celular",
        country: "País", address: "Endereço", civic: "Nº", zip: "CEP", city: "Cidade", province: "Estado",
        medicalLicense: "Nº Licença", hospital: "Instituição", email: "E-mail Institucional", password: "Senha",
        emailSimple: "E-mail", passwordSimple: "Senha", confirmPassword: "Confirmar Senha"
      },
      placeholders: {
        name: "João", surname: "Silva", cf: "123456789...", city: "Cidade", address: "Rua", civic: "Nº",
        zip: "00000-000", municipality: "Município", province: "Estado", license: "Ex. 12345",
        hospital: "Ex. Hospital Geral...", select: "Selecionar", day: "Dia", month: "Mês", year: "Ano",
        phonePlaceholder: "+55 11...", emailPlaceholder: "email@paciente.com"
      },
      options: { male: "Masculino", female: "Feminino", other: "Outro" },
      sections: { credentials: "Credenciais", identity: "Identidade", contacts: "Contatos", domicile: "Domicílio" },
      warnings: { attention: "Atenção", required: "Obrigatório", requiredSymbol: "*", loading: "Carregando..." }
    }
  },
  dashboard: {
    header: { console: "Console", unassigned: "Não atribuído", logout: "Sair" },
    tabs: { patients: "Pacientes", analysis: "Análises", profile: "Dados Pessoais" },
    titles: {
      main: "Console Médica", patientRegistry: "Registro Pacientes", globalHistory: "Histórico Global",
      uploadHistory: "Histórico Uploads", patientFolder: "Pasta Pessoal"
    },
    patients: {
      empty: { title: "Sem pacientes.", subtitle: "Comece adicionando um.", btnNew: "Novo Paciente" },
      card: { openFolder: "Abrir Pasta" },
      modal: {
        title: "Registro Paciente", subtitle: "Preencher obrigatórios (*)",
        btnSave: "Criar Pasta", btnSaving: "Salvando..."
      }
    },
    tickets: {
      empty: "Sem análises no arquivo.",
      table: { id: "ID Ticket", patient: "Paciente", file: "Arquivo", date: "Data", status: "Status" },
      status: {
        completed: "Concluído", processing: "Processando", queued: "Na Fila", uploading: "Enviando...", error: "Erro",
        failedAnalysis: "ANÁLISE FALHOU"
      },
      steps: { uploading: "Upload", queued: "Fila Nuvem", processing: "Análise IA", completed: "Concluído" },
      detail: { analysis: "Análise", patient: "Paciente" }
    },
    upload: {
      title: "Nova Análise Histológica", dragDrop: "Arraste arquivo (SVS, NDPI, TIFF)", remove: "Remover",
      notesPlaceholder: "Notas clínicas (opcional)...", btnStart: "Iniciar Upload e Análise",
      sending: "Envio seguro...", successTitle: "Ticket Criado", successMsg: "Aguardando IA...",
      errorTitle: "Erro Upload", retry: "Tentar Novamente"
    },
    realtime: {
      sourceData: "Dados Fonte", inputFile: "Arquivo Entrada", size: "Tamanho", date: "Data",
      clinicalNotes: "Notas Clínicas", noNotes: "Sem notas.",
      errorAnalysis: "Erro Análise", completedAnalysis: "Análise Concluída", progressStatus: "Progresso",
      statusLabel: "STATUS", processInterrupted: "Processo Interrompido", errorDetails: "Detalhes:",
      genericError: "Erro genérico.", retryUpload: "Tentar Novamente",
      outputFile: "Arquivo Gerado", download: "Baixar", resultsJson: "Resultados IA (JSON)",
      noJson: "Sem dados estruturados.",
      queuedTitle: "Na Fila", processingTitle: "Análise em Curso",
      queuedDesc: "Arquivo seguro. Aguardando motor IA.",
      processingDesc: "Analisando tecidos e gerando JSON.",
      outputNotReady: "Saída não pronta."
    },
    results: {
      title: "Resultados Análise IA", tissueView: "Visualização Tecido",
      previewNote: "Prévia rápida. Para análise profunda, baixe o projeto.",
      sickTissue: "Tecido Doente", totalGlom: "Glomérulos Totais", scleroGlom: "Glomérulos Escleróticos",
      fullProject: "Projeto QuPath Completo", downloadZip: "Baixe o .zip para abrir no PC.",
      btnDownload: "Baixar Projeto (.zip)"
    },
    profile: { dob: "Data Nascimento", birthPlace: "Local Nascimento", residence: "Residência", contacts: "Contatos" },
    settings: {
      title: "Configurações Perfil",
      subtitle: "Gerencie dados pessoais e segurança.",
      tabs: { profile: "Dados Pessoais", security: "Segurança" },
      sections: {
        personal: "Informações Pessoais",
        residence: "Residência",
        professional: "Dados Profissionais",
        email: "E-mail",
        password: "Senha"
      },
      form: {
        updateBtn: "Salvar Alterações",
        success: "Perfil atualizado.",
        emailNotice: "Mudar e-mail requer confirmação.",
        passwordNotice: "Deixar em branco para manter atual.",
        savePassword: "Definir Nova Senha",
        newPassword: "Nova Senha",
        confirmPassword: "Confirmar Senha",
        updating: "Salvando..."
      }
    }
  },
  legal: {
    title: "Centro Legal e Privacidade",
    subtitle: "Transparência no diagnóstico médico.",
    update: "Última atualização: 21 Janeiro 2026",
    tabs: { privacy: "Privacidade", terms: "Termos", cookie: "Cookies", dpa: "Processamento (DPA)" },
    content: {
      privacyTitle: "Política de Privacidade", privacySub: "Regulamento UE 2016/679 (GDPR)",
      termsTitle: "Termos e Condições", termsSub: "Regulamento de uso",
      cookieTitle: "Política de Cookies", cookieSub: "Transparência de rastreamento",
      dpaTitle: "Segurança e DPA", dpaSub: "Apêndice técnico",
      disclaimer: "ATENÇÃO - AVISO MÉDICO:",
      disclaimerText: "Histyon é suporte técnico e não substitui o julgamento médico. A IA deve ser validada.",
      privacy: {
        sec1: { title: "1. Responsável", body: "Histyon Team é responsável pelos dados da conta." },
        sec2: { title: "2. Dados Coletados", body: "Dados Profissionais e Dados de Saúde Pacientes (criptografados)." },
        sec3: { title: "3. Finalidade", body: "Serviço SaaS, Suporte Diagnóstico, Segurança." },
        sec4: { title: "4. Localização", body: "Dados no EEE (Espaço Econômico Europeu)." }
      },
      terms: {
        sec1: { title: "1. Requisitos", body: "Acesso reservado a médicos registrados." },
        sec2: { title: "2. Responsabilidade", body: "O Usuário garante ter consentimento informado." },
        sec3: { title: "3. Segurança", body: "Credenciais pessoais. Compartilhamento proibido." }
      },
      cookie: {
        sec1: { title: "1. O que são", body: "Pequenos arquivos de texto para melhorar experiência." },
        sec2: { title: "2. Técnicos", body: "Estritamente necessários (Sessão, Segurança)." },
        sec3: { title: "3. Sem Perfil", body: "Histyon NÃO usa cookies de perfil." }
      },
      dpa: {
        cards: { 
            crypto: { title: "Criptografia", body: "TLS 1.3 trânsito. AES-256 repouso." }, 
            access: { title: "Controle Acesso", body: "Políticas RLS estritas." } 
        },
        sec1: { title: "1. Processador", body: "Usuário nomeia Histyon como Processador (Art. 28 GDPR)." },
        sec2: { title: "2. Medidas Segurança", body: "Defesa em Profundidade: Auth, Isolamento, Backups." }
      }
    }
  },
  validation: {
    passwordLength: "Mínimo 8 caracteres",
    passwordComplexity: "Deve conter uma Maiúscula",
    passwordSpecial: "Deve conter caractere especial",
    passwordRegexMsg: "Use maiúscula, número e especial",
    passwordMismatch: "As senhas não coincidem",
    name: "Apenas letras", nameAllowed: "Apenas letras permitidas",
    fiscalCodeLen: "16 caracteres alfanuméricos", fiscalCodeFormat: "Formato inválido",
    emailInvalid: "E-mail inválido", phoneShort: "Número muito curto",
    required: "Obrigatório", genericError: "Erro inesperado.",
    alreadyRegistered: "Este e-mail já está registrado.",
    profileError: "Erro ao salvar perfil: ",
    patientExists: "Paciente já existe.",
    unauthorized: "Não autorizado",
    dbError: "Erro DB: ",
    uploadError: "Erro URL",
    cloudflareError: "Erro upload Cloudflare",
    networkError: "Erro de rede",
    fileNotFound: "Arquivo não encontrado.",
    fileRetrievalError: "Impossível recuperar arquivo",
    credentialsInvalid: "Credenciais inválidas",
    linkSent: "Link enviado com sucesso"
  }
}