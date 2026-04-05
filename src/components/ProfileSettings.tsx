
import React, { useState } from 'react';
import { useAuth } from '../context/VitraAuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Book, PenTool, ShieldAlert, History, ShieldCheck, Trash2, Calendar, User, Settings } from 'lucide-react';

export const ProfileSettings: React.FC = () => {
  const { profile, enroll, burnIdentity } = useAuth();
  const [newName, setNewName] = useState(profile?.name || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showConfirmBurn, setShowConfirmBurn] = useState(false);

  const handleUpdate = async () => {
    if (!newName.trim() || !profile) return;
    setIsUpdating(true);
    // Re-enroll with same sketch but new name
    setTimeout(() => {
      enroll(newName, profile.sketch);
      setIsUpdating(false);
    }, 500);
  };

  const handleBurn = () => {
    burnIdentity();
    window.location.href = '/'; // Trigger full reload for state reset
  };

  return (
    <main className="flex-1 p-8 md:p-20 relative min-h-screen bg-tertiary overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-[-1] opacity-20">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxU-3_7Q5t4r31N83y98W0-8u6Z98l76u7S-9z38Z-p-k-p-p-k-s-x-x-p-k-p-k-p-k-p-k-p-k-p-k-p" 
          alt="Antique Map Texture"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto space-y-16">
        <header className="relative">
          <div className="flex items-center gap-4 text-secondary font-headline uppercase tracking-[0.4em] text-xs mb-4">
            <Settings className="w-4 h-4" />
            <span>Scholar Management</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-headline text-primary tracking-tighter uppercase opacity-20 leading-none">Settings</h1>
          <p className="text-secondary font-headline italic text-2xl -mt-6 ml-8">Vitra Profile Identity</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Identity Card */}
          <section className="md:col-span-12 lg:col-span-5 space-y-8">
            <div className="bg-surface-low p-8 border-2 border-primary/10 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 paper-grain opacity-20" />
              <div className="relative z-10 space-y-8">
                <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center border-2 border-secondary/20">
                  <User className="text-secondary w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-headline text-3xl text-primary">{profile?.name}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-secondary opacity-60">Verified Biometric Anchor</p>
                </div>
                <div className="space-y-4 pt-6 border-t border-primary/5">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest opacity-60">
                    <Calendar className="w-4 h-4 text-secondary/60" />
                    <span>Enrolled: {new Date(profile?.enrollmentDate || '').toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest opacity-60">
                    <ShieldCheck className="w-4 h-4 text-secondary/60" />
                    <span>Key Stability: Excellent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Burn Identity Button */}
            <button 
              onClick={() => setShowConfirmBurn(true)}
              className="w-full py-6 bg-wax/5 hover:bg-wax/10 border-2 border-wax/20 text-wax font-headline tracking-[0.2em] uppercase text-xs transition-all flex items-center justify-center gap-3"
            >
              <Trash2 className="w-4 h-4" />
              Burn Identity & Vault
            </button>
          </section>

          {/* Edit Profile */}
          <section className="md:col-span-12 lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <label className="flex items-center gap-2 text-primary/80 font-display text-sm uppercase tracking-widest">
                <PenTool className="w-4 h-4 text-secondary" />
                Scholarly Title
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="flex-1 p-6 bg-surface-low text-primary font-manuscript text-xl border-2 border-primary/5 focus:outline-none focus:border-secondary/30 transition-all shadow-inner"
                />
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating || newName === profile?.name}
                  className="px-8 bg-secondary text-surface font-headline tracking-widest uppercase text-xs hover:bg-primary transition-colors disabled:opacity-30 disabled:grayscale transition-all shadow-lg active:scale-95"
                >
                  {isUpdating ? 'Sealing...' : 'Update'}
                </button>
              </div>
            </div>

            <div className="p-8 bg-surface-highest border-l-4 border-secondary space-y-4">
              <div className="flex items-center gap-2 text-secondary">
                <Book className="w-4 h-4" />
                <h4 className="font-headline text-lg tracking-widest uppercase">The Zero-Storage Promise</h4>
              </div>
              <p className="text-primary/60 font-body text-sm leading-relaxed italic">
                "Your name, your face, and your secrets exist only on this device. We store no hash, no signature, and no soul in our records. To burn your identity here is to erase it from the digital firmament."
              </p>
            </div>
          </section>
        </div>

        {/* Burn Identity Confirmation Overlay */}
        <AnimatePresence>
          {showConfirmBurn && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-xl flex items-center justify-center p-8"
              onClick={() => setShowConfirmBurn(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                className="max-w-md w-full bg-surface-low p-12 space-y-12 relative overflow-hidden text-center"
                onClick={e => e.stopPropagation()}
              >
                <div className="absolute inset-0 paper-grain opacity-20" />
                <ShieldAlert className="w-16 h-16 text-wax mx-auto" />
                <div className="space-y-4 relative z-10">
                  <h3 className="font-headline text-4xl text-primary tracking-tighter">Total Eradication?</h3>
                  <p className="text-primary/60 font-body italic">
                    Burning your identity will permanently delete your Scholar Profile and scrub all inscribed secrets from the Vault. This cannot be undone.
                  </p>
                </div>
                <div className="space-y-4 relative z-10">
                  <button 
                    onClick={handleBurn}
                    className="w-full py-6 bg-wax text-surface font-headline tracking-[0.2em] uppercase text-sm hover:scale-105 transition-transform shadow-2xl"
                  >
                    I Confirm. Erase Everything.
                  </button>
                  <button 
                    onClick={() => setShowConfirmBurn(false)}
                    className="w-full py-4 bg-transparent text-primary/40 font-headline tracking-widest uppercase text-xs hover:text-primary transition-colors"
                  >
                    Return to Sanctum
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};
