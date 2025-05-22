import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie } from 'recharts';
import { 
  ChevronRight, 
  ChevronUp, 
  ChevronDown,
  PieChart as PieChartIcon,
  MessageSquare,
  PlaySquare,
  Users,
  Clock,
  Mail,
  Phone
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dashboardKPIs, activities, allDeals } from '@/lib/mockData';

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  
  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(now.toLocaleDateString('de-DE', options));
  }, []);

  // Mock data for charts
  const pieData = dashboardKPIs.pipelineHealth.stages.map(stage => ({
    name: stage.name,
    value: stage.percentage
  }));
  
  // Function to generate random data for area chart
  const generateAreaData = () => {
    return Array(7).fill(0).map((_, i) => ({
      name: `Tag ${i + 1}`,
      value: Math.floor(Math.random() * 50) + 50
    }));
  };

  const areaData = generateAreaData();
  
  // Function to get icon by activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-400" />;
      case 'call':
        return <Phone className="h-4 w-4 text-green-400" />;
      case 'meeting':
        return <Users className="h-4 w-4 text-yellow-400" />;
      case 'task':
        return <Clock className="h-4 w-4 text-purple-400" />;
      case 'ai':
        return <MessageSquare className="h-4 w-4 text-cyan-400" />;
      default:
        return <ChevronRight className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Willkommen zurück, Alex!</h1>
          <p className="text-muted-foreground">{currentDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-1 h-4 w-4" /> Letzte Aktivitäten
          </Button>
          <Button size="sm">
            <ChevronRight className="mr-1 h-4 w-4" /> Nächste Aufgabe
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between">
              Lead-Scoring
              <Badge className="ai-badge">AI</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{dashboardKPIs.leadScoring.hotLeads}</p>
                <p className="text-xs text-muted-foreground">
                  Heiße Leads – Abschlusswahrsch. &gt; {dashboardKPIs.leadScoring.probability}%
                </p>
              </div>
              <div className={`flex items-center ${dashboardKPIs.leadScoring.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {dashboardKPIs.leadScoring.trend > 0 ? (
                  <ChevronUp className="h-4 w-4 mr-1" />
                ) : (
                  <ChevronDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm">{Math.abs(dashboardKPIs.leadScoring.trend)}%</span>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="ghost" size="sm" className="w-full justify-between">
                Details anzeigen <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between">
              Pipeline-Health
              <Badge className="ai-badge">AI Suggestion</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <div className="w-16 h-16">
                <PieChart width={64} height={64} data={pieData}>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={15}
                    outerRadius={32}
                    fill="#06B6D4"
                    stroke="none"
                  />
                </PieChart>
              </div>
              <div className="flex-1 pl-4">
                <div className="flex flex-wrap gap-2">
                  {dashboardKPIs.pipelineHealth.stages.map((stage, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {stage.name}: {stage.percentage}%
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-muted-foreground truncate">
                {dashboardKPIs.pipelineHealth.aiSuggestion}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between">
              Automations-Übersicht
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-xs text-muted-foreground">AI-optimiert</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm">Aktive Sequenzen</p>
                <p className="font-medium">{dashboardKPIs.automations.activeSequences}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">Anstehende Follow-Ups</p>
                <p className="font-medium">{dashboardKPIs.automations.pendingFollowups}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">Optimierungsscore</p>
                <Badge variant={dashboardKPIs.automations.optimizationScore > 80 ? "default" : "outline"}>
                  {dashboardKPIs.automations.optimizationScore}%
                </Badge>
              </div>
            </div>
            <div className="mt-3">
              <Button variant="ghost" size="sm" className="w-full justify-between">
                Verwalten <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Chatbot-Interaktionen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{dashboardKPIs.chatbotInteractions.newChats}</p>
                <p className="text-xs text-muted-foreground">
                  Neue Chats, {dashboardKPIs.chatbotInteractions.openRequests} offene Anfragen
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>Durchschn. Antwortzeit</p>
                <p className="text-sm font-medium text-foreground text-right">
                  {dashboardKPIs.chatbotInteractions.averageResponseTime}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-10 w-full overflow-hidden rounded-md bg-secondary/50">
                <div className="h-full w-1/3 bg-gradient-to-r from-cyan-500 to-cyan-400 animate-pulse-slow"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Timeline / Aktivitäten</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="alle">
                <TabsList className="mb-4">
                  <TabsTrigger value="alle">Alle</TabsTrigger>
                  <TabsTrigger value="emails">Emails</TabsTrigger>
                  <TabsTrigger value="calls">Anrufe</TabsTrigger>
                  <TabsTrigger value="meetings">Meetings</TabsTrigger>
                  <TabsTrigger value="ai">AI-Logs</TabsTrigger>
                </TabsList>
                <TabsContent value="alle" className="space-y-4">
                  {activities.slice(0, 10).map((activity, i) => (
                    <div 
                      key={i} 
                      className={`flex items-start gap-3 p-3 rounded-md ${
                        activity.isAI ? 'bg-cyan-500/5 border border-cyan-500/10' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <div className={`mt-1 p-1.5 rounded-full ${
                        activity.isAI ? 'bg-cyan-500/20' : 'bg-secondary'
                      }`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.content}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {activity.contact && (
                            <span className="text-xs text-muted-foreground">{activity.contact}</span>
                          )}
                          {activity.company && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{activity.company}</span>
                            </>
                          )}
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{activity.dateText}</span>
                        </div>
                      </div>
                      {!activity.isAI && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">Alle anzeigen</Button>
                </TabsContent>
                <TabsContent value="emails">
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">Email-Filter aktiviert</p>
                  </div>
                </TabsContent>
                <TabsContent value="calls">
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">Anruf-Filter aktiviert</p>
                  </div>
                </TabsContent>
                <TabsContent value="meetings">
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">Meeting-Filter aktiviert</p>
                  </div>
                </TabsContent>
                <TabsContent value="ai">
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">AI-Log-Filter aktiviert</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Deals Overview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Top Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allDeals
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 5)
                  .map((deal, i) => (
                    <div key={i} className="p-3 rounded-md bg-secondary/30 hover:bg-secondary/50">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-sm">{deal.title}</h4>
                        <Badge variant="outline">
                          {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(deal.value)}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Abschlusswahrscheinlichkeit</span>
                          <span>{deal.probability}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${deal.probability}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{deal.company}</span>
                        <Badge className="ai-badge text-[10px]">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          AI
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">Zur Pipeline</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Schnellzugriff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center">
                  <Users className="h-5 w-5 mb-1" />
                  <span>Kontakt erstellen</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center">
                  <PieChartIcon className="h-5 w-5 mb-1" />
                  <span>Deal hinzufügen</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center">
                  <PlaySquare className="h-5 w-5 mb-1" />
                  <span>Automatisierung</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center">
                  <MessageSquare className="h-5 w-5 mb-1" />
                  <span>Chat starten</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
