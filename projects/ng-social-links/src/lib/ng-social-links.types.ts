import {
  FACEBOOK,
  TWITTER,
  LINKEDIN,
  MAILTO
} from './ng-social-links.constants';

export type NgSocialLinksProvider =
  typeof FACEBOOK  |
  typeof TWITTER   |
  typeof LINKEDIN  |
  typeof MAILTO;

export interface NgSocialLinksProviderConfig {
  url?: string;
  text?: string;
  body?: string;
}
