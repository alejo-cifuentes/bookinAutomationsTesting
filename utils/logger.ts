import * as fs from 'fs';
import * as path from 'path';

export interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  success(message: string): void;
}

export class ConsoleLogger implements Logger {
  info(message: string): void {
    console.log(`\x1b[34m[INFO]\x1b[0m ${message}`);
  }
  warn(message: string): void {
    console.warn(`\x1b[33m[WARN]\x1b[0m ${message}`);
  }
  error(message: string): void {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`);
  }
  success(message: string): void {
    console.log(`\x1b[32m[SUCCESS]\x1b[0m ${message}`);
  }
}

export class FileLogger implements Logger {
  private logFilePath: string;

  constructor(logDir = 'logs', fileName = 'test.log') {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    this.logFilePath = path.join(logDir, fileName);
  }

  private writeToFile(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(this.logFilePath, logMessage);
  }

  info(message: string): void {
    this.writeToFile('INFO', message);
  }
  warn(message: string): void {
    this.writeToFile('WARN', message);
  }
  error(message: string): void {
    this.writeToFile('ERROR', message);
  }
  success(message: string): void {
    this.writeToFile('SUCCESS', message);
  }
}
