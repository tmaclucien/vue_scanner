// const parser = require('./parsers/babel-parser')
const parser = require('./parsers/vue-eslint-parser')

const sourceDir = './src/views'
const outputFile = 'translation.json'

parser(sourceDir, outputFile)
