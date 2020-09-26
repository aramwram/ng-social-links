import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSocialLinksModule } from 'projects/ng-social-links/src/lib/ng-social-links.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgSocialLinksModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
