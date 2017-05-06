import {Component, NgModule} from '@angular/core';
export {MyTestConstant} from './my-exports';

@Component({
  template: '<span>Hey</span>'
})
export class TestComponent {}

@NgModule({
  declarations: [TestComponent],
  exports: [TestComponent]
})
export class TestModule {}