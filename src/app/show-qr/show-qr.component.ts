import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QrEntity } from '../model/qr-entity.model';
import { QrService } from '../service/qr.service';
import { environment } from 'src/environments/environment';
import { jsPDF } from "jspdf";

import html2canvas from "html2canvas";

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
  
  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(
    private fb: FormBuilder,
    private qrService: QrService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.searchForm = this.fb.group({
      id: [this.id, [Validators.required]],
    });
    if (this.id) {
      this.onSubmitSearch()
    }
  }

  searchForm: FormGroup;

  onSubmitSearch() {
    this.qrService.getQr(this.searchForm.get('id').value).subscribe((data: QrEntity) => {
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

    let DATA = document.getElementById('htmlData');
    let doc = new jsPDF("p", "mm", "a4", true);
    doc.html(DATA, {
      callback: (doc) => {
        console.log("DOC: ",doc)
        doc.save("qr.pdf");
      }
    });
    /*
    let content = window.document.getElementById("content");

    doc.canvas.height = 72 * 11;
    doc.canvas.width = 720 * 8.5;
    
    let doc = new jsPDF("p", "mm", "a4", true);
    doc.html(content, {
      callback: (doc) => {
        doc.save("algo.pdf");
      }
    });


    /**
     * 
     // Get the element to export into pdf
     let pdfContent = window.document.getElementById("content");
     
     // Use html2canvas to apply CSS settings
     html2canvas(pdfContent).then((canvas) =>
     {
       console.log(canvas)
       var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('l', 'mm', 'a4', true);
      
      // Add image Canvas to PDF
      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      
      return doc;
    }).then((doc) => {
      doc.save('postres.pdf');  
    });
    */
  }

}
