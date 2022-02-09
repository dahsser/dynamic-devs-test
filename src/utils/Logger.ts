export enum LogLevel {
  OFF = 0,
  ERROR,
  WARN,
  INFO,
  DEBUG,
  TRACE,
  LOG,
}
type LogLevelKey = keyof typeof LogLevel;

export type LogOutput = (
  source: string | undefined,
  level: LogLevel,
  message: string,
  ...data: unknown[]
) => void;

export class Logger {
  static level = LogLevel.LOG;
  static outputs: LogOutput[] = [];
  static showTimestamp = true;
  private readonly source: string | undefined;

  public constructor(source: string | Object | undefined) {
    if (!source) {
      this.source = undefined;
    } else if (typeof source === "string") {
      this.source = source;
    } else {
      this.source = source.constructor.name;
    }
  }

  static enableProductionMode(): void {
    Logger.level = LogLevel.INFO;
  }

  static trace(message: string, ...data: unknown[]): void {
    doLog(undefined, console.debug, LogLevel.TRACE, message, data);
  }

  static debug(message: string, ...data: unknown[]): void {
    doLog(undefined, console.debug, LogLevel.DEBUG, message, data);
  }

  static info(message: string, ...data: unknown[]): void {
    doLog(undefined, console.info, LogLevel.INFO, message, data);
  }

  static warn(message: string, ...data: unknown[]): void {
    doLog(undefined, console.warn, LogLevel.WARN, message, data);
  }

  static error(message: string, ...data: unknown[]): void {
    doLog(undefined, console.error, LogLevel.ERROR, message, data);
  }

  static create(name?: string): Logger {
    return new Logger(name);
  }

  trace(message: string, ...data: unknown[]): void {
    doLog(this.source, console.trace, LogLevel.TRACE, message, data);
  }

  debug(message: string, ...data: unknown[]): void {
    doLog(this.source, console.debug, LogLevel.DEBUG, message, data);
  }

  info(message: string, ...data: unknown[]): void {
    doLog(this.source, console.info, LogLevel.INFO, message, data);
  }

  warn(message: string, ...data: unknown[]): void {
    doLog(this.source, console.warn, LogLevel.WARN, message, data);
  }

  error(message: string, ...data: unknown[]): void {
    doLog(this.source, console.error, LogLevel.ERROR, message, data);
  }
}

function doLog(
  source: string | undefined,
  func: (...args: unknown[]) => void,
  level: LogLevel,
  message: string,
  data: unknown[]
) {
  if (level > Logger.level) {
    return;
  }
  const log = build(level, message, data, source);
  func.apply(console, log);
  applyLoggerOutput(level, message, data, source);
}

function build(
  level: LogLevel,
  message: string,
  data: unknown[],
  source?: string
): unknown[] {
  let _level: string;
  switch (level) {
    case LogLevel.TRACE:
      _level = `${LogLevel[level]}`;
      break;
    case LogLevel.DEBUG:
      _level = `${LogLevel[level]}`;
      break;
    case LogLevel.INFO:
      _level = ` ${LogLevel[level]}`;
      break;
    case LogLevel.WARN:
      _level = ` ${LogLevel[level]}`;
      break;
    case LogLevel.ERROR:
      _level = `${LogLevel[level]}`;
      break;
    default:
      _level = `${LogLevel[level]}`;
      break;
  }
  const result: unknown[] = [];
  if (Logger.showTimestamp) {
    result.push(`${timestamp()}${_level}`);
  }
  if (source) result.push(`[${source}]`);
  result.push(message);
  return result.concat(data);
}

function applyLoggerOutput(
  level: LogLevel,
  message: string,
  data: unknown[],
  source?: string
) {
  Logger.outputs.forEach((output) => {
    output.apply(output, [source, level, message, ...data]);
  });
}

function timestamp(): string {
  return `${new Date().toISOString()}`;
}

if (process.env.NODE_ENV === "production") {
  Logger.enableProductionMode();
} else {
  const logger_level: LogLevelKey = process.env.LOG_LEVEL || ("LOG" as any);
  Logger.level = LogLevel[logger_level];
}
