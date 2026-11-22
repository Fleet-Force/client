import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../../core/config/api-config';
import { FleetAnalysis } from '../models/fleet-analysis';
@Service()
export class FleetAnalysisApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_CONFIG.apiBaseUrl + '/fleet';
  analyze(file: File, uf: string): Observable<FleetAnalysis> {
    const body = new FormData();
    body.append('file', file, file.name);
    body.append('uf', uf);
    return this.http.post<FleetAnalysis>(`${this.baseUrl}/analyze`, body);
  }
}
