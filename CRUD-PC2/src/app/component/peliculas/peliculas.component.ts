import { Pelicula } from './../../models/pelicula.model';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort'; 
import {NgForm} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { HttpDataService } from 'src/app/services/pelicula.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent {

PeliculasData!: Pelicula;

@ViewChild('peliculaForm', {static: false})
peliculaForm!: NgForm;

dataSource = new MatTableDataSource();
displayedColumns: string[] = ['id', 'titulo', 'director', 'anio', 'genero', 'actions'];

@ViewChild(MatPaginator, {static: true}) 
paginator!: MatPaginator;
isEditMode = false;

@ViewChild(MatSort)
Sort!: MatSort;

onSubmit(){
  if(this.peliculaForm.form.valid){
    console.log('valid');
    if(this.isEditMode){
      console.log('update');
      this.updateStudent();
    }else{
      console.log('create');
      this.addStudent();
    }
    this.cancelEdit();
  }else{
    console.log('valid data')
  }
}
  

constructor(private httpDataService: HttpDataService){
  this.PeliculasData = {} as Pelicula;
}
  
  cancelEdit(){
    this.isEditMode = false;
    this.peliculaForm.resetForm();
  }
  
  ngOnInit(): void {
    this.getAllStudents();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.Sort;
  }


  getAllStudents(){
  
    this.httpDataService.getList().subscribe((response: any)  => {
      this.dataSource.data = response;
    })
  }

  editItem(element: any){
    this.PeliculasData = element;  //VALIDAR  SI ES NECESARI
    this.isEditMode = true;
  }




//delete

deleteItem(id: string){
  this.httpDataService.deleteItem(id).subscribe((response: any) => {
    this.dataSource.data = this.dataSource.data.filter((o: any) => {
      return o.id !== id ? o : false;
    })
  })
  console.log(`XD ${this.dataSource.data}`);}

//add
addStudent(){
  this.PeliculasData.id=0;
  
  this.httpDataService.createItem(this.PeliculasData).subscribe((response: any) => {
    this.dataSource.data.push({...response});
    this.dataSource.data = this.dataSource.data.map((o: any) => {
      return o;
    })
  })
}


//update
updateStudent() {
  this.httpDataService
    .updateItem(this.PeliculasData.id, this.PeliculasData)
    .subscribe((response) => {
      this.dataSource.data = this.dataSource.data.map((o: any) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
}

}


