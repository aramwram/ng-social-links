import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
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
  readonly faFacebook = faFacebook;
  readonly faTwitter = faTwitter;
  readonly faLinkedin = faLinkedin;
  readonly faEnvelope = faEnvelope;

  readonly defaultShareUrl = this.document.location.href;
  readonly defaultShareText = SOCIAL_SHARE_CONFIG.text;
  readonly defaultShareEmailBody = SOCIAL_SHARE_CONFIG.body;

  readonly form = this.fb.group({
    iconSet: ['fontawesome'], // or 'material'
    url: [GITHUB_LIB_URL],
    text: [''],
    body: ['']
  });

  readonly iconSetOptions = [
    { label: 'Fontawesome', value: 'fontawesome' },
    { label: 'Material Icons', value: 'material' }
  ];

  socialLinks: { [key: string]: string };

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
        value => this.setSocialLinks((({ link, text, body }) => ({ link, text, body }))(value))
      )
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private setSocialLinks(config?: { url?: string; text?: string; body?: string; }): void {
    this.socialLinks = [
      'fb',
      'tw',
      'in',
      'mail'
    ].reduce(
      (acc, provider) => {
        return { ...acc, [provider]: this.socialLinksSvc.getSocialLink(provider as any, config) };
      },
      {}
    );
  }
}
