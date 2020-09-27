import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { DEFAULT_SHARE_URL_CONFIG_TOKEN } from './ng-social-links.tokens';
import {
  NgSocialLinksProvider,
  NgSocialLinksProviderConfig as Config
} from '././ng-social-links.types';
import {
  FACEBOOK,
  TWITTER,
  LINKEDIN,
  MAILTO
} from './ng-social-links.constants';
import * as utils from './ng-social-links.utils';

@Injectable({
  providedIn: 'root'
})
export class NgSocialLinksService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(DEFAULT_SHARE_URL_CONFIG_TOKEN) private defaultConfig: Config
  ) {}

  getSocialLink(provider: typeof FACEBOOK, config?: Pick<Config, 'url'>): string;
  getSocialLink(
    provider: typeof TWITTER | typeof LINKEDIN,
    config?: Pick<Config, 'url' | 'text'>
  ): string;
  getSocialLink(provider: typeof MAILTO, config?: Config): string;
  getSocialLink(provider: NgSocialLinksProvider, config?: Partial<Config>): string {
    const url = config?.url || this.defaultConfig.url || this.document.location.href;
    const text = config?.text || this.defaultConfig.text;
    const body = config?.body || this.defaultConfig.body;

    return utils.getSocialLink(provider, { url, text, body });
  }
}
