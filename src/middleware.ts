import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextauth.token?.role !== "admin") {
      console.log("Acceso denegado, redirigiendo a /admin/login");
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    console.log("Acceso permitido a la ruta admin");
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("Verificando autorización - Token:", token);
        return !!token;
      },
    },
  }
);

// Aplica el middleware a todas las rutas dentro de /admin/
export const config = {
  matcher: "/admin/:path*",
};
