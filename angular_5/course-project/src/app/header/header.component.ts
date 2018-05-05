import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() locationChanged = new EventEmitter<string> ();

  navigateTo(location: string) {
    this.locationChanged.emit(location);
  }
}
