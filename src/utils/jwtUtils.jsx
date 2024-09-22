export function getUserInfoFromToken(token) {
  try {
      const arrayToken = token.split('.');
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      return {
          userId: tokenPayload?.id,
          exp: tokenPayload?.exp // Asegúrate de incluir esto
      };
  } catch (error) {
      return null;
  }
}
