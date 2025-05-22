
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Download,
  Calendar,
  Filter,
} from "lucide-react";
import { analyticsData } from "@/lib/mockData";

// Colors for the charts
const colors = {
  primary: "hsl(var(--primary))",
  muted: "hsl(var(--muted))",
  accent: "hsl(var(--accent))",
  background: "hsl(var(--background))",
  green: "hsl(var(--success))",
  red: "hsl(var(--destructive))",
  yellow: "hsl(var(--warning))",
  barColor: "#4a85f5", // New dedicated color for bars
};

// Enhanced custom tooltip with better visibility
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 rounded-md shadow-md">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        <p className="text-sm text-foreground">
          <span className="font-medium">Wert:</span> {payload[0].value.toFixed(2)}%
        </p>
      </div>
    );
  }
  return null;
};

// Conversion rate tooltip
const ConversionTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 rounded-md shadow-md">
        <p className="text-sm font-medium text-foreground">{payload[0].payload.campaign}</p>
        <p className="text-sm text-foreground">
          <span className="font-medium">Conversion Rate:</span> {payload[0].value.toFixed(2)}%
        </p>
      </div>
    );
  }
  return null;
};

// KPI Indicator component
const KpiIndicator = ({ value, change, target, unit }: { value: string, change: number, target: number, unit: string }) => {
  // Convert value to number for comparison if it's a percentage
  const numericValue = unit === '%' 
    ? parseFloat(value.replace('%', '')) 
    : parseFloat(value);

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <div className="flex items-center gap-1">
          {change > 0 ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <p className={`text-xs ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change > 0 ? '+' : ''}{change}% ggü. Vormonat
          </p>
        </div>
      </div>
      <div className="h-10 w-10 rounded-full border-2 border-primary flex items-center justify-center">
        <div 
          className={`text-xs font-medium 
            ${numericValue >= target ? 'text-green-500' : 'text-yellow-500'}`}
        >
          {numericValue >= target ? '✓' : `${Math.round((numericValue / target) * 100)}%`}
        </div>
      </div>
    </div>
  );
};

const Analytics = () => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const { revenueByMonth, aiPredictedRevenue, conversionRate, kpis } = analyticsData;
  
  // Pie chart data for sales by region
  const salesByRegion = [
    { name: 'Bayern', value: 35 },
    { name: 'NRW', value: 30 },
    { name: 'Berlin', value: 15 },
    { name: 'Hamburg', value: 10 },
    { name: 'Andere', value: 10 },
  ];
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Calculate total sales
  const totalSales = revenueByMonth.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Detaillierte Vertriebsanalysen und KPIs</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Zeitraum
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <KpiIndicator value={kpi.value} change={kpi.change} target={kpi.target} unit={kpi.unit} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Umsatzentwicklung</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant={chartType === 'line' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setChartType('line')}
              >
                <LineChartIcon className="h-4 w-4 mr-1" />
                Linie
              </Button>
              <Button 
                variant={chartType === 'bar' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setChartType('bar')}
              >
                <BarChart2 className="h-4 w-4 mr-1" />
                Balken
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[400px] w-full">
            {chartType === 'line' ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueByMonth}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('de-DE', { 
                        notation: 'compact',
                        compactDisplay: 'short',
                        currency: 'EUR',
                      }).format(value)
                    }
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    name="Tatsächlicher Umsatz"
                    dataKey="value"
                    stroke={colors.primary}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone"
                    name="KI-Prognose"
                    dataKey="value"
                    data={aiPredictedRevenue}
                    stroke={colors.accent}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueByMonth}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('de-DE', { 
                        notation: 'compact',
                        compactDisplay: 'short',
                        currency: 'EUR',
                      }).format(value)
                    }
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    name="Tatsächlicher Umsatz"
                    dataKey="value" 
                    fill={colors.primary}
                  />
                  <Bar 
                    name="KI-Prognose" 
                    dataKey="value"
                    data={aiPredictedRevenue}
                    fill={colors.accent} 
                    fillOpacity={0.7}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Small charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Conversion Rate - Improved styling */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  layout="vertical"
                  data={conversionRate} 
                  margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 'dataMax + 2']}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="campaign"
                    tick={{ fill: 'hsl(var(--foreground))' }}
                  />
                  <Tooltip content={<ConversionTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                  <Bar 
                    dataKey="rate" 
                    fill={colors.barColor} 
                    barSize={20}
                    radius={[0, 4, 4, 0]}
                  >
                    {conversionRate.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={colors.barColor}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales by Region */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Verteilung nach Region</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                  <Pie
                    data={salesByRegion}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {salesByRegion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Anteil']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>KI-Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-secondary/50 rounded-md">
              <h3 className="font-medium mb-2">Pipeline-Prognose</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Basierend auf historischen Daten und aktuellen Leads prognostiziert die KI die folgende Entwicklung:
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 p-3 bg-secondary/70 rounded-md">
                  <p className="text-sm font-medium mb-1">Q3 Prognose</p>
                  <p className="text-2xl font-bold mb-1">
                    {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(845000)}
                  </p>
                  <p className="text-xs text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +12% ggü. Q2
                  </p>
                </div>
                <div className="flex-1 p-3 bg-secondary/70 rounded-md">
                  <p className="text-sm font-medium mb-1">Erfolgswahrscheinlichkeit</p>
                  <p className="text-2xl font-bold mb-1">68%</p>
                  <p className="text-xs text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +5% ggü. Q2
                  </p>
                </div>
                <div className="flex-1 p-3 bg-secondary/70 rounded-md">
                  <p className="text-sm font-medium mb-1">Durchschn. Deal-Wert</p>
                  <p className="text-2xl font-bold mb-1">
                    {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(72500)}
                  </p>
                  <p className="text-xs text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +8% ggü. Q2
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-secondary/50 rounded-md">
              <h3 className="font-medium mb-2">Optimierungspotential</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Reaktionszeit verbessern</p>
                    <p className="text-sm text-muted-foreground">
                      Reduziere die durchschnittliche Reaktionszeit um 25% für eine Steigerung der Conversion-Rate um ca. 15%.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Follow-up-Prozess optimieren</p>
                    <p className="text-sm text-muted-foreground">
                      Implementiere automatisierte Nachfassaktionen für Leads mit über 60% Wahrscheinlichkeit.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Cross-Selling nutzen</p>
                    <p className="text-sm text-muted-foreground">
                      Identifizierte Cross-Selling-Potenziale könnten den Durchschnittsauftragswert um 22% steigern.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
