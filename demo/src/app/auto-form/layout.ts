export const Layout = {
// validationTest
'validationTest' : '\
- type: section\n\
  direction: row\n\
  items: \n\
  - type: input\n\
    title: string_para\n\
    key: string_para\n\
    flex: 1 1 auto\n\
  - type: input\n\
    title: age\n\
    key: age\n\
    flex: 1 1 auto\n\
  - type: input\n\
    title: email\n\
    key: email\n\
    flex: 1 1 auto\n\
- type: section\n\
  direction: row\n\
  items: \n\
  - type: input\n\
    title: allOfNumber\n\
    key: allOfNumber\n\
    flex: 1 1 auto\n\
    hint: hintAllOfNumber\n\
    hintPosition: start\n\
  - type: input\n\
    title: oneOfNumber\n\
    key: oneOfNumber\n\
    flex: 1 1 auto\n\
    hint: hintOneOfNumber\n\
    hintPosition: start\n\
  - type: input\n\
    title: anyOfNumber\n\
    key: anyOfNumber\n\
    flex: 1 1 auto\n\
    hint: hintAnyOfNumber\n\
    hintPosition: start\n\
- type: section\n\
  direction: row\n\
  items: \n\
  - type: input\n\
    title: notNumber\n\
    key: notNumber\n\
    flex: 1 1 auto\n\
    hint: hintNotNumber\n\
    hintPosition: start\n\
- type: array\n\
  title: 検索キーワード\n\
  key: searchKeyword\n\
  direction: row\n\
  items: \n\
  - type: section\n\
    direction: row\n\
    items: \n\
    - type: icon\n\
      kind: add\n\
      icon: add_circle_outline\n\
      target: searchKeyword\n\
      flex: 1 1 auto\n\
    - type: icon\n\
      kind: remove\n\
      icon: remove_circle_outline\n\
      target: searchKeyword\n\
      flex: 1 1 auto\n\
    - type: input\n\
      key: keyword\n\
      title: type\n\
      hint: hint\n\
      hintPosition: end\n\
      flex: 8 8 auto\n\
- type: section\n\
  items: \n\
  - type: button\n\
    title: search\n\
    kind: submit\n\
    color: primary\n\
  - type: button\n\
    title: clear\n\
    kind: clear\n\
    color: basic\n\
',
// tabTest
'tabTest' : '\
- type: tabs\n\
  title: tabs\n\
  tabitems: \n\
  - title: tabs-title1\n\
    items:\n\
    - type: input\n\
      title: string_para\n\
      key: string_para\n\
    - type: button\n\
      title: popup\n\
      kind: popup\n\
      id: 6\n\
      color: primary\n\
      popupWidth: 250px\n\
      popupTitle: popup-title\n\
      popupNote: popup-note\n\
      popupSchema:\n\
        type: object\n\
        properties:\n\
          auxiliary:\n\
            type: string\n\
      popupitems: \n\
      - type: input\n\
        title: popup-title\n\
        key: auxiliary\n\
        targetKey: string_para\n\
        flex: 3 1 auto\n\
  - title: tabs-title2\n\
    items:\n\
    - type: input\n\
      title: number_para\n\
      key: number_para\n\
- type: section\n\
  items: \n\
  - type: button\n\
    title: search\n\
    kind: submit\n\
    id: 1\n\
    color: primary\n\
',
// design search
'designSearch' : '\
- type: wrapper\n\
  title: 検索条件\n\
  note: 対象の文献種別\n\
  open: false\n\
  openLabel: open\n\
  closeLabel: close\n\
  items: \n\
  - type: section\n\
    title: 公報\n\
    allSelect: 全て選択\n\
    allClear: 全て選択解除\n\
    direction: row\n\
    items: \n\
    - type: checkbox\n\
      notitle: none\n\
      key: targetDesignBulletin\n\
      title: targetDesignBulletin\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: targetUnsuccessfulPublication\n\
      title: targetUnsuccessfulPublication\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: targetInternationalDesign\n\
      title: targetInternationalDesign\n\
      flex: 1 1 20%\n\
  - type: section\n\
    title: 公知資料\n\
    allSelect: 全て選択\n\
    allClear: 全て選択解除\n\
    direction: row\n\
    items: \n\
    - type: checkbox\n\
      notitle: none\n\
      key: targetKnownMaterial\n\
      title: targetKnownMaterial\n\
      flex: 1 1 20%\n\
- type: array\n\
  key: searchKeyword\n\
  items: \n\
  - type: section\n\
    direction: row\n\
    title: 検索キーワード\n\
    items: \n\
    - type: icon\n\
      kind: add\n\
      icon: add_circle_outline\n\
      target: searchKeyword\n\
      flex: 1 1 auto\n\
    - type: icon\n\
      kind: remove\n\
      icon: remove_circle_outline\n\
      target: searchKeyword\n\
      flex: 1 1 auto\n\
    - type: select\n\
      master: designSearchTarget\n\
      key: targetKind\n\
      title: targetKind\n\
      hintTarget: keyword\n\
      flex: 3 1 auto\n\
    - type: input\n\
      key: keyword\n\
      title: keyword\n\
      hintMaster: designSearchTarget\n\
      hintKey: targetKind\n\
      hint: hint-message\n\
      flex: 16 1 auto\n\
    - type: toggle\n\
      key: andOr\n\
      title: andOr\n\
      master: andOr\n\
      flex: 3 1 auto\n\
- type: wrapper\n\
  title: 検索オプション\n\
  open: false\n\
  openLabel: open\n\
  closeLabel: close\n\
  items: \n\
  - type: section\n\
    title: 公報\n\
    note: note-1\n\
    allSelect: 全て選択\n\
    allClear: 全て選択解除\n\
    direction: row\n\
    items: \n\
    - type: checkbox\n\
      notitle: none\n\
      key: targetDesignBulletin\n\
      title: targetDesignBulletin\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: publicationPartial\n\
      title: publicationPartial\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: publicationAdditionalDesign\n\
      title: publicationAdditionalDesign\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: publicationRelatedSearch\n\
      title: publicationRelatedSearch\n\
      flex: 1 1 20%\n\
  - type: section\n\
    title: 公知資料\n\
    note: note-2\n\
    direction: row\n\
    items: \n\
    - type: checkbox\n\
      notitle: none\n\
      key: knownPermittedImage\n\
      title: knownPermittedImage\n\
      flex: 1 1 20%\n\
  - type: section\n\
    title: 日付指定\n\
    note: setion-note\n\
    direction: row\n\
    items: \n\
    - type: select\n\
      master: designSearchDateKind\n\
      key: designSearchDateKind\n\
      title: designSearchDateKind\n\
      flex: 1 1 auto\n\
    - type: input\n\
      key: designSearchStartDate\n\
      title: designSearchStartDate\n\
      suffix: ～\n\
      flex: 1 1 auto\n\
    - type: input\n\
      key: designSearchEndDate\n\
      title: designSearchEndDate\n\
      flex: 1 1 auto\n\
- type: section\n\
  direction: row\n\
  justifyContent: center\n\
  items: \n\
  - type: button\n\
    marginLeft: auto\n\
    title: search\n\
    kind: submit\n\
    id: 1\n\
    width: 120px\n\
    color: primary\n\
  - type: button\n\
    title: addItem\n\
    kind: addItem\n\
    target: basic\n\
    id: 2\n\
    width: 120px\n\
    color: accent\n\
  - type: button\n\
    marginLeft: auto\n\
    title: clear\n\
    kind: clear\n\
    id: 4\n\
    width: 120px\n\
    color: basic\n\
',
// patent search
'patentSearch' : '\
- type: wrapper\n\
  title: 検索対象\n\
  open: false\n\
  openLabel: open\n\
  closeLabel: close\n\
  items: \n\
  - type: section\n\
    title: 文献種別\n\
    allSelect: 全て選択\n\
    allClear: 全て選択解除\n\
    direction: row\n\
    items: \n\
    - type: checkbox\n\
      notitle: none\n\
      key: dd_patent\n\
      title: dd_patent\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: dd_utilityModel\n\
      title: dd_utilityModel\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: dd_patentSpecification\n\
      title: dd_patentSpecification\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: dd_utilityModelSpecification\n\
      title: dd_utilityModelSpecification\n\
      flex: 1 1 20%\n\
  - type: section\n\
    title: 外国文献\n\
    allSelect: 全て選択\n\
    allClear: 全て選択解除\n\
    direction: row\n\
    items: \n\
    - type: checkbox\n\
      notitle: none\n\
      key: fc_america\n\
      title: fc_america\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: fc_EPO\n\
      title: fc_EPO\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: fc_WIPO\n\
      title: fc_WIPO\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: fc_germany\n\
      title: fc_germany\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: fc_switzerland\n\
      title: fc_switzerland\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: fc_china\n\
      title: fc_china\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: fc_korea\n\
      title: fc_korea\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: fc_england\n\
      title: fc_england\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: fc_france\n\
      title: fc_france\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: fc_canada\n\
      title: fc_canada\n\
      flex: 1 1 20%\n\
  - type: section\n\
    title: 非特許文献\n\
    allSelect: 全て選択\n\
    allClear: 全て選択解除\n\
    direction: row\n\
    items: \n\
    - type: checkbox\n\
      notitle: none\n\
      key: non_publicTechnicalReport\n\
      title: non_publicTechnicalReport\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: non_monograph\n\
      title: non_monograph\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: non_manual\n\
      title: non_manual\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: non_domesticTechnicalJournal\n\
      title: non_domesticTechnicalJournal\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: non_journal\n\
      title: non_journal\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: non_nonTechnicalJournal\n\
      title: non_nonTechnicalJournal\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: non_foreignAcademicPaper\n\
      title: non_foreignAcademicPaper\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: non_domesticAcademicPaper\n\
      title: non_domesticAcademicPaper\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: non_companyInformation\n\
      title: non_companyInformation\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: non_proceedings\n\
      title: non_proceedings\n\
      flex: 1 1 20%\n\
  - type: section\n\
    title: J-GLOBAL\n\
    allSelect: 全て選択\n\
    allClear: 全て選択解除\n\
    direction: row\n\
    items: \n\
    - type: checkbox\n\
      notitle: none\n\
      key: jglobal_document\n\
      title: jglobal_document\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: jglobal_chemicalTechnicalJournal\n\
      title: jglobal_chemicalTechnicalJournal\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: jglobal_chemicalSubstance\n\
      title: jglobal_chemicalSubstance\n\
      flex: 1 1 20%\n\
    - type: checkbox\n\
      notitle: none\n\
      key: jglobal_data\n\
      title: jglobal_data\n\
      flex: 1 1 20%\n\
  - type: section\n\
    title: テキスト検索対象\n\
    direction: row\n\
    items: \n\
    - type: radio\n\
      itemDirection: row\n\
      master: textSearchTarget\n\
      key: textSearchTarget\n\
      title: textSearchTarget\n\
      color: primary\n\
      flex: 1 1 50%\n\
- type: array\n\
  title: 検索キーワード\n\
  key: searchKeyword\n\
  direction: row\n\
  items: \n\
  - type: section\n\
    direction: row\n\
    items: \n\
    - type: icon\n\
      kind: add\n\
      icon: add_circle_outline\n\
      target: searchKeyword\n\
      flex: 1 1 auto\n\
    - type: icon\n\
      kind: remove\n\
      icon: remove_circle_outline\n\
      target: searchKeyword\n\
      flex: 1 1 auto\n\
    - type: select\n\
      master: patentSearchTarget\n\
      key: searchTarget\n\
      title: searchTarget\n\
      flex: 4 4 auto\n\
    - type: input\n\
      key: keyword\n\
      title: type\n\
      hint: hint\n\
      hintPosition: end\n\
      flex: 8 8 auto\n\
- type: section\n\
  direction: row\n\
  title: 除外キーワード\n\
  note: section-note\n\
  items: \n\
  - type: select\n\
    master: patentSearchTarget\n\
    key: negativeKeywordsTarget\n\
    title: negativeKeywordsTarget\n\
    flex: 1 1 auto\n\
  - type: input\n\
    key: negativeKeywords\n\
    title: negativeKeywords\n\
    hint: hint\n\
    hintPosition: end\n\
    flex: 4 4 auto\n\
- type: wrapper\n\
  title: 検索オプション\n\
  open: true\n\
  openLabel: open\n\
  closeLabel: close\n\
  items: \n\
  - type: section\n\
    title: テーマ\n\
    note: setion-note\n\
    direction: row\n\
    items: \n\
    - type: input\n\
      key: theme\n\
      title: theme\n\
      flex: 1 1 auto\n\
  - type: section\n\
    title: 日付指定\n\
    note: setion-note\n\
    direction: row\n\
    items: \n\
    - type: input\n\
      key: issueDateStart\n\
      title: issueDateStart\n\
      flex: 1 1 auto\n\
    - type: input\n\
      key: issueDateEnd\n\
      title: issueDateEnd\n\
      flex: 1 1 auto\n\
  - type: section\n\
    title: 日付指定\n\
    note: setion-note\n\
    direction: row\n\
    items: \n\
    - type: select\n\
      master: etcDateKind\n\
      key: etcDateKind\n\
      title: etcDateKind\n\
      flex: 1 1 auto\n\
    - type: input\n\
      key: etcDateStart\n\
      title: etcDateStart\n\
      suffix: ～\n\
      flex: 1 1 auto\n\
    - type: input\n\
      key: etcDateEnd\n\
      title: etcDateEnd\n\
      flex: 1 1 auto\n\
  - type: section\n\
    title: 日付指定\n\
    note: setion-note\n\
    direction: row\n\
    items: \n\
    - type: select\n\
      master: etcDateKind\n\
      key: etcDateKind\n\
      title: etcDateKind\n\
      flex: 1 1 auto\n\
  - type: section\n\
    title: 特許登録案件検索\n\
    note: setion-note\n\
    direction: row\n\
    items: \n\
    - type: checkbox\n\
      notitle: none\n\
      key: searchRegistrationOnly\n\
      title: searchRegistrationOnly\n\
  - type: section\n\
    title: 表示指定\n\
    note: setion-note\n\
    direction: row\n\
    items: \n\
    - type: radio\n\
      master: patentDisplayKind\n\
      key: patentDisplaySpecification\n\
      flex: 1 1 auto\n\
- type: section\n\
  direction: row\n\
  items: \n\
  - type: button\n\
    title: search\n\
    kind: submit\n\
    id: 1\n\
    color: primary\n\
  - type: button\n\
    title: addItem\n\
    kind: addItem\n\
    target: searchKeyword\n\
    id: 2\n\
    color: accent\n\
',
// patent display number
'patentNumberDisplay' : '\
- type: radio\n\
  direction: column\n\
  itemDirection: column\n\
  labelPosition: start\n\
  labelFlex: 2 2 auto\n\
  itemFlex: 1 1 auto\n\
  title: title01\n\
  viewNote: true\n\
  color: primary\n\
  master: inputKind\n\
  title: inputKindTitle\n\
  key: inputKind\n\
  flex: 1 1 auto\n\
- type: wrapper\n\
  dispCondition: inputKind=01\n\
  items: \n\
  - type: array\n\
    key: selectInput\n\
    items: \n\
    - type: section\n\
      direction: row\n\
      items: \n\
      - type: icon\n\
        kind: add\n\
        icon: add_circle_outline\n\
        target: selectInput\n\
        flex: 1 1 auto\n\
      - type: icon\n\
        kind: remove\n\
        icon: remove_circle_outline\n\
        target: selectInput\n\
        flex: 1 1 auto\n\
      - type: select\n\
        master: issue\n\
        filterTarget: docType\n\
        filterMaster: docType\n\
        key: issue\n\
        title: issue\n\
        placeholder: issue\n\
        flex: 4 4 auto\n\
      - type: select\n\
        master: docType\n\
        filter: issue\n\
        key: docType\n\
        hintTarget: keyword\n\
        title: docType\n\
        placeholder: docType\n\
        flex: 4 4 auto\n\
      - type: input\n\
        key: keyword\n\
        title: type\n\
        hintMaster: docType\n\
        hintKey: issue\n\
        filter: issue\n\
        hint: hint\n\
        hintPosition: start\n\
        viewRemaining: true\n\
        maxLength: 5\n\
        flex: 8 8 auto\n\
- type: section\n\
  dispCondition: inputKind=02\n\
  direction: column\n\
  items: \n\
  - type: input\n\
    key: applicationNumber\n\
    title: applicationNumber\n\
    hint: hint\n\
    hintPosition: end\n\
    flex: 2 1 auto\n\
  - type: input\n\
    key: documentNumber\n\
    title: documentNumber\n\
    hint: hint\n\
    hintPosition: end\n\
    flex: 1 1 auto\n\
- type: section\n\
  dispCondition: inputKind=03\n\
  direction: column\n\
  items: \n\
  - type: file\n\
    key: csv\n\
    title: csv\n\
    previousLabel: previousLabel\n\
    postLabel: postLabel\n\
- type: section\n\
  direction: row\n\
  items: \n\
  - type: button\n\
    title: search\n\
    kind: submit\n\
    id: 1\n\
    color: primary\n\
  - type: button\n\
    dispCondition: inputKind=01\n\
    title: addItem\n\
    kind: addItem\n\
    target: selectInput\n\
    id: 2\n\
    color: accent\n\
',
// design number display
'designNumberDisplay' : '\
- type: section\n\
  direction: row\n\
  items: \n\
  - type: checkbox\n\
    notitle: none\n\
    key: targetPublication\n\
    title: targetPublication\n\
    flex: 1 1 20%\n\
  - type: checkbox\n\
    notitle: none\n\
    key: targetKnownDocument\n\
    title: targetKnownDocument\n\
    flex: 1 1 20%\n\
- type: radio\n\
  direction: column\n\
  itemDirection: column\n\
  labelPosition: start\n\
  labelFlex: 2 2 auto\n\
  itemFlex: 1 1 auto\n\
  title: title01\n\
  viewNote: true\n\
  color: primary\n\
  master: designNumberDisplayInputKind\n\
  title: inputKindTitle\n\
  key: inputKind\n\
  flex: 1 1 auto\n\
- type: wrapper\n\
  dispCondition: inputKind=01,targetPublication=true\n\
  items: \n\
  - type: array\n\
    key: selectInput\n\
    items: \n\
    - type: section\n\
      direction: row\n\
      items: \n\
      - type: icon\n\
        kind: add\n\
        icon: add_circle_outline\n\
        target: selectInput\n\
        flex: 1 1 auto\n\
      - type: icon\n\
        kind: remove\n\
        icon: remove_circle_outline\n\
        target: selectInput\n\
        flex: 1 1 auto\n\
      - type: select\n\
        master: designNumberDisplayInputTargetKind\n\
        key: docType\n\
        hintTarget: keyword\n\
        title: docType\n\
        flex: 2 1 auto\n\
        composite:\n\
          type: button\n\
          title: auxiliaryTitle\n\
          kind: popup\n\
          icon: view_list\n\
          flex: 1 1 auto\n\
          popupWidth: 300px\n\
          popupTitle: ■種別一覧\n\
          viewButton: false\n\
          popupSchema: \n\
            type: object\n\
            properties:\n\
              auxiliary:\n\
                type: string\n\
          popupitems:\n\
            - type: categorySelect\n\
              master: designNumberDisplayInputTargetKind\n\
              title: 補助入力項目\n\
              key: auxiliary\n\
              targetKey: docType\n\
              flex: 3 1 auto\n\
      - type: input\n\
        key: keyword\n\
        title: keyword\n\
        hintMaster: designNumberDisplayInputTargetKind\n\
        hintKey: docType\n\
        hint: hint\n\
        hintPosition: start\n\
        viewRemaining: true\n\
        maxLength: 200\n\
        flex: 16 1 auto\n\
      - type: button\n\
        title: auxiliaryTitle\n\
        kind: popup\n\
        icon: more\n\
        flex: 1 1 auto\n\
        popupWidth: 300px\n\
        popupTitle: ■種別一覧\n\
        viewButton: false\n\
        popupSchema: \n\
          type: object\n\
          properties:\n\
            auxiliary:\n\
              type: string\n\
        popupitems:\n\
          - type: categorySelect\n\
            master: designNumberDisplayInputTargetKind\n\
            title: 補助入力項目\n\
            key: auxiliary\n\
            targetKey: keyword\n\
            flex: 3 1 auto\n\
- type: section\n\
  dispCondition: inputKind=02\n\
  direction: column\n\
  items: \n\
  - type: file\n\
    key: csv\n\
    title: csv\n\
    previousLabel: previousLabel\n\
    postLabel: postLabel\n\
- type: section\n\
  direction: row\n\
  items: \n\
  - type: button\n\
    title: search\n\
    kind: submit\n\
    id: 1\n\
    color: primary\n\
  - type: button\n\
    dispCondition: inputKind=01\n\
    title: addItem\n\
    kind: addItem\n\
    target: selectInput\n\
    id: 2\n\
    color: accent\n\
',
// simpleSearch
'simpleSearch' : '\
- type: section\n\
  direction: row\n\
  items: \n\
  - type: checkbox\n\
    notitle: none\n\
    key: patentUtility\n\
    title: patentUtility\n\
  - type: checkbox\n\
    notitle: none\n\
    key: design\n\
    title: design\n\
  - type: checkbox\n\
    notitle: none\n\
    key: trademark\n\
    title: trademark\n\
- type: section\n\
  direction: row\n\
  items: \n\
  - type: checkbox\n\
    notitle: none\n\
    key: autoRefine\n\
    title: autoRefine\n\
- type: section\n\
  direction: row\n\
  items: \n\
  - type: input\n\
    notitle: keyword\n\
    key: keyword\n\
    title: keyword\n\
    width: 320px\n\
  - type: toggle\n\
    key: andOr\n\
    title: andOr\n\
    master: andOr\n\
    width: 60px\n\
  - type: button\n\
    title: search\n\
    kind: submit\n\
    id: 1\n\
    width: 120px\n\
    color: primary\n\
',
// design keyword search
'designKeywordSearch' : '\
- type: array\n\
  key: basic\n\
  items: \n\
  - type: section\n\
    direction: row\n\
    title: section-title\n\
    viewDimension: true\n\
    items: \n\
    - type: icon\n\
      kind: close\n\
      target: basic\n\
    - type: select\n\
      master: designSearchTarget\n\
      key: targetKind\n\
      title: targetKind\n\
      placeholder: targetKind\n\
      width: 200px\n\
    - type: input\n\
      key: keyword\n\
      title: keyword\n\
      placeholder: keyword\n\
      hint: hint-message\n\
      width: 400px\n\
    - type: toggle\n\
      key: andOr\n\
      title: andOr\n\
      master: andOr\n\
      width: 60px\n\
    - type: toggle\n\
      key: matchType\n\
      title: matchType\n\
      master: matchType\n\
      width: 80px\n\
- type: wrapper\n\
  title: wrapper-title\n\
  open: true\n\
  openLabel: open\n\
  closeLabel: close\n\
  note: section-note\n\
  items: \n\
  - type: section\n\
    title: section-title\n\
    note: section-note\n\
    allSelect: all-select\n\
    allClear: all-clear\n\
    direction: column\n\
    items: \n\
    - type: section\n\
      direction: row\n\
      items: \n\
      - type: checkbox\n\
        notitle: designBulletin\n\
        key: designBulletin\n\
        title: designBulletin\n\
      - type: checkbox\n\
        key: i18nDesign\n\
        title: i18nDesign\n\
    - type: section\n\
      direction: row\n\
      items: \n\
      - type: radio\n\
        master: designKind\n\
        notitle: designBulletinKind\n\
        key: designBulletinKind\n\
        title: designBulletinKind\n\
    - type: section\n\
      direction: row\n\
      items: \n\
      - type: checkbox\n\
        notitle: generalPublication\n\
        key: generalPublication\n\
        title: designBulletin\n\
      - type: checkbox\n\
        key: usPublication\n\
        title: usPublication\n\
      - type: checkbox\n\
        key: koreanPublication\n\
        title: koreanPublication\n\
      - type: checkbox\n\
        key: chinesePublication\n\
        title: chinesePublication\n\
      - type: checkbox\n\
        key: euroPublication\n\
        title: euroPublication\n\
      - type: checkbox\n\
        key: woPublication\n\
        title: woPublication\n\
  - type: section\n\
    title: section-title\n\
    titleClass: title-class\n\
    note: section-note\n\
    noteClass: note-class\n\
    direction: column\n\
    items: \n\
    - type: section\n\
      direction: row\n\
      items: \n\
      - type: checkbox\n\
        notitle: patialDesign\n\
        key: patialDesign\n\
        title: patialDesign\n\
      - type: checkbox\n\
        key: imageAddSearch\n\
        title: imageAddSearch\n\
    - type: section\n\
      direction: row\n\
      items: \n\
      - type: radio\n\
        master: designRelated\n\
        notitle: relatedInquiries\n\
        key: relatedInquiries\n\
        title: relatedInquiries\n\
    - type: section\n\
      direction: row\n\
      items: \n\
      - type: date\n\
        key: filingDateFrom\n\
        title: filingDateFrom\n\
        previousLabel: previousLabel\n\
        afterLabel: afterLabel\n\
        format: YYYYMMDD\n\
        maxTarget: filingDateTo\n\
      - type: date\n\
        key: filingDateTo\n\
        title: filingDateTo\n\
        format: YYYYMMDD\n\
        minTarget: filingDateFrom\n\
    - type: section\n\
      direction: row\n\
      items: \n\
      - type: date\n\
        key: registrationDateFrom\n\
        title: registrationDateFrom\n\
        previousLabel: previousLabel\n\
        afterLabel: afterLabel\n\
        format: YYYYMMDD\n\
        maxTarget: registrationDateTo\n\
      - type: date\n\
        key: registrationDateTo\n\
        title: registrationDateTo\n\
        format: YYYYMMDD\n\
        minTarget: registrationDateFrom\n\
- type: section\n\
  direction: row\n\
  justifyContent: center\n\
  items: \n\
  - type: button\n\
    marginLeft: auto\n\
    title: search\n\
    kind: submit\n\
    id: 1\n\
    width: 120px\n\
    color: primary\n\
  - type: button\n\
    title: addItem\n\
    kind: addItem\n\
    target: basic\n\
    id: 2\n\
    width: 120px\n\
    color: accent\n\
  - type: button\n\
    title: tenkai\n\
    kind: tenkai\n\
    id: 3\n\
    width: 120px\n\
    color: basic\n\
  - type: button\n\
    marginLeft: auto\n\
    title: clear\n\
    kind: clear\n\
    id: 4\n\
    width: 120px\n\
    color: basic\n\
',
// array
'array' : '\
- type: wrapper\n\
  title: wrapper-title\n\
  note: wrapper-note\n\
  open: true\n\
  openLabel: open\n\
  closeLabel: close\n\
  note: section-note\n\
  items: \n\
  - type: array\n\
    key: phone_numbers\n\
    add: add-button\n\
    title: array-title\n\
    addIcon: add_circle\n\
    removeIcon: remove_circle\n\
    items: \n\
    - type: section\n\
      title: section-title\n\
      note: section-note\n\
      allSelect: allSelect\n\
      allClear: allClear\n\
      open: true\n\
      openLabel: open\n\
      closeLabel: close\n\
      direction: row\n\
      items: \n\
      - type: icon\n\
        kind: add\n\
        icon: add_circle_outline\n\
        target: phone_numbers\n\
      - type: icon\n\
        kind: remove\n\
        icon: remove_circle_outline\n\
        target: phone_numbers\n\
      - type: input\n\
        key: type\n\
        title: type\n\
        hint: hint\n\
        hintPosition: end\n\
        width: 150px\n\
      - type: input\n\
        key: number\n\
        title: number\n\
        width: 200px\n\
        maxLength: 5\n\
        previousLabel: previousLabel\n\
        postLabel: postLabel\n\
        viewRemaining: true\n\
        remainingLabel: remainingLabel\n\
        prefix: prefix\n\
        suffix: suffix\n\
- type: section\n\
  direction: row\n\
  items: \n\
  - type: button\n\
    title: regist\n\
    kind: submit\n\
    id: 1\n\
    width: 120px\n\
    color: primary\n\
  - type: button\n\
    title: addItem\n\
    kind: addItem\n\
    target: phone_numbers\n\
    id: 2\n\
    width: 120px\n\
    color: accent\n\
',
// sample
  'sample1' : '\
- type: input\n\
  key: name\n\
  title: name\n\
  placeholder: name\n\
  hint: name-hint\n\
  width: 300px\n\
- type: test\n\
  wrapStyle:\n\
    - min-width: 270px\n\
    - max-width: 800px\n\
    - width: 95%\n\
  itemStyle:\n\
    - width: 95%\n\
- type: widget1\n\
  key: phone_numbers\n\
  title: phoneNumbers\n\
  direction: row\n\
  add: Add Phone Numbers +\n\
  items: \n\
  - type: input\n\
    key: type\n\
    title: type\n\
    placeholder: type\n\
    width: 100px\n\
  - type: input\n\
    key: number\n\
    title: number\n\
    placeholder: number\n\
    width: 200px\n\
- type: section\n\
  title: section-title\n\
  titleClass: title-class\n\
  openLabel: open\n\
  closeLabel: close\n\
  note: section-note\n\
  noteClass: note-class\n\
  direction: row\n\
  items: \n\
  - type: button\n\
    title: regist\n\
    kind: submit\n\
    id: 1\n\
    width: 120px\n\
    color: primary\n\
  - type: button\n\
    title: addItem\n\
    kind: addItem\n\
    target: phone_numbers\n\
    id: 2\n\
    width: 120px\n\
    color: accent\n\
',
  'wrapper' : '\
- type: input\n\
  key: name\n\
  title: name\n\
  placeholder: name\n\
  hint: name-hint\n\
  width: 300px\n\
- type: wrapper\n\
  title: wrapper-title\n\
  note: wrapper-note\n\
  open: true\n\
  openLabel: open\n\
  closeLabel: close\n\
  note: section-note\n\
  items: \n\
  - type: widget1\n\
    key: phone_numbers\n\
    title: phoneNumbers\n\
    direction: row\n\
    add: Add Phone Numbers +\n\
    items: \n\
    - type: input\n\
      key: type\n\
      title: type\n\
      placeholder: type\n\
      width: 100px\n\
    - type: input\n\
      key: number\n\
      title: number\n\
      placeholder: number\n\
      width: 200px\n\
- type: section\n\
  direction: row\n\
  items: \n\
  - type: button\n\
    title: regist\n\
    kind: submit\n\
    id: 1\n\
    width: 120px\n\
    color: primary\n\
  - type: button\n\
    title: addItem\n\
    kind: addItem\n\
    target: phone_numbers\n\
    id: 2\n\
    width: 120px\n\
    color: accent\n\
',
  'sections' : '\
- type: wrapper\n\
  title: wrapper-title\n\
  note: wrapper-note\n\
  open: true\n\
  openLabel: open\n\
  closeLabel: close\n\
  note: section-note\n\
  items: \n\
  - type: section\n\
    direction: row\n\
    items: \n\
    - type: input\n\
      key: name\n\
      title: name\n\
      placeholder: name\n\
      hint: name-hint\n\
      width: 300px\n\
    - type: input\n\
      key: email\n\
      title: email\n\
      placeholder: email\n\
    - type: radio\n\
      key: gender\n\
      title: gender\n\
      width: auto\n\
      labelPosition: start\n\
      direction: column\n\
      labelWidth: 100px\n\
      buttonColor: primary\n\
      itemDirection: row\n\
      master: gender\n\
      itemWidth: 100px\n\
    - type: select\n\
      key: gender\n\
      title: gender\n\
      width: auto\n\
      labelPosition: start\n\
      direction: row\n\
      buttonColor: primary\n\
      itemDirection: row\n\
      master: gender\n\
  - type: section\n\
    direction: row\n\
    items: \n\
    - type: checkbox\n\
      notitle: none\n\
      key: married\n\
      title: married\n\
      width: 200px\n\
    - type: section\n\
      key: hoby\n\
      title: hoby\n\
      direction: row\n\
      items: \n\
      - type: checkbox\n\
        key: reading\n\
        title: reading\n\
        width: 200px\n\
      - type: checkbox\n\
        key: sports\n\
        title: sports\n\
        width: 200px\n\
- type: section\n\
  direction: row\n\
  items: \n\
  - type: button\n\
    title: regist\n\
    kind: submit\n\
    id: 1\n\
    width: 120px\n\
    color: primary\n\
',
};
