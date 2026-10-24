import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizarFechaIngreso } from '../src/lib/fecha-ingreso.ts';
import { precioFmt } from '../src/lib/site.ts';

test('las fechas antiguas conservan día y mes incluso cuando ambos son menores que 13', () => {
  assert.equal((normalizarFechaIngreso('10-12-2026') as Date).toISOString(), '2026-12-10T00:00:00.000Z');
  assert.equal((normalizarFechaIngreso('24-10-2026') as Date).toISOString(), '2026-10-24T00:00:00.000Z');
});
test('ISO y formato antiguo representan el mismo día sin desplazamiento horario', () => {
  assert.deepEqual(normalizarFechaIngreso('2026-10-24'), normalizarFechaIngreso('24-10-2026'));
});
test('la fecha opcional vacía no se convierte en una fecha inventada', () => {
  for (const value of ['', null, undefined]) assert.equal(normalizarFechaIngreso(value), undefined);
});
test('no se aceptan días inexistentes y se admiten años bisiestos', () => {
  for (const value of ['31-02-2026', '2026-02-29', '2026-13-01']) {
    assert.ok(Number.isNaN((normalizarFechaIngreso(value) as Date).getTime()));
  }
  assert.equal((normalizarFechaIngreso('2024-02-29') as Date).toISOString(), '2024-02-29T00:00:00.000Z');
});
test('el precio usa pesos por defecto y conserva dólares si se eligieron expresamente', () => {
  assert.equal(precioFmt(25500000), '$ 25.500.000');
  assert.equal(precioFmt(25500, 'USD'), 'USD 25.500');
});
