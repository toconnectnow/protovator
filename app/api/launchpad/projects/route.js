import { NextResponse } from 'next/server';
import { ProjectSchema } from '../../../launchpad/models';
import { accountingAgent } from '../../../../lib/ai/accountingAgent';

// Mock Database
let projects = [
    {
        id: '123e4567-e89b-12d3-a456-426614174000',
        creatorId: 'user-1',
        categoryId: 'cat-1',
        title: 'EcoDrone 3000',
        slug: 'ecodrone-3000',
        shortDescription: 'The first biodegradable drone for agricultural monitoring.',
        detailedDescription: 'Full markdown content here...',
        fundingGoal: 50000.00,
        currentFunding: 12500.00,
        currency: 'USD',
        status: 'ACTIVE',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000 * 30).toISOString(), // +30 days
        mediaUrls: ['https://example.com/drone.jpg'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export async function GET() {
    // In a real app: const projects = await db.query('SELECT * FROM projects');
    return NextResponse.json({ success: true, data: projects });
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Basic Validation against Schema Fields
        // In production, use a library like Zod
        const requiredFields = ['title', 'fundingGoal', 'creatorId'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // AI Pricing Analysis - Generate advice before creating the project
        const advice = await accountingAgent.analyzePricing(body.categoryId || 'General', Number(body.fundingGoal));

        // Create new project object adhering to schema
        const newProject = {
            id: crypto.randomUUID(),
            ...body,
            currentFunding: 0,
            status: 'DRAFT',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            aiAdvice: advice // Store the advice
        };

        // Save to mock DB
        projects.push(newProject);

        return NextResponse.json(
            { success: true, data: newProject, advice: advice }, // Return advice in the response
            { status: 201 }
        );
    } catch (error) {
        console.error('Project Creation Error:', error); // Log the error for debugging
        return NextResponse.json(
            { success: false, error: 'Invalid Request Body' },
            { status: 400 }
        );
    }
}
