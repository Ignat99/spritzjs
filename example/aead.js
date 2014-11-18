var spritzjs = require('../');

var M = [65, 66, 67];             // "ABC" as a byte array
var r = 32;                       // 32 byte hash desired

var hashed = spritzjs.hash(M, r); // "hashed" now contains 32 bytes of hashed "M" material

console.log(hashed.length);       // -> 32
console.log(hashed);              // -> [2, 143, 162,..., 71]

var K = [115, 101, 116, 101, 99, 45, 97, 115, 116, 114, 111, 110, 111, 109, 121];
var M = [84, 104, 97, 110, 107, 32, 121, 111, 117, 32, 102, 111, 114, 32, 100, 101, 99, 111, 100, 105, 110, 103, 32, 116, 104, 105, 115, 32, 112, 108, 97, 105, 110, 116, 101, 120, 116, 32, 97, 116, 32, 108, 101, 97, 115, 116, 44, 32, 73, 32, 104, 111, 112, 101, 32, 121, 111, 117, 32, 119, 105, 108, 108, 32, 116, 114, 121, 32, 115, 112, 114, 105, 116, 122, 106, 115, 33];

for (var i = 0; i < K.length; i++) {
    console.log('%s - %d', String.fromCharCode(K[i]), String.fromCharCode(K[i]).charCodeAt(0)); 
}

for (var i = 0; i < M.length; i++) {
    console.log('%s - %d', String.fromCharCode(M[i]), String.fromCharCode(M[i]).charCodeAt(0));
}

var Z = [];
var H = [];

var skey = "time now";

for (var i=0; i < skey.length; i++) {
    Z[i] = skey[i].charCodeAt(0);
}

console.log(Z);

var hAPI = "balance";

for (var i=0; i < hAPI.length; i++) {
    H[i] = hAPI[i].charCodeAt(0);
}

console.log(H);

//var encrypted = spritzjs.encrypt(K, M);       // "encrypted" now contains ciphertext C
//console.log(encrypted.length === M.length);   // -> true
//console.log(encrypted);                          // -> [27, 217, 247,..., 165]

//var encrypted = spritzjs.encrypt(Z, H);

var aeaded = spritzjs.aead(K, Z, H, M, r);
console.log(aeaded.length === M.length);   // -> false (M.lenght+'|'+r)
console.log(aeaded);                          // -> [ 116,  79,  187,...,  94]


//var decrypted = spritzjs.decrypt(K, encrypted);
//for (var i = 0; i < decrypted.length; i++) {
//    if (M[i] !== decrypted[i]) throw new Error("I shouldn't be thrown");
//}

//var decrypted = spritzjs.decrypt(Z, encrypted);

//for (var i = 0; i < decrypted.length; i++) {
//    if (H[i] !== decrypted[i]) throw new Error("I shouldn't be thrown");
//}


//var i,j,temparray,chunk = 10;
//for (i=0,j=array.length; i<j; i+=chunk) {
//    temparray = array.slice(i,i+chunk);
    // do whatever
//}

var split_aeaded = [];

var abort = false;

// We use AtH symbol
for (var i = 0; i < aeaded.length && !abort; i++) {
    if (aeaded[i] === String.fromCharCode(256).charCodeAt(0)) { 
        abort = true; 
    } else {
        //console.log('%s - %d', String.fromCharCode(aeaded[i]), String.fromCharCode(aeaded[i]).charCodeAt(0));
        split_aeaded[i] = aeaded[i];
    }
}

console.log(split_aeaded);

var deaeaded = spritzjs.deaead(K, Z, H, split_aeaded, r);

for (var i = 0; i < deaeaded.length; i++) {
    if (M[i] !== deaeaded[i]) throw new Error("I shouldn't be thrown");
}

//console.log(deaeaded);
for (var i = 0; i < deaeaded.length; i++) {
    console.log('%s - %d', String.fromCharCode(deaeaded[i]), String.fromCharCode(deaeaded[i]).charCodeAt(0));
}

