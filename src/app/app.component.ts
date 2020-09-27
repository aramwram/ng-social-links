import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faVk,
  faTelegram,
  faGetPocket,
  faReddit,
  faEvernote,
  faPinterest,
  faSkype,
  faWhatsapp,
  faXing
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { NgSocialLinksService } from 'ng-social-links';

import { SOCIAL_SHARE_CONFIG } from './app.constants';

const GITHUB_LIB_URL = 'https://github.com/aramwram/ng-social-links';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  readonly faIcons = {
    fb: faFacebook,
    tw: faTwitter,
    in: faLinkedin,
    mail: faEnvelope,
    vk: faVk,
    tg: faTelegram,
    pocket: faGetPocket,
    re: faReddit,
    ev: faEvernote,
    pi: faPinterest,
    sk: faSkype,
    wa: faWhatsapp,
    xi: faXing
  };

  readonly defaultShareUrl = this.document.location.href;
  readonly defaultShareText = SOCIAL_SHARE_CONFIG.title;
  readonly defaultShareEmailBody = SOCIAL_SHARE_CONFIG.description;

  readonly form = this.fb.group({
    url: [GITHUB_LIB_URL],
    title: [''],
    description: ['']
  });

  socialLinks: { url: string; icon: string; }[];

  private readonly sub = new Subscription();

  constructor(
    private readonly socialLinksSvc: NgSocialLinksService,
    private readonly fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.setSocialLinks(this.form.value);

    this.sub.add(
      this.form.valueChanges.pipe(
        throttleTime(500)
      ).subscribe(
        value => this.setSocialLinks(
          (({ url, title, description }) => ({ url, title, description }))(value)
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private setSocialLinks(config?: { url?: string; title?: string; description?: string; }): void {
    this.socialLinks = [
      'fb',
      'tw',
      'in',
      'mail',
      'vk',
      'tg',
      'pocket',
      're',
      'ev',
      'pi',
      'sk',
      'wa',
      'xi'
    ].map(
      provider => ({
        url: this.socialLinksSvc.getSocialLink(provider as any, config),
        icon: this.faIcons[provider]
      })
    );
  }
}
