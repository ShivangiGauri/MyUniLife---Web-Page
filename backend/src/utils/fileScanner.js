import { fileTypeFromBuffer } from "file-type";

export const scanFile = async (buffer) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  
  const type = await fileTypeFromBuffer(buffer);
  
  if (!type || !allowedTypes.includes(type.mime)) {
    throw new Error("Invalid or potentially malicious file detected by deep scan");
  }
  
  return type;
};
