
// Mock data for the entire application

import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

// Generate a random date in the past (up to maxDays ago)
const getRandomDate = (maxDays = 30) => {
  const daysAgo = Math.floor(Math.random() * maxDays);
  return new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
};

// Format relative time in German
const formatRelativeTime = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true, locale: de });
};

// Generate a random score between min and max
const getRandomScore = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// German first names
const firstNames = [
  'Alexander', 'Anna', 'Bernd', 'Christian', 'Daniela', 'Elena', 'Frank', 'Greta',
  'Hannah', 'Ingo', 'Julia', 'Klaus', 'Laura', 'Michael', 'Nina', 'Oliver', 'Petra',
  'Ralf', 'Sabine', 'Thomas', 'Ursula', 'Volker', 'Wolfgang', 'Xenia', 'Yvonne'
];

// German last names
const lastNames = [
  'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker',
  'Schulz', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf',
  'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'Krüger', 'Hofmann', 'Hartmann'
];

// German company names
const companyNames = [
  'Schneider & Söhne GmbH', 'Müller AG', 'Bauer Logistik', 'Weber IT Solutions',
  'Schmidt Maschinenbau', 'Fischer Elektronik', 'Meyer Consulting', 'Hoffmann & Partner',
  'Wolf Immobilien', 'Becker Pharma GmbH', 'Richter Automotive', 'Klein Software',
  'Schröder Versicherungen', 'Neumann Energie AG', 'Schwarz Medien GmbH', 'Zimmermann Bau',
  'Braun Textil', 'Krüger Catering', 'Hofmann Metallverarbeitung', 'Hartmann Medical'
];

// Positions in German
const positions = [
  'Geschäftsführer', 'CEO', 'Vertriebsleiter', 'Marketing Manager', 'CTO',
  'Einkaufsleiter', 'Finanzvorstand', 'Produktmanager', 'Leiter Digitalisierung',
  'Projektleiter', 'CIO', 'Bereichsleiter', 'Teamleiter', 'Abteilungsleiter'
];

// German regions
const regions = [
  'Bayern', 'Baden-Württemberg', 'Berlin', 'Brandenburg', 'Bremen',
  'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen',
  'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen',
  'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'
];

// AI Recommendations
const aiRecommendations = [
  'Nächster Kontakt in 3 Tagen empfohlen',
  'Produkt-Demo vorschlagen',
  'Preisverhandlung vorbereiten',
  'Referenzkunden vorstellen',
  'Case Study zusenden',
  'Neues Angebot erstellen',
  'Follow-up per Telefon empfohlen',
  'Kundenbedarf analysieren',
  'ROI-Berechnung teilen',
  'Entscheidungsprozess besprechen'
];

// Chat messages for the bot
const chatMessages = [
  { 
    user: 'Zeig mir alle Deals mit > 50% Wahrscheinlichkeit.',
    bot: 'Hier sind 5 passende Deals mit über 50% Abschlusswahrscheinlichkeit:\n\n1. Müller AG - Softwarelizenz (75%)\n2. Weber IT Solutions - Consulting (62%)\n3. Becker Pharma - CRM-System (85%)\n4. Hoffmann & Partner - Schulung (58%)\n5. Schneider & Söhne - Cloud Migration (71%)\n\nMöchtest du mehr Details zu einem dieser Deals sehen?'
  },
  {
    user: 'Welche Kontakte sollte ich heute priorisieren?',
    bot: 'Basierend auf deiner Pipeline und AI-Scoring würde ich folgende Kontakte priorisieren:\n\n1. Thomas Weber (Weber IT Solutions) - Deal im Wert von 45.000€ in finaler Phase\n2. Laura Müller (Müller AG) - Letzte Interaktion vor 7 Tagen, hohes Engagement\n3. Christian Schmidt (Schmidt Maschinenbau) - Angebot läuft in 2 Tagen ab\n\nSoll ich für einen dieser Kontakte einen Gesprächsleitfaden vorbereiten?'
  },
  {
    user: 'Erstelle eine Zusammenfassung meiner Pipeline.',
    bot: 'Pipeline-Zusammenfassung:\n\nGesamtwert: 1.245.000€\nPrognose Q2: 387.500€\n\nVerteilung:\n- Neu: 15 Deals (320.000€)\n- Qualifiziert: 9 Deals (405.000€)\n- Angebot: 7 Deals (345.000€)\n- Abschluss: 5 Deals (175.000€)\n\nAI-Einschätzung: Deine Conversion-Rate von "Angebot" zu "Abschluss" liegt 12% unter Branchendurchschnitt. Soll ich dir Optimierungsvorschläge machen?'
  }
];

