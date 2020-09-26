import { InjectionToken } from '@angular/core';

import { NgSocialLinksProviderConfig } from './ng-social-links.types';

export const DEFAULT_SHARE_URL_CONFIG_TOKEN = new InjectionToken<NgSocialLinksProviderConfig>(
  'ng-default-social-share-config'
);
