import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebservicesService {

  public serviceUrl = environment.serviceUrl;

  constructor(
    public Http: HttpClient
  ) { }

  public Login(email: any, password: any) {
    const url = `${this.serviceUrl}/AccountMaster/Login`;
    const body = { Email: email, Password: password, Condition: "check_Login" }
    return this.Http.post<any>(url, body).pipe(
     // tap(d => console.log(d)),
      map(d => (d.Status_cd !== "0") ?  Object.assign(d.ds.Table[0], { link: d.ds.Table1[0].EmailPwd }) : 'failed')
    )
  }
  public Register(data: any) {
    const url = `${this.serviceUrl}/AccountMaster/Signup`;
    const body = { Name: data.fullname, Email: data.email, Mobile: data.mobile, Password: data.password, SponserId: data.sponserid, Condition: "Insert" }
    return this.Http.post<any>(url, body).pipe(
      map(d => (d.Status_cd !== "0") ? d.ds.Table : 'failed')
    )
  }

}
