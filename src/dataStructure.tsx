var dataStructure: any = [
  {
    branch: "presentation", // branch reference
    isDisplayed: true, // is the branch displayed
    title: "Presentation", // Title to display
    components: [
      // Form elements
      {
        name: "nom", // attribute name of the input
        question: "Nom *", // Question title
        description: "Quel est votre nom ?", // Question description
        inputType: "textField", // input type
        isBranch: false, // is the value linked to a name branch
        value: "", // value
      },
      {
        name: "prenom",
        question: "Prenom *",
        description: "Quel est votre prenom",
        inputType: "textField",
        isBranch: false,
        value: "",
      },
      {
        name: "intitule",
        question: "Intitulé de votre poste *",
        description: "Quel est l'intitulé de votre poste ?",
        inputType: "radio",
        radio: ["french", "english"],
        isBranch: true,
        value: [false, true],
      },
      {
        name: "role",
        question: "Rôle *",
        description: "Quel est votre rôle dans le projet ?",
        inputType: "select",
        select: [
          "Inventeur",
          "Directeur Generale",
          "Salarie CTO",
          "Chef de projet",
          "Conseiller technique",
        ],
        isBranch: true,
        value: "Directeur Generale",
      },
      {
        name: "entreprise",
        question: "Votre entreprise *",
        description: "Votre entreprise existe t-elle déja ?",
        inputType: "radio",
        radio: ["oui", "non"],
        isBranch: true,
        value: [false, true],
      },
    ],
  },
  {
    branch: "oui",
    isDisplayed: false,
    title: "Votre entreprise",
    components: [
      {
        name: "nomEntreprise",
        question: "Nom de votre entreprise *",
        description: "Quel est le nom de votre entreprise ?",
        inputType: "textField",
        isBranch: false,
        value: "",
      },
      {
        name: "webSite",
        question: "Site web *",
        description: "Quel est le site web de votre entreprise ?",
        inputType: "textField",
        isBranch: false,
        value: "",
      },
      {
        name: "nomEntreprise",
        question: "Nom de votre entreprise *",
        description: "Quel est le nom de votre entreprise ?",
        inputType: "textField",
        isBranch: false,
        value: [true, false],
      },
      {
        name: "numeroEnregistrement",
        question: "Numéro d'enregistrement *",
        description:
          "Quel est le numéro d'enregistrement (SIREN, ...) de votre entreprise ?",
        inputType: "textField",
        isBranch: false,
        value: "",
      },
      {
        name: "creationDate",
        question: "Année de création *",
        description: "Quel est l'année de création de votre entreprise ?",
        inputType: "textField",
        isBranch: false,
        value: "",
      },
      {
        name: "employesNombre",
        question: "Nombre d'employés *",
        description: "Quel est le nombre d'employés de votre entreprise ?",
        inputType: "select",
        select: [
          "Moins de 10",
          "Moins de 30",
          "Moins de 50",
          "Moins de 100",
          "Moins de 200",
          "Moins de 500",
          "Moins de 1000",
          "Plus de 1000",
        ],
        isBranch: false,
        value: "",
      },
    ],
  },
  {
    branch: "projet",
    isDisplayed: true,
    title: "Projet",
    components: [
      {
        name: "projetNom",
        question: "Nom du projet *",
        description: "Quel est le nom du projet",
        inputType: "textField",
        isBranch: false,
        value: "",
      },
      {
        name: "projetDescription",
        question: "Votre projet *",
        description: "Décrivez votre projet *",
        inputType: "textArea",
        isBranch: false,
        value: "",
      },
      {
        name: "projetDoc",
        question: "Document",
        description:
          "Avez-vous un fichier contenant une description complète ? *",
        inputType: "radio",
        radio: ["yes", "no"],
        isBranch: false,
        value: [false, true],
      },
      {
        name: "nda",
        question: "Accord NDA",
        description: "Avez vous besoin d'un accord de confidentialité (NDA) ?",
        inputType: "radio",
        radio: ["ya", "nine"],
        isBranch: false,
        value: [false, true],
      },
      {
        name: "services",
        question: "Services Altyor *",
        description: "Quels services proposés par Altyor vous intéressent ?",
        inputType: "multiChoice",
        multiChoice: [
          "Réflexion stratégique",
          "Rédaction de cahier des charges",
          "Etude de faisabilité/architecture",
          "Design/conception produit",
          "Etude mécanique",
          "Etude électronique",
          "Prototypage",
          "Industrialisation + Production",
          "Certification",
        ],
        isBranch: false,
        value: [false, true],
      },
    ],
  },

  {
    branch: "french",
    isDisplayed: false,
    title: "French",
    components: [
      {
        name: "favoriteAuthor",
        question: "Auteur préféré",
        description: "Indiquez quel est votre auteur préféré",
        inputType: "multiChoice",
        multiChoice: ["Hugo", "Voltaire"],
        isBranch: true,
        value: [true, true],
      },
    ],
  },
  {
    branch: "english",
    isDisplayed: false,
    title: "English",
    components: [
      {
        name: "favoriteAuthor",
        question: "Favorite autor",
        description: "Enter your favorite autor",
        inputType: "multiChoice",
        multiChoice: ["Shakespeare", "Orwell"],
        isBranch: false,
        value: [false, true],
      },
    ],
  },
  {
    branch: "Voltaire",
    isDisplayed: false,
    title: "Voltaire",
    components: [
      {
        name: "voltaireQuestion",
        question: "Connaissez vous voltaire",
        description: "Quel est le prénom de voltaire",
        inputType: "multiChoice",
        multiChoice: ["François-Marie Arouet", "Christian"],
        isBranch: false,
        value: [true, false],
      },
    ],
  },
  {
    branch: "end",
    isDisplayed: true,
    title: "Last questions",
    components: [
      {
        name: "comment",
        question: "Comment",
        description: "Have you some comment to do",
        inputType: "textField",
        isBranch: false,
        value: "",
      },
      {
        name: "validation",
        question: "Validation",
        description: "Copie this number and valid : 59422479",
        inputType: "textField",
        isBranch: false,
        value: "",
      },
    ],
  },
];

export default dataStructure;
