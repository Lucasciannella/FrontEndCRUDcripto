import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MoedaModel } from 'src/app/models/moeda';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {
  element!: MoedaModel;
  isChange!: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: MoedaModel,
    public diaLogRef: MatDialogRef<ElementDialogComponent>,
  ) { }


  ngOnInit(): void {
    if(this.data.id!= null){
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  onCancel(): void{
    this.diaLogRef.close();
  }

}
