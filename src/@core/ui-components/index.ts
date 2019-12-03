import { IComponent } from './_base.component';

export interface IMapResponse {
  readonly extraData: { [key: string]: any };
  readonly components: IComponent[];
}

export * from './_base.component';