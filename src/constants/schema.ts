import { z } from "zod";
const MESSAGES = {
    required: 'This field is required!'
}
export const AccountSchema = z.object({
    _id: z.string(),

    firstName: z.string().nonempty(MESSAGES.required),
    lastName: z.string().nonempty(MESSAGES.required),
    age: z.number().min(1, MESSAGES.required),
    email: z.string().nonempty(MESSAGES.required),
    gender: z.string().nonempty(MESSAGES.required),
})

export const AccountsSchema = z.object({
    accounts: z.array(AccountSchema)
})