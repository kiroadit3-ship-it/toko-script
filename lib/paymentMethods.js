export const PAYMENT_METHODS = [
  { id: 'qris', name: 'QRIS (E-Wallet & M-Banking)', type: 'percentage', fee: 0.007 },
  { id: 'bni_va', name: 'BNI Virtual Account', type: 'flat', fee: 4000 },
  { id: 'bri_va', name: 'BRI Virtual Account', type: 'flat', fee: 4000 },
  { id: 'cimb_niaga_va', name: 'CIMB Niaga Virtual Account', type: 'flat', fee: 4000 },
  { id: 'permata_va', name: 'Permata Virtual Account', type: 'flat', fee: 4000 },
  { id: 'atm_bersama_va', name: 'ATM Bersama Virtual Account', type: 'flat', fee: 5000 },
];

export const calculateFee = (amount, method) => {
  if (method.type === 'percentage') return Math.ceil(amount * method.fee);
  return method.fee;
};