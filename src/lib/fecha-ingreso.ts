// El panel antiguo guardaba DD-MM-YYYY; el nuevo guarda YYYY-MM-DD.
// Interpretar ambas formas explícitamente evita intercambiar día y mes.
export function normalizarFechaIngreso(value: unknown): unknown {
  if (value === '' || value === null || value === undefined) return undefined;
  if (typeof value !== 'string') return value;

  const legacy = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!legacy && !iso) return value;

  const [year, month, day] = legacy
    ? [Number(legacy[3]), Number(legacy[2]), Number(legacy[1])]
    : [Number(iso![1]), Number(iso![2]), Number(iso![3])];
  const date = new Date(`${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00.000Z`);
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return new Date(NaN);
  }
  return date;
}
