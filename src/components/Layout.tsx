import React from 'react';
import { NavLink } from 'react-router-dom';
import { Castle, Edit3, History, Lock, Settings, Book, Menu, Eye, User, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/VitraAuthContext';

export function Sidebar() {
  const { profile, lockSanctum } = useAuth();
  
  const navItems = [
    { name: 'Entrance', path: '/', icon: Castle },
    { name: 'Inscribe', path: '/inscribe', icon: Edit3 },
    { name: 'Reveal', path: '/reveal', icon: Eye },
    { name: 'The Vault', path: '/vault', icon: Lock },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full z-40 flex-col p-10 bg-surface dark:bg-tertiary w-80 shadow-[40px_0_40px_-20px_rgba(39,19,16,0.08)]">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Castle className="text-secondary w-8 h-8" />
          <h2 className="text-3xl font-headline text-primary dark:text-surface">The Ledger</h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-secondary opacity-60">
          <User className="w-3 h-3" />
          <span>Scholar {profile?.name}</span>
        </div>
      </div>

      <nav className="flex-1 space-y-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              group flex items-center gap-4 font-body text-lg transition-all duration-700 ease-in-out hover:pl-2
              ${isActive 
                ? 'text-secondary font-bold italic underline decoration-gold' 
                : 'text-primary dark:text-surface opacity-60'}
            `}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-6">
        <button 
          onClick={lockSanctum}
          className="w-full py-4 bg-wax text-surface font-headline tracking-widest uppercase text-xs hover:bg-primary transition-colors duration-500 flex items-center justify-center gap-2 shadow-lg active:scale-95"
        >
          <LogOut className="w-3 h-3" />
          Lock Sanctum
        </button>
        <div className="flex flex-col gap-4 border-t border-primary/10 pt-6">
          <NavLink
            to="/profile"
            className={({ isActive }) => `
              flex items-center gap-3 text-xs uppercase tracking-widest transition-opacity
              ${isActive ? 'opacity-100 text-secondary' : 'opacity-60 hover:opacity-100'}
            `}
          >
            <Settings className="w-4 h-4" /> Profile Settings
          </NavLink>
          <a href="#" className="flex items-center gap-3 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            <Book className="w-4 h-4" /> Glossary
          </a>
        </div>
      </div>
    </aside>
  );
}

export function Topbar() {
  const { profile } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex justify-between items-center px-8 py-6 w-full bg-surface dark:bg-tertiary">
      <div className="text-2xl font-bold text-primary dark:text-surface tracking-tighter font-headline">
        Passwordless Future
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex flex-col items-end gap-0.5">
          <span className="text-[10px] font-mono text-secondary opacity-60 uppercase tracking-widest">Scholar Active</span>
          <span className="text-xs font-headline text-primary opacity-80">{profile?.name}</span>
        </div>
        <NavLink 
          to="/profile"
          className="w-10 h-10 rounded-full bg-surface-highest overflow-hidden border border-primary/10 hover:border-secondary/50 transition-colors cursor-pointer group"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuClcHk65BuH9NMg221fS5D6tKNlpTlGQiN5lLKPNbQKJNMQEpM7ihrz5XhgwLGV6yOaf52xZPuEiD2zPlHWUeR2v7GY0Fv0p0O6hyTZYigr7KZq1xErmw_WWFNlZVOiJdMrXOhMXMclLs04f2RyFZUB4EOVXDoJaHaj70QfFYbxF6qOh6ULuZheiav6rm5ETZBsPUpJphDzrJfdSquVmPqyryVDU-IDUxD8AfwD3Ack7_sg3ExqsEVcnEq6iK0pmKFlXtSqHkk2GiI" 
            alt="Scholar"
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all"
            referrerPolicy="no-referrer"
          />
        </NavLink>
      </div>
    </header>
  );
}
