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

// Example usage and test cases
function main() {
    // Test case 1
    console.log("Test Case 1:");
    const N1 = 3;
    const A1 = [2, 3, 4];
    console.log("N =", N1);
    console.log("A =", A1);
    console.log("Result:", solveIncreasinglySpecialSequence(N1, A1));
    console.log();
    
    // Test case 2
    console.log("Test Case 2:");
    const N2 = 4;
    const A2 = [1, 2, 3, 4];
    console.log("N =", N2);
    console.log("A =", A2);
    console.log("Result:", solveIncreasinglySpecialSequence(N2, A2));
    console.log();
    
    // Test case 3
    console.log("Test Case 3:");
    const N3 = 5;
    const A3 = [1, 1, 1, 1, 1];
    console.log("N =", N3);
    console.log("A =", A3);
    console.log("Result:", solveIncreasinglySpecialSequence(N3, A3));
}

// Run the main function
main(); 