import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { DEFAULT_SHARE_URL_CONFIG_TOKEN } from './ng-social-links.tokens';
import {
  NgSocialLinksProvider,
  NgSocialLinksProviderConfig as Config
} from '././ng-social-links.types';
import { Providers } from './ng-social-links.constants';
import * as utils from './ng-social-links.utils';

@Injectable({
  providedIn: 'root'
})
export class NgSocialLinksService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(DEFAULT_SHARE_URL_CONFIG_TOKEN) private defaultConfig: Config
  ) {}

  /**
   * Provides social share URL for a given provider.
   * Addional configuration parameters depend on a chosen provider.
   * @param provider Provider name.
   * @param config Parameters used to build a social share URL.
   */
  getSocialLink(
    provider:
      typeof Providers.facebook  |
      typeof Providers.reddit    |
      typeof Providers.connectOk,
    config?: Pick<Config, 'url'>
  ): string;
  getSocialLink(
    provider:
      typeof Providers.twitter   |
      typeof Providers.linkedin  |
      typeof Providers.vkontakte |
      typeof Providers.telegram  |
      typeof Providers.getpocket |
      typeof Providers.evernote  |
      typeof Providers.pinterest |
      typeof Providers.skype     |
      typeof Providers.whatsapp  |
      typeof Providers.xing,
    config?: Pick<Config, 'url' | 'title'>
  ): string;
  getSocialLink(provider: typeof Providers.mailto, config?: Config): string;
  getSocialLink(provider: NgSocialLinksProvider, config?: Partial<Config>): string {
    const url = config?.url || this.defaultConfig.url || this.document.location.origin;
    const title = config?.title || this.defaultConfig.title;
    const description = config?.description || this.defaultConfig.description;

    return utils.getSocialLink(provider, { url, title, description });
  }
}
