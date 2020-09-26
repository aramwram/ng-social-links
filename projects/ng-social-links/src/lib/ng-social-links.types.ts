export enum NgSocialLinksProvider {
  Facebook = 'fb',
  Twitter = 'tw',
  Linkedin = 'li',
  Mailto = 'mt'
}

export interface NgSocialLinksProviderConfig {
  link: string;
  text?: string;
  body?: string;
}
