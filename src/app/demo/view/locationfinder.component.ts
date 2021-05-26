import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { StorageappService } from '../service/storageapp.service';

@Component({
  selector: 'app-locationfinder',
  templateUrl: './locationfinder.component.html',
  styleUrls: ['./locationfinder.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class LocationfinderComponent implements OnInit {

  locationList: any[] = [];
  storeList: any[] = [];
  location: any;
  storageDialog: boolean = false;
  bookStorage: boolean;
  assingStorageForm: FormGroup;
  selectedLocationId: number = 0;
  customers: any = [];

  constructor(private storageApiService: StorageappService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getStorageLocations();
    this.getCustomers();
    this.assingStorageForm = this.fb.group({
      customerInfoID: ["", Validators.required],
      storageID: ["", Validators.required],
    });
  }

  getStorageLocations() {
    this.storageApiService.getStorageLocations().subscribe((response: any) => {
      if (response.statuscode === 201) {
        this.locationList = response.body;
      }
    });
  }

  getStorageList(storageLocationID: number) {
    this.storeList = [];
    this.storageApiService.getStorageList(storageLocationID).subscribe((response: any) => {
      if (response.statuscode === 201) {
        this.storeList = response.body;
      }
    });
  }

  getCustomers() {
    this.storageApiService.getCustomerList().subscribe(
        (response: any) => {
            console.log(response);
            if (response.statuscode === 201) {
                this.customers = response.body;
                this.customers.forEach(element => {
                    element.name = `${element.firstName} ${element.lastName}`;
                });
            } else {
            }
        },
        (error) => {}
    );
}

  selectLocation(location: any) {
    this.location = location;
    this.selectedLocationId = location.storageLocationId;
    this.getStorageList(location.storageLocationId);
    this.showStorageDialog();
  }

  showStorageDialog() {
    this.storageDialog = true;
  }

  hideStorageDialog() {
    this.storageDialog = false;
  }

  newBooking(id: any) {
    this.bookStorage = true;
    this.assingStorageForm.patchValue({
      storageID: id
    })
  }

  hideBookingDialog() {
    this.bookStorage = false;
  }

  get customerInfoID() {
    return this.assingStorageForm.get("customerInfoID");
  }

  get storageID() {
    return this.assingStorageForm.get("storageID");
  }

  assignStorageToCustomer() {
    if (this.assingStorageForm.invalid) {
        return;
    }
    var customerInfoID = this.assingStorageForm.get("customerInfoID").value;
    var storageID = this.assingStorageForm.get("storageID").value;
    var body = {
        customerInfoID: Number(customerInfoID),
        storageID: Number(storageID),
    };
    this.storageApiService
        .assignStorageToCustomer(JSON.stringify(body))
        .subscribe((data: any) => {
            if (data.statuscode === 202) {
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "Storage Assigned",
                    life: 3000,
                });
                this.getStorageList(this.selectedLocationId);
            }else{
              this.messageService.add({severity:'error', summary:'Error', detail:'Error assigning storage'});
          }
        });
    this.bookStorage = false;
}

}
