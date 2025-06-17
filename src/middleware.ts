// import { clerkMiddleware } from "@clerk/nextjs/server"; // Desabilitado temporariamente

// export default clerkMiddleware({
//   // Defina quais rotas devem ser públicas (acessíveis sem login)
//   // Todas as outras rotas serão protegidas por padrão.
//   publicRoutes: [
//     "/", // Sua landing page
//     "/sign-in(.*)", // Rotas de sign-in
//     "/sign-up(.*)", // Rotas de sign-up
//     "/api/webhooks/clerk", // Exemplo de webhook público, se você usar
//     // Adicione outras rotas públicas aqui, se necessário
//   ],
//   // Adicione aqui as origens autorizadas, se necessário.
//   // Por exemplo, se você tiver um frontend em um domínio diferente
//   // que precisa validar tokens desta instância do Clerk.
//   // authorizedParties: ['https://example.com'],
//   // Rotas que devem ser ignoradas pelo middleware do Clerk (ex: arquivos estáticos, rotas de API específicas)
//   // ignoredRoutes: ["/api/some-public-api"],
// });

import { NextResponse } from 'next/server';

// Middleware desabilitado temporariamente para desenvolvimento
export default function middleware() {
  return NextResponse.next();
}

export const config = {
  // O matcher define quais caminhos serão processados pelo middleware.
  // Este é um matcher comum que inclui a maioria das rotas, exceto arquivos estáticos e rotas internas do Next.js.
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
