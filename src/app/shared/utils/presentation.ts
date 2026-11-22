export interface TableColumn {
  readonly valueLabels?: Readonly<Record<string, string>>;
  readonly key: string;
  readonly label: string;
  readonly format?: 'number' | 'currency' | 'percent' | 'ratio' | 'km' | 'liters' | 'efficiency';
}
const numbers = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export function formatValue(
  value: unknown,
  format?: TableColumn['format'],
  valueLabels?: Readonly<Record<string, string>>,
): string {
  if (value === null || value === undefined || value === '') return 'Não informado';
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return 'Não informado';
    if (format === 'currency') return currency.format(value);
    const text = numbers.format(format === 'ratio' ? value * 100 : value);
    return (
      text +
      (format === 'percent' || format === 'ratio'
        ? '%'
        : format === 'km'
          ? ' km'
          : format === 'liters'
            ? ' L (estimados)'
            : format === 'efficiency'
              ? ' km/L'
              : '')
    );
  }
  if (typeof value === 'string')
    return valueLabels
      ? value
          .split(';')
          .map((part) => valueLabels[part] ?? part)
          .join('; ')
      : value;
  return JSON.stringify(value);
}
