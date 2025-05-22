
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { aiModules } from "@/lib/mockData";

const Settings = () => {
  // AI module settings
  const [aiSettings, setAiSettings] = useState({
    autoEmailOutreach: true,
    leadScoring: true,
    chatbot: true,
    dealRecommendations: true,
    contentSuggestions: false,
    automaticFollowups: true,
  });

  // Handle AI setting toggle
  const toggleAiSetting = (setting: keyof typeof aiSettings) => {
    setAiSettings({
      ...aiSettings,
      [setting]: !aiSettings[setting],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Einstellungen</h1>
          <p className="text-muted-foreground">Konfiguriere dein CRM und die KI-Module</p>
        </div>
      </div>

      <Tabs defaultValue="ai" className="space-y-6">
        <TabsList>
          <TabsTrigger value="ai">KI-Module</TabsTrigger>
          <TabsTrigger value="account">Konto</TabsTrigger>
          <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="integrations">Integrationen</TabsTrigger>
          <TabsTrigger value="billing">Abrechnung</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>KI-Module</CardTitle>
              <CardDescription>
                Aktiviere oder deaktiviere individuelle KI-Funktionen in deinem CRM.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Outreach */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-email" className="font-medium">Autom. E-Mail Outreach</Label>
                      <Switch
                        id="auto-email"
                        checked={aiSettings.autoEmailOutreach}
                        onCheckedChange={() => toggleAiSetting('autoEmailOutreach')}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      KI erstellt und versendet personalisierte E-Mails an Leads basierend auf deren Profil.
                    </p>
                  </div>
                  
                  {/* Lead Scoring */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="lead-scoring" className="font-medium">Lead-Scoring</Label>
                      <Switch
                        id="lead-scoring"
                        checked={aiSettings.leadScoring}
                        onCheckedChange={() => toggleAiSetting('leadScoring')}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      KI bewertet und priorisiert Leads automatisch basierend auf Engagement und Fit.
                    </p>
                  </div>
                  
                  {/* Chatbot */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="chatbot" className="font-medium">Chatbot</Label>
                      <Switch
                        id="chatbot"
                        checked={aiSettings.chatbot}
                        onCheckedChange={() => toggleAiSetting('chatbot')}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      KI-gestützter Chatbot für Kundenanfragen und interne Datenabfragen.
                    </p>
                  </div>
                  
                  {/* Deal Recommendations */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="deal-recommendations" className="font-medium">Deal-Empfehlungen</Label>
                      <Switch
                        id="deal-recommendations"
                        checked={aiSettings.dealRecommendations}
                        onCheckedChange={() => toggleAiSetting('dealRecommendations')}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      KI analysiert Deals und schlägt nächste Schritte zur Verbesserung der Win-Rate vor.
                    </p>
                  </div>
                  
                  {/* Content Suggestions */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content-suggestions" className="font-medium">Content-Vorschläge</Label>
                      <Switch
                        id="content-suggestions"
                        checked={aiSettings.contentSuggestions}
                        onCheckedChange={() => toggleAiSetting('contentSuggestions')}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      KI empfiehlt relevante Inhalte basierend auf dem Lead-Profil und der Buyer's Journey.
                    </p>
                  </div>
                  
                  {/* Automatic Follow-ups */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-followups" className="font-medium">Automatische Follow-ups</Label>
                      <Switch
                        id="auto-followups"
                        checked={aiSettings.automaticFollowups}
                        onCheckedChange={() => toggleAiSetting('automaticFollowups')}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      KI plant und erstellt automatische Nachfassaktionen für inaktive Leads.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-medium mb-4">Globale KI-Einstellungen</h3>
                
                <div className="space-y-6">
                  {/* AI Aggressiveness */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label htmlFor="ai-aggressiveness">KI-Aggressivität</Label>
                      <span className="text-sm font-mono">60%</span>
                    </div>
                    <Slider
                      id="ai-aggressiveness"
                      defaultValue={[60]}
                      max={100}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Passiv</span>
                      <span>Ausgeglichen</span>
                      <span>Aggressiv</span>
                    </div>
                  </div>
                  
                  {/* Data Usage */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label htmlFor="data-usage">Datennutzung für Training</Label>
                      <span className="text-sm font-mono">Mittel</span>
                    </div>
                    <Slider
                      id="data-usage"
                      defaultValue={[50]}
                      max={100}
                      step={25}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Minimal</span>
                      <span>Mittel</span>
                      <span>Maximal</span>
                    </div>
                  </div>
                  
                  {/* Action Approval */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="action-approval" className="font-medium">Aktionen genehmigen</Label>
                      <p className="text-sm text-muted-foreground">
                        Fordere manuelle Genehmigung vor automatischen KI-Aktionen an
                      </p>
                    </div>
                    <Switch id="action-approval" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Zurücksetzen</Button>
                <Button>Änderungen speichern</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Kontoeinstellungen</CardTitle>
              <CardDescription>
                Verwalte deine persönlichen Informationen und Kontoeinstellungen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Alex Mustermann" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input id="email" type="email" defaultValue="alex.mustermann@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" defaultValue="Vertriebsleiter" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" defaultValue="+49 123 4567890" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <div className="h-32 flex items-center justify-center">
            <p className="text-muted-foreground">Benachrichtigungseinstellungen werden geladen...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="team">
          <div className="h-32 flex items-center justify-center">
            <p className="text-muted-foreground">Teameinstellungen werden geladen...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="integrations">
          <div className="h-32 flex items-center justify-center">
            <p className="text-muted-foreground">Integrationseinstellungen werden geladen...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="billing">
          <div className="h-32 flex items-center justify-center">
            <p className="text-muted-foreground">Abrechnungsinformationen werden geladen...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
