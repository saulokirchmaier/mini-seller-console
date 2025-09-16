export interface Opportunity {
  id: string;
  name: string;
  stage: OpportunityStage;
  amount?: number;
  accountName: string;
  createdAt: Date;
  originalLeadId: string;
}

export type OpportunityStage =
  | 'discovery'
  | 'proposal'
  | 'negotiation'
  | 'closed_won'
  | 'closed_lost';

export const OpportunityStage = {
  DISCOVERY: 'discovery' as OpportunityStage,
  PROPOSAL: 'proposal' as OpportunityStage,
  NEGOTIATION: 'negotiation' as OpportunityStage,
  CLOSED_WON: 'closed_won' as OpportunityStage,
  CLOSED_LOST: 'closed_lost' as OpportunityStage,
};

export interface LeadConversionForm {
  leadId: string;
  name: string;
  stage: OpportunityStage;
  amount?: number;
  accountName: string;
}
