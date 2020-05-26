import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserService } from './service/user.service';
import { RouterModule } from '@angular/router';
import { MemeService } from './service/meme.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatSnackBarModule
  ],
  providers: [
    UserService,
    MemeService
  ]
})
export class CoreModule { }
