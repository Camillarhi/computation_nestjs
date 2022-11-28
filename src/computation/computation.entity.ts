import { IsNotEmpty } from "class-validator";

export class Computation {
    id: string;

    @IsNotEmpty()
    firstInput: number;

    @IsNotEmpty()
    secondInput: number;

    @IsNotEmpty()
    result: number;

    @IsNotEmpty()
    operation: string;
}