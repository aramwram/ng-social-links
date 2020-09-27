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

export function getSocialLink(provider: NgSocialLinksProvider, config: Partial<Config>): string {
  const { url, text, body } = config;

  if (!url) {
    throw new Error('Mandatory parameter is missing: url.');
  }

  switch (provider) {
    case FACEBOOK:
      return 'https://www.facebook.com/sharer/sharer.php?u=' + url;

    case TWITTER:
      return 'https://twitter.com/intent/tweet?url=' + url + (text ? '&text=' + text : '');

    case LINKEDIN:
      return 'https://www.linkedin.com/sharing/share-offsite/?url=' + url + (text ? '/&summary=' + text : '');

    case MAILTO:
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
