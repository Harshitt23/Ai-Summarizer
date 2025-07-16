function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function solveIncreasinglySpecialSequence(N, A) {
    const MOD = 1000000007;
    const dp = new Array(N).fill(0);
    dp[0] = 1;
    
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < i; j++) {
            if (gcd(A[j], A[i]) !== 1) {
                continue;
            }
            if (j + A[i] - 1 < i) {
                continue;
            }
            dp[i] = (dp[i] + dp[j]) % MOD;
        }
        dp[i] = (dp[i] + 1) % MOD;
    }
    
    let result = 0;
    for (let i = 0; i < N; i++) {
        result = (result + dp[i]) % MOD;
    }
    
    return result;
}

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