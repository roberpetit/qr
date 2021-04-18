import { SelectionModel } from "@angular/cdk/collections";
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { TranslateService } from "@ngx-translate/core";
import { ColumnType } from "./column/column-type.enum";
import { Column } from "./column/column.model";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() selectRow = new EventEmitter();
  @Output() clickOnButton = new EventEmitter();
  @Input() elements: Array<any>;
  @Input() columns: Array<Column>;
  @Input() displayedColumns: string[]; // in order of columns to display
  @Input() loading: boolean; // for action button disable
  @Input() currency: string; // if provided: same currency for all rows, else takes element.currency
  @Input() singleSelect: boolean; // if provided: each row selection emits the row, else toggles
  @Input() multiple: boolean;
  @Input() initialSort: string;

  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(false, []);
  columnType = ColumnType;

  constructor(private translateService: TranslateService) { }

  ngOnChanges() {
    this.reloadDatasource();
  }

  ngAfterViewInit() {
    this.setPaginator();
    this.selection = new SelectionModel<any>(this.multiple, []);
  }

  setPaginator() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      if (this.paginator) {
        this.dataSource.paginator._intl.itemsPerPageLabel = this.translateService.instant(
          'itemsPerPage'
        );
        this.dataSource.sort = this.sort;
      }
    }
  }

  reloadDatasource() {
    this.dataSource = new MatTableDataSource<any>(this.elements);
  }

  select(row: any) {
    this.selection.toggle(row);
    if (this.multiple) {
      this.selectRow.emit(this.selection.selected);
    } else {
      this.selectRow.emit((this.selection.selected && this.selection.selected.length > 0) ||
      this.singleSelect ? row : null);
    }
  }

  clickButton(row: any) {
    this.clickOnButton.emit(row);
  }

  hasElements() {
    return this.elements && this.elements.length > 5;
  }
}
