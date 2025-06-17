# Leitura Criativa Interativa

## Descrição

O Leitura Criativa Interativa é uma plataforma web inovadora projetada para incentivar o amor pela leitura em crianças de 5 a 8 anos. Através de histórias interativas, quizzes envolventes e atividades lúdicas, buscamos tornar o aprendizado uma aventura emocionante. Acreditamos que, ao combinar tecnologia e conteúdo educativo de alta qualidade, podemos despertar a imaginação das crianças e desenvolver habilidades essenciais de leitura e interpretação.

## Estrutura de Pastas do Projeto (Next.js com App Router)

```bash
leitura-criativa-interativa-web/
├── docs/
├── public/
│   ├── asset/
├── node_modules/
├── src/
│    ├── __tests__
│    │       ├── useAuth.test.ts
│    │       ├── dashboard.test.ts
│    │       ├── login.test.ts
│    │       ├── sign-in.test.ts
│    │       └── sign-up.test.ts
│    ├── ai/
│    │   └── flows/
│    ├── app/
│    │   ├── dashboard/
│    │   │   └── exercises/
│    │   │       └── [id]/
│    │   │   └── aventura-criativa
│    │   │   └── profile/
│    │   │   └── settings/
│    │   ├── login/
│    │   ├── sign-in/
│    │   │   └── [[...sign-in]]/
│    │   ├── sign-up/
│    │   │   └── [[...sign-up]]/
│    ├── components/
│    │   ├── exercises/
│    │   ├── feature\aventura-criativa/
│    │   ├── layout/
│    │   ├── profile/
│    │   └── ui/
│    ├── context/
│    ├── hooks/
│    ├── lib/
│    └── types/
├── apphosting.yaml
├── builder.config.json
├── .gitignore
├── components.json
├── next.config.ts
├── next-env.d.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── tailwind.config.js
└── tailwind.config.ts
```

## Funcionalidades Principais

*   **Histórias Interativas com Narração e Destaque de Palavras:** As crianças podem acompanhar histórias narradas por profissionais, com palavras destacadas em tempo real para facilitar a associação entre som e grafia.
*   **Quizzes de Interpretação:** Ao final de cada história, quizzes divertidos testam a compreensão da criança sobre o que foi lido, reforçando o aprendizado.
*   **Atividades de Colorir Digitais:** Personagens e cenas das histórias ganham vida em atividades de colorir digitais, estimulando a criatividade e a coordenação motora.
*   **Recomendações de Leitura Personalizadas por IA:** Utilizando inteligência artificial, a plataforma sugere novas histórias com base nos interesses e no nível de leitura de cada criança.
*   **Sistema de Gamificação com Recompensas:** Conquistas, medalhas e pontos incentivam a participação contínua e o progresso na plataforma, tornando o aprendizado mais divertido.

## Público-Alvo

*   **Crianças de 5 a 8 anos:** O conteúdo e as funcionalidades são especialmente desenvolvidos para atender às necessidades e interesses desta faixa etária.
*   **Pais:** Oferece uma ferramenta segura e educativa para complementar o aprendizado dos filhos em casa.
*   **Educadores:** Pode ser utilizado como um recurso didático interativo em salas de aula, auxiliando no desenvolvimento de habilidades de leitura e interpretação dos alunos.

## Tecnologias Utilizadas

*   **Next.js:** Framework React para desenvolvimento de interfaces de usuário performáticas e otimizadas para SEO.
*   **Clerk:** Plataforma para desenvolvimento de aplicativos web e móveis, utilizada para autenticação.
*   **Genkit (Google AI):** Ferramenta para integração de modelos de inteligência artificial generativa, utilizada para as recomendações personalizadas de leitura.
*   **Tailwind CSS:** Framework CSS utility-first para a criação rápida e customizável de interfaces.
*   **shadcn/ui:** Coleção de componentes de UI reutilizáveis e acessíveis, construídos sobre o Tailwind CSS.

## Como Executar o Projeto Localmente

Para executar o projeto em seu ambiente de desenvolvimento local, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO_AQUI>
    cd leitura-criativa-interativa
    ```

2.  **Instale as dependências:**
    Certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina.
    ```bash
    npm install
    # ou
    # yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto e adicione as chaves de API do Google Gemini Flash e outras configurações necessárias. Consulte o arquivo `.env.example` (se existir) para referência.

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    # yarn dev
    ```
    
    Isso iniciará o servidor de desenvolvimento na porta 9004 por padrão. Você pode alterar a porta editando o script no `package.json` ou passando a variável de ambiente `PORT`.  

5.  **Abra o navegador:**
  
  Após o servidor iniciar, O servidor de desenvolvimento geralmente estará disponível em [http://localhost:9004](http://192.168.0.252:9004). Abra este link no navegador para visualizar o projeto.

**Resolvendo Problemas**: Caso encontre erros, verifique se todas as dependências estão instaladas corretamente e se o arquivo `.env.local` está configurado com as credenciais do Clerk.

## Como Contribuir

Agradecemos o seu interesse em contribuir para o Leitura Criativa Interativa! No momento, estamos estruturando nosso processo de contribuição. Em breve, adicionaremos mais informações sobre como você pode nos ajudar a tornar esta plataforma ainda melhor.

Se você tiver sugestões, encontrar bugs ou quiser discutir ideias, sinta-se à vontade para abrir uma "Issue" no repositório do GitHub.

---

Feito com ❤️ para inspirar pequenos leitores!

## Licença
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.