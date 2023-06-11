/* FOR DOCS ... MUST MATCH ClickMeComponent template
  <button type="button" (click)="onClickMe()">Click me!</button>
*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-click-me',
  template: `
    <button type="button" (click)="onClickMe()">Click me!</button>
    {{clickMessage}}`
})
export class ClickMeComponent {
  clickMessage = '';

  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }
}
