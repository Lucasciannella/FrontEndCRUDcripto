import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { provideRoutes } from '@angular/router';
import { MoedaModel } from 'src/app/models/moeda';
import { MoedaService } from 'src/app/service/Moeda.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';


const ELEMENT_DATA: MoedaModel[] = [
  {id:1, nome:"Batcoin",descricao:"Moeda do batman",dataAtualizacao: new Date  ,dataInclusao: new Date ,cotacao: 123.98},
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MoedaService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: String[] = ['id','nome','descricao','dataAtualizacao','dataInclusao','cotacao','acao'];
  dataSource!: MoedaModel[];

  constructor(
    public dialog: MatDialog,
    public moedaService: MoedaService) {
      this.moedaService.getMoedas()
      .subscribe((data:MoedaModel[])=>{
        console.log(data);
        this.dataSource = data;

      });
     }

  ngOnInit(): void {
  }

  openDialog(element: MoedaModel | null):void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        id: null,
        nome: '',
        descricao: '',
        dataAtualizacao: null,
        dataInclusao: null,
        cotacao: null,

        

      }: {
        id:element.id,
        nome:element.nome,
        descricao:element.descricao,
        dataAtualizacao:element.dataAtualizacao,
        dataInclusao:element.dataInclusao,
        cotacao:element.cotacao
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if (this.dataSource.map(p => p.id).includes(result.id)){
          this.moedaService.editMoedas(result)
            .subscribe((data:MoedaModel)=>{
              this.dataSource[result.id - 1] = data;
              this.table.renderRows();

            });
        }else{
          this.moedaService.createMoedas(result)
          .subscribe((data: MoedaModel)=>{
            this.dataSource.push(data)
            this.table.renderRows();

          });
        }

      }
    });

  }

  deleteElement(id:Number):void{
    this.moedaService.deleteMoeda(id)
    .subscribe(()=>{

      this.dataSource = this.dataSource.filter(p => p.id !== id);
    });
  }

  editElement(element:MoedaModel):void{
    this.openDialog(element);

  }

}

