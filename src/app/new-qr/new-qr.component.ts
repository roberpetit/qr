import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
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
  save: string;

  constructor(
    private fb: FormBuilder,
    private qrService: QrService,
    private router: Router) { }

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
  }

  changeEndDate(date) {
    this.orderForm.get('expiration').setValue(date);
  }

  onSubmit() {
    this.qrService.saveOrder(this.orderForm.value).subscribe((data:QrEntity) => {
      console.log("SUCCESS saving: ", data)
      this.save = JSON.stringify(data, undefined, 4);
      this.router.navigate(['/show', { id: data.id }]);
    }, error => {
      console.log("ERROR saving : ", error)
      this.save = JSON.stringify(error);
    })
  }

}
