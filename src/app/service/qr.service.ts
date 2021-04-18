import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QrEntity } from '../model/qr-entity.model';
@Injectable({
  providedIn: 'root'
})
export class QrService {
  
  httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  public QR_SEARCH = environment.qrSearch;
  public QR_SAVE = environment.qrSave;

  constructor(private http: HttpClient) { }

  getQr(qr: string) {
    return this.http.get(this.QR_SEARCH + qr);
  }

  saveOrder(order: QrEntity) {
    return this.http.post(this.QR_SAVE,
      order,
      { headers: this.httpHeaders });
  }
}
