import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { FleetApiError } from '../../features/fleet/models/fleet-api-error';
function record(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}
const messages: Readonly<Record<string, string>> = {
  INVALID_UF: 'Selecione uma UF brasileira válida.',
  INVALID_REQUEST: 'Confira os dados enviados.',
  UPLOAD_TOO_LARGE: 'O arquivo excede o limite de upload.',
  UNSUPPORTED_FORMAT: 'Selecione um arquivo com extensão .csv.',
  EMPTY_FILE: 'O CSV está vazio ou não contém veículos.',
  INVALID_ENCODING: 'Salve o arquivo em UTF-8 ou UTF-8 com BOM.',
  MALFORMED_CSV:
    'A estrutura do CSV é inválida. Confira separadores, aspas e quantidade de colunas.',
  INVALID_CSV_SCHEMA: 'Confira as colunas obrigatórias e os cabeçalhos duplicados ou vazios.',
  INVALID_NUMERIC_DATA:
    'O CSV contém um número inválido ou ambíguo. Confira a linha e a coluna indicadas.',
  INVALID_CSV_DATA: 'Confira os identificadores e modelos dos veículos.',
  ANALYSIS_FAILED: 'Não foi possível concluir a análise. Tente novamente.',
};
export const apiErrorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((cause: unknown) => {
      if (!(cause instanceof HttpErrorResponse)) return throwError(() => cause);
      const envelope = record(cause.error);
      const backend = record(envelope['error']);
      const code = typeof backend['code'] === 'string' ? backend['code'] : 'HTTP_ERROR';
      const defaults: Readonly<Record<number, string>> = {
        0: 'Não foi possível conectar ao servidor. Verifique se a API está disponível.',
        400: 'Requisição inválida. Confira a UF e o arquivo.',
        413: 'O arquivo excede o limite de upload.',
        415: 'Formato de arquivo não suportado.',
        422: 'O CSV ou a requisição contém dados inválidos.',
        500: 'O servidor não conseguiu concluir a análise.',
      };
      const error: FleetApiError = {
        status: cause.status,
        code,
        message:
          cause.status === 0
            ? defaults[0]
            : (messages[code] ??
              defaults[cause.status] ??
              'Não foi possível processar a requisição.'),
        backendMessage: typeof backend['message'] === 'string' ? backend['message'] : null,
        details: record(backend['details']),
      };
      return throwError(() => error);
    }),
  );
