import { IComponent } from './_base.component';

export interface IMapResponse {
  readonly extraData: any;
  readonly components: IComponent[];
}

export * from './_base.component';