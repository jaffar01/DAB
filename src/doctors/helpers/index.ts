import { fromEvent } from 'rxjs';
import { COMMISSION_MODES, TAX_MODES } from 'src/constants';

export function calculateVariantPriceDetails({ quantity = 1, unitFee = 0, Tax }) {
  try {
    const currentUnitQuantity = typeof quantity !== 'number' ? parseInt(quantity) : quantity;
    const currentUnitPrice = typeof unitFee !== 'number' ? parseFloat(unitFee) : unitFee;
    const taxValue = typeof Tax.value !== 'number' ? parseInt(Tax.value) : Tax.value;
    const currentTaxPrice =
      taxValue !== 0
        ? Tax?.mode === TAX_MODES.PERCENTAGE
          ? currentUnitPrice * (taxValue / 100)
          : taxValue
        : 0;
    const fee = currentUnitPrice * currentUnitQuantity;
    const taxPrice = parseInt(currentTaxPrice) * currentUnitQuantity;
    const totalAmount = fee + taxPrice;
    return {
      fee,
      taxPrice,
      totalAmount,
    };
  } catch (err) {
    throw new Error(err);
  }
};

export function getDoctorVariantCommissionValue({ commissions, totalAmount }) {
  if (commissions.length > 0) {
    commissions.map(commission => {
      const commissionValue = typeof commission.value !== 'number'
        ? parseInt(commission.value)
        : commission.value;
      commission.actualValue = commissionValue !== 0
        ? commission.mode === COMMISSION_MODES.PERCENTAGE
          ? (commission.value / 100) * totalAmount
          : (commission.value) * totalAmount
        : 0;
      return commission;
    });
    return [null, commissions];
  }
  return [{ message: 'Commission is not present for the given product' }];
}