
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      navigate('/app');
      setLoading(false);
    }, 1000);
  };

  const handleDemo = () => {
    navigate('/app');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-cyan-900 to-cyan-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.1),transparent_30%)]"></div>
        
        <div className="relative z-20 flex flex-col h-full justify-center px-12">
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
              <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium text-white">AI-gesteuerte Insights</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Revolutioniere dein <br />Kundenmanagement <br />mit KI-Power
          </h1>
          
          <ul className="space-y-4 text-white/90">
            <li className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-cyan-500/30 flex items-center justify-center">
                <span className="text-xs text-white">✓</span>
              </div>
              <span>KI-optimierte Lead-Priorisierung</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-cyan-500/30 flex items-center justify-center">
                <span className="text-xs text-white">✓</span>
              </div>
              <span>Automatisierte Follow-ups mit KI-Personalisierung</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-cyan-500/30 flex items-center justify-center">
                <span className="text-xs text-white">✓</span>
              </div>
              <span>Datengestützte Verkaufsprognosen</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="font-bold text-white text-sm">AI</span>
            </div>
            <h1 className="text-xl font-semibold">CRM Highlevel</h1>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Anmelden</h2>
              <p className="text-muted-foreground">Gib deine Zugangsdaten ein, um fortzufahren</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-Mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@firma.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-sm font-medium">
                    Passwort
                  </label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Passwort vergessen?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Anmeldung läuft..." : "Anmelden"}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">oder</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full" onClick={handleDemo}>
              Demo anzeigen
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Noch kein Konto?{' '}
              <a href="#" className="text-primary hover:underline">
                Jetzt registrieren
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
