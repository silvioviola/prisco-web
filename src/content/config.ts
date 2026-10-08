import { defineCollection, z } from 'astro:content';

// Colección de vehículos. Cada auto es un archivo en src/content/autos/.
// El panel /admin crea y edita estos archivos automáticamente.
const autos = defineCollection({
  type: 'content',
  schema: z.object({
    marca: z.string(),
    modelo: z.string(),
    version: z.string().optional().default(''),
    anio: z.number(),
    km: z.number().default(0),
    precio: z.number(),
    moneda: z.string().default('USD'),
    transmision: z.enum(['Manual', 'Automática']).default('Manual'),
    combustible: z.enum(['Nafta', 'Diésel', 'GNC', 'Híbrido', 'Eléctrico']).default('Nafta'),
    color: z.string().optional().default(''),
    segmento: z.enum(['Usado', '0km']).default('Usado'),
    estado: z.enum(['Disponible', 'Reservado', 'Vendido']).default('Disponible'),
    destacado: z.boolean().default(false),
    permuta: z.boolean().default(true),
    financiacion: z.boolean().default(true),
    consignacion: z.boolean().default(false),
    cuotaDesde: z.number().nullable().optional(),
    fotos: z.array(z.string()).default([]),
    orden: z.number().optional().default(0),
    fechaIngreso: z.preprocess((v) => (v === '' || v === null ? undefined : v), z.coerce.date().optional()),
  }),
});

export const collections = { autos };
