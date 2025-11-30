import { NextResponse } from 'next/server';
import { MentorshipRequestSchema } from '../../../lab/models'; // Relative import

// Mock Database for Mentorship Requests
let requests = [];

export async function POST(request) {
    try {
        const body = await request.json();

        // Basic Validation
        if (!body.name || !body.email || !body.interestArea) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create new request object adhering to schema
        const newRequest = {
            id: crypto.randomUUID(),
            name: body.name,
            email: body.email,
            interestArea: body.interestArea,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Save to mock DB
        requests.push(newRequest);

        // In a real app, we might send an email notification here

        return NextResponse.json({ success: true, data: newRequest }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Invalid Request Body' },
            { status: 400 }
        );
    }
}
