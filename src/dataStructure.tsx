var dataStructure: any = [
  {
    branchName: "start",
    isDisplayed: true,
    sectionName: "Part one",
    formStructure: [
      {
        name: "firstName",
        question: "First Name",
        description: "What's your first name",
        inputType: "textField",
        isBranch: false,
        value: "",
      },
      {
        name: "lastName",
        question: "Last Name",
        description: "What's your last name",
        inputType: "textField",
        isBranch: false,
        value: "",
      },
      {
        name: "nationality",
        question: "nationality",
        description: "What's your nationality",
        inputType: "radio",
        radio: ["french", "english"],
        isBranch: true,
        value: [false, true],
      },
    ],
    next: "end",
  },
  {
    branchName: "french",
    isDisplayed: false,
    sectionName: "French",
    formStructure: [
      {
        name: "favoriteAuthor",
        question: "Auteur préféré",
        description: "Indiquez quel est votre auteur préféré",
        inputType: "multiChoice",
        multiChoice: ["Hugo", "Voltaire"],
        isBranch: false,
        value: [true, true],
      },
    ],
    next: null,
  },
  {
    branchName: "english",
    isDisplayed: false,
    sectionName: "English",
    formStructure: [
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
    next: null,
  },
  {
    branchName: "end",
    isDisplayed: true,
    sectionName: "Last questions",
    formStructure: [
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
    next: null,
  },
];

export default dataStructure;
