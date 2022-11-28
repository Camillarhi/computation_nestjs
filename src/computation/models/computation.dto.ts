import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty } from "class-validator";

export class ComputationDTO {
    @ApiProperty({
        type: Number,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    firstInput: number;

    @ApiPropertyOptional({
        type: Number,
        description: 'This is an optional property',
    })
    @IsEmpty()
    secondInput: number;
}