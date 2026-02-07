
export interface MetaAdCopy {
  hook: string;
  body: string;
  cta: string;
}

export interface AdAdvisorAction {
  status: "GOOD" | "BAD" | "NEUTRAL";
  action: string;
  message: string;
}

export interface ProductAnalysis {
  productName: string;
  usageAreas: string[];
  competitionScore: number;
  marketSaturation: string;
  verdict: "SAT" | "SATMA";
  reasoning: string;
  targetAudience: string[];
  // Pro Fields
  metaTargeting?: string[];
  metaAdCopy?: MetaAdCopy;
  adAdvisor?: AdAdvisorAction;
}

export enum AppStatus {
  IDLE = 'IDLE',
  AUTH_SCREEN = 'AUTH_SCREEN',
  VERIFYING_OTP = 'VERIFYING_OTP',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
  UPGRADING = 'UPGRADING'
}

export interface User {
  email: string;
  isVerified: boolean;
  isPro: boolean;
}
