const generator = require('generate-password');

module.exports.passGenerator = ()=>{
    const pass = generator.generate({
        length: 12,
        numbers: true
    });
    return pass;
}