import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NewQrComponent } from './new-qr/new-qr.component';
import { QrService } from './service/qr.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ComponentModule } from './component/component.module';
import { CommonModule } from '@angular/common';
import { GeneratorComponent } from './generator/generator.component';
import { HomeComponent } from './home/home.component';
import { ShowQrComponent } from './show-qr/show-qr.component';
import { QrFormComponent } from './qr-form/qr-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NewQrComponent,
    GeneratorComponent,
    HomeComponent,
    ShowQrComponent,
    QrFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    QRCodeModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ComponentModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    QrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}