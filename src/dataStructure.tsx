var dataStructure: any = [
  {
    branch: "start", // branch reference
    isDisplayed: true, // is the branch displayed
    title: "Part one", // Title to display
    components: [
      // Form elements
      {
        name: "firstName", // attribute name of the input
        question: "First Name", // Question title
        description: "What's your first name", // Question description
        inputType: "textField", // input type
        isBranch: false, // is the value linked to a name branch
        value: "", // value
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
        isBranch: false,
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
