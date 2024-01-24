import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
    @ApiProperty({
        example: "Todo title"
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        example: "Todo description"
    })
    @IsString()
    @IsNotEmpty()
    description: string
}
