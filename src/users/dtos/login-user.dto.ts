import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiModelProperty()
  email: string;
  @IsNotEmpty()
  @ApiModelProperty()
  password: string;
}
