import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SnsService {
  constructor(private http: HttpClient) {}
  snsEmailUrl = "http://localhost:3000/snsEmail";

  sendEmail(itemNames): Observable<any> {
    return this.http.post(this.snsEmailUrl, { itemNames });
  }
}
