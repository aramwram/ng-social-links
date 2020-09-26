import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';

import { NgSocialLinksService } from './ng-social-links.service';
import { DEFAULT_SHARE_URL_CONFIG_TOKEN } from './ng-social-links.tokens';
import { NgSocialLinksProviderConfig } from './ng-social-links.types';

@NgModule()
export class NgSocialLinksModule {
  static forRoot(config?: NgSocialLinksProviderConfig): ModuleWithProviders<NgSocialLinksModule> {
    return {
      ngModule: NgSocialLinksModule,
      providers: [
        NgSocialLinksService,
        { provide: DEFAULT_SHARE_URL_CONFIG_TOKEN, useValue: config || {} }
      ]
    };
  }
}
