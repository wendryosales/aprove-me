import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from "class-validator";

export class AssignorDto {
  @MaxLength(30)
  // Matches CPF or CNPJ
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message:
      "Document must be in the format 999.999.999-99 or 99.999.999/9999-99.",
  })
  @IsNotEmpty()
  document: string;

  @MaxLength(140)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(20)
  // Matches phone or cell phone in Brazil format
  @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
    message: "Phone must be in the format (99) 99999-9999 or (99) 9999-9999.",
  })
  @IsNotEmpty()
  phone: string;

  @MaxLength(140)
  @IsString()
  @IsNotEmpty()
  name: string;
}
