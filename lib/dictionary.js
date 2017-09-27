module.exports = class Dictionary {

  constructor() {
    const WordNet = require('node-wordnet')

    this.wordnet = new WordNet(require('wordnet-db').path)
    this.partsOfSpeech = {
      n: 'noun',
      v: 'verb',
      a: 'adjective',
      s: 'adjective', // adjective satellite
      r: 'adverb'
    }
  }

  async define(word) {
    const results = await this.wordnet.lookupAsync(word)

    // results come back in reverse order compared to wordnet command line
    results.reverse()

    return results.map(result => {
      return {
        partOfSpeech: this.partsOfSpeech[result.pos],
        definition: result.def.trim(),
        synonyms: result.synonyms.filter(synonym => synonym != word),
        examples: result.exp
      }
    })
  }

}
