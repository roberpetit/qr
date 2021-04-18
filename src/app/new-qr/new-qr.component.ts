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
  initialExpirationDate: Date;
  @Input()
  qr: QrEntity;

  constructor(
    private fb: FormBuilder,
    private qrService: QrService) { }

  ngOnInit() {
    if (!this.qr) {
      this.qr = new QrEntity();
      this.qr.expiration = new Date();
    }
    this.setFormControls();
  }

  setFormControls() {
    this.orderForm = this.fb.group({
      name: [this.qr.name, [Validators.required]],
      img: [null, [Validators.required]],
      url: [null, [Validators.required]],
      type: [this.qr.type, [Validators.required]],
      mobileDescription: [null, [Validators.required]],
      mobileImg: [null, [Validators.required]],
      expiration: [null, [Validators.required]],
    });
    this.initialExpirationDate = this.qr.expiration;
    this.orderForm.valueChanges.subscribe(value => {
      this.qr = this.orderForm.value;
    });

    this.searchForm = this.fb.group({
      id: [null, [Validators.required]],
    });
  }

  changeEndDate(date) {
    this.orderForm.get('expiration').setValue(date);
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

  onSubmit() {
    this.qrService.saveOrder(this.orderForm.value).subscribe(data => {
      console.log("SUCCESS saving: ", data)
    }, error => {
      console.log("ERROR saving : ", error)
    })
  }


  searchForm: FormGroup;

  onSubmitSearch() {
    this.qrService.getQr(this.searchForm.get('id').value).subscribe(data => {
      console.log("SUCCESS saving: ", data)
    }, error => {
      console.log("ERROR saving : ", error)
    })
  }
}
