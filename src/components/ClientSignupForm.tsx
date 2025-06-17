'use client';

// import { SignUp } from '@clerk/nextjs'; // Desabilitado temporariamente

export default function ClientSignupForm() {
  return (
    // Este componente agora pode simplesmente renderizar o componente <SignUp> do Clerk
    // se você quiser usá-lo em uma rota customizada, por exemplo /register.
    // Certifique-se que a rota corresponda ao `path` e `routing` props.
    // Exemplo: <SignUp path="/register" routing="path" />
    // Ou, se você usar as páginas padrão do Clerk (/sign-up), este componente
    // pode ser removido ou usado para outros propósitos.
    // Para este exemplo, vamos renderizar o SignUp aqui.
    // Você precisaria garantir que a rota onde este ClientSignupForm é usado
    // seja, por exemplo, /register e que o middleware.ts não a proteja indevidamente.
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
      {/* <SignUp /> */} {/* Desabilitado temporariamente */}
    </div>
  );
}
