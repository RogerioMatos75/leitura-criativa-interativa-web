'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import ClientSignupForm from '@/components/ClientSignupForm'; // Importe o novo componente
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  // Verifica se o usuário já está autenticado
  if (currentUser) {
    router.push('/dashboard'); // Redireciona para o dashboard se autenticado
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-accent mb-4" />
          <CardTitle className="text-3xl font-headline">Crie sua Conta</CardTitle>
          <CardDescription>Junte-se à nossa comunidade de leitores e comece a explorar!</CardDescription>
        </CardHeader>
        {/* Use o componente ClientSignupForm aqui */}
        <ClientSignupForm />
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-center text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Faça login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
