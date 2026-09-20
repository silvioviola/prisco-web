// =============================================================
//  CONFIGURACIÓN CENTRAL DE PRISCO AUTOMOTORES
//  Editá acá los datos de contacto. Se usan en toda la web.
// =============================================================

export const SITE = {
  nombre: 'PRISCO Automotores',
  slogan: 'Comprar, vender o consignar, claro y confiable.',
  dominio: 'https://priscoautomotores.com.ar',

  // ⚠️ IMPORTANTE: poné el número real de WhatsApp de la agencia.
  // Formato internacional SIN "+", SIN espacios ni guiones.
  // Ejemplo Mendoza: 549261XXXXXXX  (54 = Argentina, 9 = celular, 261 = Mendoza)
  whatsapp: '5492634697325',

  // Email de contacto (lo configurás en Zoho Mail con tu dominio).
  email: 'ventas@priscoautomotores.com.ar',

  // Dirección física.
  direccion: 'Boulogne Sur Mer 160, San Martín, Mendoza',
  ciudad: 'San Martín',
  provincia: 'Mendoza',

  // Horarios (texto libre).
  horarios: 'Lunes a viernes de 9 a 18 h · Sábados de 9 a 13 h',

  // Redes (dejá vacío '' lo que no uses).
  instagram: 'https://instagram.com/priscoautomotores',
  facebook: 'https://www.facebook.com/profile.php?id=61594254230741',

  // Moneda con que se muestran los precios.
  moneda: 'ARS',
} as const;

// Arma un link de WhatsApp con un mensaje ya escrito.
export function waLink(mensaje: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

// Formatea un precio: ARS como "$ 9.400.000", USD como "USD 14.500".
export function precioFmt(valor: number, moneda: string = SITE.moneda): string {
  if (moneda === 'ARS') return `$ ${valor.toLocaleString('es-AR')}`;
  return `${moneda} ${valor.toLocaleString('es-AR')}`;
}

// Formatea kilómetros como "45.000 km".
export function kmFmt(km: number): string {
  return `${km.toLocaleString('es-AR')} km`;
}
