type NotificacionEmail = {
  tipo: "email";
  destinatario: string;
  asunto: string;
  cuerpo: string;
};
 
type NotificacionSMS = {
  tipo: "sms";
  telefono: string;
  mensaje: string;
};
 
type NotificacionPush = {
  tipo: "push";
  dispositivoId: string;
  titulo: string;
  contenido: string;
};
 
type Notificacion = NotificacionEmail | NotificacionSMS | NotificacionPush;
 
function enviarNotificacion(notificacion: Notificacion): void {
  if (notificacion.tipo === "email") {
    console.log(`Enviando EMAIL a ${notificacion.destinatario} - Asunto: ${notificacion.asunto}`);
  } else if (notificacion.tipo === "sms") {
    console.log(`Enviando SMS al ${notificacion.telefono}: ${notificacion.mensaje}`);
  } else if (notificacion.tipo === "push") {
    console.log(`Enviando PUSH al dispositivo ${notificacion.dispositivoId} - Título: ${notificacion.titulo}`);
  }
}
 

const notiEmail: NotificacionEmail = {
  tipo: "email",
  destinatario: "valentina@mail.com",
  asunto: "Bienvenida",
  cuerpo: "Hola, bienvenida al sistema",
};
const notiSMS: NotificacionSMS = {
  tipo: "sms",
  telefono: "3001234567",
  mensaje: "Tu código es 1234",
};
const notiPush: NotificacionPush = {
  tipo: "push",
  dispositivoId: "device_001",
  titulo: "Nueva tarea",
  contenido: "Tienes una tarea pendiente",
};
console.log("Ejercicio 3:");
enviarNotificacion(notiEmail);
enviarNotificacion(notiSMS);
enviarNotificacion(notiPush);