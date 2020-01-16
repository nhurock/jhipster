import { Route } from '@angular/router';

import { ListComponent } from './list/list.component';

export const demoCRUDRoute: Route = {
  path: '',
  component: ListComponent,
  data: {
    pageTitle: 'DemoCRUD'
  }
};
