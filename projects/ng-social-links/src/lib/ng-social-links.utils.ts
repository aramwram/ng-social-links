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
export function getSocialLink(provider: NgSocialLinksProvider, config: Partial<Config>): string {
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
      return ProfilerUrls.facebook + '?u=' + url;

    case Providers.twitter:
      return ProfilerUrls.twitter + '?url=' + url + (title ? '&text=' + title : '');

    case Providers.linkedin:
      return ProfilerUrls.linkedin + '?url='
        + url
        + (title ? '/&summary=' + title : '');

    case Providers.mailto:
      return (
        ProfilerUrls.mailto +
        (title ? '?subject=' + title : '') +
        (title ? '&body=' : '?body=') +
        (description ? description : '') +
        ' ' +
        url
      );

    // case Providers.linkedin:
    //   return 'https://vk.com/share.php?url={0}&title={1}'
    //     + url
    //     + (title ? '/&summary=' + title : '');

    default:
      throw new Error(`Unknown social share provider: ${provider}`);
  }
}
