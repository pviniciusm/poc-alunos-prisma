import jwt from "jsonwebtoken";

class JwtService {
    public create(payload: any) {
        return jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET!);
    }

    public validate(token: string) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);

            if (!decoded) {
                return null;
            }

            return decoded;
        } catch {
            return null;
        }
    }
}

export default new JwtService();
