import { decode } from "js-base64";

export function getUsernameSomehow() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedPayload = decode(payload);
        const payloadObject = JSON.parse(decodedPayload);
        return payloadObject.username;
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }

  return null;
}