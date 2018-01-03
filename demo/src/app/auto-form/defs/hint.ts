export const hint = {
'schema': `
title: hint
type: object
properties:
  qualificationType:
    type: string
  qualification:
    type: string
    pattern: ^#[A-Fa-f0-9]{6}$
`,
'layout': `
- type: section
  direction: row
  items:
  - type: select
    key: qualificationType
    title: qualificationType
    master: qualification
    flex: 1 1 auto
    hintTarget: qualification
  - type: input
    key: qualification
    title: qualification
    flex: 10 1 auto
    hintMaster: qualification
    hintKey: qualificationType
    hint: ''
    hintPosition: start
- type: section
  direction: row
  items:
  - type: button
    title: regist
    kind: submit
    color: primary
`,
'data': {
  'qualificationType': '01',
  'qualification': ''
  }
}
