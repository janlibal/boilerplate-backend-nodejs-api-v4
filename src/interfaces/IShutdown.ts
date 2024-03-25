import pino from "pino"

export interface ShutdownOptions {
  logger?: typeof console | typeof pino
  forceTimeout?: number
}