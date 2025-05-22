
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  Send,
  ChevronDown,
  ChevronRight,
  Settings,
  Zap,
  User,
  Pencil,
  Clock,
  PieChart,
  ListFilter,
} from "lucide-react";
import { chatMessages } from "@/lib/mockData";

interface ChatMessage {
  user: string;
  bot: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAICoach, setShowAICoach] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle send message
  const handleSendMessage = () => {
    if (currentMessage.trim() === "") return;
    
    // Add user message immediately
    setLoading(true);
    const newMessage = {
      user: currentMessage,
      bot: ""
    };
    
    setMessages([...messages, newMessage]);
    setCurrentMessage("");
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        
        // Create appropriate response based on the query
        let botResponse = "";
        const userQuery = lastMessage.user.toLowerCase();
        
        if (userQuery.includes('führe') || userQuery.includes('nächste beste aktion')) {
          botResponse = "Basierend auf der Analyse deiner Deals und Kontakte empfehle ich folgende Aktionen:\n\n1. Nachfassen beim Schneider & Söhne Deal (Angebot vor 5 Tagen gesendet)\n2. Meeting mit Weber IT Solutions vereinbaren (Lead-Score 92)\n3. Follow-up E-Mail an Thomas Müller senden (seit 7 Tagen keine Interaktion)";
        } else if (userQuery.includes('deals') || userQuery.includes('pipeline')) {
          botResponse = "Deine Pipeline enthält derzeit 19 aktive Deals im Gesamtwert von 1.245.000 €. Die wichtigsten Deals:\n\n• Müller AG - CRM System (85.000 €, 75%)\n• Becker Pharma - Consulting (120.000 €, 62%)\n• Schmidt Maschinenbau - Lizenzen (45.000 €, 88%)\n\nSoll ich eine detaillierte Pipeline-Analyse erstellen?";
        } else if (userQuery.includes('kontakte') || userQuery.includes('leads')) {
          botResponse = "Hier sind deine Top 5 Leads basierend auf AI-Scoring:\n\n• Thomas Weber (Weber IT Solutions) - Score: 94\n• Julia Schneider (Schneider & Söhne) - Score: 87\n• Michael Becker (Becker Pharma) - Score: 85\n• Laura Fischer (Fischer Elektronik) - Score: 82\n• Alexander Hoffmann (Hoffmann & Partner) - Score: 81\n\nSoll ich dir Details zu einem dieser Kontakte zeigen?";
        } else if (userQuery.includes('statistik') || userQuery.includes('performance')) {
          botResponse = "Leistungsübersicht (aktuelle Woche):\n\n• Abschlussrate: 23% (+5% ggü. Vorwoche)\n• Durchschnittlicher Deal-Wert: 65.500 €\n• Response-Zeit: 3,2 Stunden\n• Lead-Konversionsrate: 18% (-2% ggü. Vorwoche)\n\nBereichsverbesserung: Fokussiere auf die Konversionsrate im mittleren Funnel (+12% Potential).";
        } else {
          botResponse = "Ich habe deine Anfrage verstanden. Hier ist, was ich für dich tun kann:\n\n1. Kontakte und Deals analysieren\n2. Pipeline-Prognosen erstellen\n3. Nächste beste Aktionen vorschlagen\n4. Performance-Statistiken anzeigen\n\nWas genau möchtest du wissen?";
        }
        
        updatedMessages[updatedMessages.length - 1] = {
          ...lastMessage,
          bot: botResponse
        };
        
        return updatedMessages;
      });
      
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Chatbot</h1>
          <p className="text-muted-foreground">Frage deinen KI-Assistenten nach Insights und Aktionen</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAICoach(true)}>
            <Zap className="mr-2 h-4 w-4" /> AI Coach einschalten
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" /> Einstellungen
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              AI CRM Assistant
              <Badge className="ml-2">Beta</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col h-[600px]">
              {/* Chat Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <p className="text-sm">
                    Hallo! Ich bin dein KI-Assistent. Ich kann dir bei der Analyse deiner Deals helfen, 
                    Kontakte priorisieren, Statistiken anzeigen und vieles mehr. Was möchtest du wissen?
                  </p>
                </div>

                {messages.map((message, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex justify-end">
                      <div className="bg-primary/20 text-primary-foreground p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">{message.user}</p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-secondary/50 p-3 rounded-lg max-w-[80%]">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 text-primary mt-0.5" />
                          <p className="text-sm whitespace-pre-wrap">{message.bot}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-end">
                    <div className="bg-primary/20 text-primary-foreground p-3 rounded-lg max-w-[80%]">
                      <p className="text-sm">{currentMessage}</p>
                    </div>
                  </div>
                )}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <div className="flex gap-1 items-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse delay-100"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts */}
              <div className="p-2 border-t border-border">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hidden">
                  {[
                    "Nächste beste Aktion",
                    "Lead-Details",
                    "Deal-Forecast",
                    "Performance-Statistik",
                    "Pipeline-Analyse"
                  ].map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap"
                      onClick={() => {
                        setCurrentMessage(prompt);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="Schreibe eine Nachricht..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={loading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Context Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Kontext</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-4 pb-2 space-y-4">
                <div className="border-b border-border pb-4">
                  <p className="text-xs text-muted-foreground mb-1">Aktiver Benutzer</p>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Alex Mustermann</p>
                      <p className="text-xs text-muted-foreground">Vertriebsleiter</p>
                    </div>
                  </div>
                </div>

                <div className="border-b border-border pb-4">
                  <p className="text-xs text-muted-foreground mb-1">Aktuelle Prioritäten</p>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <Clock className="h-3 w-3 text-yellow-500" />
                      </div>
                      <p className="text-xs">3 fällige Follow-ups</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Pencil className="h-3 w-3 text-green-500" />
                      </div>
                      <p className="text-xs">2 Angebote zu erstellen</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <PieChart className="h-3 w-3 text-blue-500" />
                      </div>
                      <p className="text-xs">5 Deals in finaler Phase</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">Analytics</p>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-md">
                    <div className="flex justify-between items-center">
                      <p className="text-xs">Pipeline-Wert</p>
                      <p className="text-xs font-medium">1,24 Mio €</p>
                    </div>
                    <div className="h-1 w-full bg-secondary mt-1 mb-3 rounded-full">
                      <div className="h-1 bg-primary rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs">Abschlussrate Q2</p>
                      <p className="text-xs font-medium">23%</p>
                    </div>
                    <div className="h-1 w-full bg-secondary mt-1 rounded-full">
                      <div className="h-1 bg-primary rounded-full" style={{ width: "23%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                Letzte Aktivitäten
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ListFilter className="h-3 w-3" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-4 pb-2 space-y-3">
                {[
                  { type: "call", content: "Anruf mit Müller AG", time: "Vor 2h" },
                  { type: "email", content: "E-Mail an Weber IT", time: "Vor 4h" },
                  { type: "meeting", content: "Meeting mit Becker Pharma", time: "Gestern" }
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-xs">{activity.content}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Coach Dialog */}
      <Dialog open={showAICoach} onOpenChange={setShowAICoach}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>AI Coach - Gesprächsführung</DialogTitle>
            <DialogDescription>
              Verbessere deine Verkaufsgespräche mit KI-gestützten Tipps und Anleitungen.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="p-4 rounded-md bg-secondary/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Personalisierte Gesprächsstrategie</h3>
                  <p className="text-xs text-muted-foreground">
                    Basierend auf deinem Gesprächsstil und dem Kundenprofil
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-primary/10 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Gesprächseinstieg</h4>
                  <p className="text-sm text-muted-foreground">
                    "Guten Tag Herr/Frau [Name], danke für Ihre Zeit. In unserem letzten Gespräch hatten Sie Interesse an [spezifisches Feature] gezeigt. Ich habe einige neue Informationen, die genau darauf eingehen."
                  </p>
                </div>

                <div className="p-3 bg-secondary/70 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Bedarfsermittlung</h4>
                  <p className="text-sm text-muted-foreground">
                    "Welche konkreten Herausforderungen haben Sie aktuell bei [relevanter Geschäftsprozess]? Was würde einen idealen Lösungsansatz für Sie ausmachen?"
                  </p>
                </div>

                <div className="p-3 bg-secondary/70 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Einwandbehandlung</h4>
                  <p className="text-sm text-muted-foreground">
                    "Das ist ein wichtiger Punkt. Andere Kunden in Ihrer Branche hatten ähnliche Bedenken. Wir haben das gelöst, indem wir [spezifische Lösung]. Wäre das ein gangbarer Weg für Sie?"
                  </p>
                </div>

                <div className="p-3 bg-secondary/70 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Abschluss</h4>
                  <p className="text-sm text-muted-foreground">
                    "Basierend auf unserem Gespräch scheint [Produktoption] am besten zu Ihren Anforderungen zu passen. Was halten Sie davon, wenn wir nächste Woche einen Termin für eine detaillierte Demo ansetzen?"
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Kundenprofil-Analyse</h3>
                <div className="p-3 bg-secondary/50 rounded-md space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Entscheidungsprozess</p>
                    <p className="text-sm">Komitee-basiert, CTO hat letzte Entscheidung</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Schmerzpunkte</p>
                    <p className="text-sm">Ineffiziente manuelle Prozesse, Datenverlust</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Budget-Sensitivität</p>
                    <p className="text-sm">Mittel - ROI wichtiger als Anfangsinvestition</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Vorbereitungs-Checkliste</h3>
                <div className="p-3 bg-secondary/50 rounded-md">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="check1" className="h-4 w-4 rounded" />
                      <label htmlFor="check1" className="text-sm">Kundendaten und Historie prüfen</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="check2" className="h-4 w-4 rounded" />
                      <label htmlFor="check2" className="text-sm">Branchenspezifische Case Study vorbereiten</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="check3" className="h-4 w-4 rounded" />
                      <label htmlFor="check3" className="text-sm">ROI-Berechnung für Entscheider</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="check4" className="h-4 w-4 rounded" />
                      <label htmlFor="check4" className="text-sm">Demo-Umgebung mit Kundendaten</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-secondary/30 rounded-md border border-secondary">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Live-Coaching</h3>
                <Badge>Neu</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Aktiviere Live-Coaching, um während deiner Kundengespräche Echtzeit-Feedback und Vorschläge zu erhalten.
              </p>
              <Button variant="outline" className="w-full">
                Live-Coaching für nächstes Meeting aktivieren
              </Button>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowAICoach(false)}>
                Schließen
              </Button>
              <Button onClick={() => setShowAICoach(false)}>
                Als PDF speichern
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chatbot;
