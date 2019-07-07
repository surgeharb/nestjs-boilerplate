import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiModelProperty()
  name?: string;
  @IsNotEmpty()
  @ApiModelProperty()
  email: string;
  @IsNotEmpty()
  @ApiModelProperty()
  password: string;
  @IsNotEmpty()
  salt: string;
  @IsNotEmpty()
  tokenCode: string;
}
