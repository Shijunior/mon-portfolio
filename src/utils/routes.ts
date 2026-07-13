/**
 * Centralise et type les noms de routes de l'application.
 * Permet d'utiliser routes.home au lieu d'écrire "index" en dur partout,
 * avec l'autocomplétion TypeScript et une seule source de vérité.
 */
export function createRoutes<T extends Record<string, string>>(routes: T): T {
  return routes
}