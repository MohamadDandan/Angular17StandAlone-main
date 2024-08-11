import { Component, DoCheck, OnInit, effect } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { UserService } from '../../_service/user.service';
import { menu } from '../../_model/user.model';

@Component({
  selector: 'app-appmenu',
  standalone: true,
  imports: [RouterLink,MaterialModule,RouterOutlet ],
  templateUrl: './appmenu.component.html',
  styleUrl: './appmenu.component.css'
})
export class AppmenuComponent implements OnInit,DoCheck {

  menuList!:menu[];
  loginUser='';
  showMenu=false;

  constructor(
    private userService: UserService, 
    private router: Router){
      effect(()=>{
        this.menuList = this.userService._menulist();
      })
    }
 
  ngOnInit(): void {
    let userRole=localStorage.getItem('userRole') as string;
    this.userService.LoadMenuByeRole(userRole).subscribe(data=>{
      this.menuList=data;
    })
  }
  ngDoCheck(): void {
    this.loginUser=localStorage.getItem('username') as string;
    this.SetAccess();
  }
  SetAccess(){
    let userRole=localStorage.getItem('userRole');
    let currentUrl=this.router.url;
    if( currentUrl==='/register' || 
        currentUrl==='/login' || 
        currentUrl==='/resetpassword' || 
        currentUrl==='/forgetpassword'){
          this.showMenu = false;
        }else this.showMenu = true;
  }
}
