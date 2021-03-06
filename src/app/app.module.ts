import { GamePatternService } from './services/behavior-subject-services/gamePattern.service';
import { UserService } from './services/behavior-subject-services/user.service';
import { OpenSignInModalService } from './services/behavior-subject-services/sign-in.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { SignInModalComponent } from './sign-in-modal/sign-in-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { gamePatternReducer } from './gamePattern/reducers/gamePattern.reducer';
import { ModeToggleComponent } from './mode-toggle/mode-toggle.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { UserPopoverComponent } from './user-popover/user-popover.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    NavbarComponent,
    PlayButtonComponent,
    SignInModalComponent,
    ModeToggleComponent,
    SidebarComponent,
    UserPopoverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    StoreModule.forRoot({ gamePatterns: gamePatternReducer }),
  ],
  providers: [OpenSignInModalService, UserService, GamePatternService],
  bootstrap: [AppComponent],
})
export class AppModule {}
