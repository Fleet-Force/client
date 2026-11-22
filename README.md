# FleetForce

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.3.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Fleet Force MVP

Frontend Angular 22.3 com upload real de CSV e diagnóstico em português.

Em dois terminais:

```bash
cd /home/jojo/projects/py/fleet-force-server
source .venv/bin/activate
uvicorn src.main:app --reload --port 8000
```

```bash
cd /home/jojo/projects/ts/fleet-force/client
pnpm install
pnpm start
```

Abra http://localhost:4200. O proxy de desenvolvimento encaminha `/v1/**` para
`http://localhost:8000`, sem reescrever a URL. A configuração central fica em
`src/app/core/config/api-config.ts`. Em produção, configure o servidor/reverse proxy
para encaminhar `/v1/*` ao FastAPI e servir o index.html nas rotas do frontend.

Rotas: `/` redireciona para `/import`; `/import`, `/analysis` e
`/analysis/vehicles/:fleetId` usam carregamento lazy. A navegação entre telas
move o foco para o conteúdo principal.

O único endpoint consumido é `POST /v1/fleet/analyze`: FormData com `file` e `uf`
(MG por padrão), sem definir Content-Type manualmente. Os endpoints GET de
relatórios anteriores não são usados. Os dados retornados ficam apenas em memória
no store da feature; atualizar o navegador exige nova importação. Identificadores
são strings e valores nulos não são convertidos em zero. Paginação e filtros
são locais, sem recalcular indicadores do motor.

Limites confirmados do backend: upload de até 10 MiB por padrão, CSV UTF-8
(normalizado ou UFMG), ausência de sessões de análise persistidas e ausência
de CORS para acesso direto entre origens. O upload não treina ML e retorna
`deterministic_fallback` sem alertas ML quando não há artefato validado.
ANP contém preços históricos; PBEV é exploratório; disponibilidade depende
das bases locais. Cenários por combustível são alternativos e não aditivos.

### Scaffolding executado

Todos os componentes, serviços, interfaces de contrato e o interceptor foram
gerados com o CLI instalado. Nenhum teste gerado foi removido ou ampliado.

```bash
ng generate component core/layouts/app-shell --style=scss --skip-tests=false
ng generate component features/fleet/pages/fleet-import-page --style=scss --skip-tests=false
ng generate component features/fleet/pages/fleet-analysis-page --style=scss --skip-tests=false
ng generate component features/fleet/pages/fleet-vehicle-detail-page --style=scss --skip-tests=false
ng generate component features/fleet/components/fleet-summary --style=scss --skip-tests=false
ng generate component features/fleet/components/fleet-vehicles-table --style=scss --skip-tests=false
ng generate component features/fleet/components/fleet-diagnostics-section --style=scss --skip-tests=false
ng generate component shared/components/data-table --style=scss --skip-tests=false
ng generate service features/fleet/data-access/fleet-analysis-api --skip-tests=false
ng generate service features/fleet/state/fleet-analysis-store --skip-tests=false
ng generate interceptor core/http/api-error --functional --skip-tests=false
ng generate interface features/fleet/models/fleet-analysis
ng generate interface features/fleet/models/fleet-summary
ng generate interface features/fleet/models/fleet-vehicle
ng generate interface features/fleet/models/fleet-api-error
```

Verificação: `pnpm build` e `pnpm exec tsc -p tsconfig.spec.json --noEmit`.
A suíte unitária permanece como scaffolding gerado; não foi ampliada nesta fase.
O teste original de título da tela inicial ainda referencia a tela padrão do CLI.

Verificação de integração realizada contra o FastAPI local pelo proxy Angular:
upload multipart com UF SP, preservação de identificadores com zeros e caracteres
codificados, erros de schema, ausência de dados financeiros, múltiplas importações,
filtros, paginação com 60 veículos, recarga sem estado e falha de rede no navegador.
Somente requisições POST foram usadas no fluxo de análise. As verificações AXE
completas não encontraram violações nas telas de importação, erro de schema,
diagnóstico, detalhe de veículo, ausência de análise após recarga, viewport móvel
e erro de rede. Isso verifica os estados exercitados, não substitui uma auditoria
manual completa de acessibilidade. Nenhuma dependência de teste de navegador foi
adicionada ao projeto; a verificação foi executada fora do workspace.
