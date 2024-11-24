import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const getClientIdFromCookie = (): string | null => {
  const token = Cookies.get("token");

  if (!token) {
    console.log("Token não encontrado");
    return null;
  }
  try {
    const decoded = jwt.decode(token) as { id: string };
    console.log("Token decodificado:", decoded);

    return decoded?.id || null;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};
