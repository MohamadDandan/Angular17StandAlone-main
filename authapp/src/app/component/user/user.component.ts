import { MatPaginator } from '@angular/material/paginator';
import { users } from '../../_model/user.model';
import { MaterialModule } from './../../material.module';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  userlist!: users[];
  displayColumns:string[]=[
    "username", 
    "name", 
    "email", 
    "phone",
    "status",
    "role",
    "action"];
  dataSource:any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService:UserService, 
    private toastr:ToastrService,
    private dialog:MatDialog) {
    }
  ngOnInit(): void {
    
    this.LoadUsers();
  }


  LoadUsers(){
    this.userService.GetAllUsers().subscribe(data=>{
      this.userlist = data;
      this.dataSource = new MatTableDataSource<users>(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  fnUpdateRole(code: string) {
    this.OpenPopup(code,'role');
    }
    fnUpdateStatus(code: string) {  
      this.OpenPopup(code,'status');
    }
    OpenPopup(username:string,type:string){
      this.dialog.open(UserUpdateComponent,{
        width:'30%',
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'1000ms',
        data:{
          username:username,
          type:type
        }
      }).afterClosed().subscribe(data=>{
        this.LoadUsers();
      });
    }
   
}
