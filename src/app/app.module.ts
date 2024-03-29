import { UsersService } from './services/behavior-subject-services/users.service';
import { GameScoresModalService } from './services/behavior-subject-services/game-scores.service';
import { GamePatternService } from './services/behavior-subject-services/gamePattern.service';
import { UserService } from './services/behavior-subject-services/user.service';
import { SignInModalService } from './services/behavior-subject-services/sign-in-modal.service';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserPopoverComponent } from './user-popover/user-popover.component';
import { AuthInterceptor } from 'src/app/interceptors/auth-interceptor';
import { LogOutComponent } from './log-out/log-out.component';
import { ScoresModalComponent } from './scores-modal/scores-modal.component';
import { UserPopoverService } from './services/behavior-subject-services/user-popover-service';
import { BackgroundColorsService } from './services/behavior-subject-services/backgroundColors.services';

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
    LogOutComponent,
    ScoresModalComponent,
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
  providers: [
    GameScoresModalService,
    SignInModalService,
    UserService,
    GamePatternService,
    UserPopoverService,
    BackgroundColorsService,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
