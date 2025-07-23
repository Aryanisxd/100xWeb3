const crypto = require('crypto');
const { log } = require("console"); // For console logging
//node js built crypto module


/* 

What if I ask you the following question — Give me an input string that outputs a SHA-256 hash that starts with 00000 . How will you do it?

A: You will have to brute force until you find a value that starts with 00000 


sample input and output

Input: 596138
Output: 00000691457f4f0ce13e187b9ab4fda6d42c8647752909b8f71f9dbd8f6bd4ab

*/


//This function takes a prefix string (e.g., "00000") and tries to find an input whose hash starts with that prefix 
function findHashWithPrefix(prefix) {
    // initilize input with the correct value.
    
    let input  = 0; // change here
    while (true) {
        // logic here 
        
        const hash = crypto.createHash('sha256').update(input.toString()).digest('hex');
        if (hash.startsWith(prefix)) {
            return { input, hash };
        }

         // Step 5: Log progress every 100,000 iterations for monitoring
         if (input % 100000 === 0) {
            console.log(`Currently at input: ${input}`);
        }
         // Step 6: Increment the input value to test the next possible value
        input++;
    }
}

// Find and print the input string and hash
const result = findHashWithPrefix('000000');
console.log(`Input: ${result.input}`);
console.log(`Output Hash: ${result.hash}`);