

const {HASH_PASSWORD} = require('../src/Utils/Encryption');
test('Checking hashing' , ()=>{
    const hash = HASH_PASSWORD("password" , 10);
    console.log(hash);
})