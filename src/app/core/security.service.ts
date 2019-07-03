import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})

export class SecurityService {
    private readonly secret = '$3nh@$3cr3R@';
    cryptoId(id) {
        const key = CryptoJS.enc.Utf8.parse(this.secret);
        const iv = CryptoJS.enc.Utf8.parse(this.secret);
        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(id.toString()), key,
        {
            keySize: 128/8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }

    decryptoId(id) {
        const key = CryptoJS.enc.Utf8.parse(this.secret);
        const iv = CryptoJS.enc.Utf8.parse(this.secret);
        const decrypted = CryptoJS.AES.decrypt(id, key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}
