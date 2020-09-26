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

  getSocialLink(provider: NgSocialLinksProvider.Facebook, config?: Pick<Config, 'link'>): string;
  getSocialLink(
    provider: NgSocialLinksProvider.Twitter | NgSocialLinksProvider.Linkedin,
    config?: Pick<Config, 'link' | 'text'>
  ): string;
  getSocialLink(provider: NgSocialLinksProvider.Mailto, config?: Config): string;
  getSocialLink(provider: NgSocialLinksProvider, config?: Partial<Config>): string {
    const link = config?.link || this.defaultConfig.link || this.document.location.href;
    const text = config?.text || this.defaultConfig.text;
    const body = config?.body || this.defaultConfig.body;

    if (!link) {
      throw new Error('Mandatory parameter is missing: link.');
    }

    switch (provider) {
      case NgSocialLinksProvider.Facebook:
        return 'https://www.facebook.com/sharer/sharer.php?u=' + link;

      case NgSocialLinksProvider.Twitter:
        return 'https://twitter.com/intent/tweet?url=' + link + (text ? '&text=' + text : '');

      case NgSocialLinksProvider.Linkedin:
        return 'https://www.linkedin.com/sharing/share-offsite/?url=' + link + (text ? '/&summary=' + text : '');

      case NgSocialLinksProvider.Mailto:
        return (
          'mailto:' +
          (text ? '?subject=' + text : '') +
          (text ? '&body=' : '?body=') +
          (body ? body : '') +
          ' ' +
          link
        );

      default:
        throw new Error(`Unknown social share provider: ${provider}`);
    }
  }
}
