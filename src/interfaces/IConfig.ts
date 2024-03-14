export interface IConfig {
    appName: string
    nodeVer: string
        server: {
            logPath: string,
            port: string,
            environment: string,
            bodyParser: {
                patchKoa: boolean,
                urlencoded: boolean,
                text: boolean,
                json: boolean,
                multipart: boolean,
              },
            cors: {
                origin: string,
                exposeHeaders: []
                allowedHeaders: []
                allowedMethods: []
            }
        }
        database: {
            connection: string
        }
    debugLogging: boolean
    pinoMinLevel: string
    pinoEnabled: boolean
        auth: {
            secret: string
            saltRounds: string
            createOptions: {
                expiresIn: any
                algorithm: any
                issuer: string
            }
        }
}




