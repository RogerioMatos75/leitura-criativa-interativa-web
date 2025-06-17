'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { auth } = useAuth();
  const router = useRouter();

  async function onSubmit(values: LoginFormValues) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log("Usuário autenticado com sucesso:", userCredential.user);
      router.push('/dashboard');
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      let alertMessage = "Erro ao realizar login.";

      if (typeof error === 'object' && error !== null) {
        const firebaseError = error as { code?: string; message?: string };
        if (firebaseError.code) {
          switch (firebaseError.code) {
            case 'auth/invalid-credential':
              alertMessage = "Credenciais inválidas. Verifique seu email e senha e tente novamente.";
              break;
            case 'auth/user-not-found':
              alertMessage = "Usuário não encontrado. Verifique o email ou cadastre-se.";
              break;
            case 'auth/wrong-password':
              alertMessage = "Senha incorreta. Tente novamente.";
              break;
            case 'auth/too-many-requests':
              alertMessage = "Muitas tentativas de login. Tente novamente mais tarde.";
              break;
            default:
              alertMessage = `Erro (${firebaseError.code}): ${firebaseError.message}`;
          }
        } else if (firebaseError.message) {
          alertMessage = firebaseError.message;
        } else {
          alertMessage = "Ocorreu um erro desconhecido durante o login. Verifique o console para mais detalhes.";
        }
      } else {
        alertMessage = "Ocorreu um erro inesperado durante o login. Verifique o console.";
      }

      alert(alertMessage);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-headline">Acesse sua Conta</CardTitle>
          <CardDescription>Bem-vindo de volta! Faça login para continuar sua aventura.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
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
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Entrar
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Não tem uma conta?{' '}
                <Link href="/signup" className="font-medium text-accent hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
