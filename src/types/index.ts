export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface KnowledgeCheckQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string[]; // paragraphs or markdown-like text
  diagramType?: 'psychology' | 'email-anatomy' | 'url-anatomy' | 'attack-lifecycle' | 'prevention' | 'incident-response';
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
  warningSigns?: string[];
  practicalExample?: {
    title: string;
    scenario: string;
    analysis: string;
    redFlags: string[];
  };
}

export interface CurriculumModule {
  id: string;
  number: number;
  title: string;
  shortDescription: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  category: 'foundations' | 'email-security' | 'web-mobile' | 'psychology' | 'defense-response' | 'synthesis';
  learningObjectives: string[];
  sections: LessonSection[];
  keyTakeaways: string[];
  knowledgeCheck: KnowledgeCheckQuestion[];
}

export interface PracticeScenario {
  id: string;
  title: string;
  category: 'email' | 'sms' | 'website' | 'social-engineering' | 'job-internship' | 'account-security';
  categoryLabel: string;
  difficulty: Difficulty;
  contextDescription: string;
  fictionalArtifact: {
    type: 'email' | 'sms' | 'browser' | 'chat';
    senderName?: string;
    senderAddress?: string;
    recipient?: string;
    subject?: string;
    date?: string;
    phoneSender?: string;
    browserUrl?: string;
    content: string;
    attachment?: {
      name: string;
      size: string;
      type: string;
    };
    callToAction?: {
      label: string;
      destinationUrl?: string;
    };
  };
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  detailedExplanation: string;
  identifiedRedFlags: string[];
  recommendedSafeAction: string;
}

export interface AssessmentQuestion {
  id: string;
  moduleId: string;
  moduleNumber: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
}

export interface AssessmentAttempt {
  id: string;
  date: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  answers: {
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
  }[];
}

export interface UserProgressState {
  version: number;
  completedModuleIds: string[];
  completedLessonIds: string[];
  completedPracticeIds: string[];
  assessmentAttempts: AssessmentAttempt[];
  theme: 'dark' | 'light' | 'system';
  urlInspectionsCount: number;
  hasSeenOnboarding?: boolean;
  lastVisitedModuleId?: string;
  updatedAt: string;
}

export interface UrlAnalysisIndicator {
  id: string;
  title: string;
  severity: 'critical' | 'warning' | 'info';
  explanation: string;
  whyAttackersUseIt: string;
}

export interface UrlAnalysisResult {
  rawUrl: string;
  normalizedUrl: string;
  isValid: boolean;
  errorMessage?: string;
  components: {
    protocol: string;
    hostname: string;
    domain: string;
    subdomain: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
  };
  indicators: UrlAnalysisIndicator[];
  riskLevel: 'no_obvious_indicators' | 'elevated_caution' | 'high_risk';
  riskScore: number; // 0 to 100
  summary: string;
  recommendations: string[];
}

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sourceMode?: 'gemini' | 'offline';
  suggestedAction?: {
    label: string;
    path: string;
  };
}
