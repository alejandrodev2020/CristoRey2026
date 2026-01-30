import CryptoJS from 'react-native-crypto-js';

const KEY = "F7k29Ds81QpLx9AaZ4mC8tB2V7nR6pT3"; // 32 chars
const IV  = "9fK2pL8sQ4dF1zW7";              // 16 chars

export function decryptQr(encryptedBase64: string): any {
  try {
    // Convertimos key e iv en WordArray
    const key = CryptoJS.enc.Utf8.parse(KEY);
    const iv  = CryptoJS.enc.Utf8.parse(IV);

    // Desencriptar AES CBC PKCS7
    const decrypted = CryptoJS.AES.decrypt(
      encryptedBase64,
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    const text = decrypted.toString(CryptoJS.enc.Utf8);

    return JSON.parse(text); // Retorna JSON como en backend
  } catch (e) {
    console.log("ERROR DESENCRIPTANDO QR:", e);
    return null;
  }
}
