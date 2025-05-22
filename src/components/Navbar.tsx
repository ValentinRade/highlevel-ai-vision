
import { useState } from 'react';
import { Bell, Search, User, HelpCircle, LogOut, Settings, MessageSquare, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

const aiInsights = [
  'Meetinganfrage für Weber IT Solutions erstellen',
  'Angebot für Schneider & Söhne aktualisieren',
  'Kontaktpriorität für Müller AG erhöhen',
  'Preismodell für Becker Pharma GmbH anpassen',
  'Sales Deck für Schmidt Maschinenbau vorbereiten',
  'Folgetermin mit Hoffmann & Partner vereinbaren'
];

export const Navbar = () => {
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <div className="h-16 border-b border-border bg-background/95 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Schnellsuche Kontakte/Deals..."
            className="pl-9 pr-4 py-2 h-9 w-64 rounded-md bg-secondary/50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                3
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="p-2 border-b border-border">
              <h3 className="font-medium">Benachrichtigungen</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {[
                { title: 'Neue Nachricht von Thomas Weber', time: 'Vor 10 Min.' },
                { title: 'Termin in 30 Minuten: Call mit Müller AG', time: 'Vor 15 Min.' },
                { title: 'Deal gewonnen: Becker Pharma GmbH', time: 'Vor 2 Std.' },
                { title: 'KI-Vorschlag: Kontakt Laura Fischer nachfassen', time: 'Vor 3 Std.' },
              ].map((notification, i) => (
                <div key={i} className="p-3 border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full">
                Alle anzeigen
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Button 
          variant="outline" 
          size="icon" 
          className={`relative ${showAssistant ? 'text-primary bg-primary/10' : ''}`}
          onClick={() => setShowAssistant(!showAssistant)}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <span className="text-sm font-normal">Alex</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Alex Mustermann</DropdownMenuLabel>
            <DropdownMenuItem className="text-sm">alex.mustermann@email.de</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Einstellungen</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Hilfe</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Abmelden</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* AI Assistant Panel */}
      {showAssistant && (
        <div className="absolute right-4 top-16 w-80 bg-card rounded-md shadow-lg border border-border animate-fade-in z-20">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary/20 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-medium">AI-Assistent</h3>
            </div>
            <Badge variant="secondary" className="text-xs">Live</Badge>
          </div>
          <div className="max-h-96 overflow-y-auto p-3">
            <h4 className="text-sm font-medium mb-2">Nächste beste Aktionen:</h4>
            <div className="space-y-2">
              {aiInsights.map((insight, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-md bg-secondary/50 hover:bg-secondary cursor-pointer">
                  <div className="min-w-5 mt-0.5">
                    <Badge className="ai-badge h-5 w-5 p-0 flex items-center justify-center">AI</Badge>
                  </div>
                  <p className="text-sm">{insight}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 border-t border-border pt-4">
              <h4 className="text-sm font-medium mb-2">AI-Aggressivität</h4>
              <div className="flex items-center gap-3">
                <span className="text-xs">Niedrig</span>
                <div className="h-1 flex-1 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full w-3/5 bg-primary"></div>
                </div>
                <span className="text-xs">Hoch</span>
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-border">
            <input 
              type="text" 
              placeholder="Frag deinen AI-Assistenten..."
              className="w-full px-3 py-2 text-sm rounded-md bg-secondary/50 border-0 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
