import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private host = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getDiagram(diagramId: string): any {
    return this.httpClient.get(`${this.host}/api/diagrams/${diagramId}`, { responseType: 'blob' });
  }

  saveDiagram(data: any) {
    return this.httpClient.post(`${this.host}/api/diagrams`, {image: data});
  }
}
