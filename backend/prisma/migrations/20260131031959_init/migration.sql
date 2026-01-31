-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FileNode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER,
    "mimeType" TEXT,
    "storagePath" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "parentId" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "FileNode_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FileNode" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FileNode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "FileNode_parentId_idx" ON "FileNode"("parentId");

-- CreateIndex
CREATE INDEX "FileNode_userId_idx" ON "FileNode"("userId");
