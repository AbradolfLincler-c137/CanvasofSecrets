import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UploadCloud, Lock, ShieldCheck, Trash2, Eye, Calendar, Clock } from 'lucide-react';

interface VaultItem {
  id: string;
  message: string;
  timestamp: string;
  imageThumbnail: string;
}

export function Vault() {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<VaultItem | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('vitra_vault');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  const deleteItem = (id: string) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    localStorage.setItem('vitra_vault', JSON.stringify(updated));
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  return (
    <main className="flex-1 p-8 md:p-20 relative min-h-screen bg-tertiary overflow-hidden">
      <div className="absolute inset-0 z-[-1] opacity-20">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmoLfodklJ4AbEdCvDmxhWUxIg9GYDl1cZY5F5JCJLZ4KmjXlgx5kf3Qeyyr6VVIodLTW7FIh7Mg84e3if3JnT5D5C4zGf9POtc-YD6pJSNzHY05jhsvhkzgv7Xz06jkXvWmaRYHlaR8mbIG453iMye_SC1IRn12ClF9UuCuOLYZtvgYSgwCZrgGwAvfpzmkNL37r7REJNh-YafuKaaIr6LJX1K4d0RUl3q3s5OcKZrWYEMsKUzNegCCmj4XbujPjHTdBu3xGwijI" 
          alt="Stone Texture"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        <header className="relative">
          <h1 className="text-6xl md:text-8xl font-headline text-surface tracking-widest uppercase opacity-20 leading-none">The Vault</h1>
          <p className="text-secondary font-headline italic text-2xl -mt-6 ml-8">Sanctum of Revelations</p>
          <div className="mt-8 flex items-center gap-4">
            <ShieldCheck className="text-secondary w-5 h-5" />
            <span className="text-surface/60 font-mono text-[10px] uppercase tracking-[0.4em]">Memory Persistence Active • {items.length} Secret(s)</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Gallery Grid */}
          <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedItem(item)}
                  className="group relative bg-primary/40 border border-secondary/20 aspect-[3/4] cursor-pointer hover:border-secondary transition-all overflow-hidden"
                >
                  <img src={item.imageThumbnail} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                    <div className="flex items-center gap-2 text-secondary/60 font-mono text-[8px] uppercase tracking-widest">
                      <Calendar className="w-2 h-2" />
                      {new Date(item.timestamp).toLocaleDateString()}
                    </div>
                    <p className="text-surface font-headline italic text-sm line-clamp-2">
                      {item.message}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                      className="p-2 bg-wax text-surface rounded-full hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {items.length === 0 && (
              <div className="col-span-full py-32 border-2 border-dashed border-secondary/20 flex flex-col items-center justify-center gap-6 opacity-40">
                <Lock className="w-12 h-12 text-secondary" />
                <p className="font-headline text-surface tracking-[0.2em] uppercase text-xs">The Vault is empty. Reveal secrets to populate it.</p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Item Viewer (Overlay) */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90 backdrop-blur-xl"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                className="max-w-2xl w-full bg-surface-low relative p-12 overflow-hidden shadow-[0_0_100px_rgba(115,92,0,0.2)]"
                onClick={e => e.stopPropagation()}
              >
                <div className="absolute inset-0 paper-grain" />
                <div className="absolute top-0 right-0 p-4">
                  <button onClick={() => setSelectedItem(null)} className="text-secondary hover:scale-110 transition-transform">
                    <Lock className="w-8 h-8 fill-current" />
                  </button>
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4 text-secondary/40 font-mono text-[10px] uppercase tracking-[0.3em]">
                    <Clock className="w-3 h-3" />
                    Revealed {new Date(selectedItem.timestamp).toLocaleString()}
                  </div>

                  <p className="text-2xl md:text-3xl font-body italic leading-relaxed text-primary">
                    "{selectedItem.message}"
                  </p>

                  <div className="pt-8 border-t border-primary/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                      <span className="text-[10px] font-headline uppercase tracking-widest text-secondary">Verified Identity Witness</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
