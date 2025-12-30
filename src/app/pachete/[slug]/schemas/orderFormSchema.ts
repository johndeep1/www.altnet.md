import { z } from "zod";

// Moldova phone validation regex
// Accepts: +373XXXXXXXX, 0XXXXXXXX, 373XXXXXXXX (mobile prefixes 6, 7, 8)
const moldovaPhoneRegex = /^(\+?373|0)?[678]\d{7}$/;

export const orderFormSchema = z.object({
  name: z
    .string()
    .min(1, "Numele este obligatoriu")
    .min(3, "Numele trebuie sa contina cel putin 3 caractere")
    .max(100, "Numele nu poate depasi 100 de caractere"),

  email: z
    .string()
    .min(1, "Email-ul este obligatoriu")
    .email("Adresa de email nu este valida"),

  phone: z
    .string()
    .min(1, "Numarul de telefon este obligatoriu")
    .regex(
      moldovaPhoneRegex,
      "Introduceti un numar de telefon valid din Moldova"
    ),

  address: z
    .string()
    .min(1, "Adresa este obligatorie")
    .min(10, "Adresa trebuie sa contina cel putin 10 caractere")
    .max(200, "Adresa nu poate depasi 200 de caractere"),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
