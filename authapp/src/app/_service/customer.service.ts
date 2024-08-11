import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { menu } from '../_model/user.model';
import { customer } from '../_model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  BaseUrl=environment.apiUrl
  GetAll(){
    return this.http.get<customer[]>(this.BaseUrl+'Customer/GetAll')
  }
  GetByCode(code:string){
    return this.http.get<customer>(this.BaseUrl+'Customer/Getbycode?code='+code);
  }
  CreateCustomer(_data:customer){
    return this.http.post(this.BaseUrl+'Customer/Create',_data);
  }
  UpdateCustomer(_data:customer){
    return this.http.put(this.BaseUrl+'Customer/Update?code='+_data.code,_data);
  }
  DeleteCustomer(code:string){
    return this.http.delete(this.BaseUrl+'Customer/Remove?code='+code);
  }
}
