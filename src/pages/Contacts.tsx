
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
  MoreHorizontal, 
  ChevronDown, 
  Search, 
  Plus, 
  Filter, 
  Mail, 
  Phone, 
  ExternalLink, 
  MessageSquare,
  X,
  Edit,
  Trash,
  ArrowUpDown,
} from "lucide-react";
import { contacts } from "@/lib/mockData";

interface ContactProps {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  position: string;
  region: string;
  score: number;
  aiScore: number;
  lastInteraction: Date;
  lastInteractionText: string;
  notes: string;
  aiSummary: string;
}

const Contacts = () => {
  const [allContacts] = useState<ContactProps[]>(contacts);
  const [filteredContacts, setFilteredContacts] = useState<ContactProps[]>(contacts);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<ContactProps | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ContactProps | null;
    direction: 'asc' | 'desc' | null;
  }>({
    key: null,
    direction: null,
  });

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    
    if (searchTerm === "") {
      setFilteredContacts(allContacts);
    } else {
      const filtered = allContacts.filter(
        contact => 
          contact.name.toLowerCase().includes(searchTerm) || 
          contact.company.toLowerCase().includes(searchTerm) || 
          contact.email.toLowerCase().includes(searchTerm)
      );
      setFilteredContacts(filtered);
    }
  };

  // Handle sort
  const handleSort = (key: keyof ContactProps) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    
    const sorted = [...filteredContacts].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredContacts(sorted);
  };

  // Open contact detail
  const openContactDetail = (contact: ContactProps) => {
    setSelectedContact(contact);
    setDetailOpen(true);
  };

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Get AI score badge
  const getAIScoreBadge = (score: number) => {
    if (score >= 80) return "text-green-500 bg-green-500/10 border-green-500/30";
    if (score >= 50) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
    return "text-red-500 bg-red-500/10 border-red-500/30";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Kontakte</h1>
          <p className="text-muted-foreground">Verwalte und analysiere deine Geschäftskontakte</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Kontakt hinzufügen
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Suche nach Namen, Firma, E-Mail..."
                className="pl-9"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Region <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel>Nach Region filtern</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Alle Regionen</DropdownMenuItem>
                  <DropdownMenuItem>Bayern</DropdownMenuItem>
                  <DropdownMenuItem>Berlin</DropdownMenuItem>
                  <DropdownMenuItem>Nordrhein-Westfalen</DropdownMenuItem>
                  <DropdownMenuItem>Hamburg</DropdownMenuItem>
                  <DropdownMenuItem>Baden-Württemberg</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Score <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel>Nach Score filtern</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Alle Scores</DropdownMenuItem>
                  <DropdownMenuItem>Hoch (80-100)</DropdownMenuItem>
                  <DropdownMenuItem>Mittel (50-79)</DropdownMenuItem>
                  <DropdownMenuItem>Niedrig (0-49)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort('name')}>
                      Name / Firma 
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort('region')}>
                      Region
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort('score')}>
                      Score
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort('aiScore')}>
                      AI Score
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort('lastInteraction')}>
                      Letzte Interaktion
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow 
                    key={contact.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => openContactDetail(contact)}
                  >
                    <TableCell>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.company}</div>
                    </TableCell>
                    <TableCell>{contact.position}</TableCell>
                    <TableCell>{contact.region}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${getScoreColor(contact.score)}`}></div>
                        <span>{contact.score}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getAIScoreBadge(contact.aiScore)}`}>
                        {contact.aiScore}
                      </Badge>
                    </TableCell>
                    <TableCell>{contact.lastInteractionText}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            openContactDetail(contact);
                          }}>
                            Profil anzeigen
                          </DropdownMenuItem>
                          <DropdownMenuItem>Bearbeiten</DropdownMenuItem>
                          <DropdownMenuItem>E-Mail senden</DropdownMenuItem>
                          <DropdownMenuItem>Aufgabe erstellen</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            Löschen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredContacts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Keine Kontakte gefunden
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Zeige {filteredContacts.length} von {allContacts.length} Kontakten
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Zurück
              </Button>
              <Button variant="outline" size="sm">
                Weiter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Detail Sheet */}
      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent className="w-full sm:w-[600px] sm:max-w-md overflow-y-auto">
          {selectedContact && (
            <>
              <SheetHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <SheetTitle>{selectedContact.name}</SheetTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDetailOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SheetHeader>
              
              <div className="space-y-6">
                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-2xl font-semibold">
                    {selectedContact.firstName.charAt(0)}{selectedContact.lastName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{selectedContact.company}</div>
                    <div className="text-sm text-muted-foreground">{selectedContact.position}</div>
                    <div className="text-sm text-muted-foreground">{selectedContact.region}</div>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Kontaktinformationen</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">
                        {selectedContact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${selectedContact.phone}`} className="text-primary hover:underline">
                        {selectedContact.phone}
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-secondary/50 rounded-md p-3 text-center">
                    <div className="text-sm font-medium">Score</div>
                    <div className="text-xl mt-1">{selectedContact.score}</div>
                  </div>
                  <div className="bg-cyan-500/10 rounded-md p-3 text-center">
                    <div className="text-sm font-medium text-cyan-500">AI Score</div>
                    <div className="text-xl mt-1">{selectedContact.aiScore}</div>
                  </div>
                  <div className="bg-secondary/50 rounded-md p-3 text-center">
                    <div className="text-sm font-medium">Letzte Interaktion</div>
                    <div className="text-sm mt-1">{selectedContact.lastInteractionText}</div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="h-auto flex-col py-3">
                    <Mail className="h-4 w-4 mb-1" />
                    <span className="text-xs">E-Mail</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col py-3">
                    <Phone className="h-4 w-4 mb-1" />
                    <span className="text-xs">Anrufen</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col py-3">
                    <ExternalLink className="h-4 w-4 mb-1" />
                    <span className="text-xs">Website</span>
                  </Button>
                </div>
                
                {/* Notes */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Notizen</h3>
                  <div className="bg-secondary/50 rounded-md p-3 text-sm">
                    {selectedContact.notes}
                  </div>
                </div>
                
                {/* AI Summary */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-medium">AI-Zusammenfassung</h3>
                    <Badge className="ai-badge">AI</Badge>
                  </div>
                  <div className="rounded-md p-3 bg-cyan-500/5 border border-cyan-500/20 text-sm">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 text-cyan-500 mt-0.5" />
                      <p>{selectedContact.aiSummary}</p>
                    </div>
                  </div>
                </div>
                
                {/* Communication History */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Kommunikationsverlauf</h3>
                  <div className="space-y-3">
                    {Array.from({ length: 3 }, (_, i) => (
                      <div key={i} className="bg-secondary/50 rounded-md p-3">
                        <div className="flex justify-between items-center mb-1">
                          <div className="font-medium text-sm">
                            {i === 0 ? "E-Mail: Angebotsnachfassung" : 
                             i === 1 ? "Telefonat: Produktdemo" : 
                             "Meeting: Erstgespräch"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {i === 0 ? "Vor 3 Tagen" : 
                             i === 1 ? "Vor 2 Wochen" : 
                             "Vor 1 Monat"}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {i === 0 ? 
                            "Nachfassung zum versendeten Angebot. Kunde hat Interesse bekundet, benötigt aber mehr Informationen zur Implementierung." : 
                           i === 1 ? 
                            "Demo der Enterprise-Lösung durchgeführt. Teilnehmer: Thomas Weber (CIO) und Julia Schmidt (Projektmanagerin). Positives Feedback." : 
                            "Erstgespräch zur Bedarfsanalyse. Kunde sucht nach einer umfassenden CRM-Lösung mit KI-Integration für den Vertrieb."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Connection */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Verbundene Deals</h3>
                  <div className="bg-secondary/50 rounded-md p-3">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium text-sm">
                          {selectedContact.company} - CRM System
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">45.000 €</Badge>
                          <span className="text-xs text-muted-foreground">Angebot</span>
                        </div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm">
                          Anzeigen
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Deal erstellen
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" /> KI-Vorschläge
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Contacts;
