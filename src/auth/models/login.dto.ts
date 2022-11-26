import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO {
    @ApiProperty({
        type: String,
        description: 'This is a required property, input registered email',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property, input password used during registration',
    })
    @IsNotEmpty()
    password: string;
}