import pino from "pino"
import config from "../config"

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      options: { destination: config.server.logPath },
    },
    {
      target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
  ],
})

export default pino({
    formatters: {
      bindings: (bindings) => {
        return { 
            pid: bindings.pid, 
            host: bindings.hostname,
            node_version: config.nodeVer,
            platform: `${process.platform}/${process.arch}`
        }
      },
    },
    name: config.appName,
    level: config.pinoMinLevel,
    enabled: config.pinoEnabled,
    timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
    redact: {
      paths: [
        'user.id',
        'user.name',
        'user.password',
      ],
      remove: true,
    },
}, transport)
