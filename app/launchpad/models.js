/**
 * Launchpad Data Models
 * Designed for PostgreSQL (Relational)
 * 
 * These classes represent the core entities for the Crowdfunding & Incubation platform.
 * In a production environment, these would map to Prisma models or SQL tables.
 */

// 1. User - The central entity (Creator or Backer)
export const UserSchema = {
    id: 'UUID',
    email: 'VARCHAR(255) UNIQUE',
    passwordHash: 'VARCHAR(255)',
    fullName: 'VARCHAR(100)',
    bio: 'TEXT',
    avatarUrl: 'VARCHAR(255)',
    role: 'ENUM("BACKER", "CREATOR", "ADMIN")',
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'
};

// 2. Category - Classification for Projects
export const CategorySchema = {
    id: 'UUID',
    name: 'VARCHAR(50)', // e.g., "Tech", "Art", "Green Energy"
    slug: 'VARCHAR(50) UNIQUE',
    description: 'TEXT'
};

// 3. Project - The core campaign entity
export const ProjectSchema = {
    id: 'UUID',
    creatorId: 'UUID (FK -> User.id)',
    categoryId: 'UUID (FK -> Category.id)',
    title: 'VARCHAR(150)',
    slug: 'VARCHAR(150) UNIQUE',
    shortDescription: 'VARCHAR(255)',
    detailedDescription: 'TEXT', // Supports Markdown/HTML
    fundingGoal: 'DECIMAL(12, 2)',
    currentFunding: 'DECIMAL(12, 2) DEFAULT 0',
    currency: 'VARCHAR(3) DEFAULT "USD"',
    status: 'ENUM("DRAFT", "PENDING_APPROVAL", "ACTIVE", "FUNDED", "FAILED", "SUSPENDED")',
    startDate: 'TIMESTAMP',
    endDate: 'TIMESTAMP',
    mediaUrls: 'JSONB', // Array of image/video URLs
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'
};

// 4. Reward - Pledge Tiers
export const RewardSchema = {
    id: 'UUID',
    projectId: 'UUID (FK -> Project.id)',
    title: 'VARCHAR(100)', // e.g., "Early Bird Special"
    description: 'TEXT',
    minimumPledgeAmount: 'DECIMAL(12, 2)',
    quantityAvailable: 'INTEGER', // NULL for unlimited
    quantityClaimed: 'INTEGER DEFAULT 0',
    estimatedDelivery: 'DATE',
    shippingType: 'ENUM("DIGITAL", "PHYSICAL_DOMESTIC", "PHYSICAL_INTERNATIONAL")'
};

// 5. Pledge - The transaction record
export const PledgeSchema = {
    id: 'UUID',
    userId: 'UUID (FK -> User.id)',
    projectId: 'UUID (FK -> Project.id)',
    rewardId: 'UUID (FK -> Reward.id)',
    amount: 'DECIMAL(12, 2)',
    status: 'ENUM("PENDING", "CAPTURED", "REFUNDED", "FAILED")',
    transactionId: 'VARCHAR(255)', // Payment processor reference (e.g., Stripe)
    createdAt: 'TIMESTAMP'
};

// 6. Update - Project Updates posted by Creators
export const ProjectUpdateSchema = {
    id: 'UUID',
    projectId: 'UUID (FK -> Project.id)',
    title: 'VARCHAR(150)',
    content: 'TEXT',
    isPublic: 'BOOLEAN DEFAULT TRUE', // False = Backers Only
    createdAt: 'TIMESTAMP'
};

/**
 * Relationship Map:
 * User 1:N Project (Creator)
 * User 1:N Pledge (Backer)
 * Project 1:N Reward
 * Project 1:N Pledge
 * Project 1:N ProjectUpdate
 * Category 1:N Project
 */
