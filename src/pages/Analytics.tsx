
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Download,
  Calendar,
  Filter,
  ChevronDown,
  AlertTriangle,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { analyticsData } from "@/lib/mockData";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("year");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analysen</h1>
          <p className="text-muted-foreground">Erhalte Einblicke in deine Verkaufsperformance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Zeitraum
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Exportieren
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="sales">Verkäufe</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="forecast">Prognose</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analyticsData.kpis.map((kpi, i) => (
              <Card key={i} className="hover-lift">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {kpi.name}
                    {kpi.change < 0 && kpi.target > 0 && (
                      <Badge className="ml-2 bg-red-500/10 text-red-500 border-red-500/30">
                        <AlertTriangle className="mr-1 h-3 w-3" /> Alert
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <div className={`flex items-center ${kpi.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {kpi.change > 0 ? (
                        <TrendingUp className="mr-1 h-4 w-4" />
                      ) : (
                        <TrendingUp className="mr-1 h-4 w-4 transform rotate-180" />
                      )}
                      <span>{Math.abs(kpi.change)}%</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>vs. Target ({kpi.target} {kpi.unit})</span>
                      <span>{kpi.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${kpi.value >= kpi.target ? 'bg-green-500' : 'bg-primary'}`} 
                        style={{ width: `${Math.min(100, (parseFloat(kpi.value) / kpi.target) * 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <CardTitle className="flex items-center">
                  <LineChartIcon className="mr-2 h-5 w-5" />
                  Umsätze nach Monat
                </CardTitle>
                <div className="flex items-center gap-3">
                  <Badge className="ai-badge">AI-Trend-Linie</Badge>
                  <div className="flex">
                    <Button variant="outline" size="sm" className={timeRange === "quarter" ? "bg-secondary" : ""} onClick={() => setTimeRange("quarter")}>
                      Q2 2023
                    </Button>
                    <Button variant="outline" size="sm" className={timeRange === "year" ? "bg-secondary" : ""} onClick={() => setTimeRange("year")}>
                      Jahr
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full flex items-center justify-center">
                <p className="text-muted-foreground">[Umsatz-Liniendiagramm mit AI-Trendlinie]</p>
              </div>
              
              <div className="mt-4 border-t border-border pt-4">
                <div className="px-2 py-2 rounded-md bg-cyan-500/5 border border-cyan-500/20">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-cyan-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-cyan-500">AI-Insight</h4>
                      <p className="text-sm text-muted-foreground">
                        Der Umsatztrend steigt um durchschnittlich 5,8% pro Monat. Die Monate September und Oktober zeigen die stärkste Performance. Basierend auf saisonalen Mustern wird November voraussichtlich um 7% über dem aktuellen Trend liegen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversion Rate Chart */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <CardTitle className="flex items-center">
                  <BarChartIcon className="mr-2 h-5 w-5" />
                  Conversion-Rate pro Kampagne
                </CardTitle>
                <Badge className="ai-badge">AI-Empfehlung: Budget erhöhen</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center">
                <p className="text-muted-foreground">[Conversion-Rate-Balkendiagramm]</p>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-secondary/50 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Top-Performer</h4>
                  <p className="text-sm">Referral Programm (8.5%)</p>
                  <p className="text-xs text-muted-foreground mt-1">54% über Durchschnitt</p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Empfehlung</h4>
                  <p className="text-sm">Budget für Webinar-Serie erhöhen</p>
                  <p className="text-xs text-muted-foreground mt-1">12% Wachstumspotential</p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-md">
                  <h4 className="text-sm font-medium mb-1">Optimierungspotential</h4>
                  <p className="text-sm">Social Media Ads neu ausrichten</p>
                  <p className="text-xs text-muted-foreground mt-1">3,1% → 5,0% möglich</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sales">
          <div className="h-32 flex items-center justify-center">
            <p className="text-muted-foreground">Verkaufsanalysen werden geladen...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="pipeline">
          <div className="h-32 flex items-center justify-center">
            <p className="text-muted-foreground">Pipeline-Analysen werden geladen...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="marketing">
          <div className="h-32 flex items-center justify-center">
            <p className="text-muted-foreground">Marketing-Analysen werden geladen...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="forecast">
          <div className="h-32 flex items-center justify-center">
            <p className="text-muted-foreground">Prognoseanalysen werden geladen...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
