function generateRandomCode(length) {
  const characters = require('./constants').characters;

  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // Use Math.random to generate random indexes
    code += characters.charAt(randomIndex);
  } 
  return code;
}
module.exports = generateRandomCode;
