import { TestBed } from '@angular/core/testing';

import { NgSocialLinksService } from './ng-social-links.service';
import { DEFAULT_SHARE_URL_CONFIG_TOKEN } from './ng-social-links.tokens';
import { Providers, ProfilerUrls } from './ng-social-links.constants';

const LOCAL_URL = 'http://localhost:9876';
const DEFAULT_URL = 'http://default-domain.com';
const TEST_URL = 'http://test-domain.com';
const DEFAULT_TITLE = 'Default title';
const DEFAULT_DESCRIPTION = 'Default description';
const TEST_TITLE = 'Test title';
const TEST_DESCRIPTION = 'Test description';

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
      service.getSocialLink(Providers.facebook)
    ).toEqual(
      `${ProfilerUrls.facebook}?u=${encodeURIComponent(LOCAL_URL)}`
    );

    expect(
      service.getSocialLink(Providers.twitter)
    ).toEqual(
      `${ProfilerUrls.twitter}?url=${encodeURIComponent(LOCAL_URL)}`
    );

    expect(
      service.getSocialLink(Providers.linkedin)
    ).toEqual(
      `${ProfilerUrls.linkedin}?url=${encodeURIComponent(LOCAL_URL)}`
    );

    expect(
      service.getSocialLink(Providers.mailto)
    ).toEqual(
      `${ProfilerUrls.mailto}?body= ${encodeURIComponent(LOCAL_URL)}`
    );
  });

  it('should apply provided parameters', () => {
    expect(
      service.getSocialLink(Providers.facebook, { url: TEST_URL })
    ).toEqual(
      `${ProfilerUrls.facebook}?u=${encodeURIComponent(TEST_URL)}`
    );

    expect(
      service.getSocialLink(
        Providers.twitter,
        { url: TEST_URL, title: TEST_TITLE }
      )
    ).toEqual(
      `${ProfilerUrls.twitter}?url=${encodeURIComponent(TEST_URL)}&text=${encodeURIComponent(TEST_TITLE)}`
    );

    expect(
      service.getSocialLink(
        Providers.linkedin,
        { url: TEST_URL, title: TEST_TITLE }
      )
    ).toEqual(
      ProfilerUrls.linkedin +
        `?url=${encodeURIComponent(TEST_URL)}/&summary=${encodeURIComponent(TEST_TITLE)}`
    );

    expect(
      service.getSocialLink(
        Providers.mailto,
        { url: TEST_URL, title: TEST_TITLE, description: TEST_DESCRIPTION }
      )
    ).toEqual(
      ProfilerUrls.mailto +
      `?subject=${encodeURIComponent(TEST_TITLE)}` +
      `&body=${encodeURIComponent(TEST_DESCRIPTION)} ${encodeURIComponent(TEST_URL)}`
    );
  });
});

describe('NgSocialLinksService [specific default configuration]', () => {
  let service: NgSocialLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: DEFAULT_SHARE_URL_CONFIG_TOKEN,
        useValue: { url: DEFAULT_URL, title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION }
      }]
    });
    service = TestBed.inject(NgSocialLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use current default share link provided in module configuration', () => {
    expect(
      service.getSocialLink(Providers.facebook)
    ).toEqual(
      `${ProfilerUrls.facebook}?u=${encodeURIComponent(DEFAULT_URL)}`
    );

    expect(
      service.getSocialLink(Providers.twitter)
    ).toEqual(
      `${ProfilerUrls.twitter}?url=${encodeURIComponent(DEFAULT_URL)}&text=${encodeURIComponent(DEFAULT_TITLE)}`
    );

    expect(
      service.getSocialLink(Providers.linkedin)
    ).toEqual(
      ProfilerUrls.linkedin +
        `?url=${encodeURIComponent(DEFAULT_URL)}/&summary=${encodeURIComponent(DEFAULT_TITLE)}`
    );

    expect(
      service.getSocialLink(Providers.mailto)
    ).toEqual(
      ProfilerUrls.mailto +
      `?subject=${encodeURIComponent(DEFAULT_TITLE)}` +
      `&body=${encodeURIComponent(DEFAULT_DESCRIPTION)} ${encodeURIComponent(DEFAULT_URL)}`
    );
  });

  it('should apply provided parameters', () => {
    expect(
      service.getSocialLink(Providers.facebook, { url: TEST_URL })
    ).toEqual(
      `${ProfilerUrls.facebook}?u=${encodeURIComponent(TEST_URL)}`
    );

    expect(
      service.getSocialLink(
        Providers.twitter,
        { url: TEST_URL, title: TEST_TITLE }
      )
    ).toEqual(
      ProfilerUrls.twitter +
      `?url=${encodeURIComponent(TEST_URL)}&text=${encodeURIComponent(TEST_TITLE)}`
    );

    expect(
      service.getSocialLink(
        Providers.linkedin,
        { url: TEST_URL, title: TEST_TITLE }
      )
    ).toEqual(
      ProfilerUrls.linkedin +
        `?url=${encodeURIComponent(TEST_URL)}/&summary=${encodeURIComponent(TEST_TITLE)}`
    );

    expect(
      service.getSocialLink(
        Providers.mailto,
        { url: TEST_URL, title: TEST_TITLE, description: TEST_DESCRIPTION }
      )
    ).toEqual(
      ProfilerUrls.mailto +
      `?subject=${encodeURIComponent(TEST_TITLE)}` +
      `&body=${encodeURIComponent(TEST_DESCRIPTION)} ${encodeURIComponent(TEST_URL)}`
    );
  });
});
