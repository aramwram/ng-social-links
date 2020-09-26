import { TestBed } from '@angular/core/testing';

import { NgSocialLinksService } from './ng-social-links.service';
import { DEFAULT_SHARE_URL_CONFIG_TOKEN } from './ng-social-links.tokens';

const LOCAL_URL = 'http://localhost:9876';
const DEFAULT_URL = 'http://default-domain.com';
const TEST_URL = 'http://test-domain.com';
const TEST_TEXT = 'Test text';
const TEST_BODY = 'Test body';

describe('NgSocialLinksService [no default configuration]', () => {
  let service: NgSocialLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DEFAULT_SHARE_URL_CONFIG_TOKEN, useValue: {} }]
    });
    service = TestBed.inject(NgSocialLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use current localtion as a share link', () => {
    expect(
      service.getSocialLink('fb')
    ).toEqual(
      `https://www.facebook.com/sharer/sharer.php?u=${LOCAL_URL}/context.html`
    );

    expect(
      service.getSocialLink('tw')
    ).toEqual(
      `https://twitter.com/intent/tweet?url=${LOCAL_URL}/context.html`
    );

    expect(
      service.getSocialLink('li')
    ).toEqual(
      `https://www.linkedin.com/sharing/share-offsite/?url=${LOCAL_URL}/context.html`
    );

    expect(
      service.getSocialLink('mt')
    ).toEqual(
      `mailto:?body= ${LOCAL_URL}/context.html`
    );
  });

  it('should apply provided parameters', () => {
    expect(
      service.getSocialLink('fb', { url: TEST_URL })
    ).toEqual(
      `https://www.facebook.com/sharer/sharer.php?u=${TEST_URL}`
    );

    expect(
      service.getSocialLink(
        'tw',
        { url: TEST_URL, text: TEST_TEXT }
      )
    ).toEqual(
      `https://twitter.com/intent/tweet?url=${TEST_URL}&text=${TEST_TEXT}`
    );

    expect(
      service.getSocialLink(
        'li',
        { url: TEST_URL, text: TEST_TEXT }
      )
    ).toEqual(
      `https://www.linkedin.com/sharing/share-offsite/?url=${TEST_URL}/&summary=${TEST_TEXT}`
    );

    expect(
      service.getSocialLink(
        'mt',
        { url: TEST_URL, text: TEST_TEXT, body: TEST_BODY }
      )
    ).toEqual(
      `mailto:?subject=${TEST_TEXT}&body=${TEST_BODY} ${TEST_URL}`
    );
  });
});

describe('NgSocialLinksService [specific default configuration]', () => {
  let service: NgSocialLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: DEFAULT_SHARE_URL_CONFIG_TOKEN,
        useValue: { url: DEFAULT_URL, text: 'Default text', body: 'Default body' }
      }]
    });
    service = TestBed.inject(NgSocialLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use current default share link provided in module configuration', () => {
    expect(
      service.getSocialLink('fb')
    ).toEqual(
      `https://www.facebook.com/sharer/sharer.php?u=${DEFAULT_URL}`
    );

    expect(
      service.getSocialLink('tw')
    ).toEqual(
      `https://twitter.com/intent/tweet?url=${DEFAULT_URL}&text=Default text`
    );

    expect(
      service.getSocialLink('li')
    ).toEqual(
      `https://www.linkedin.com/sharing/share-offsite/?url=${DEFAULT_URL}/&summary=Default text`
    );

    expect(
      service.getSocialLink('mt')
    ).toEqual(
      `mailto:?subject=Default text&body=Default body ${DEFAULT_URL}`
    );
  });

  it('should apply provided parameters', () => {
    expect(
      service.getSocialLink('fb', { url: TEST_URL })
    ).toEqual(
      `https://www.facebook.com/sharer/sharer.php?u=${TEST_URL}`
    );

    expect(
      service.getSocialLink(
        'tw',
        { url: TEST_URL, text: TEST_TEXT }
      )
    ).toEqual(
      `https://twitter.com/intent/tweet?url=${TEST_URL}&text=${TEST_TEXT}`
    );

    expect(
      service.getSocialLink(
        'li',
        { url: TEST_URL, text: TEST_TEXT }
      )
    ).toEqual(
      `https://www.linkedin.com/sharing/share-offsite/?url=${TEST_URL}/&summary=${TEST_TEXT}`
    );

    expect(
      service.getSocialLink(
        'mt',
        { url: TEST_URL, text: TEST_TEXT, body: TEST_BODY }
      )
    ).toEqual(
      `mailto:?subject=${TEST_TEXT}&body=${TEST_BODY} ${TEST_URL}`
    );
  });
});
