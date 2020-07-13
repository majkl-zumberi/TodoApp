import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducer } from './redux/todos/todos.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { reducers } from './redux/index';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './redux/todos/todos.effects';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileRenderComponent } from './shared/components/profile-render/profile-render.component';
import { authEffects } from './redux/user/auth.effects';
//import { HttpIntercept } from './core/services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PageNotFoundComponent,
    ProfileRenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TodosEffects,authEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [
    //{ provide: ErrorHandler, useClass: SentryErrorHandler },
    //{ provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
