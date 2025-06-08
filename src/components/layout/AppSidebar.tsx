'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { BookOpen, Lightbulb, UserCircle, Home, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Início', icon: Home },
  { href: '/dashboard/exercises', label: 'Exercícios', icon: BookOpen },
  { href: '/dashboard/recommendations', label: 'Recomendações', icon: Lightbulb },
  { href: '/dashboard/profile', label: 'Meu Perfil', icon: UserCircle },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="justify-between">
        <Link href="/dashboard" className="text-lg font-headline font-semibold text-sidebar-primary flex items-center gap-2 group-data-[collapsible=icon]:hidden">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sidebar-primary">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          LCI
        </Link>
        <SidebarTrigger className="md:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  className={cn(
                    pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'hover:bg-sidebar-accent/50',
                    'justify-start w-full'
                  )}
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label, className: "bg-primary text-primary-foreground" }}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
             <Link href="/dashboard/settings" legacyBehavior passHref>
                <SidebarMenuButton 
                  className="justify-start w-full hover:bg-sidebar-accent/50"
                  tooltip={{ children: "Configurações", className: "bg-primary text-primary-foreground" }}
                >
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href="/" legacyBehavior passHref>
              <SidebarMenuButton className="justify-start w-full text-destructive-foreground bg-destructive/80 hover:bg-destructive">
                <LogOut className="h-5 w-5" />
                <span>Sair</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
