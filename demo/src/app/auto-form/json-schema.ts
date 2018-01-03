export const JsonSchema = {
// validation Test用 JSONSchema
'validationTest' : '\
title: validationTest\n\
type: object\n\
properties:\n\
  string_para:\n\
    type: string\n\
    minLength: 4\n\
    maxLength: 8\n\
    enum:\n\
      - abcd\n\
      - efgh\n\
  age:\n\
    type: number\n\
    minimum: 0\n\
    exclusiveMaximum: 999\n\
  email:\n\
    type: string\n\
    format: email\n\
  oneOfNumber:\n\
    type: number\n\
    oneOf:\n\
      - multipleOf: 5\n\
      - multipleOf: 3\n\
  anyOfNumber:\n\
    type: number\n\
    anyOf:\n\
      - multipleOf: 5\n\
      - multipleOf: 3\n\
  notNumber:\n\
    type: number\n\
    not:\n\
      - multipleOf: 5\n\
      - multipleOf: 3\n\
  allOfNumber:\n\
    type: number\n\
    allOf:\n\
      - multipleOf: 4\n\
      - maximum: 20\n\
      - minimum: 0\n\
  searchKeyword:\n\
    title: searchKeyword\n\
    type: array\n\
    minItems: 2\n\
    maxItems: 4\n\
    items:\n\
      type: object\n\
      properties:\n\
        keyword:\n\
          type: string\n\
      required:\n\
        - keyword\n\
required:\n\
  - string_para\n\
  - number_para\n\
',
// tab Test用 JSONSchema
'tabTest' : '\
title: validationTest\n\
type: object\n\
properties:\n\
  string_para:\n\
    type: string\n\
    minLength: 4\n\
    maxLength: 8\n\
  number_para:\n\
    type: number\n\
    multipleOf: 4\n\
    exclusiveMaximum: 20\n\
    minimum: 12\n\
    exclusiveMinimum: 12\n\
required:\n\
  - string_para\n\
  - number_para\n\
',
// design search用JSONSchema
'designSearch' : '\
title: design search\n\
type: object\n\
properties:\n\
  searchKeyword:\n\
    title: searchKeyword\n\
    type: array\n\
    items:\n\
      type: object\n\
      properties:\n\
        targetKind:\n\
          type: string\n\
        keyword:\n\
          type: string\n\
        andOr:\n\
          type: string\n\
      required:\n\
        - keyword\n\
  targetDesignBulletin:\n\
    type: boolean\n\
  targetUnsuccessfulPublication:\n\
    type: boolean\n\
  targetInternationalDesign:\n\
    type: boolean\n\
  targetKnownMaterial:\n\
    type: boolean\n\
  publicationPartial:\n\
    type: boolean\n\
  publicationAdditionalDesign:\n\
    type: boolean\n\
  publicationRelatedSearch:\n\
    type: boolean\n\
  knownPermittedImage:\n\
    type: boolean\n\
  designSearchDateKind:\n\
    type: string\n\
  designSearchStartDate:\n\
    type: string\n\
  designSearchEndDate:\n\
    type: string\n\
',
// patent search
'patentSearch' : '\
title: patent search\n\
type: object\n\
properties:\n\
  dd_patent:\n\
    type: boolean\n\
  dd_utilityModel:\n\
    type: boolean\n\
  dd_patentSpecification:\n\
    type: boolean\n\
  dd_utilityModelSpecification:\n\
    type: boolean\n\
  fc_america:\n\
    type: boolean\n\
  fc_EPO:\n\
    type: boolean\n\
  fc_WIPO:\n\
    type: boolean\n\
  fc_germany:\n\
    type: boolean\n\
  fc_switzerland:\n\
    type: boolean\n\
  fc_china:\n\
    type: boolean\n\
  fc_korea:\n\
    type: boolean\n\
  fc_england:\n\
    type: boolean\n\
  fc_france:\n\
    type: boolean\n\
  fc_canada:\n\
    type: boolean\n\
  non_publicTechnicalReport:\n\
    type: boolean\n\
  non_monograph:\n\
    type: boolean\n\
  non_manual:\n\
    type: boolean\n\
  non_domesticTechnicalJournal:\n\
    type: boolean\n\
  non_journal:\n\
    type: boolean\n\
  non_nonTechnicalJournal:\n\
    type: boolean\n\
  non_foreignAcademicPaper:\n\
    type: boolean\n\
  non_domesticAcademicPaper:\n\
    type: boolean\n\
  non_companyInformation:\n\
    type: boolean\n\
  non_proceedings:\n\
    type: boolean\n\
  jglobal_document:\n\
    type: boolean\n\
  jglobal_chemicalTechnicalJournal:\n\
    type: boolean\n\
  jglobal_chemicalSubstance:\n\
    type: boolean\n\
  jglobal_data:\n\
    type: boolean\n\
  textSearchTarget:\n\
    type: string\n\
  negativeKeywordsTarget:\n\
    type: string\n\
  negativeKeywords:\n\
    type: string\n\
  theme:\n\
    type: string\n\
  issueDateStart:\n\
    type: string\n\
  issueDateEnd:\n\
    type: string\n\
  etcDateKind:\n\
    type: string\n\
  etcDateStart:\n\
    type: string\n\
  etcDateEnd:\n\
    type: string\n\
  searchRegistrationOnly:\n\
    type: boolean\n\
  patentDisplaySpecification:\n\
    type: string\n\
  searchKeyword:\n\
    title: searchKeyword\n\
    type: array\n\
    items:\n\
      type: object\n\
      properties:\n\
        searchTarget:\n\
          type: string\n\
        keyword:\n\
          type: string\n\
',
// patent display number
'patentNumberDisplay' : '\
title: patent search\n\
type: object\n\
properties:\n\
  inputKind:\n\
    type: string\n\
  applicationNumber:\n\
    type: string\n\
  documentNumber:\n\
    type: string\n\
  csv:\n\
    type: string\n\
  splitFlag:\n\
    type: boolean\n\
  reSearchFlag:\n\
    type: boolean\n\
  selectInput:\n\
    title: selectInput\n\
    type: array\n\
    items:\n\
      type: object\n\
      properties:\n\
        issue:\n\
          type: string\n\
        docType:\n\
          type: string\n\
        keyword:\n\
          type: string\n\
',
// design number display
'designNumberDisplay' : '\
title: design number display\n\
type: object\n\
properties:\n\
  targetPublication: \n\
    type: boolean\n\
  targetKnownDocument: \n\
    type: boolean\n\
  inputKind:\n\
    type: string\n\
  csv:\n\
    type: string\n\
  selectInput:\n\
    title: selectInput\n\
    type: array\n\
    items:\n\
      type: object\n\
      properties:\n\
        docType:\n\
          type: string\n\
        keyword:\n\
          type: string\n\
',
// simple search用JSONSchema
'simpleSearch' : '\
title: design keyword search\n\
type: object\n\
properties:\n\
  keyword:\n\
    type: string\n\
  patentUtility:\n\
    type: boolean\n\
  design:\n\
    type: boolean\n\
  trademark:\n\
    type: boolean\n\
  autoRefine:\n\
    type: boolean\n\
  andOr:\n\
    type: string\n\
',
// design keyword search用JSONSchema
'designKeywordSearch' : '\
title: design keyword search\n\
type: object\n\
properties:\n\
  basic:\n\
    title: basic\n\
    type: array\n\
    items:\n\
      type: object\n\
      properties:\n\
        targetKind:\n\
          type: string\n\
        keyword:\n\
          type: string\n\
        andOr:\n\
          type: string\n\
        matchType:\n\
          type: string\n\
      required:\n\
        - keyword\n\
  designBulletin:\n\
    type: boolean\n\
  i18nDesign:\n\
    type: boolean\n\
  designBulletinKind:\n\
    type: string\n\
  generalPublication:\n\
    type: string\n\
  usPublication:\n\
    type: string\n\
  koreanPublication:\n\
    type: string\n\
  chinesePublication:\n\
    type: string\n\
  euroPublication:\n\
    type: string\n\
  woPublication:\n\
    type: string\n\
  patialDesign:\n\
    type: boolean\n\
  imageAddSearch:\n\
    type: boolean\n\
  relatedInquiries:\n\
    type: string\n\
  filingDateFrom:\n\
    type: string\n\
  filingDateTo:\n\
    type: string\n\
  registrationDateFrom:\n\
    type: string\n\
  registrationDateTo:\n\
    type: string\n\
',
// カスタマイズwidget用JSONSchema
 'sample1' : '\
title: カスタムWidget\n\
type: object\n\
properties:\n\
  name:\n\
    type: string\n\
    minLength: 4\n\
  phone_numbers:\n\
    type: array\n\
    items:\n\
      type: object\n\
      properties:\n\
        number:\n\
          type: string\n\
        type:\n\
          type: string\n\
          minLength: 4\n\
      required:\n\
        - number\n\
required:\n\
  - name\n\
',
// array
'array' : '\
type: object\n\
title: array sample\n\
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
',
// wrapper&multiple session用JSONSchema
  'sample2' : '\
title: wrapper&multiple session\n\
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
    type: object\n\
    items: \n\
      type: object\n\
      properties:\n\
        reading:\n\
          title: reading\n\
          type: boolean\n\
        sports:\n\
          title: sports\n\
          type: boolean\n\
        gardening:\n\
          title: gardening\n\
          type: boolean\n\
        watchingMovie:\n\
          title: watching movie\n\
          type: boolean\n\
        plasticModel:\n\
          title: plastic model\n\
          type: boolean\n\
        travel:\n\
          title: travel\n\
          type: boolean\n\
        handicraft:\n\
          title: handicraft\n\
          type: boolean\n\
        cooking:\n\
          title: cooking\n\
          type: boolean\n\
        watchingSports:\n\
          title: watching sports\n\
          type: boolean\n\
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
'
}
