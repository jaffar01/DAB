import { DEFAULT_UNIQUE_NUMBER } from "src/config";
import { PROVIDER_UNIQUE_CODE } from "src/constants";


export function generateUniqueCode({
  providerType,
  name,
  uniqueNumber,
  isNewuniqueCode = true
}){
  try {
    const providerShortCode = PROVIDER_UNIQUE_CODE [providerType] || 'TYP';
    const shortName = name?.slice(0,3).toUpperCase();
    let currentUniqueNumber;
    if(isNewuniqueCode) {
      currentUniqueNumber = (uniqueNumber) ? (parseInt(uniqueNumber)+1) : DEFAULT_UNIQUE_NUMBER;
    }else{
      currentUniqueNumber = (uniqueNumber) ? (parseInt(uniqueNumber)) : DEFAULT_UNIQUE_NUMBER;
    }
    return `PRO-${providerShortCode}-${shortName}-${currentUniqueNumber}`
  } catch (err) {
    throw Error(err)
  }
}