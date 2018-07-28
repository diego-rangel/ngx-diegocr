import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxUiHeroModule, NgxUiHeroApiModule, NgxUiHeroInputFormsModule, ApiSettings, NgxUiHeroDataGridModule, DataGridConfig } from 'ngx-ui-hero';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HighlightModule } from 'ngx-highlightjs';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { AppRoutingModule } from './app.routing.module';
import { ComponentsComponent } from './components/components.component';
import { ServicesComponent } from './services/services.component';

export const apiSettings: ApiSettings = {
  apiBaseUrl: 'http://localhost:50467/api',
  jwtAuthSettings: {
    jwtEndpointPath: '/token',
    localStoragePrefix: 'myDemoAppPrefix_',
    requestProperties: {
      usernameAuthProperty: 'emailAddress',
      passwordAuthProperty: 'password'
    },
    responseProperties: {
      accessTokenAuthProperty: 'token'
    }
  },
  errorHandlingSettings: {
    unhandledErrorTitle: 'Oops!',
    unhandledErrorMessage: 'We encountered an internal fault while performing this operation.'
  }
};

export const dataGridSettings: DataGridConfig = {
  styles: {
    striped: true,
    bordered: false,
    hoverEffect: true,
  }
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgxUiHeroModule,
    NgxUiHeroApiModule.forRoot(apiSettings),
    NgxUiHeroDataGridModule.forRoot(dataGridSettings),
    NgxUiHeroInputFormsModule.forRoot(),
    AppRoutingModule,
    AngularFontAwesomeModule,
    HighlightModule.forRoot({ theme: 'github'}),
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    GetStartedComponent,
    ComponentsComponent,
    ServicesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }