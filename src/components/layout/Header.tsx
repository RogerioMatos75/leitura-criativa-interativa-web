import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookHeart, UserCircle, LogIn, UserPlus } from 'lucide-react';

// Mock authentication state
const isAuthenticated = false; 

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <BookHeart className="w-8 h-8" />
          <h1 className="text-xl font-headline font-bold">Leitura Criativa Interativa</h1>
        </Link>
        <nav className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link href="/dashboard/profile">
              <Button variant="ghost" size="icon" aria-label="Profile">
                <UserCircle className="w-6 h-6" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <LogIn className="mr-2 h-5 w-5" /> Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <UserPlus className="mr-2 h-5 w-5" /> Cadastre-se
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
