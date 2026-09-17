import type { CollectionEntry } from 'astro:content';

export type Auto = CollectionEntry<'autos'>;

const PLACEHOLDER = '/brand/placeholder.svg';

export function autoTitulo(d: Auto['data']): string {
  return [d.marca, d.modelo, d.version].filter(Boolean).join(' ').trim();
}

export function autoCover(d: Auto['data']): string {
  return d.fotos && d.fotos.length > 0 ? d.fotos[0] : PLACEHOLDER;
}

export function autoFotos(d: Auto['data']): string[] {
  return d.fotos && d.fotos.length > 0 ? d.fotos : [PLACEHOLDER];
}

// Ordena: destacados primero, luego por 'orden', luego por año desc.
export function ordenarAutos(a: Auto[]): Auto[] {
  return [...a].sort((x, y) => {
    if (x.data.destacado !== y.data.destacado) return x.data.destacado ? -1 : 1;
    if ((x.data.orden ?? 0) !== (y.data.orden ?? 0)) return (x.data.orden ?? 0) - (y.data.orden ?? 0);
    return y.data.anio - x.data.anio;
  });
}

// Solo los que se muestran (no vendidos por defecto en el home).
export function disponibles(a: Auto[]): Auto[] {
  return a.filter((x) => x.data.estado !== 'Vendido');
}
