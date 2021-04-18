import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { QrEntity } from '../model/qr-entity.model';
import { QrService } from '../service/qr.service';

@Component({
  selector: 'app-new-qr',
  templateUrl: './new-qr.component.html',
  styleUrls: ['./new-qr.component.css']
})
export class NewQrComponent implements OnInit {

  orderForm: FormGroup;
  initialDate: Date;
  initialEndDate: Date;
  contracts: any;
  allContracts: any;
  typeEnums: string[];
  serverTime: Date;
  @Input()
  qr: QrEntity;

  constructor(
    private fb: FormBuilder,
    private qrService: QrService) { }

  ngOnInit() {
    if (!this.qr) {
      this.qr = new QrEntity();
    }
    this.setFormControls();
    this.getCurrentServerTime();
    this.typeEnums = [];
  }

  setFormControls() {
    this.orderForm = this.fb.group({
      orderNumber: [this.qr.orderNumber, [Validators.required]],
      amount: [this.qr.amount, [this.isNumeric()]],
      validFrom: [null, [Validators.required]],
      validTo: [null],
      type: [this.qr.type, [Validators.required]]
    });
    this.initialDate = this.qr.validFrom;
    this.initialEndDate = this.qr.validTo;
    this.orderForm.valueChanges.subscribe(value => {
      this.qr = this.orderForm.value;
    });
  }

  changeStartDate(date) {
    if (date < this.serverTime) {
      date = this.serverTime;
    }
    this.orderForm.get('validFrom').setValue(date);
    if (this.orderForm.get('validFrom').value < date) {
      this.orderForm.get('validTo').setValue(date);
    }
  }

  changeEndDate(date) {
    this.orderForm.get('validTo').setValue(date);
  }

  selectCheckContract(contracts) {
    this.orderForm.get('contracts').setValue(contracts);
  }

  isNumeric(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const numberPattern = /^-?(0|[1-9]\d*)?$/;
      const isNumeric = numberPattern.test(control.value);
      return isNumeric ? null : {value: control.value, message: "order.numeric"};
    };
  }

  hasError(formcontrol) {
    return !this.orderForm.get(formcontrol).valid  && 
    (this.orderForm.get(formcontrol).dirty || this.orderForm.get(formcontrol).touched);
  }

  getError(formcontrol: string) {
    return this.orderForm.get(formcontrol).errors && 
    (this.orderForm.get(formcontrol).dirty || this.orderForm.get(formcontrol).touched)
    ?this.orderForm.get(formcontrol).errors.message:null;
  }

  getCurrentServerTime() {
    this.qrService
  }
}
