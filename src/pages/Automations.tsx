
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Plus,
  Mail,
  MessageSquare,
  Bell,
  CheckCircle,
  Settings,
  ArrowRight,
  Edit,
  ChevronRight,
  PieChart,
  Phone,
} from "lucide-react";
import { workflows } from "@/lib/mockData";

interface WorkflowProps {
  id: number;
  name: string;
  type: string;
  isActive: boolean;
  lastRun: Date;
  lastRunText: string;
  steps: {
    id: number;
    type: string;
    delay: number;
    isOptimized: boolean;
  }[];
  performance: {
    openRate: number;
    clickRate: number;
    conversion: number;
  };
  aiOptimized: boolean;
}

const Automations = () => {
  const [allWorkflows, setAllWorkflows] = useState<WorkflowProps[]>(workflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowProps | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  
  // Toggle workflow active state
  const toggleWorkflowActive = (id: number) => {
    setAllWorkflows(
      allWorkflows.map(workflow =>
        workflow.id === id ? { ...workflow, isActive: !workflow.isActive } : workflow
      )
    );
  };
  
  // Open workflow detail
  const openWorkflowDetail = (workflow: WorkflowProps) => {
    setSelectedWorkflow(workflow);
    setShowDetail(true);
  };
  
  // Get step icon
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'Email':
        return <Mail className="h-4 w-4" />;
      case 'WhatsApp':
        return <MessageSquare className="h-4 w-4" />;
      case 'Reminder':
        return <Bell className="h-4 w-4" />;
      case 'Aufgabe':
        return <CheckCircle className="h-4 w-4" />;
      case 'Telefonanruf':
        return <Phone className="h-4 w-4" />;
      case 'Abschluss':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Automatisierungen</h1>
          <p className="text-muted-foreground">Erstelle und verwalte automatisierte Workflows</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Workflow erstellen
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Aktive Workflows</CardTitle>
            <Badge variant="outline">
              {allWorkflows.filter(workflow => workflow.isActive).length} von {allWorkflows.length} aktiv
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allWorkflows.map((workflow) => (
              <div
                key={workflow.id}
                className={`p-4 rounded-md ${
                  workflow.isActive ? 'bg-secondary/50' : 'bg-secondary/20'
                } hover:bg-secondary/70 transition-colors`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${workflow.isActive ? 'bg-primary/20' : 'bg-secondary'}`}>
                      {workflow.type === 'Lead Nurturing' ? (
                        <Mail className={`h-5 w-5 ${workflow.isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      ) : workflow.type === 'Onboarding' ? (
                        <CheckCircle className={`h-5 w-5 ${workflow.isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      ) : (
                        <MessageSquare className={`h-5 w-5 ${workflow.isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{workflow.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Letzter Lauf: {workflow.lastRunText}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {workflow.aiOptimized && (
                      <Badge className="ai-badge">AI-optimiert</Badge>
                    )}
                    <Switch
                      checked={workflow.isActive}
                      onCheckedChange={() => toggleWorkflowActive(workflow.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openWorkflowDetail(workflow)}
                    >
                      Details
                    </Button>
                  </div>
                </div>
                
                {/* Workflow Steps Preview */}
                <div className="mt-4 flex items-center gap-2">
                  {workflow.steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <div
                        className={`flex items-center justify-center h-8 w-8 rounded-full ${
                          step.isOptimized ? 'bg-primary/20 text-primary' : 'bg-secondary text-foreground/70'
                        }`}
                      >
                        {getStepIcon(step.type)}
                      </div>
                      {index < workflow.steps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedWorkflow && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle>{selectedWorkflow.name}</DialogTitle>
                  <Switch
                    checked={selectedWorkflow.isActive}
                    onCheckedChange={() => toggleWorkflowActive(selectedWorkflow.id)}
                  />
                </div>
                <DialogDescription>
                  {selectedWorkflow.type} • {selectedWorkflow.steps.length} Schritte • Erstellt am 12.05.2023
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Workflow Performance */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary/50 rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Öffnungsrate</p>
                    <p className="text-2xl font-semibold">{selectedWorkflow.performance.openRate}%</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Klickrate</p>
                    <p className="text-2xl font-semibold">{selectedWorkflow.performance.clickRate}%</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Conversion</p>
                    <p className="text-2xl font-semibold">{selectedWorkflow.performance.conversion}%</p>
                  </div>
                </div>

                {/* Workflow Visualization */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Workflow-Visualisierung</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">AI-Optimierung</span>
                        <Switch checked={selectedWorkflow.aiOptimized} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-md">
                    <div className="flex flex-col items-center">
                      {selectedWorkflow.steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex items-center justify-center h-12 w-12 rounded-full ${
                                step.isOptimized ? 'bg-primary/20 text-primary' : 'bg-secondary text-foreground/70'
                              }`}
                            >
                              {getStepIcon(step.type)}
                            </div>
                            <div className="bg-secondary/70 p-3 rounded-md min-w-[250px]">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{step.type}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Verzögerung: {step.delay} {step.delay === 1 ? 'Tag' : 'Tage'}
                                  </p>
                                </div>
                                {step.isOptimized && (
                                  <Badge className="ai-badge">AI-optimiert</Badge>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {index < selectedWorkflow.steps.length - 1 && (
                            <div className="h-8 w-0.5 bg-secondary my-1"></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button onClick={() => {
                    setShowDetail(false);
                    setShowEditor(true);
                  }}>
                    <Edit className="mr-2 h-4 w-4" />
                    Bearbeiten
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setShowDetail(false);
                    setShowAiSuggestions(true);
                  }}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    AI-Vorschläge anzeigen
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Workflow Editor Dialog */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Workflow bearbeiten</DialogTitle>
            <DialogDescription>
              Passe den Workflow an und optimiere ihn mit KI-Unterstützung.
            </DialogDescription>
          </DialogHeader>

          <div className="h-[500px] bg-secondary/20 rounded-md p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-secondary/70 rounded-full flex items-center justify-center mb-4">
                <Edit className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Visueller Editor</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                Hier würde der visuelle Editor-Mockup mit den Workflow-Schritten, Verbindungen und Einstellungen angezeigt werden.
              </p>
              <Button variant="outline">
                Editor laden
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowEditor(false)}>
              Abbrechen
            </Button>
            <Button onClick={() => setShowEditor(false)}>
              Speichern
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Suggestions Dialog */}
      <Dialog open={showAiSuggestions} onOpenChange={setShowAiSuggestions}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>KI-Vorschläge</DialogTitle>
            <DialogDescription>
              Basierend auf der Analyse deines Workflows hat unsere KI folgende Optimierungen identifiziert.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <h3 className="font-medium">Performance-Analyse</h3>
                  <p className="text-xs text-muted-foreground">Basierend auf 324 ähnlichen Workflows</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <PieChart className="h-4 w-4 text-cyan-500 mt-1" />
                  <div>
                    <p className="font-medium text-sm">Schwachstelle identifiziert</p>
                    <p className="text-sm text-muted-foreground">
                      Der Übergang von Schritt 2 zu Schritt 3 zeigt einen Conversion-Abfall von 38%. Eine Verzögerung von 3 Tagen (statt 2) könnte die Conversion um ca. 15% steigern.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PieChart className="h-4 w-4 text-cyan-500 mt-1" />
                  <div>
                    <p className="font-medium text-sm">Optimierungsvorschlag</p>
                    <p className="text-sm text-muted-foreground">
                      Die E-Mail-Betreffzeile im ersten Schritt hat eine unterdurchschnittliche Öffnungsrate. Alternative Vorschläge: "Ihre persönliche Analyse ist bereit" oder "Exklusive Einblicke für [Company Name]".
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PieChart className="h-4 w-4 text-cyan-500 mt-1" />
                  <div>
                    <p className="font-medium text-sm">Neuer Schritt empfohlen</p>
                    <p className="text-sm text-muted-foreground">
                      Nach Schritt 4 sollte ein zusätzlicher Telefonanruf eingefügt werden, falls keine Antwort erfolgt. Ähnliche Workflows zeigen eine 22% höhere Conversion-Rate durch diesen zusätzlichen Touchpoint.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-secondary/50 rounded-md">
              <h3 className="font-medium mb-2">Vorgeschlagener optimierter Workflow</h3>
              <div className="space-y-2">
                {[
                  { id: 1, type: 'Email', description: 'Verbesserte Betreffzeile und Personalisierung', isOptimized: true },
                  { id: 2, type: 'Reminder', description: 'Unverändert', isOptimized: false },
                  { id: 3, type: 'WhatsApp', description: 'Verzögerung auf 3 Tage erhöht', isOptimized: true },
                  { id: 4, type: 'Email', description: 'Inhalt optimiert basierend auf Zielgruppenprofil', isOptimized: true },
                  { id: 5, type: 'Telefonanruf', description: 'Neu hinzugefügt (bedingt)', isOptimized: true },
                  { id: 6, type: 'Abschluss', description: 'Unverändert', isOptimized: false }
                ].map((step) => (
                  <div
                    key={step.id}
                    className={`p-3 rounded-md ${step.isOptimized ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-secondary/70'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step.isOptimized ? 'bg-cyan-500/20 text-cyan-500' : 'bg-secondary'}`}>
                          {getStepIcon(step.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{step.type}</p>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      {step.isOptimized && (
                        <Badge className="ai-badge">KI</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowAiSuggestions(false)}>
                Ablehnen
              </Button>
              <Button onClick={() => setShowAiSuggestions(false)}>
                Änderungen übernehmen
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Automations;
