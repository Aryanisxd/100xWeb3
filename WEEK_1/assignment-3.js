const crypto = require('crypto');

function findHashWithPrefix(prefix) {
    // Initialize nonce (counter) at 0
    let input = 0;

    while (true) {
        // Create the transaction string with the current nonce appended
        const inputStr = `
        rohan => kirat | Rs 100
        babu => harkirat | Rs 10
        ` + input.toString();

        // Generate SHA-256 hash of the current input string
        let hash = crypto.createHash('sha256')
                        .update(inputStr)
                        .digest('hex');

        // Check if hash matches our target prefix
        if (hash.startsWith(prefix)) {
            return { input: inputStr, hash: hash };
        }

        // Increment nonce and continue searching
        input++;
    }
}

// Find a hash starting with '00000'
const result = findHashWithPrefix('00000');
console.log(`Input: ${result.input}`);
console.log(`Hash: ${result.hash}`);

/*
Detailed Code Workflow Explanation:

1. Transaction Data Structure:
   - The input string represents a simple transaction ledger
   - Format: "sender => receiver | amount"
   - Example transactions:
     * rohan sends Rs 100 to kirat
     * babu sends Rs 10 to harkirat

2. Nonce Implementation (input variable):
   - Acts as a proof-of-work nonce
   - Starts at 0 and increments until a valid hash is found
   - Gets appended to the transaction data before hashing
   - Example complete inputs:
     Transaction data + "0"
     Transaction data + "1"
     Transaction data + "2"
     etc.

3. Hash Generation Process:
   a. String Preparation:
      - Combines fixed transaction data with current nonce
      - Creates unique input for each iteration
   
   b. SHA-256 Hashing:
      - crypto.createHash('sha256') - Creates new hash object
      - .update(inputStr) - Feeds in our input data
      - .digest('hex') - Converts hash to hexadecimal string
   
   c. Prefix Checking:
      - Uses startsWith(prefix) to verify hash begins with target prefix
      - Example: '00000' requires 5 leading zeros

4. Proof-of-Work Aspects:
   - Difficulty increases with prefix length
   - '0' = 1/16 chance
   - '00' = 1/256 chance
   - '00000' = 1/1,048,576 chance

5. Real-world Parallels:
   - Similar to Bitcoin mining process
   - Transaction block = Our transaction strings
   - Mining = Finding the correct nonce
   - Difficulty = Number of leading zeros required

6. Performance Considerations:
   - CPU-intensive operation
   - Time increases exponentially with prefix length
   - No shortcut exists (by design)
   - Each hash must be calculated and checked

7. Security Implications:
   - Makes it computationally expensive to modify transaction history
   - Each change would require finding a new valid nonce
   - Helps prevent tampering with transaction records

Example Process Flow:
1. First attempt:
   Input: "transactions... + 0"
   Hash: "a1b2c3..."
   (No match - continue)

2. Second attempt:
   Input: "transactions... + 1"
   Hash: "7f8e9d..."
   (No match - continue)

3. Eventually:
   Input: "transactions... + 58372"
   Hash: "00000xyz..."
   (Match found - return result)

This implementation demonstrates basic concepts used in:
- Blockchain technology
- Cryptocurrency mining
- Proof-of-work systems
- Distributed consensus mechanisms
*/