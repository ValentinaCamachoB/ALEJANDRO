type PagoTarjeta = {
  metodo: "tarjeta";
  numeroTarjeta: string;
  cvv: string;
};
 
type PagoTransferencia = {
  metodo: "transferencia";
  banco: string;
  numeroCuenta: string;
};
 
type PagoEfectivo = {
  metodo: "efectivo";
};
 
type Pago = PagoTarjeta | PagoTransferencia | PagoEfectivo;
 
function validarPago(pago: Pago): boolean {
  if (pago.metodo === "tarjeta") {
    return pago.numeroTarjeta !== "" && pago.cvv !== "";
  } else if (pago.metodo === "transferencia") {
    return pago.banco !== "" && pago.numeroCuenta !== "";
  } else if (pago.metodo === "efectivo") {
    return true;
  }
  return false;
}
 

const pagoTarjeta: PagoTarjeta = { metodo: "tarjeta", numeroTarjeta: "4111111111111111", cvv: "123" };
const pagoSinCVV: PagoTarjeta = { metodo: "tarjeta", numeroTarjeta: "4111111111111111", cvv: "" };
const pagoTransferencia: PagoTransferencia = { metodo: "transferencia", banco: "Bancolombia", numeroCuenta: "123456789" };
const pagoEfectivo: PagoEfectivo = { metodo: "efectivo" };
 
console.log("Ejercicio 10:");
console.log(`Tarjeta válida: ${validarPago(pagoTarjeta)}`);
console.log(`Tarjeta sin CVV: ${validarPago(pagoSinCVV)}`);
console.log(`Transferencia válida: ${validarPago(pagoTransferencia)}`);
console.log(`Efectivo válido: ${validarPago(pagoEfectivo)}`);