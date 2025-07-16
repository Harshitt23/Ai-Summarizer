// Function to calculate GCD
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Function to solve the increasingly special sequence problem
function solveIncreasinglySpecialSequence(N, A) {
    const MOD = 1000000007;
    
    // dp[i] = number of increasingly special sequences ending at position i
    const dp = new Array(N).fill(0);
    
    // Base case: empty sequence
    dp[0] = 1;
    
    // For each position i
    for (let i = 0; i < N; i++) {
        // For each previous position j
        for (let j = 0; j < i; j++) {
            // Check if we can extend the sequence from j to i
            
            // Condition 1: GCD(A[j], A[i]) == 1
            if (gcd(A[j], A[i]) !== 1) {
                continue;
            }
            
            // Condition 2: j >= i - A[i] + 1
            // This means: j >= i - A[i] + 1
            // Rearranging: j + A[i] - 1 >= i
            if (j + A[i] - 1 < i) {
                continue;
            }
            
            // If both conditions are satisfied, we can extend the sequence
            dp[i] = (dp[i] + dp[j]) % MOD;
        }
        
        // Also consider starting a new sequence with just A[i]
        dp[i] = (dp[i] + 1) % MOD;
    }
    
    // Sum up all possible sequences
    let result = 0;
    for (let i = 0; i < N; i++) {
        result = (result + dp[i]) % MOD;
    }
    
    return result;
}

// Function to read input and solve the problem
function main() {
    // Simulating input reading
    // In a real scenario, you would read from stdin
    
    // Example input format:
    // First line: N
    // Next N lines: A[0], A[1], ..., A[N-1]
    
    // Test case 1
    console.log("=== Test Case 1 ===");
    const N1 = 3;
    const A1 = [2, 3, 4];
    console.log("Input:");
    console.log(N1);
    A1.forEach(val => console.log(val));
    console.log("Output:", solveIncreasinglySpecialSequence(N1, A1));
    console.log();
    
    // Test case 2
    console.log("=== Test Case 2 ===");
    const N2 = 4;
    const A2 = [1, 2, 3, 4];
    console.log("Input:");
    console.log(N2);
    A2.forEach(val => console.log(val));
    console.log("Output:", solveIncreasinglySpecialSequence(N2, A2));
    console.log();
    
    // Test case 3
    console.log("=== Test Case 3 ===");
    const N3 = 5;
    const A3 = [1, 1, 1, 1, 1];
    console.log("Input:");
    console.log(N3);
    A3.forEach(val => console.log(val));
    console.log("Output:", solveIncreasinglySpecialSequence(N3, A3));
    console.log();
    
    // Test case 4 - Edge case with larger numbers
    console.log("=== Test Case 4 ===");
    const N4 = 3;
    const A4 = [5, 7, 11];
    console.log("Input:");
    console.log(N4);
    A4.forEach(val => console.log(val));
    console.log("Output:", solveIncreasinglySpecialSequence(N4, A4));
}

// Function to handle actual input (for competitive programming)
function handleInput() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let lineCount = 0;
    let N = 0;
    let A = [];
    
    rl.on('line', (line) => {
        if (lineCount === 0) {
            N = parseInt(line);
        } else {
            A.push(parseInt(line));
        }
        lineCount++;
        
        if (lineCount === N + 1) {
            const result = solveIncreasinglySpecialSequence(N, A);
            console.log(result);
            rl.close();
        }
    });
}

// Uncomment the line below to use with actual input
// handleInput();

// Run the main function with test cases
main(); 