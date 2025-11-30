/**
 * Physical Lab Data Models
 * Designed for PostgreSQL (Relational)
 */

// 1. MentorshipRequest - Requests for expert guidance
export const MentorshipRequestSchema = {
    id: 'UUID',
    name: 'VARCHAR(100)',
    email: 'VARCHAR(255)',
    interestArea: 'ENUM("PCB Design", "Industrial Design", "Manufacturing", "Firmware")',
    status: 'ENUM("PENDING", "APPROVED", "REJECTED", "COMPLETED") DEFAULT "PENDING"',
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'
};

// Future entities could include: EquipmentBooking, WorkshopRegistration, etc.
