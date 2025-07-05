import express from "express";
import fs from "fs";
import path from "path";
export function log(message, source = "express") {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
    console.log(`${formattedTime} [${source}] ${message}`);
}
export async function setupVite(app, server) {
    // For development, we'll use a simpler approach
    // that doesn't require complex Vite server setup
    log("Development mode: Using static file serving");
    const clientPath = path.resolve(import.meta.dirname, "..", "client");
    // Serve static files from client directory
    app.use(express.static(clientPath));
    // Serve index.html for all routes
    app.use("*", (_req, res) => {
        const indexPath = path.resolve(clientPath, "index.html");
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        }
        else {
            res.status(404).send("Development server not properly configured");
        }
    });
}
export function serveStatic(app) {
    const distPath = path.resolve(import.meta.dirname, "..", "dist", "public");
    if (!fs.existsSync(distPath)) {
        throw new Error(`Could not find the build directory: ${distPath}, make sure to build the client first`);
    }
    app.use(express.static(distPath));
    // fall through to index.html if the file doesn't exist
    app.use("*", (_req, res) => {
        res.sendFile(path.resolve(distPath, "index.html"));
    });
}
