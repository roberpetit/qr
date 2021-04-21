import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QrEntity } from '../model/qr-entity.model';
import { QrService } from '../service/qr.service';
import { environment } from 'src/environments/environment';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-show-qr',
  templateUrl: './show-qr.component.html',
  styleUrls: ['./show-qr.component.css']
})
export class ShowQrComponent implements OnInit {
  search: string;
  id: string;
  url: string;
  show_url: string = environment.qrSearch;
  qrElement: QrEntity;

  constructor(
    private fb: FormBuilder,
    private qrService: QrService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.searchForm = this.fb.group({
      id: [this.id, [Validators.required]],
    });
    if(this.id) {
      this.onSubmitSearch()
    }
  }

  searchForm: FormGroup;

  onSubmitSearch() {
    this.qrService.getQr(this.searchForm.get('id').value).subscribe((data:QrEntity) => {
      console.log("SUCCESS search: ", data)
      this.search = JSON.stringify(data, undefined, 4);;
      this.url = this.show_url + data.id;
      this.qrElement = data;
    }, error => {
      console.log("ERROR search : ", error)
      this.search = JSON.stringify(error);
    })
  }

  
  printQR(event?) {
    console.log(event)

    const options = {
      margin:       1,
      filename: 'qr.pdf',
      image: {type: 'jpeg'},
      html2canvas: {},
      jsPDF:{orientation:'landscape'}
    }

    const pdfContent: Element = document.getElementById('pdfContent');
    html2pdf()
    .from(pdfContent)
    .set(options)
    .save();
  }

}
