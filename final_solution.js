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

// Test cases
console.log("=== Test Case 1 ===");
console.log("N = 3, A = [2, 3, 4]");
console.log("Result:", solveIncreasinglySpecialSequence(3, [2, 3, 4]));
console.log();

console.log("=== Test Case 2 ===");
console.log("N = 4, A = [1, 2, 3, 4]");
console.log("Result:", solveIncreasinglySpecialSequence(4, [1, 2, 3, 4]));
console.log();

console.log("=== Test Case 3 ===");
console.log("N = 5, A = [1, 1, 1, 1, 1]");
console.log("Result:", solveIncreasinglySpecialSequence(5, [1, 1, 1, 1, 1]));
console.log();

console.log("=== Test Case 4 ===");
console.log("N = 3, A = [5, 7, 11]");
console.log("Result:", solveIncreasinglySpecialSequence(3, [5, 7, 11])); 