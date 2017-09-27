const Dictionary = require('./lib/dictionary')
const Mustache = require('mustache')

const word = process.argv[2]
const dict = new Dictionary()
const definitionsTemplate =
`<ol>
  {{#definitions}}
  <li>
    <span><small>({{partOfSpeech}})</small> {{definition}}</span>
    {{#synonyms.length}}
    <ol>
      {{#synonyms}}
      <li>{{.}}</li>
      {{/synonyms}}
    </ol>
    {{/synonyms.length}}
    {{#examples.length}}
    <ul>
      {{#examples}}
      <li>{{.}}</li>
      {{/examples}}
    </ul>
    {{/examples.length}}
  </li>
  {{/definitions}}
</ol>`

dict.define(word).then(definitions => {
  console.log(Mustache.render(definitionsTemplate, {definitions}))
})
