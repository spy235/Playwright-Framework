import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";

const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

export const logger = createLogger({
  level: "debug", // all levels will be logged
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      (info) =>
        `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`
    )
  ),
  transports: [
    new transports.Console({ level: "debug" }),
    new transports.File({ filename: path.join(logDir, "combined.log") }),
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
  ],
});
