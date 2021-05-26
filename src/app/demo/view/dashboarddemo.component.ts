import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MenuItem, MessageService } from "primeng/api";
import { Stores } from "../domain/stores";
import { AppBreadcrumbService } from "../../app.breadcrumb.service";
import { AppMainComponent } from "../../app.main.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StorageappService } from "../service/storageapp.service";

@Component({
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.scss"],
    providers: [MessageService, ConfirmationService],
})
export class DashboardDemoComponent implements OnInit {

    storeList: Stores[];
    storeListCopy: Stores[];

    storageTypes: any[] = [];

    openAddCustomer: boolean;
    bookStorage: boolean;
    customerForm: FormGroup;
    assingStorageForm: FormGroup;

    submitted: boolean;
    selectedIDForFilter: number = -1;
    customers: any = [];

    constructor(
        private breadcrumbService: AppBreadcrumbService,
        private fb: FormBuilder,
        private storageApiService: StorageappService,
        private messageService: MessageService
    ) {
        this.breadcrumbService.setItems([]);
    }

    ngOnInit() {
        this.customerForm = this.fb.group({
            storageTypeID: ["", Validators.required],
            customerInfoID: [0, Validators.required],
            storeIdentifier: [ '', Validators.required],
            price: ["", Validators.required],
        });

        this.assingStorageForm = this.fb.group({
            customerInfoID: [ "", Validators.required],
            storageID: [ "", Validators.required],
        });

        this.getStorageList();
        this.getStorageTypes();
        this.getCustomers();
    }

    getStorageList() {
        this.storageApiService.getStorageList(1).subscribe((response: any) => {
            if (response.statuscode === 201) {
                console.log(response.body);
                this.storeList = response.body;
                this.storeListCopy = response.body;
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

    getStorageTypes() {
        this.storageApiService.getStorageTypes().subscribe((response: any) => {
            if (response.statuscode === 201) {
                console.log(response.body);
                this.storageTypes = response.body;
                this.storageTypes.unshift({
                    storageTypeId: -1,
                    name: "All",
                    description: "All",
                    dateAdded: "2021-05-26T03:25:11.733",
                });
            }
        });
    }

    unAssignAllCustomers() {
        this.storageApiService.unAssignAllCustomers().subscribe((response: any) => {
            if (response.statuscode === 202) {
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "Unassigned All Customers",
                    life: 3000,
                });
                this.getStorageList();
            }else{
                this.messageService.add({severity:'error', summary:'Error', detail:'Error on unassigning all customers'});
            }
        });
    }

    addNewCustomer() {
        this.openAddCustomer = true;
    }

    newBooking(id: any) {
        this.bookStorage = true;
        this.assingStorageForm.patchValue({
            storageID: id
        })
    }

    hideDialog() {
        this.openAddCustomer = false;
    }

    hideBookingDialog() {
        this.bookStorage = false;
    }

    addStorage() {
        this.submitted = true;

        console.log("Executing add new customer");

        if (this.customerForm.invalid) {
            return;
        }

        console.log("Executing add new ");

        var storageTypeID = this.customerForm.get("storageTypeID").value;

        var customerInfoID = this.customerForm.get("customerInfoID").value;

        var storeIdentifier = this.customerForm.get("storeIdentifier").value;

        var price = this.customerForm.get("price").value;

        var body = {
            storageTypeID: Number(storageTypeID),
            customerInfoID: Number(customerInfoID),
            storeIdentifier: Number(storeIdentifier),
            price: Number(price),
            sessionGuid: "995c234b-460f-4310-a1fc-8d80a0fd4002",
        };

        this.storageApiService
            .postNewStorage(JSON.stringify(body))
            .subscribe((data: any) => {
                if (data.statuscode === 202) {
                    this.messageService.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Storage Added",
                        life: 3000,
                    });
                    this.getStorageList();
                }else{
                    this.messageService.add({severity:'error', summary:'Error', detail:'Error adding storage'});
                }
            });

        this.openAddCustomer = false;
    }

    assignStorageToCustomer() {
        this.submitted = true;

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
                    this.getStorageList();
                }else{
                    this.messageService.add({severity:'error', summary:'Error', detail:'Error assigning storage'});
                }
            });

        this.bookStorage = false;
    }

    get storageTypeID() {
        return this.customerForm.get("storageTypeID");
    }

    get customerInfoID() {
        return this.customerForm.get("customerInfoID");
    }

    get storeIdentifier() {
        return this.customerForm.get("storeIdentifier");
    }

    get price() {
        return this.customerForm.get("price");
    }

    get storageCustomerInfoID() {
        return this.assingStorageForm.get("customerInfoID");
    }
    get storageID() {
        return this.assingStorageForm.get("storageID");
    }

    onChange(ID) {
        this.selectedIDForFilter = ID;
        this.filter();
    }

    filter() {
        if (this.selectedIDForFilter === -1) {
            this.storeList = this.storeListCopy;
            return;
        }
        this.storeList = this.storeListCopy.filter(
            (rec) => rec.storageTypeId == this.selectedIDForFilter
        );
    }
}