// Generate random contact
const generateContact = (id: number) => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const company = companyNames[Math.floor(Math.random() * companyNames.length)];
  const position = positions[Math.floor(Math.random() * positions.length)];
  const region = regions[Math.floor(Math.random() * regions.length)];
  const score = getRandomScore(30, 98);
  const aiScore = getRandomScore(10, 100);
  const lastInteraction = getRandomDate(20);

  return {
    id,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.split(' ')[0].toLowerCase()}.de`,
    phone: `+49 ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 9000000 + 1000000)}`,
    company,
    position,
    region,
    score,
    aiScore,
    lastInteraction,
    lastInteractionText: formatRelativeTime(lastInteraction),
    notes: `${firstName} hat großes Interesse an unserer ${Math.random() > 0.5 ? 'Enterprise' : 'Business'} Lösung gezeigt. Letztes Gespräch: Preisverhandlung für ${Math.floor(Math.random() * 10 + 5)} Lizenzen.`,
    aiSummary: `Dieser Lead ist ideal für ${Math.random() > 0.5 ? 'Produkt X' : 'Produkt Y'}, basierend auf den letzten ${Math.floor(Math.random() * 5 + 2)} Interaktionen und dem Vergleich mit ähnlichen Kunden. Fokus auf ${Math.random() > 0.5 ? 'Kosteneinsparung' : 'Effizienzsteigerung'} könnte zum Abschluss führen.`
  };
};

// Generate contacts
export const contacts = Array.from({ length: 25 }, (_, i) => generateContact(i + 1));

// Generate deal
const generateDeal = (id: number, stage: string) => {
  const contact = contacts[Math.floor(Math.random() * contacts.length)];
  const dealValues = [15000, 25000, 38000, 45000, 75000, 120000, 150000, 200000];
  const dealValue = dealValues[Math.floor(Math.random() * dealValues.length)];
  let probability = 0;
  
  switch(stage) {
    case 'Neu':
      probability = getRandomScore(10, 30);
      break;
    case 'Qualifiziert':
      probability = getRandomScore(31, 60);
      break;
    case 'Angebot':
      probability = getRandomScore(61, 85);
      break;
    case 'Abschluss':
      probability = getRandomScore(86, 99);
      break;
    default:
      probability = getRandomScore(10, 99);
  }
  
  const aiRecommendation = aiRecommendations[Math.floor(Math.random() * aiRecommendations.length)];
  const expectedClosing = new Date();
  expectedClosing.setDate(expectedClosing.getDate() + Math.floor(Math.random() * 60 + 1));

  return {
    id,
    title: `${contact.company} - ${Math.random() > 0.5 ? 'CRM-System' : Math.random() > 0.5 ? 'Consulting' : 'Lizenzupgrade'}`,
    value: dealValue,
    stage,
    contact: contact.name,
    company: contact.company,
    probability,
    aiRecommendation,
    expectedClosing,
    expectedClosingText: formatRelativeTime(expectedClosing).replace('vor', 'in'),
    aiPotential: getRandomScore(1, 100),
    lastUpdate: getRandomDate(10),
    lastUpdateText: formatRelativeTime(getRandomDate(10)),
  };
};

// Generate deals per stage
export const deals = {
  'Neu': Array.from({ length: 5 }, (_, i) => generateDeal(i + 1, 'Neu')),
  'Qualifiziert': Array.from({ length: 5 }, (_, i) => generateDeal(i + 6, 'Qualifiziert')),
  'Angebot': Array.from({ length: 4 }, (_, i) => generateDeal(i + 11, 'Angebot')),
  'Abschluss': Array.from({ length: 5 }, (_, i) => generateDeal(i + 15, 'Abschluss'))
};

// Generate all deals for flat reference
export const allDeals = [
  ...deals['Neu'],
  ...deals['Qualifiziert'],
  ...deals['Angebot'],
  ...deals['Abschluss']
];

// Generate automation workflow
const generateWorkflow = (id: number) => {
  const workflowTypes = ['Lead Nurturing', 'Onboarding', 'Reaktivierung', 'Event-Follow-up', 'Angebotsnachfassung'];
  const type = workflowTypes[Math.floor(Math.random() * workflowTypes.length)];
  const isActive = Math.random() > 0.3;
  const lastRun = getRandomDate(7);
  const steps = Math.floor(Math.random() * 3 + 3);
  
  return {
    id,
    name: `${type} Workflow ${id}`,
    type,
    isActive,
    lastRun,
    lastRunText: formatRelativeTime(lastRun),
    steps: Array.from({ length: steps }, (_, i) => {
      const stepTypes = ['Email', 'Reminder', 'WhatsApp', 'Aufgabe', 'Telefonanruf', 'Abschluss'];
      return {
        id: i + 1,
        type: stepTypes[Math.floor(Math.random() * stepTypes.length)],
        delay: Math.floor(Math.random() * 5 + 1),
        isOptimized: Math.random() > 0.5
      };
    }),
    performance: {
      openRate: Math.floor(Math.random() * 30 + 20),
      clickRate: Math.floor(Math.random() * 20 + 10),
      conversion: Math.floor(Math.random() * 15 + 5)
    },
    aiOptimized: Math.random() > 0.4
  };
};

// Generate workflows
export const workflows = Array.from({ length: 5 }, (_, i) => generateWorkflow(i + 1));

// Generate activities for the timeline
export const generateActivities = () => {
  const activityTypes = ['email', 'call', 'meeting', 'task', 'note', 'ai'];
  const subjects = [
    'Angebot gesendet', 
    'Nachfassung zum Angebot', 
    'Demo durchgeführt', 
    'Vertrag vorbereitet',
    'Bedarfsanalyse', 
    'Erstgespräch', 
    'ROI-Berechnung', 
    'Follow-up Termin'
  ];
  
  return Array.from({ length: 15 }, (_, i) => {
    const contact = contacts[Math.floor(Math.random() * contacts.length)];
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const date = getRandomDate(10);
    
    let content = '';
    if (type === 'ai') {
      content = [
        'AI: Folge-Mail für Müller AG vorbereitet',
        'AI: Lead-Score für Schmidt Maschinenbau aktualisiert',
        'AI: Automatische Priorisierung durchgeführt',
        'AI: Angebots-Template basierend auf Kundenprofil angepasst',
        'AI: Erinnerung für Weber IT Solutions Nachfassung erstellt'
      ][Math.floor(Math.random() * 5)];
    } else {
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      content = `${type === 'email' ? 'E-Mail' : type === 'call' ? 'Anruf' : type === 'meeting' ? 'Meeting' : type === 'task' ? 'Aufgabe' : 'Notiz'}: ${subject} - ${contact.company}`;
    }
    
    return {
      id: i + 1,
      type,
      content,
      date,
      dateText: formatRelativeTime(date),
      contact: type !== 'ai' ? contact.name : null,
      company: type !== 'ai' ? contact.company : null,
      isAI: type === 'ai'
    };
  }).sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date descending
};

export const activities = generateActivities();

// Chart data for analytics
export const analyticsData = {
  revenueByMonth: [
    { month: 'Jan', value: 105000 },
    { month: 'Feb', value: 125000 },
    { month: 'Mär', value: 115000 },
    { month: 'Apr', value: 130000 },
    { month: 'Mai', value: 145000 },
    { month: 'Jun', value: 160000 },
    { month: 'Jul', value: 175000 },
    { month: 'Aug', value: 185000 },
    { month: 'Sep', value: 210000 },
    { month: 'Okt', value: 195000 },
    { month: 'Nov', value: 220000 },
    { month: 'Dez', value: 240000 }
  ],
  aiPredictedRevenue: [
    { month: 'Jan', value: 105000 },
    { month: 'Feb', value: 125000 },
    { month: 'Mär', value: 115000 },
    { month: 'Apr', value: 130000 },
    { month: 'Mai', value: 145000 },
    { month: 'Jun', value: 160000 },
    { month: 'Jul', value: 175000 },
    { month: 'Aug', value: 185000 },
    { month: 'Sep', value: 210000 },
    { month: 'Okt', value: 208000 },
    { month: 'Nov', value: 235000 },
    { month: 'Dez', value: 260000 }
  ],
  conversionRate: [
    { campaign: 'Email Kampagne Q1', rate: 4.2 },
    { campaign: 'Social Media Ads', rate: 3.1 },
    { campaign: 'Google Ads', rate: 5.8 },
    { campaign: 'Messe Frankfurt', rate: 7.2 },
    { campaign: 'Referral Programm', rate: 8.5 },
    { campaign: 'Webinar Serie', rate: 6.3 }
  ],
  kpis: [
    { name: 'Durchschn. Reaktionszeit', value: '3.5h', change: -12, target: 4, unit: 'Stunden' },
    { name: 'Abschlussrate', value: '23%', change: 8, target: 25, unit: '%' },
    { name: 'Pipeline Velocity', value: '18', change: -5, target: 20, unit: 'Tage' },
    { name: 'Lead-to-Demo Rate', value: '38%', change: 15, target: 35, unit: '%' }
  ]
};

// AI Lab modules
export const aiModules = [
  { id: 1, name: 'Lead-Scoring Engine', active: true, description: 'Bewertet Leads basierend auf Interaktionsdaten und demografischen Informationen.', params: [
    { name: 'Aggressivität', value: 70, min: 0, max: 100 },
    { name: 'Priorisierung neuer Kontakte', value: 60, min: 0, max: 100 }
  ]},
  { id: 2, name: 'Email-Sequenz Optimierer', active: true, description: 'Optimiert E-Mail-Sequenzen für maximale Öffnungs- und Klickraten.', params: [
    { name: 'Sendefrequenz', value: 40, min: 0, max: 100 },
    { name: 'Personalisierungsgrad', value: 80, min: 0, max: 100 },
    { name: 'Content-Kreativität', value: 65, min: 0, max: 100 }
  ]},
  { id: 3, name: 'Chatbot Intelligenz', active: true, description: 'Steuert die Intelligenz und Autonomie des CRM-Chatbots.', params: [
    { name: 'Gesprächstiefe', value: 75, min: 0, max: 100 },
    { name: 'Autonomie', value: 60, min: 0, max: 100 }
  ]},
  { id: 4, name: 'Deal-Prognose', active: true, description: 'Prognostiziert Erfolgswahrscheinlichkeiten und optimale Abschlussstrategien.', params: [
    { name: 'Prognosehorizont', value: 30, min: 7, max: 90, unit: 'Tage' },
    { name: 'Genauigkeit vs. Optimismus', value: 70, min: 0, max: 100 }
  ]},
  { id: 5, name: 'Content Vorschläge', active: false, description: 'Generiert personalisierte Inhaltsvorschläge für jeden Kundenkontakt.', params: [
    { name: 'Inhaltsmenge', value: 50, min: 0, max: 100 },
    { name: 'Branchenfokus', value: 85, min: 0, max: 100 }
  ]},
  { id: 6, name: 'Automatische Aktivitäten', active: true, description: 'Erstellt und plant automatische Folgeaktivitäten ohne manuellen Eingriff.', params: [
    { name: 'Planungsintensität', value: 55, min: 0, max: 100 },
    { name: 'Automatisierungsgrad', value: 65, min: 0, max: 100 }
  ]}
];

// AI Insights for dashboard
export const aiInsights = [
  'Meetinganfrage für Weber IT Solutions erstellen',
  'Angebot für Schneider & Söhne aktualisieren',
  'Kontaktpriorität für Müller AG erhöhen',
  'Preismodell für Becker Pharma GmbH anpassen',
  'Sales Deck für Schmidt Maschinenbau vorbereiten',
  'Folgetermin mit Hoffmann & Partner vereinbaren'
];

// Dashboard KPIs
export const dashboardKPIs = {
  leadScoring: {
    hotLeads: 23,
    probability: 80,
    trend: 8
  },
  pipelineHealth: {
    stages: [
      { name: 'Neu', percentage: 25, count: 15 },
      { name: 'Qualifiziert', percentage: 30, count: 9 },
      { name: 'Angebot', percentage: 25, count: 7 },
      { name: 'Abschluss', percentage: 20, count: 5 }
    ],
    totalValue: 1245000,
    aiSuggestion: 'Fokussiere auf die 7 Deals in der Angebotsphase, 3 davon zeigen hohe Abschlusswahrscheinlichkeit.'
  },
  automations: {
    activeSequences: 5,
    pendingFollowups: 12,
    optimizationScore: 87
  },
  chatbotInteractions: {
    newChats: 8,
    openRequests: 3,
    averageResponseTime: '1.2m'
  }
};
