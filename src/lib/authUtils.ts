import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function isAdmin(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return { authorized: false, status: 401, error: "Unauthorized access" };
    }

    if (session.user.role !== "admin") {
        return { authorized: false, status: 403, error: "Forbidden: Admins only" };
    }

    return { authorized: true, user: session.user };
}
