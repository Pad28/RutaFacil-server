import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export const bcryptjsAdapter = {
    hash: (password: string) => {
        const salt = genSaltSync();
        return hashSync(password, salt);
    },
    compare: (passwrod: string, hashed: string) => {
        return compareSync(passwrod, hashed);
    }
}