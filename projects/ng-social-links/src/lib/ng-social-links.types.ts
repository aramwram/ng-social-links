import { Providers } from './ng-social-links.constants';

export type NgSocialLinksProvider =
  typeof Providers.facebook    |
  typeof Providers.twitter     |
  typeof Providers.linkedin    |
  typeof Providers.mailto      |
  typeof Providers.vkontakte   |
  typeof Providers.telegram    |
  typeof Providers.getpocket   |
  typeof Providers.reddit      |
  typeof Providers.evernote    |
  typeof Providers.pinterest   |
  typeof Providers.skype       |
  typeof Providers.whatsapp    |
  typeof Providers.connectOk   |
  typeof Providers.xing;

export interface NgSocialLinksProviderConfig {
  url?: string;
  title?: string;
  description?: string;
}
