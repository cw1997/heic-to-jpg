const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const convert = require('heic-convert')

const pathName = 'N:\\heif\\20231014'

const convertSingle = async (filepath) => {
  const inputBuffer = await promisify(fs.readFile)(filepath);
  const outputBuffer = await convert({
    buffer: inputBuffer, // the HEIC file buffer
    format: 'JPEG',      // output format
    quality: 1           // the jpeg compression quality, between 0 and 1
  });

  await promisify(fs.writeFile)(`${filepath.replaceAll('.HEIC', '.jpg')}`, outputBuffer);
}

const filenames = fs.readdirSync(pathName)
console.log({filenames})

const main = async () => {
  for (const filename of filenames) {
    try {
      const filepath = `${pathName}\\${filename}`
      console.log({filepath})
      await convertSingle(filepath)
    } catch (e) {
      console.error(e)
    }
  }
}

main()
