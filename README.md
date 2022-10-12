# DataStructure explained

To create your own personnal form you have to create your own personnal data structure. \
\
The data structure is located in src/dataStructure.tsx file. \
\
Let's look line by line how it is construct.\
\
The server endpoint where the json response of the form will be send\

```javascript
endPoint: "http://dnsdatacheck.pueym9p8fgvu05gp.b.requestbin.net";
```

Header necessry for the server end point to handle the request (token, bearer auth etc)

```javascript
  header: {},
```

List of form element like text area, input text, radio, check box etc

```javascript
form: [];
```

In the form array, we will insert element that we can call "branch" or "page". Our form in custitued from a series of page. Every page have a "next" button, expect the last one who have a "send" button".\
Branch look like :

```javascript
    {
      branch: "presentation", // branch reference (like a variable code. No space, No accent or special char)
      isDisplayed: true, // is the branch displayed
      title: "Presentation", // The title to display on the top of the page
      components: [] // a list of form element like text area, input text, input file etc
    }
```

# Json component explained

Textfield :

```javascript
        {
          name: "nom", // attribute name of the input
          question: "Nom *", // Question title. If finish with "*", the field is required
          description: "Quel est votre nom ?", // Question description
          inputType: "textField", // input type
          isBranch: false, // is the value linked to a branch name
          value: "", // value
        },
```

Select :

```javascript
        {
          name: "role", // attribute name of the input
          question: "Rôle *", // Question title. If finish with "*", the field is required
          description: "Quel est votre rôle dans le projet ?", // Question description
          inputType: "select", // input type
          select: [ // list of possible value
            "Inventeur",
            "Directeur Generale",
            "Salarie CTO",
            "Chef de projet",
            "Conseiller technique",
          ],
          value: "Directeur Generale", // value (to avoid bug, this field is required and should be listed in the select array)
          isBranch: false, // is the value linked to a branch name
        },
```

Radio :

```javascript
        {
          name: "entreprise", // attribute name of the input
          question: "Votre entreprise *", // Question title. If finish with "*", the field is required
          description: "Votre entreprise existe t-elle déja ?", // Question description
          inputType: "radio", // input type
          radio: ["oui", "non"], // possible value
          value: "", // value can be an empty string or a string listed in the radio array
          isBranch: true, // is the value linked to a branch name
          branchRef: ["isEntreprise", "isNotEntreprise"], // list of value that branchRefValue can take.
          branchRefValue: "", // If isBranch is true then branches who have the name referenced in branchRefValue will be displayed ; there "isDisplayed" value will be set on true.
        },
```

TextArea :

```javascript
        {
          name: "projetDescription", // attribute name of the input
          question: "Votre projet *", // Question title. If finish with "*", the field is required
          description: "Décrivez votre projet *", // Question description
          inputType: "textArea", // input type
          isBranch: false, // is the value linked to a branch name
          value: "", // value of the textfield
        },
```

FilePicker :

```javascript
        {
          name: "projetDoc", // attribute name of the input
          question: "Document", // Question title. If finish with "*", the field is required
          description:  // Question description
            "Avez-vous un fichier contenant une description complète ?",
          inputType: "filePicker", // input type
          isBranch: false, // is the value linked to a name branch
          value: [], // value
        },
```

Multichoice :

```javascript
        {
          name: "services",  // attribute name of the input
          question: "Services Altyor *", // Question title. If finish with "*", the field is required. If finish with "*", the field is required
          description: "Quels services proposés par Altyor vous intéressent ?", // Question description
          inputType: "multiChoice", // input type
          multiChoice: [ // list of possible choice. Array of string only
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
          value: [ // is the choice checked or not (by index ; exemple, if the third boolean element is true, the third choice of multichoice list is checked). Value array should have the same size as multiChoice array. Value array is an array of bolean only.
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
          isBranch: true, // is some branches linked to the value of branchRefValue
          branchRef: [ // list of possible branchRef value linked to multiChoice value by index (ex : if value[2] is true, branRef[2] is targeted)
            "reflexionStrategique",
            "redactionDeCahierDesCharges",
            "detail",
            "detail",
            "detail",
            "detail",
            "detail",
            "detail",
            "detail",
          ],
          branchRefValue: [], // list of branch by name who have to be displayed. if value[2] is true, branRef[2] is listed)
        },
```
