import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

class JwtService {
    public create(payload: any) {
        return jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET!);
    }

    public validate(token: string) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        if (!decoded) {
            return null;
        }

        return JSON.parse(decoded as string);
    }
}
