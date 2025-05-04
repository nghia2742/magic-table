import { z } from "zod";

export const AccountSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string(),
    gender: z.string(),
})

export const AccountsSchema = z.object({
    accounts: z.array(AccountSchema)
})