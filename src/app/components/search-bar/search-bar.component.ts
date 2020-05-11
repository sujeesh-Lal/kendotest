import {
  Component, OnInit, Input, Output, EventEmitter, SimpleChanges,
  ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, DoCheck, ViewChild, ElementRef
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  searchValueEntered = '';
  defaultIconClassResource = 'fa fa-search';
  supportedInputTypes = { number: 'number' };

  @Input() showErrorMsg = true;
  @Input() showSearchIcon = true;
  @Input() showSearchButton = true;
  @Input() shouldShowErrorMsg = true;
  @Input() searchBtnText = 'SEARCH';
  @Input() defaultErrorText = 'Please enter a valid value.';
  @Input() errorText = '';
  @Input() inputPlaceholder = 'Search or Scan UPC';
  @Input() maxLength = 30;
  @Input() textBoxType = this.supportedInputTypes.number;
  @Input() searchIcon = 'search-box-default-icon';
  @Input()
  set searchValue(data: string) {
    this.searchValueEntered = data;
  }
  @Input()
  set handleFocus(state: any) {
    this.removeFocus();
  }
  @Output() searchValueSubmitted = new EventEmitter<string>();
  @Output() focusOut = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<any>();
  @ViewChild('searchInputEl', { static: false }) searchInputEl: ElementRef;
  constructor(private cd: ChangeDetectorRef, private sanitizer: DomSanitizer) {
  }
  dataChanged(e) {
    console.log(e);
    this.valueChange.emit(e);
  }
  onBlurMethod() {
    this.focusOut.emit(this.searchValueEntered);
  }

  emitSearchValue() {
    this.errorText = '';
    if (!this.validateMsg(this.searchValueEntered)) {
      return;
    }
    this.searchValueSubmitted.emit(this.searchValueEntered);
    this.removeFocus();
    this.resetSearchInput();
  }

  resetSearchInput() {
    this.searchValueEntered = '';
  }

  removeFocus() {
    this.searchInputEl.nativeElement.blur();
  }

  validateMsg(text) {
    if (text === '') {
      this.errorText = this.defaultErrorText;
      // this.showErrorMsg = true;
      return false;
    }
    if (this.textBoxType === 'number' && !(/^\d+$/.test(text))) {
      this.errorText = this.defaultErrorText;
      return false;
    }
    // if (text.length > this.maxLength) {
    //   this.errorText = `Please enter a input less than ${this.maxLength} characters.`;
    //   return false;
    // }
    // } else {
    //   if (this.errorText === this.defaultErrorText) {
    //     this.errorText = '';
    //     // this.showErrorMsg = false;
    //   }
    //   return true;
    // }
    return true;
  }

}
