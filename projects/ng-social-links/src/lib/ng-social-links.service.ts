import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { DEFAULT_SHARE_URL_CONFIG_TOKEN } from './ng-social-links.tokens';
import {
  NgSocialLinksProvider,
  NgSocialLinksProviderConfig as Config
} from '././ng-social-links.types';

@Injectable({
  providedIn: 'root'
})
export class NgSocialLinksService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(DEFAULT_SHARE_URL_CONFIG_TOKEN) private defaultConfig: Config
  ) {}

  getSocialLink(provider: 'fb', config?: Pick<Config, 'url'>): string;
  getSocialLink(
    provider: 'tw' | 'li',
    config?: Pick<Config, 'url' | 'text'>
  ): string;
  getSocialLink(provider: 'mt', config?: Config): string;
  getSocialLink(provider: NgSocialLinksProvider, config?: Partial<Config>): string {
    const url = config?.url || this.defaultConfig.url || this.document.location.href;
    const text = config?.text || this.defaultConfig.text;
    const body = config?.body || this.defaultConfig.body;

    if (!url) {
      throw new Error('Mandatory parameter is missing: url.');
    }

    switch (provider) {
      case 'fb':
        return 'https://www.facebook.com/sharer/sharer.php?u=' + url;

      case 'tw':
        return 'https://twitter.com/intent/tweet?url=' + url + (text ? '&text=' + text : '');

      case 'li':
        return 'https://www.linkedin.com/sharing/share-offsite/?url=' + url + (text ? '/&summary=' + text : '');

      case 'mt':
        return (
          'mailto:' +
          (text ? '?subject=' + text : '') +
          (text ? '&body=' : '?body=') +
          (body ? body : '') +
          ' ' +
          url
        );

      default:
        throw new Error(`Unknown social share provider: ${provider}`);
    }
  }
}
