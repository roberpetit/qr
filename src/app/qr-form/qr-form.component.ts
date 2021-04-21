import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QrEntity } from '../model/qr-entity.model';

@Component({
  selector: 'app-qr-form',
  templateUrl: './qr-form.component.html',
  styleUrls: ['./qr-form.component.css']
})
export class QrFormComponent implements OnInit {

  @Input() qrElement: QrEntity;
  @Output() print = new EventEmitter();

  orderForm: FormGroup;
  initialExpirationDate: Date;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setFormControls();
  }

  setFormControls() {
    this.orderForm = this.fb.group({
      name: [this.qrElement.name, [Validators.required]],
      img: [this.qrElement.img, [Validators.required]],
      url: [this.qrElement.url, [Validators.required]],
      type: [this.qrElement.type, [Validators.required]],
      mobileDescription: [this.qrElement.mobileDescription, [Validators.required]],
      mobileImg: [this.qrElement.mobileImg, [Validators.required]],
      expiration: [null, [Validators.required]],
    });
    this.initialExpirationDate = this.qrElement.expiration;
    this.changeEndDate(this.qrElement.expiration);
    /**
     * 
     this.orderForm.valueChanges.subscribe(value => {
       this.qrElement = this.orderForm.value;
      });
      */

    this.orderForm.disable()
  }

  changeEndDate(date) {
    this.orderForm.get('expiration').setValue(date);
  }

  hasError(formcontrol) {
    return !this.orderForm.get(formcontrol).valid &&
      (this.orderForm.get(formcontrol).dirty || this.orderForm.get(formcontrol).touched);
  }

  getError(formcontrol: string) {
    return this.orderForm.get(formcontrol).errors &&
      (this.orderForm.get(formcontrol).dirty || this.orderForm.get(formcontrol).touched)
      ? this.orderForm.get(formcontrol).errors.message : null;
  }

  onSubmit() {
    this.print.emit(this.orderForm.value);
  }
}
