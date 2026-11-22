import { Component, signal, inject, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-shell',
  imports: [NgOptimizedImage, RouterLink, RouterOutlet],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
export class AppShell {
  readonly router = inject(Router);
  readonly reverse = toSignal(this.router.events.pipe(filter((event): event is NavigationStart => event instanceof NavigationStart), map(event => event.navigationTrigger === 'popstate')), {initialValue:false});
 readonly navigation = toSignal(this.router.events);
  readonly active = computed(() => {
    this.navigation();
    const tree = this.router.parseUrl(this.router.url);
    return this.router.url.startsWith('/import')
      ? 'import'
      : String(tree.queryParams['section'] ?? 'overview');
  });
  readonly title = computed(() =>
    this.active() === 'import'
      ? 'Importar frota'
      : (this.sections.find((s) => s.id === this.active())?.label ?? 'Diagnóstico'),
  );
  readonly collapsed = signal(false);
  readonly sections = [
    { id: 'overview', label: 'Visão geral' },
    { id: 'fleet', label: 'Frota' },
    { id: 'priorities', label: 'Prioridades' },
    { id: 'costs', label: 'Custos' },
    { id: 'quality', label: 'Qualidade' },
    { id: 'comparisons', label: 'Comparações' },
    { id: 'references', label: 'Referências e metodologia' },
  ];
}
