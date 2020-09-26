# Description
Headless social share for Angular. Provides straightforward API for getting social share URLs which can be used in your templates.

[![npm version](https://badge.fury.io/js/ng-social-links.svg)](https://badge.fury.io/js/ng-social-links)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/aramwram/ng-social-links/blob/master/LICENSE.md)
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

ng-social-links advantages:
 * Native to Angular.
 * Configurable - you can globally define share URL, text and email body at module import.
 * Well typed - it's clear which parameters are relevant to every social share provider.
 * Works well in SSR mode.

# Usage
Install package
```sh
npm i ng-social-links
```
Add import to your module
```js
import { NgSocialLinksModule } from 'ng-social-links';

@NgModule({
  imports: [
    ...
    NgSocialLinksModule.forRoot(),
    ],
  declarations: [],
  providers: []
})
```
Inject the service:
```js
import { NgSocialLinksService } from 'ng-social-links';

class SomeComponent {
  constructor(private socialLinks: NgSocialLinksService) {}
}
````
Get the socail share link:
```js
facebookShareLink = this.socialLinks.getSocialLink('fa');
```
With additional parameters:
```js
twitterShareLink = this.socialLinks.getSocialLink('tw', { text: 'Visit my website!' });
```

## Configuration
The configuration interface looks like this:
```js
interface Config {
  url?: string;
  text?: string;
  body?: string;
}
```
By default `document.location.href` is used for `url`, `text` and `body` are empty.

You can define another defaults as follows:
```js
NgSocialLinksModule.forRoot({ url: 'htts://my-website.com' })
```
Or
```js
NgSocialLinksModule.forRoot({ text: 'Visit my website!', body: 'Default email body...' })
```

ng-social-links is headless, so you're free to use whatever you like in a template. e.g. text links, icons, buttons, you name it. For example:
```html
<a [attr.href]="facebookShareLink">
  <fa-icon [icon]="faFacebook"></fa-icon>
</a>
```

# Demo
Currently, demo is only available on localhost:
 * Clone the GitHub repo.
 * Install dependencies: `npm install`.
 * Run the demo website: `npm start`.
 * Open your browser at http://localhost:4200.

# Contributig to ng-social-links
You more than welcome to improve this library (for example, add missing social share providers) or create issues on the GitHub issue tracker.
