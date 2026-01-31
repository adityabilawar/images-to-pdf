# Hosting DocSnap Backend on Render

Follow these steps to deploy your backend to the cloud for free (or cheap) using Render.com.

## Prerequisites

1.  **GitHub**: Ensure your code is pushed to your GitHub repository.
    ```bash
    git add .
    git commit -m "chore: configure backend for postgresql and hosting"
    git push origin master
    ```

## Step 1: Create a Render Account

1.  Go to [https://render.com](https://render.com) and sign up (using GitHub is easiest).

## Step 2: Create a Database

1.  On the Render Dashboard, click **New +** and select **PostgreSQL**.
2.  **Name**: `docsnap-db` (or any name you like).
3.  **Region**: Choose the one closest to you (e.g., `Oregon, US West`).
4.  **Instance Type**: `Free` (good for development) or `Starter`.
5.  Click **Create Database**.
6.  **Wait** for it to be created.
7.  **Copy** the `Internal Database URL`. You will need this shortly.

## Step 3: Create the Web Service

1.  On the Render Dashboard, click **New +** and select **Web Service**.
2.  **Connect a repository**: Select your `images-to-pdf` repo.
3.  **Basic Details**:
    *   **Name**: `docsnap-backend`
    *   **Region**: Same as your database.
    *   **Branch**: `master`
    *   **Root Directory**: `backend` (Important! This tells Render where your backend code lives).
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npx prisma generate && npm run build`
    *   **Start Command**: `npm start`
4.  **Environment Variables** (Scroll down to "Advanced" or "Environment Variables"):
    *   Add `DATABASE_URL` -> Paste the `Internal Database URL` you copied earlier.
    *   Add `JWT_SECRET` -> Type some random secret string (e.g., `my_super_secret_key_123`).
    *   Add `PORT` -> `10000`.
5.  **Instance Type**: `Free`.
6.  Click **Create Web Service**.

## Step 4: Add Persistent Storage (Critically Important!)

Since Render (and most container platforms) delete files when the server restarts, you need a "Disk" to save uploaded PDFs and images.

1.  Go to your new **Web Service** dashboard.
2.  Click on the **Disks** tab in the side menu.
3.  Click **Add Disk**.
    *   **Name**: `uploads`
    *   **Mount Path**: `/opt/render/project/src/uploads` (This path matches where your code saves files, relative to the root).
    *   **Size**: `1 GB`.
4.  Click **Create Disk**.

> **Note**: Free tier web services on Render spin down after inactivity. When you use the app, it might take 30-60 seconds to "wake up".

## Step 5: Get Your Backend URL

1.  Once your service is deployed, you will see a URL at the top left of the dashboard (e.g., `https://docsnap-backend.onrender.com`).
2.  Update your React Native App (`App.js` or config) to point to this URL instead of `localhost`.

## Troubleshooting

-   **Logs**: Check the "Logs" tab in Render if the deployment fails.
-   **Prisma Error**: If you see errors about "schema.prisma", make sure the `Root Directory` was set correctly to `backend`.
