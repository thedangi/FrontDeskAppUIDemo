import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpclientserviceService } from './httpclientservice.service';

@Injectable({
  providedIn: 'root'
})
export class StorageappService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private httpClientService: HttpclientserviceService) { }

  postLogin(body){
    return this.httpClientService.post(this.baseUrl + '/api/Login/CreateLogin', body)
    .pipe(map(user => {
      return user;
    })
    );
  }

  getStorageList(storageLocationID){
    return this.httpClientService.get(this.baseUrl + '/api/Storage/GetStorageList?storageLocationID=' + storageLocationID);
  }

  getStorageTypes(){
    return this.httpClientService.get(this.baseUrl + '/api/Storage/GetStorageType');
  }

  getStorageLocations(){
    return this.httpClientService.get(this.baseUrl + '/api/Storage/GetStorageLocations?SessionGuid=' + '995c234b-460f-4310-a1fc-8d80a0fd4002');
  }

  postNewCustomer(body){
    return this.httpClientService.post(this.baseUrl + '/api/Customer/AddNewCustomer', body).pipe(map(response => {
      return response;
    })
    );
  }

  postNewStorage(body){
    return this.httpClientService.post(this.baseUrl + '/api/Storage/AddStorageToStorageLocation', body).pipe(map(response => {
      return response;
    })
    );
  }

  unAssignAllCustomers(){
    return this.httpClientService.post(this.baseUrl + '/api/Storage/UnAssignAllCustomers', {}).pipe(map(response => {
      return response;
    })
    );
  }

  assignStorageToCustomer(body){
    return this.httpClientService.post(this.baseUrl + '/api/Storage/AssignStorageToCustomer', body).pipe(map(response => {
      return response;
    })
    );
  }
  
  getCustomerList(){
    return this.httpClientService.get(this.baseUrl + '/api/Customer/GetCustomerList?SessionGuid=' + '995c234b-460f-4310-a1fc-8d80a0fd4002');
  }

  getStorageListByCustomer(customerInfoID){
    return this.httpClientService.get(this.baseUrl + '/api/Storage/GetStorageListByCustomer?customerInfoID=' + customerInfoID);
  }

  
}
