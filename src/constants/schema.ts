import { z } from "zod";

export const AccountSchema = z.object({
    _id: z.string(),

    firstName: z.string().nonempty(),
    lastName: z.string(),
    age: z.number(),
    email: z.string(),
    gender: z.string(),
})

export const AccountsSchema = z.object({
    accounts: z.array(AccountSchema)
})