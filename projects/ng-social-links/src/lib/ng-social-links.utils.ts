import {
  NgSocialLinksProvider,
  NgSocialLinksProviderConfig as Config
} from '././ng-social-links.types';
import { Providers, ProfilerUrls } from './ng-social-links.constants';

/**
 * Provides social share URL for a given provider.
 * @param provider Provider name.
 * @param config Parameters used to build a social share URL.
 */
export function getShareLink(provider: NgSocialLinksProvider, config: Partial<Config>): string {
  let { url, title, description } = config;

  if (!url) {
    throw new Error('Mandatory parameter is missing: url.');
  }

  url = encodeURIComponent(url);

  if (title) {
    title = encodeURIComponent(title);
  }

  if (description) {
    description = encodeURIComponent(description);
  }

  switch (provider) {
    case Providers.facebook:
      return `${ProfilerUrls.facebook}?u=${url}`;

    case Providers.twitter:
      return `${ProfilerUrls.twitter}?url=${url}` + (title ? `&text=${title}` : '');

    case Providers.linkedin:
      return `${ProfilerUrls.linkedin}?url=${url}` + (title ? '/&summary=' + title : '');

    case Providers.vkontakte:
      return `${ProfilerUrls.vkontakte}?url=${url}` + (title ? `&title=${title}` : '');

    case Providers.telegram:
      return `${ProfilerUrls.telegram}?url=${url}` + (title ? `&text=${title}` : '');

    case Providers.getpocket:
      return `${ProfilerUrls.getpocket}?url=${url}` + (title ? `&title=${title}` : '');

    case Providers.reddit:
      return `${ProfilerUrls.reddit}?url=${url}`;

    case Providers.evernote:
      return `${ProfilerUrls.evernote}?url=${url}` + (title ? `&t=${title}` : '');

    case Providers.pinterest:
      return `${ProfilerUrls.pinterest}?url=${url}&media=${url}` +
        (title ? `&description=${title}` : '');

    case Providers.skype:
      return `${ProfilerUrls.skype}?url=${url}&source=button` + (title ? `&text=${title}` : '');

    case Providers.whatsapp:
      return `${ProfilerUrls.whatsapp}?text=${url}` + encodeURIComponent(' ') + (title || '');

    case Providers.connectOk:
      const shareUrlParam = 'st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl';

      return `${ProfilerUrls.connectOk}?${shareUrlParam}=${url}`;

    case Providers.xing:
      return `${ProfilerUrls.xing}?op=share;url=${url}` + (title ? `;title=${title}` : '');

    case Providers.mailto:
      return (
        ProfilerUrls.mailto +
        (title ? '?subject=' + title : '') +
        (title ? '&body=' : '?body=') +
        (description ? description : '') +
        ' ' +
        url
      );

    default:
      throw new Error(`Unknown social share provider: ${provider}`);
  }
}
