 const fs = require('fs-extra')
 const path = require('path')
 /**
  * 遍历当前路径下的所有文件夹
  * @param currentDir 
  */
const traverseDir = (currentDir, callback) => {
  const files = fs.readdirSync(currentDir);
  files.forEach((file) => {
    const filePath = path.join(currentDir, file);
    if (isDirectory(filePath)) {
      traverseDir(filePath);
    } else if (filePath.endsWith('.vue')) {
      callback(filePath);
    }
  });
}

/**
 * 当前文件是否是文件夹
 * @param {*} filePath 
 * @returns boolean
 */
const isDirectory = (filePath) => {
  return fs.statSync(filePath).isDirectory()
}

/**
 * 读取文件内容
 * @param {*} filePath 
 */
const fileReader = (filePath, type='utf8') => {
  const fileContent = fs.readFileSync(filePath, type) // 读取vue文件内容
  return fileContent
}

module.exports = {
  traverseDir,
  isDirectory,
  fileReader
}