import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ListProducts } from 'src/app/models/ListProducts';
import { ProductDialogComponent } from 'src/app/shared/product-dialog/product-dialog.component';
import { Sort } from '@angular/material/sort';


const ELEMENT_DATA: ListProducts[] = [
  {id: 1, name: 'Sugar', quantity: 2, boughtAtPrice: 12, bought: true, totalPrice: 24},
  {id: 2, name: 'Potato', quantity: 4.5, boughtAtPrice: 2, bought: false,totalPrice: 9},
  {id: 3, name: 'Oil', quantity: 3, boughtAtPrice: 15, bought: true, totalPrice: 45},
  {id: 4, name: 'Bread', quantity: 2, boughtAtPrice: 2, bought: false, totalPrice: 4},
];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @ViewChild(MatTable)
  table!:MatTable<any>;
  displayedColumns: string[] = ['id', 'name', 'quantity', 'boughtAtPrice','bought','totalPrice','actions'];
  dataSource = ELEMENT_DATA;
  sortedData: ListProducts[] = [];

  constructor(public dialog: MatDialog) {
    this.sortedData = this.dataSource.slice();
  }
  

  openDialog(element: ListProducts | null): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: element === null ? {
        id: null,
        name: '',
        quantity: null,
        boughtAtPrice: null,
        bought: false,
        totalPrice: null,
      } : {
        id: element.id,
        name: element.name,
        quantity: element.quantity,
        boughtAtPrice: element.boughtAtPrice,
        bought: element.bought,
        totalPrice: element.totalPrice,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.dataSource[result.id - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });

  }
  
  editElement(element:ListProducts): void {
    this.openDialog(element);
  }
  
  deleteElement(id: number): void {
    this.dataSource = this.dataSource.filter(p => p.id !== id);
  }

  filterByBought(bought: boolean) {
    this.dataSource = ELEMENT_DATA.filter(p => p.bought === bought); // Filter by 'bought' property
  }
  
  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'totalPrice':
          return compare(a.totalPrice, b.totalPrice, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
