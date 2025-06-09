'use client';

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '../context/AuthContext'; // Importe o hook useAuth

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
  confirmPassword: z.string().min(6, "Confirmação de senha deve ter no mínimo 6 caracteres."),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof formSchema>;

export default function ClientSignupForm() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { auth } = useAuth(); // Use o hook useAuth para obter a instância auth

  async function onSubmit(values: SignupFormValues) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("Usuário criado com sucesso:", userCredential.user);
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao criar usuário:", error);
        alert("Erro ao realizar cadastro: " + error.message);
      } else {
        console.error("Erro desconhecido:", error);
        alert("Ocorreu um erro desconhecido durante o cadastro.");
      }
    }
  }

  async function handleGoogleSignup() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Usuário autenticado com Google:", result.user);
      alert("Autenticação com Google realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao autenticar com Google:", error);
      if (error instanceof Error) {
        alert("Erro ao realizar autenticação com Google: " + error.message);
      } else {
        alert("Erro ao realizar autenticação com Google");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seuemail@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Cadastrar
          </Button>
          <Button onClick={handleGoogleSignup} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Cadastrar com Google
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
