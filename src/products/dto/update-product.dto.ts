import { IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";
import { validationMessages } from "src/utils/validation-messages";

export class updateProductDto {
  @IsString({
    message: validationMessages.nombre.isString,
  })
  @IsNotEmpty({
    message: validationMessages.nombre.isNotEmpty,
  })
  @Length(1, 100, {
    message: validationMessages.nombre.length,
  })
  nombre?: string;
  @IsString({
    message: validationMessages.descripcion.isString,
  })
  @IsNotEmpty({
    message: validationMessages.descripcion.isNotEmpty,
  })
  @Length(1, 255, {
    message: validationMessages.descripcion.length,
  })
  descripcion?: string;
  @IsNumber(
    {},
    {
      message: validationMessages.precio.isNumber,
    }
  )
  @IsNotEmpty({
    message: validationMessages.precio.isNotEmpty,
  })
  @Min(1, {
    message: validationMessages.precio.min,
  })
  precio?: number;
}
