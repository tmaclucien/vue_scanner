// 基于eslint的vue解析器，专门用于处理vue文件 

const fs = require('fs-extra')
const parser = require('vue-eslint-parser') 
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const {traverseDir, fileReader} = require('../utils/scanner')

function scanVueFiles(sourceDir, outputFile) {
  const translations = {}
  // 从文件中抽取
  const extractTranslationsFromFile = (filePath) => {
    const fileContent = fileReader(filePath) // 读取vue文件内容
    const ast = parser.parse(fileContent)
  }
  // 遍历目标路径
  traverseDir(sourceDir, extractTranslationsFromFile);
  // fs.writeFileSync(outputFile, JSON.stringify(translations, null, 2), 'utf-8');
}


module.exports = scanVueFiles