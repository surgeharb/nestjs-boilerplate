import { UiComponent, ComponentConfig } from "./_base.component";
import { GENERIC } from "./types";

export class GenericUiComponent extends UiComponent {

  constructor(data: any[], configuration: ComponentConfig) {
    super(GENERIC, data, configuration);
  }

}