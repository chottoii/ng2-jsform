export const ValidationTest = {
  'string_para': 'abcd',
  'number_para': '16',
  'searchKeyword': [
    {
      'keyword': 'suzuki'
    },
    {
      'keyword': 'tanaka'
    }
  ]
};

export const PatentSearchData = {
  'inputKind': '01',
  'applicationNumber': '',
  'documentNumber': '',
  'csv': null,
  'splitFlag': null,
  'reSearchFlag': null,
  'selectInput': [
    {
      'issue': 'jp',
      'docType': 'jp_doc01',
      'keyword': ''
    }
  ]
};

export const DesignSearchData = {
  'searchKeyword': [
    {
      'targetKind': '01',
      'keyword': '',
      'andOr': 'and'
    }
  ],
  'targetDesignBulletin': false,
  'targetUnsuccessfulPublication': false,
  'targetInternationalDesign': false,
  'targetKnownMaterial': false,
  'publicationPartial': false,
  'publicationAdditionalDesign': false,
  'publicationRelatedSearch': false,
  'knownPermittedImage': false,
  'designSearchDateKind': '01',
  'designSearchStartDate': '',
  'designSearchEndDate': ''
};

export const Data = {
  'basic': [
    {
      'targetKind': '01',
      'keyword': 'aaaaa',
      'andOr': 'and',
      'matchType': 'perfect'
    }
  ],
  'designBulletin': true,
  'i18nDesign': null,
  'designBulletinKind': '02',
  'generalPublication': null,
  'usPublication': null,
  'koreanPublication': null,
  'chinesePublication': null,
  'euroPublication': null,
  'woPublication': null,
  'patialDesign': null,
  'imageAddSearch': null,
  'relatedInquiries': '01',
  'filingDateFrom': '2017-09-02T15:00:00.000Z',
  'filingDateTo': '2017-09-06T15:00:00.000Z',
  'registrationDateFrom': '2017/02/10',
  'registrationDateTo': null
};

export const SimpleSearchData = {
  'keyword': '',
  'patentUtility': false,
  'design': false,
  'trademark': false,
  'autoRefine': false,
  'andOr': 'and'
};

export const DesignNumberDisplayData = {
  'targetPublication': false,
  'targetKnownDocument': false,
  'inputKind': '01',
  'csv': '',
  'selectInput': [
    {
      'docType': '01',
      'keyword': ''
    }
  ]
};

export const TabTest = {
  'string_para': '',
  'number_para': '16'
}
