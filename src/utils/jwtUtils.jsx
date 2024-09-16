export function getUserInfoFromToken(token) {
    try {
      const arrayToken = token.split('.');
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      return {
        rol: tokenPayload?.rol,
        userId: tokenPayload?.id // Asegúrate de que el payload tenga 'userId' o lo que necesitas
      };
    } catch (error) {
      console.error('Token inválido:', error);
      return null;
    }
  }
  