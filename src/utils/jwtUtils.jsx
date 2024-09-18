export function getUserInfoFromToken(token) {
    try {
      const arrayToken = token.split('.');
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      return {
        userId: tokenPayload?.id 
      };
    } catch (error) {
      console.error('Token inválido:', error);
      return null;
    }
  }
  