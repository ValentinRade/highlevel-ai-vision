
import { useState } from "react";
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
  MoreHorizontal,
  Plus,
  Users,
  Calendar,
  Search,
  ChevronRight,
  MessageSquare,
  Filter,
} from "lucide-react";
import { deals } from "@/lib/mockData";

interface DealProps {
  id: number;
  title: string;
  value: number;
  stage: string;
  contact: string;
  company: string;
  probability: number;
  aiRecommendation: string;
  expectedClosing: Date;
  expectedClosingText: string;
  aiPotential: number;
  lastUpdate: Date;
  lastUpdateText: string;
}

const Pipeline = () => {
  const [stageDeals, setStageDeals] = useState(deals);
  const [showPotentialAnalysis, setShowPotentialAnalysis] = useState(false);
  const [draggedDeal, setDraggedDeal] = useState<DealProps | null>(null);
  const [showDealDetail, setShowDealDetail] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<DealProps | null>(null);
  
  // Handle drag start
  const handleDragStart = (deal: DealProps) => {
    setDraggedDeal(deal);
  };
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  // Handle drop
  const handleDrop = (stage: string) => {
    if (draggedDeal && draggedDeal.stage !== stage) {
      // Clone the deals object
      const newStageDeals = { ...stageDeals };
      
      // Remove the deal from its original stage
      newStageDeals[draggedDeal.stage as keyof typeof stageDeals] = stageDeals[draggedDeal.stage as keyof typeof stageDeals].filter(
        (deal) => deal.id !== draggedDeal.id
      );
      
      // Add the deal to the new stage
      const updatedDeal = { ...draggedDeal, stage };
      newStageDeals[stage as keyof typeof stageDeals] = [...stageDeals[stage as keyof typeof stageDeals], updatedDeal];
      
      // Update the state
      setStageDeals(newStageDeals);
    }
    setDraggedDeal(null);
  };
  
  // Open deal detail
  const openDealDetail = (deal: DealProps) => {
    setSelectedDeal(deal);
    setShowDealDetail(true);
  };
  
  // Get heatmap color based on AI potential
  const getHeatmapColor = (potentialValue: number) => {
    if (potentialValue >= 80) return "bg-green-500/20";
    if (potentialValue >= 60) return "bg-green-500/10";
    if (potentialValue >= 40) return "bg-yellow-500/10";
    if (potentialValue >= 20) return "bg-orange-500/10";
    return "bg-red-500/10";
  };
  
  // Function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  // Calculate stage totals
  const calculateStageTotal = (stage: string) => {
    return stageDeals[stage as keyof typeof stageDeals].reduce(
      (total, deal) => total + deal.value,
      0
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Pipeline</h1>
          <p className="text-muted-foreground">Verwalte und analysiere deine Verkaufschancen</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowPotentialAnalysis(true)}>
            KI-Potenzialanalyse starten
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Deal erstellen
          </Button>
        </div>
      </div>

      {/* Pipeline Summary */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Pipeline-Übersicht</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Deal suchen..." className="pl-9" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Gesamtwert: {formatCurrency(
                  Object.values(stageDeals).reduce(
                    (total, deals) => total + deals.reduce((sum, deal) => sum + deal.value, 0),
                    0
                  )
                )}
              </Badge>
              <Badge variant="outline">
                Deals: {Object.values(stageDeals).reduce(
                  (total, deals) => total + deals.length,
                  0
                )}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Letzte Aktualisierung: Heute, 14:32 Uhr
            </div>
          </div>

          {/* Pipeline Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(stageDeals).map(([stage, deals]) => (
              <div 
                key={stage}
                className="flex flex-col"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(stage)}
              >
                <div className="flex items-center justify-between p-2 bg-secondary/50 rounded-t-md">
                  <div className="font-medium">{stage}</div>
                  <Badge variant="outline" className="text-xs">
                    {formatCurrency(calculateStageTotal(stage))}
                  </Badge>
                </div>
                <div 
                  className={`flex-1 bg-secondary/20 rounded-b-md p-2 min-h-[30rem] relative overflow-hidden`}
                >
                  {/* AI Potential Heatmap */}
                  <div className="absolute inset-0 flex flex-col">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`flex-1 ${getHeatmapColor((100 - i * 20) * (Math.random() * 0.4 + 0.8))}`}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Deals */}
                  <div className="space-y-2 relative z-10">
                    {deals.map((deal) => (
                      <div 
                        key={deal.id}
                        className="bg-card p-3 rounded-md shadow cursor-pointer"
                        draggable
                        onDragStart={() => handleDragStart(deal)}
                        onClick={() => openDealDetail(deal)}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm">{deal.title}</h4>
                          {deal.aiPotential > 70 && (
                            <Badge className="ai-badge">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2">
                          <Badge variant="outline">{formatCurrency(deal.value)}</Badge>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Wahrscheinlichkeit</span>
                            <span>{deal.probability}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${deal.probability}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {deal.contact}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {deal.expectedClosingText}
                          </div>
                        </div>
                      </div>
                    ))}
                    {deals.length === 0 && (
                      <div className="py-4 text-center text-sm text-muted-foreground">
                        Keine Deals in dieser Phase
                      </div>
                    )}
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      <Plus className="h-4 w-4 mr-1" /> Deal hinzufügen
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Potential Analysis Dialog */}
      <Dialog open={showPotentialAnalysis} onOpenChange={setShowPotentialAnalysis}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>KI-Potenzialanalyse</DialogTitle>
            <DialogDescription>
              Unsere KI hat deine Pipeline analysiert und folgende Optimierungsmöglichkeiten identifiziert.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Charts */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-4 bg-secondary/50 rounded-md">
                <h3 className="text-sm font-medium mb-2">Pipeline-Potential</h3>
                <div className="h-52 flex items-center justify-center">
                  <p className="text-muted-foreground">[Pipeline-Potential-Diagramm]</p>
                </div>
              </div>

              <div className="p-4 bg-secondary/50 rounded-md">
                <h3 className="text-sm font-medium mb-2">Deal-Verteilung</h3>
                <div className="h-40 flex items-center justify-center">
                  <p className="text-muted-foreground">[Deal-Verteilungs-Diagramm]</p>
                </div>
              </div>

              <div className="p-4 bg-secondary/50 rounded-md">
                <h3 className="text-sm font-medium mb-2">Erfolgswahrscheinlichkeit über Zeit</h3>
                <div className="h-40 flex items-center justify-center">
                  <p className="text-muted-foreground">[Wahrscheinlichkeits-Liniendiagramm]</p>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="space-y-4">
              <div className="p-4 bg-secondary/50 rounded-md">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-medium">AI Insights</h3>
                  <Badge className="ai-badge">KI</Badge>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-cyan-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Erwarteter Abschluss</p>
                        <p className="text-xs text-muted-foreground">in 14 Tagen (75%)</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h4 className="text-sm font-medium mb-2">Empfohlene nächste Schritte</h4>
                    <ul className="space-y-2">
                      {[
                        'Müller AG: Referenzkunden vorstellen',
                        'Fischer GmbH: Angebotsdetails konkretisieren',
                        'Schmidt Tech: Entscheidungsträger identifizieren',
                        'Weber IT: Follow-up nach Demo planen'
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="min-w-4 h-4 rounded-full bg-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-500 mt-0.5">
                            {i + 1}
                          </div>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h4 className="text-sm font-medium mb-2">Potential-Highlights</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <ChevronRight className="h-4 w-4 text-cyan-500 mt-0.5" />
                        <span>3 Deals mit >80% Abschlusswahrscheinlichkeit</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <ChevronRight className="h-4 w-4 text-cyan-500 mt-0.5" />
                        <span>Gesamtwert der Pipeline könnte um 22% steigen</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <ChevronRight className="h-4 w-4 text-cyan-500 mt-0.5" />
                        <span>5 Deals benötigen dringende Aufmerksamkeit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                KI-Empfehlungen umsetzen
              </Button>
              <Button variant="outline" className="w-full">
                Detailbericht herunterladen
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Deal Detail Dialog */}
      <Dialog open={showDealDetail} onOpenChange={setShowDealDetail}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedDeal && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedDeal.title}</DialogTitle>
                <DialogDescription>
                  {selectedDeal.company} • {selectedDeal.stage}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Wert</p>
                    <p className="text-xl font-semibold">{formatCurrency(selectedDeal.value)}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Wahrscheinlichkeit</p>
                    <p className="text-xl font-semibold">{selectedDeal.probability}%</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Details</h3>
                  <div className="bg-secondary/50 rounded-md p-3 space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Kontakt</p>
                      <p className="text-sm">{selectedDeal.contact}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Erwarteter Abschluss</p>
                      <p className="text-sm">{selectedDeal.expectedClosingText}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Letzte Aktualisierung</p>
                      <p className="text-sm">{selectedDeal.lastUpdateText}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-medium">KI-Empfehlung</h3>
                    <Badge className="ai-badge">AI</Badge>
                  </div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-md p-3">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 text-cyan-500 mt-0.5" />
                      <p className="text-sm">{selectedDeal.aiRecommendation}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Aktivitäten</h3>
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="bg-secondary/50 rounded-md p-3">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">
                            {i === 0 ? "E-Mail: Angebot gesendet" : 
                             i === 1 ? "Meeting: Produktdemo" : 
                             "Telefonat: Erstgespräch"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {i === 0 ? "Vor 2 Tagen" : 
                             i === 1 ? "Vor 1 Woche" : 
                             "Vor 2 Wochen"}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {i === 0 ? "Detailliertes Angebot basierend auf den besprochenen Anforderungen gesendet." : 
                           i === 1 ? "Produktdemo für das Führungsteam durchgeführt. Positives Feedback." : 
                           "Erstgespräch zur Bedarfsanalyse. Interesse an Enterprise-Lösung."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">
                    Bearbeiten
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Aktivität hinzufügen
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pipeline;
