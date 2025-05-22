
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import {
  Plus,
  Play,
  Pause,
  ArrowRight,
  Settings,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  BarChart,
  Users,
  Mail,
  MessageSquare,
  Bell,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";
import { workflows } from "@/lib/mockData";

interface StepProps {
  step: {
    id: number;
    type: string;
    delay: number;
    isOptimized: boolean;
  };
  isLastStep: boolean;
}

const WorkflowStep = ({ step, isLastStep }: StepProps) => {
  let icon;
  let bgColor;
  
  switch (step.type) {
    case "Email":
      icon = <Mail className="h-5 w-5" />;
      bgColor = "bg-blue-500/20";
      break;
    case "WhatsApp":
      icon = <MessageSquare className="h-5 w-5" />;
      bgColor = "bg-green-500/20";
      break;
    case "Reminder":
      icon = <Bell className="h-5 w-5" />;
      bgColor = "bg-yellow-500/20";
      break;
    case "Aufgabe":
      icon = <CheckCircle className="h-5 w-5" />;
      bgColor = "bg-purple-500/20";
      break;
    case "Telefonanruf":
      icon = <MessageSquare className="h-5 w-5" />;
      bgColor = "bg-orange-500/20";
      break;
    default:
      icon = <CheckCircle className="h-5 w-5" />;
      bgColor = "bg-gray-500/20";
  }
  
  return (
    <>
      <div className="flex items-center">
        <div className={`h-12 w-12 ${bgColor} rounded-full flex items-center justify-center mr-4`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{step.type}</h3>
            {step.isOptimized && (
              <Badge className="ai-badge">
                AI Optimiert
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Nach {step.delay} {step.delay === 1 ? "Tag" : "Tagen"}
          </p>
        </div>
      </div>
      {!isLastStep && (
        <div className="ml-6 my-2 w-0.5 h-6 bg-border"></div>
      )}
    </>
  );
};

const Automations = () => {
  const [filteredWorkflows, setFilteredWorkflows] = useState(workflows);
  const [showWorkflowEditor, setShowWorkflowEditor] = useState(false);
  const [showEmailEditor, setShowEmailEditor] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  
  const handleWorkflowClick = (workflow: any) => {
    setSelectedWorkflow(workflow);
    setShowWorkflowEditor(true);
  };
  
  const handleOpenEmailEditor = () => {
    setShowEmailEditor(true);
  };
  
  // Toggle workflow active state
  const toggleWorkflowActive = (e: React.MouseEvent, workflowId: number) => {
    e.stopPropagation();
    setFilteredWorkflows(prevWorkflows => 
      prevWorkflows.map(workflow => 
        workflow.id === workflowId 
          ? { ...workflow, isActive: !workflow.isActive } 
          : workflow
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Automatisierungen</h1>
          <p className="text-muted-foreground">Erstelle und verwalte automatische Workflows und Kampagnen</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Workflow erstellen
          </Button>
        </div>
      </div>
      
      {/* Workflow browser */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Workflow-Übersicht</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Workflows suchen..." className="pl-9" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Alle</TabsTrigger>
              <TabsTrigger value="active">Aktiv</TabsTrigger>
              <TabsTrigger value="inactive">Inaktiv</TabsTrigger>
              <TabsTrigger value="ai">AI Optimiert</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredWorkflows.map(workflow => (
                <div 
                  key={workflow.id} 
                  className="border border-border rounded-md p-4 cursor-pointer hover:bg-secondary/20 transition-colors"
                  onClick={() => handleWorkflowClick(workflow)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full ${workflow.isActive ? 'bg-green-500/20' : 'bg-gray-500/20'} flex items-center justify-center mr-3`}>
                        {workflow.isActive ? (
                          <Play className="h-5 w-5 text-green-500" />
                        ) : (
                          <Pause className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{workflow.name}</h3>
                          {workflow.aiOptimized && (
                            <Badge className="ml-2 ai-badge">AI Optimiert</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{workflow.type} • {workflow.steps.length} Schritte • Letzte Ausführung {workflow.lastRunText}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={workflow.isActive} 
                        onCheckedChange={(e) => toggleWorkflowActive(e as unknown as React.MouseEvent, workflow.id)} 
                      />
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Workflow performance */}
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="p-2 bg-secondary/30 rounded-md">
                      <p className="text-xs text-muted-foreground">Öffnungsrate</p>
                      <p className="text-sm font-medium">{workflow.performance.openRate}%</p>
                    </div>
                    <div className="p-2 bg-secondary/30 rounded-md">
                      <p className="text-xs text-muted-foreground">Klickrate</p>
                      <p className="text-sm font-medium">{workflow.performance.clickRate}%</p>
                    </div>
                    <div className="p-2 bg-secondary/30 rounded-md">
                      <p className="text-xs text-muted-foreground">Conversion</p>
                      <p className="text-sm font-medium">{workflow.performance.conversion}%</p>
                    </div>
                  </div>
                  
                  {/* Workflow steps preview */}
                  <div className="mt-4 flex items-center">
                    {workflow.steps.slice(0, 3).map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs`}>
                          {step.type === 'Email' ? (
                            <Mail className="h-4 w-4 text-blue-500" />
                          ) : step.type === 'WhatsApp' ? (
                            <MessageSquare className="h-4 w-4 text-green-500" />
                          ) : step.type === 'Reminder' ? (
                            <Bell className="h-4 w-4 text-yellow-500" />
                          ) : step.type === 'Aufgabe' ? (
                            <CheckCircle className="h-4 w-4 text-purple-500" />
                          ) : (
                            <MessageSquare className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                        {index < 2 && <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />}
                      </div>
                    ))}
                    {workflow.steps.length > 3 && (
                      <>
                        <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
                        <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center">
                          <span className="text-xs">+{workflow.steps.length - 3}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>
            
            {/* Placeholder for other tabs */}
            <TabsContent value="active">
              <div className="p-4 text-center text-muted-foreground">
                Filter für aktive Workflows
              </div>
            </TabsContent>
            <TabsContent value="inactive">
              <div className="p-4 text-center text-muted-foreground">
                Filter für inaktive Workflows
              </div>
            </TabsContent>
            <TabsContent value="ai">
              <div className="p-4 text-center text-muted-foreground">
                Filter für AI-optimierte Workflows
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Workflow editor dialog */}
      <Dialog open={showWorkflowEditor} onOpenChange={setShowWorkflowEditor}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Workflow bearbeiten</DialogTitle>
          </DialogHeader>
          {selectedWorkflow && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Input 
                    value={selectedWorkflow.name} 
                    className="text-lg font-bold h-auto py-1 w-60"
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Duplizieren
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart className="h-4 w-4 mr-2" /> Statistik
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" /> Löschen
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Workflow steps */}
                  <div>
                    <h3 className="text-base font-medium mb-4">Workflow-Schritte</h3>
                    <div className="space-y-2">
                      {selectedWorkflow.steps.map((step: any, index: number) => (
                        <div 
                          key={step.id} 
                          className="border border-border rounded-md p-4 hover:bg-secondary/20 transition-colors cursor-pointer"
                          onClick={handleOpenEmailEditor}
                        >
                          <WorkflowStep step={step} isLastStep={index === selectedWorkflow.steps.length - 1} />
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" /> Schritt hinzufügen
                      </Button>
                    </div>
                  </div>
                  
                  {/* Trigger conditions */}
                  <div>
                    <h3 className="text-base font-medium mb-4">Auslösebedingungen</h3>
                    <div className="border border-border rounded-md p-4 space-y-4">
                      <div className="flex items-center gap-2">
                        <Select icon={<Users className="h-4 w-4" />} label="Zielgruppe" value="Alle neuen Leads" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Select icon={<AlertTriangle className="h-4 w-4" />} label="Bedingungen" value="Lead-Score > 50" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Select icon={<Calendar className="h-4 w-4" />} label="Timing" value="Sofort nach Auslösung" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="border border-border rounded-md p-4">
                    <h3 className="text-base font-medium mb-4">Einstellungen</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Status</p>
                        <Switch checked={selectedWorkflow.isActive} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm">Typ</p>
                        <Select 
                          value={selectedWorkflow.type} 
                          options={[
                            "Lead Nurturing",
                            "Onboarding",
                            "Reaktivierung",
                            "Event-Follow-up",
                            "Angebotsnachfassung"
                          ]} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-medium">KI-Optimierung</h3>
                      <Switch checked={selectedWorkflow.aiOptimized} />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm">Anpassungsstärke</p>
                          <p className="text-xs">65%</p>
                        </div>
                        <Slider defaultValue={[65]} max={100} step={1} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm">Nachrichtenfrequenz</p>
                          <p className="text-xs">Moderat</p>
                        </div>
                        <Slider defaultValue={[50]} max={100} step={1} />
                      </div>
                      <div>
                        <Button variant="outline" className="w-full">
                          <Settings className="h-4 w-4 mr-2" /> Weitere Einstellungen
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-border rounded-md p-4">
                    <h3 className="text-base font-medium mb-2">Performance</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Öffnungsrate:</span>
                        <span className="font-medium">{selectedWorkflow.performance.openRate}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Klickrate:</span>
                        <span className="font-medium">{selectedWorkflow.performance.clickRate}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Konversion:</span>
                        <span className="font-medium">{selectedWorkflow.performance.conversion}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowWorkflowEditor(false)}>
                  Abbrechen
                </Button>
                <Button>
                  Speichern
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Email editor dialog */}
      <Dialog open={showEmailEditor} onOpenChange={setShowEmailEditor}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>E-Mail bearbeiten</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Betreff</label>
              <Input defaultValue="Ihr persönliches Angebot - [Firmenname]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">E-Mail-Inhalt</label>
              <div className="min-h-[300px] p-4 border border-border rounded-md">
                <p className="text-muted-foreground">
                  [E-Mail-Editor würde hier angezeigt]
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Absender</label>
                <Input defaultValue="Alex Mustermann" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Absender-E-Mail</label>
                <Input defaultValue="alex@firma.de" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEmailEditor(false)}>
                Abbrechen
              </Button>
              <Button>
                Speichern
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Simple Select component for the workflow editor
interface SelectProps {
  icon?: React.ReactNode;
  label?: string;
  value: string;
  options?: string[];
}

const Select = ({ icon, label, value, options }: SelectProps) => {
  return (
    <div className="flex items-center gap-2 w-full">
      {icon && <div>{icon}</div>}
      {label && <p className="text-sm min-w-24">{label}:</p>}
      <div className="flex-1 px-3 py-1.5 rounded-md bg-secondary/50 text-sm flex items-center justify-between cursor-pointer hover:bg-secondary/70">
        <span>{value}</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default Automations;
