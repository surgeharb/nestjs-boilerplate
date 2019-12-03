import { Injectable } from '@nestjs/common';
import { IMapResponse } from '@core/ui-components';
import { GenericUiComponent } from '@core/ui-components/generic.component';

@Injectable()
export class PostsMapper {

  public map(data: any[]): IMapResponse {
    const components = [

      new GenericUiComponent(data, {}),

    ].filter(component => !component.isEmpty);

    return {
      extraData: {},

      components: components.map(component => component.toJSON()),
    };
  }

}
