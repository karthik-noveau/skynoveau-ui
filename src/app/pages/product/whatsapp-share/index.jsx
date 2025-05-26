const WHATSAPP_NUMBER = "+919500342171";

export const WhataAppShare = (message) => {
  let data = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
  return window.open(data);
};
