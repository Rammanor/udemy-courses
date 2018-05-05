import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') is_open = false;
  @HostListener('click') toggleOpen() {
    this.is_open = !this.is_open;
  }

}
