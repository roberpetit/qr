import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {
  
  @Output() searchValue = new EventEmitter<string>();
  @Input() loading: boolean;
  @Input() loadingNextItem: boolean;
  @Input() minLength: number;
  @Input() title: string;
  @Input() placeholder: string;
  @Input() firstData: string;
  @Input() secondData: string;
  @Input() requiredErrorMessage: string;
  @Input() autocomplete: string;

  @Input()
  get input() {
    return this.busquedaForm.get('input');
  }
  public busquedaForm: FormGroup;
  public errorMessages;  
  params: { value: number; };

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.setFormControls();
    this.params = {value: this.minLength};
    this.errorMessages = {
      input: [
        { type: 'required', message: this.requiredErrorMessage?this.requiredErrorMessage:'required' },
        { type: 'minlength', message: 'minLength' },
      ]
    };
  }

  setFormControls() {
    this.busquedaForm = this.fb.group({
      input: ['', [Validators.required, Validators.minLength(this.minLength)]],
      firstData: [this.firstData],
      secondData: [this.secondData],
    });
    this.busquedaForm.get('firstData').disable();
    this.busquedaForm.get('secondData').disable();
  }

  search() {
    this.searchValue.emit(this.busquedaForm.get('input').value);
  }
}
