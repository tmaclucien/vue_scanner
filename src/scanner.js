const fs = require('fs-extra')
const parser = require('vue-eslint-parser') // 基于eslint的vue解析器，专门用于处理vue文件 
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const path = require('path')

function scanVueFiles(sourceDir, outputFile) {
  const translations = {}
  const extractTranslationsFromFile = (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8') // 读取vue文件内容
    const ast = parser.parse(fileContent, {
      parser: require('@babel/eslint-parser')
    })

    traverse(ast, {
      // enter(path) {
      //   console.log('entering code...')
      // }
      // CallExpression(path) {
      //   console.log(path)
      //   const { node } = path;
      //   // if (
      //   //   t.isMemberExpression(node.callee) &&
      //   //   t.isIdentifier(node.callee.object, { name: '$t' }) &&
      //   //   t.isStringLiteral(node.arguments[0])
      //   // ) {
      //   //   const key = node.arguments[0].value;
      //   //   translations[key] = key; // You may want to improve this line based on your needs
      //   // }
      // },
    });
  }

 /**
  * 读取当前路径下的所有文件夹
  * @param currentDir 
  */
  const traverseDir = (currentDir) => {
    const files = fs.readdirSync(currentDir);
    files.forEach((file) => {
    const filePath = path.join(currentDir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // traverseDir(filePath);
    } else if (filePath.endsWith('.vue')) {
      extractTranslationsFromFile(filePath);
    }
    });
  }
  traverseDir(sourceDir);
  // fs.writeFileSync(outputFile, JSON.stringify(translations, null, 2), 'utf-8');
}


module.exports = scanVueFiles