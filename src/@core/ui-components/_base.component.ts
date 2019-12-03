import { NONE } from './types';

export enum TextSize { SMALL = 'small', MEDIUM = 'medium', LARGE = 'large' };

export enum Orientation { VERTICAL = 0, HORIZONTAL = 1 };

export enum Shape { CARD = 'card', NORMAL = 'normal' };

export type ComponentConfig = IComponentOptions & { itemsType?: string };

export interface IComponentOptions {
  viewMore?: string;
  viewPager?: boolean;
  componentId?: string;
  orientation?: Orientation;
  textSize?: TextSize;
  spanSize?: number;
  subtitle?: string;
  title?: string;
  shape?: Shape;
}

export interface IComponent {
  readonly value: IComponentOptions & { data?: any };
  readonly itemsType: string;
  readonly type: string;
}

export abstract class UiComponent {

  private readonly _isEmpty: boolean;

  private readonly _options: IComponentOptions;

  private readonly _itemsType: string;
  private readonly _type: string;
  private readonly _data: any;

  constructor(type: string, data?: any, configuration?: ComponentConfig) {

    this._itemsType = configuration.itemsType;
    this._type = type || NONE;
    this._data = data || {};

    const {
      spanSize = 6,
      viewMore = '',
      viewPager = false,
      textSize = TextSize.MEDIUM,
      orientation = Orientation.VERTICAL,
      componentId = `SECTION-${Date.now()}`,
      shape = Shape.NORMAL,
      subtitle = '',
      title = '',
    } = configuration;

    this._options = {
      componentId, title, subtitle, textSize, spanSize,
      viewPager, viewMore, shape, orientation,
    };

    const componentIsNONE = (this._type === NONE);

    const hasArrayData = Array.isArray(this._data);

    const hasEmptyData = (typeof this._type === 'object' && JSON.stringify(this._data) === '{}');

    this._isEmpty = !this._data || componentIsNONE || hasEmptyData || (hasArrayData && !this._data.length);
  }

  public get data() {
    return this._data;
  }

  public get type() {
    return this._type;
  }

  public get isEmpty() {
    return this._isEmpty;
  }

  public toJSON(): IComponent {
    return {
      value: { ...this._options, data: this._data },
      itemsType: this._itemsType,
      type: this._type,
    };
  }

}
