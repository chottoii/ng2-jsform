formString   = '\
- type: input\n\
  key: name\n\
  title: Name\n\
  placeholder: Name\n\
  hint: name-hint\n\
- type: array\n\
  key: phone_numbers\n\
  title: Phone Numbers\n\
  add: Add Phone Numbers +\n\
  items: \n\
  - type: input\n\
    key: type\n\
    title: Type\n\
    placeholder: Type\n\
    flex: 3 3 150px\n\
  - type: input\n\
    key: number\n\
    title: Number\n\
    placeholder: Number\n\
    flex: 1 1 50px\n\
';

  // JSON Schema
  ymlString   = '\
type: object\n\
properties:\n\
  name:\n\
    type: string\n\
  phone_numbers:\n\
    type: array\n\
    items:\n\
      type: object\n\
      properties:\n\
        number:\n\
          type: string\n\
        type:\n\
          type: string\n\
          enum:\n\
            - cell\n\
            - home\n\
            - work\n\
      required:\n\
        - number\n\
';
