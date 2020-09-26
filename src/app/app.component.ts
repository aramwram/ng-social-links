import { Component } from '@angular/core';
import { NgSocialLinksService } from 'projects/ng-social-links/src/lib/ng-social-links.service';
import { NgSocialLinksProvider } from 'projects/ng-social-links/src/lib/ng-social-links.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-social-links';

  fbLink = this.socialLinks.getSocialLink(NgSocialLinksProvider.Facebook);

  constructor(private socialLinks: NgSocialLinksService) {
    console.log(this.fbLink);
  }
}
