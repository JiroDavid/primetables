export function isPrime(n) {
    if (n < 2){
        return false; 
    }
    for (let i = 2; i * i <= n; i = i + 1) {
    if (n % i === 0) {
        return false;
    }
}
return true;
}

