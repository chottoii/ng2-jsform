export const allSelect = {
'schema': `
title: allSelect
type: object
properties:
  allLang:
    type boolean
  javascript:
    type: boolean
  ruby:
    type: boolean
  python:
    type: boolean
  php:
    type: boolean
`,
'layout': `
- type: checkbox
  notitle: true
  title: allLang
  key: allLang
  linkedItems:
  - javascript
  - ruby
  - python
  - php
- type: section
  direction: row
  items:
  - type: checkbox
    notitle: true
    key: javascript
    title: javascript
    flex: 1 1 auto
  - type: checkbox
    notitle: true
    key: ruby
    title: ruby
    flex: 1 1 auto
  - type: checkbox
    notitle: true
    key: python
    title: python
    flex: 1 1 auto
  - type: checkbox
    notitle: true
    key: php
    title: php
    flex: 1 1 auto
- type: section
  direction: row
  items:
  - type: button
    title: regist
    kind: submit
    color: primary
`,
'data': {
  'allLang': false,
  'javascript': false,
  'ruby': false,
  'python': false,
  'php': false
}
}
