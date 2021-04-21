import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnChanges, OnInit {

  @Input() minDate = new Date();
  @Input() initialDate = null;
  @Input() label;
  @Input() disabled;
  @Output() selectedDate = new EventEmitter();

  date: any;

  constructor() { }

  ngOnInit() {
    if (this.initialDate)
      this.date = this.initialDate;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.date && this.date < changes.minDate.currentValue) {
      this.dateChange({value:changes.minDate.currentValue});
    }
  }

  dateChange(event) {
    this.selectedDate.emit(event.value);
    this.date = event.value;
  }
}
