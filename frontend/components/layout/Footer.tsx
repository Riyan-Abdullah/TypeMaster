import React from 'react';
import { Keyboard, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-card border-t border-slate-100 dark:border-dark-border mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white">
              <Keyboard className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-text dark:text-dark-text">
              Type<span className="text-primary">Master</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-secondary dark:text-dark-secondary text-center">
            &copy; {new Date().getFullYear()} TypeMaster. All rights reserved. Master your typing speed & accuracy.
          </p>

          {/* Social Placeholders */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              aria-label="Twitter Profile"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              aria-label="LinkedIn Page"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
