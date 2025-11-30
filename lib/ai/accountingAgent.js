/**
 * AI Accounting & Pricing Agent
 * 
 * This service simulates an AI agent that:
 * 1. Analyzes project data to recommend funding goals.
 * 2. Automatically records financial transactions to a ledger.
 */

// Mock Ledger Database
const ledger = [];

export const accountingAgent = {
    /**
     * Analyzes a project's category and proposed goal to provide pricing advice.
     * @param {string} category 
     * @param {number} proposedGoal 
     * @returns {object} { recommendedGoal, confidence, reasoning }
     */
    analyzePricing: async (category, proposedGoal) => {
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let multiplier = 1;
        let reasoning = '';

        // Deterministic "AI" Logic
        switch (category) {
            case 'Technology':
                multiplier = 1.2; // Tech projects often underestimate costs
                reasoning = 'Technology projects frequently encounter supply chain variances. We recommend a 20% buffer.';
                break;
            case 'Art':
                multiplier = 0.9; // Art projects can be leaner
                reasoning = 'Artistic projects often succeed with tighter budgets. A slightly lower goal may increase backer confidence.';
                break;
            case 'Film':
                multiplier = 1.1;
                reasoning = 'Post-production costs are often overlooked. We suggest a 10% increase.';
                break;
            default:
                multiplier = 1.05;
                reasoning = 'Based on market analysis, a standard 5% contingency buffer is recommended.';
        }

        const recommendedGoal = Math.round(proposedGoal * multiplier);

        return {
            recommendedGoal,
            confidence: 0.85,
            reasoning
        };
    },

    /**
     * Records a transaction to the internal ledger.
     * @param {object} entry { transactionId, type, amount, description, projectId }
     */
    recordLedgerEntry: async (entry) => {
        const newEntry = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            ...entry
        };

        ledger.push(newEntry);
        console.log('[AI Accountant] Ledger Entry Recorded:', newEntry);
        return newEntry;
    },

    /**
     * Returns the current ledger (for debugging/admin).
     */
    getLedger: () => {
        return ledger;
    }
};
