formString   = '\
- type: input\n\
  key: name\n\
  title: Name\n\
  placeholder: Name\n\
  hint: name-hint\n\
- type: input\n\
  key: email\n\
  title: Email\n\
  placeholder: Email\n\
- type: select\n\
  key: gender\n\
  title: Gender\n\
  master: gender\n\
  width: 20%\n\
- type: checkbox\n\
  key: married\n\
  title: Married\n\
  width: 20%\n\
- type: section\n\
  items: \n\
  - type: checkbox\n\
    key: hoby\n\
    title: hoby\n\
    width: 20%\n\
- type: section\n\
  items: \n\
    - type: input\n\
      key: city\n\
      title: City\n\
      placeholder: City\n\
      flex: 3 3 150px\n\
    - type: input\n\
      key: state\n\
      title: State\n\
      placeholder: State\n\
      flex: 1 1 50px\n\
    - type: input\n\
      key: postalCode\n\
      title: Postal Code\n\
      placeholder: Postal Code\n\
      flex: 2 2 100px\n\
';

  // JSON Schema
  ymlString   = '\
type: object\n\
title: Comment\n\
properties:\n\
  name:\n\
    title: Name\n\
    type: string\n\
    minLength: 4\n\
  email:\n\
    title: Email\n\
    type: string\n\
    pattern: "^\\S+@\\S+$"\n\
    description: email-description\n\
  gender:\n\
    title: Gender\n\
    type: string\n\
    enum: \n\
      - male\n\
      - female\n\
  married:\n\
    title: Married\n\
    type: boolean\n\
  hoby:\n\
    type: array\n\
    items: \n\
      type: string\n\
      enum: \n\
      - reading\n\
      - sports\n\
      - gardening\n\
      - watching movie\n\
      - plastic model\n\
      - travel\n\
      - handicraft\n\
      - cooking\n\
      - watching sports\n\
  city:\n\
    title: City\n\
    type: string\n\
  state:\n\
    title: State\n\
    type: string\n\
  postalCode:\n\
    title: Postal Code\n\
    type: string\n\
  comment:\n\
    title: Comment\n\
    type: string\n\
    maxLength: 20\n\
    validationMessage: \"Don\'t be greedy!\"\n\
  comment2:\n\
    title: Comment2\n\
    type: string\n\
    maxLength: 20\n\
    validationMessage: \"Don\'t be greedy!\"\n\
required:\n\
  - name\n\
';