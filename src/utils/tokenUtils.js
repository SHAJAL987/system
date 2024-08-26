// utils/tokenUtils.js

import CryptoJS from 'crypto-js';

// Encrypt and store token in sessionStorage
export const storeToken = (token) => {
  const passphrase = 'middleware';
  const encryptedToken = CryptoJS.AES.encrypt(token, passphrase).toString();
  sessionStorage.setItem('authToken', encryptedToken);
};

// Decrypt and retrieve token from sessionStorage
export const getTokenFromSessionStorage = () => {
  const encryptedToken = sessionStorage.getItem('authToken');
  if (encryptedToken) {
    const passphrase = 'middleware';
    const bytes = CryptoJS.AES.decrypt(encryptedToken, passphrase);
    console.log(bytes.toString(CryptoJS.enc.Utf8));
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  return null;
};
