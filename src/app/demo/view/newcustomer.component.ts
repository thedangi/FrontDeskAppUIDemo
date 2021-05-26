import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AppBreadcrumbService } from '../../app.breadcrumb.service';
import { StorageappService } from '../service/storageapp.service';

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class NewcustomerComponent implements OnInit {

  customerDialog: boolean;
  addCustomerDialog: boolean;
  customers: any[];
  customer: any;
  loading: boolean = false;
  submitted: boolean;
  cols: any[];
  customerForm: FormGroup;

  constructor(private _storageService: StorageappService, private messageService: MessageService,
    private fb: FormBuilder, private breadcrumbService: AppBreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard', routerLink: [''] },
      { label: 'Customers' }
    ]);
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'address', header: 'Address' },
      { field: 'addedDate', header: 'Added Date' }
    ];
    this.getCustomers();
  }

  getCustomers() {
    this.loading = true;
    this._storageService.getCustomerList().subscribe(
      (response: any) => {
        console.log(response);
        if (response.statuscode === 201) {
          this.loading = false;
          this.customers = response.body;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getStorageListByCustomer(customer) {
    this.customer = customer;
    this.customer.storageList = [];
    this._storageService.getStorageListByCustomer(customer.customerInfoId).subscribe(
      (response: any) => {
        console.log(response);
        if (response.statuscode === 201) {
            this.customer.storageList = response.body;
            this.customerDialog = true;
        } else {
        }
      },
      (error) => {
      }
    );
  }

  openNew() {
    this.submitted = false;
    this.addCustomerDialog = true;
  }

  hideDialog() {
    this.addCustomerDialog = false;
    this.submitted = false;
  }

  hideDetailDialog() {
    this.customerDialog = false;
  }

  showDetailDialog(customer) {
    this.getStorageListByCustomer(customer);
  }

  addCustomer() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    var firstName = this.customerForm.get('firstName').value;
    var lastName = this.customerForm.get('lastName').value;
    var email = this.customerForm.get('email').value;
    var phone = this.customerForm.get('phone').value;
    var address = this.customerForm.get('address').value;
    var body = { "firstName": firstName, "lastName": lastName, "email": email, "phone": phone, "address": address };
    this._storageService.postNewCustomer(JSON.stringify(body)).subscribe((data: any) => {
      if (data.statuscode === 202) {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customer Added', life: 3000 });
        this.addCustomerDialog = false;
        this.getCustomers();
      }else{
        this.messageService.add({severity:'error', summary:'Error', detail:'Error adding customer'});
    }
    });
  }

  get firstName() {
    return this.customerForm.get("firstName");
  }

  get lastName() {
    return this.customerForm.get("lastName");
  }

  get email() {
    return this.customerForm.get("email");
  }

  get phone() {
    return this.customerForm.get("phone");
  }

  get address() {
    return this.customerForm.get("address");
  }

}
