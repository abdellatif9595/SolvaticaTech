#!/bin/bash

echo "Initializing Git repository..."
git init

echo "Configuring user..."
git config user.name "abdellatif"
git config user.email "abdellatif@example.com"

echo "Adding files..."
git add .

echo "Creating commit..."
git commit -m "Initial commit: SolvaticaTech project"

echo "Setting main branch..."
git branch -M main

echo "Adding remote origin..."
git remote add origin https://github.com/abdellatif9595/SolvaticaTech.git

echo "Pushing to GitHub..."
git push -u origin main

echo "✅ Done! Your project is now on GitHub!"
