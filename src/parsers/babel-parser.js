// 需要注意的是，Vue 文件一般包含 <template>、<script> 和 <style> 三个主要部分。
// 而babel/parser无法解析vue文件，只能解析js等，所以可能需要进一步配置 Babel Parser 或使用其他相关的工具。

const fs = require('fs-extra')
const parser = require('@babel/parser') 
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const {traverseDir, fileReader} = require('../utils/scanner')

function scanVueFiles(sourceDir, outputFile) {
  const translations = {}
  // 从解析的文件中抽取想要的内容
  const extractTranslationsFromFile = (filePath) => {
    const fileContent = fileReader(filePath) // 读取vue文件内容
    const ast = parser.parse(fileContent, {
      sourceType: 'module',
      plugins: ['jsx', 'classProperties', 'typescript'],
    })
  
    traverse(ast, {
      CallExpression(path) {
        const { node } = path;
        console.log(node.callee)
        if (
          // t.isMemberExpression(node.callee) &&
          t.isIdentifier(node.callee, {name: '$t'}) &&
          t.isStringLiteral(node.arguments[0])
        ) {
          const key = node.arguments[0].value;
          translations[key] = key; // You may want to improve this line based on your needs
        }
      },
    });
  }
  // 遍历目标路径
  traverseDir(sourceDir, extractTranslationsFromFile);

  //fs.writeFileSync(outputFile, JSON.stringify(translations, null, 2), 'utf-8');
}


module.exports = scanVueFiles