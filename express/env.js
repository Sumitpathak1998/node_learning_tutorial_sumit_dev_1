import {z, ZodError} from "zod";

export const PORT = isNaN(process.env.PORT) ? 3000 : parseInt(process.env.PORT);

const ageSchema = z.number().min(18).max(100).int();
const userAge = 17;
try {
    const parseUserAge = ageSchema.parse(userAge);
    console.log(parseUserAge);   
} catch (error) {
    if(error instanceof ZodError) {
        console.log(error.issues[0].message);
    }
}
