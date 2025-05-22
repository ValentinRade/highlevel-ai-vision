
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Lightbulb,
  Zap,
  Settings,
  PieChart,
  BarChart,
  ChevronRight,
  Info,
  AlertTriangle,
} from "lucide-react";
import { aiModules } from "@/lib/mockData";

interface AIModuleProps {
  id: number;
  name: string;
  active: boolean;
  description: string;
  params: {
    name: string;
    value: number;
    min: number;
    max: number;
    unit?: string;
  }[];
}

const AILab = () => {
  const [modules, setModules] = useState<AIModuleProps[]>(aiModules);
  
  // Toggle module active state
  const toggleModuleActive = (id: number) => {
    setModules(
      modules.map(module =>
        module.id === id ? { ...module, active: !module.active } : module
      )
    );
  };
  
  // Handle parameter change
  const handleParamChange = (moduleId: number, paramIndex: number, value: number) => {
    setModules(
      modules.map(module =>
        module.id === moduleId
          ? {
              ...module,
              params: module.params.map((param, i) =>
                i === paramIndex ? { ...param, value } : param
              ),
            }
          : module
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">AI-Lab</h1>
          <p className="text-muted-foreground">Konfiguriere und optimiere die KI-Module</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Zap className="mr-2 h-4 w-4" /> Globale Optimierung
          </Button>
        </div>
      </div>

      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList>
          <TabsTrigger value="modules">KI-Module</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
          <TabsTrigger value="logs">KI-Logs</TabsTrigger>
          <TabsTrigger value="advanced">Erweitert</TabsTrigger>
        </TabsList>
        
        <TabsContent value="modules" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modules.map(module => (
              <Card key={module.id} className={`border ${module.active ? 'border-primary/40' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md ${module.active ? 'bg-primary/20' : 'bg-secondary'}`}>
                        <Lightbulb className={`h-5 w-5 ${module.active ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <CardTitle>{module.name}</CardTitle>
                    </div>
                    <Switch
                      checked={module.active}
                      onCheckedChange={() => toggleModuleActive(module.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {module.description}
                  </p>
                  
                  <div className="space-y-4 mt-4">
                    {module.active ? (
                      module.params.map((param, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-sm">{param.name}</div>
                            <div className="text-sm font-mono">
                              {param.value}{param.unit || ''}
                            </div>
                          </div>
                          <Slider
                            defaultValue={[param.value]}
                            min={param.min}
                            max={param.max}
                            step={1}
                            onValueChange={(value) => handleParamChange(module.id, index, value[0])}
                            className="cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <div>Niedrig</div>
                            <div>Hoch</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 bg-secondary/30 rounded-md text-center text-muted-foreground text-sm">
                        Modul deaktiviert
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-secondary/30 rounded-md p-4 flex items-start gap-3">
            <Info className="text-muted-foreground h-5 w-5 mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">Empfohlene Module</h3>
              <p className="text-sm text-muted-foreground">
                Basierend auf deinem Nutzungsprofil empfehlen wir dir, die Module "Lead-Scoring Engine" und "Deal-Prognose" zu aktivieren und die Aggressivität auf mindestens 70% einzustellen.
              </p>
              <Button variant="link" size="sm" className="px-0 mt-1">
                Automatisch optimieren <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="simulation" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" /> KI-Aggressivität Simulation
                  <Badge className="ml-2">Beta</Badge>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Aggressivität:</span>
                  <Badge variant="outline" className="font-mono">
                    {modules.find(m => m.id === 1)?.params.find(p => p.name === 'Aggressivität')?.value || 50}%
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary/20 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Simulationshinweis</h3>
                    <p className="text-sm text-muted-foreground">
                      Diese Simulation zeigt eine Prognose, wie die Anpassung der KI-Aggressivität sich auf Performance-KPIs auswirken könnte. Die tatsächlichen Ergebnisse können variieren.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-secondary/30 rounded-md">
                  <h3 className="font-medium mb-3 flex items-center">
                    <BarChart className="h-4 w-4 mr-2" /> Conversion-Rate
                  </h3>
                  
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-muted-foreground">[Conversion-Rate-Diagramm]</p>
                  </div>
                  
                  <div className="mt-3 text-sm">
                    <p>Erwartete Verbesserung:</p>
                    <p className="font-medium text-green-500">+15.2%</p>
                  </div>
                </div>

                <div className="p-4 bg-secondary/30 rounded-md">
                  <h3 className="font-medium mb-3 flex items-center">
                    <BarChart className="h-4 w-4 mr-2" /> Verkaufszyklus (Tage)
                  </h3>
                  
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-muted-foreground">[Verkaufszyklus-Diagramm]</p>
                  </div>
                  
                  <div className="mt-3 text-sm">
                    <p>Erwartete Verbesserung:</p>
                    <p className="font-medium text-green-500">-18.7%</p>
                  </div>
                </div>

                <div className="p-4 bg-secondary/30 rounded-md md:col-span-2 lg:col-span-1">
                  <h3 className="font-medium mb-3 flex items-center">
                    <PieChart className="h-4 w-4 mr-2" /> Forecast-Verbesserung
                  </h3>
                  
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-muted-foreground">[Forecast-Liniendiagramm]</p>
                  </div>
                  
                  <div className="mt-3 text-sm">
                    <p>Erwartete Umsatzsteigerung (Q2):</p>
                    <p className="font-medium text-green-500">+8.2%</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-md flex-1">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-cyan-500" />
                    <span className="text-cyan-500">Empfohlene Einstellung</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Basierend auf dieser Simulation könnte die Erhöhung der AI-Aggressivität auf 
                    <span className="text-foreground font-medium"> 75-80%</span> optimale Ergebnisse liefern. Dies würde die Conversion-Rate erhöhen und den Verkaufszyklus verkürzen.
                  </p>
                </div>
                
                <div className="p-4 bg-secondary/30 rounded-md flex-1">
                  <h3 className="font-medium mb-2">Risikobewertung</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Kundenabwanderung</span>
                      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Kundenzufriedenheit</span>
                      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ressourcenbedarf</span>
                      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">KI-Logs werden geladen...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced">
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">Erweiterte Einstellungen werden geladen...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AILab;
