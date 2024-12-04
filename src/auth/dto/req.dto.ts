import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, MaxLength } from 'class-validator';

export class SignupReqDto {
  @ApiProperty({ required: true, example: 'someone@somewhere.com' })
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty({
    required: true,
    example: 'sOmepasswor1d^^',
    description:
      'Must contain one of each lowercase, uppercase, digit and symbol with minimum length of 10',
  })
  @IsStrongPassword({
    minLength: 10,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @ApiProperty({ required: true, example: 'sOmepasswor1d^^' })
  passwordConfirm: string;
}

export class SigninReqDto {
  @ApiProperty({ required: true, example: 'someone@somewhere.com' })
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty({ required: true, example: 'sOmepasswor1d^^' })
  password: string;
}
