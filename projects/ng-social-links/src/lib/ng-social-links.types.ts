export type NgSocialLinksProvider =
  'fb' | // Facebook
  'tw' | // Twitter
  'li' | // Linkedin
  'mt';  // Mailto

export interface NgSocialLinksProviderConfig {
  url?: string;
  text?: string;
  body?: string;
}
