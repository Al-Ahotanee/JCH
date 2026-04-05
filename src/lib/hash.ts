function simpleHash(str: string): string {
  let hash1 = 0, hash2 = 0, hash3 = 0;
  const prime1 = 5381, prime2 = 4769, prime3 = 5741;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash1 = ((hash1 * 31 + char) % 2147483647);
    hash2 = ((hash2 * 37 + char) % 2147483647);
    hash3 = ((hash3 * 41 + char) % 2147483647);
  }
  
  const combined = "JCONN" + hash1.toString(16) + hash2.toString(16) + hash3.toString(16);
  return combined;
}

function verifyHash(str: string, hash: string): boolean {
  return simpleHash(str) === hash;
}

export function hash(password: string): string {
  return simpleHash(password + "JConnectSalt2024");
}

export function verify(password: string, hash: string): boolean {
  return verifyHash(password + "JConnectSalt2024", hash);
}