import {customAttribute} from 'aurelia-templating';

//Placeholder attribute to prohibit use of this attribute name in other places

@customAttribute('reorderable-dnd-preview')
export class ReorderableDndPreview {

  constructor() {}

  attached() {}

  bind(bindingContext, overrideContext): void {
    this.scope = { bindingContext, overrideContext };
  }

}
