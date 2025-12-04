import CryptoJS from 'crypto-js';

// 32-byte key for AES-256 (must match backend)
const SECRET_KEY = 'MySecretKey12345MySecretKey12345';

/**
 * Encrypt data using AES-256-CBC
 * Returns: Base64(IV + EncryptedData)
 */
export const encrypt = (data) => {
    try {
        // Generate random IV (16 bytes)
        const iv = CryptoJS.lib.WordArray.random(16);

        // Encrypt
        const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        // Combine IV + encrypted data
        const combined = iv.concat(encrypted.ciphertext);

        // Return as Base64
        return CryptoJS.enc.Base64.stringify(combined);
    } catch (error) {
        console.error('Encryption error:', error);
        throw error;
    }
};

/**
 * Decrypt data using AES-256-CBC
 * Expected format: Base64(IV + EncryptedData)
 */
export const decrypt = (encryptedData) => {
    try {
        // Decode from Base64
        const combined = CryptoJS.enc.Base64.parse(encryptedData);

        // Extract IV (first 16 bytes / 4 words)
        const iv = CryptoJS.lib.WordArray.create(combined.words.slice(0, 4));

        // Extract encrypted content (remaining bytes)
        const ciphertext = CryptoJS.lib.WordArray.create(combined.words.slice(4));

        // Decrypt
        const decrypted = CryptoJS.AES.decrypt(
            { ciphertext: ciphertext },
            CryptoJS.enc.Utf8.parse(SECRET_KEY),
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );

        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Decryption error:', error);
        throw error;
    }
};
