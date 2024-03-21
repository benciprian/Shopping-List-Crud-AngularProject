import { Component, Inject } from '@angular/core';
import { ListProducts } from 'src/app/models/ListProducts';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {
    element!: ListProducts;
    isChange!: boolean; 
    constructor(
      @Inject(MAT_DIALOG_DATA) 
      public data: ListProducts,
      public dialogRef: MatDialogRef<ProductDialogComponent>,
    ) {}

    ngOnInit(): void {
      if(this.data.id != null) {
         this.isChange = true;
      } else {
         this.isChange = false;
      }
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }
}
