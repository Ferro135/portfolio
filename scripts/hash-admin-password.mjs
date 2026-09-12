import { randomBytes, scryptSync } from "node:crypto";
import process from "node:process";
const password=process.argv[2];if(!password){console.error('Uso: npm run admin:hash -- "SUA-SENHA"');process.exit(1)}const salt=randomBytes(16).toString('hex');const hash=scryptSync(password,salt,32).toString('hex');console.log(`ADMIN_PASSWORD_HASH=scrypt$${salt}$${hash}`);console.log('ADMIN_SESSION_SECRET='+randomBytes(48).toString('base64url'));console.log('RATE_LIMIT_SALT='+randomBytes(32).toString('base64url'));
