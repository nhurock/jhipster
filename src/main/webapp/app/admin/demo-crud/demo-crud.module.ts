import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhipsterSharedModule } from 'app/shared/shared.module';
import { demoCRUDRoute } from './demo-crud.route';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild([demoCRUDRoute])],
  declarations: [ListComponent, FormComponent],
  entryComponents: [FormComponent]
})
export class DemoCRUDModule {}
