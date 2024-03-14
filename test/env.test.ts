import config from "../src/config"


test('.env | App Definition', async () => {
    expect(!!config.appName).toBeDefined()
    expect(!!config.nodeVer).toBeDefined()
    expect(!!config.debugLogging).toBeTruthy()
    expect(!!config.pinoEnabled).toBeTruthy()
    expect(!!config.pinoMinLevel).toBeDefined()
    expect(!!config.server.logPath).toBeDefined()

    expect(!!config.server.port).toBeDefined()
    expect(!!config.server.environment).toBeDefined()
    expect(!!config.server.bodyParser.patchKoa).toBeTruthy()
    expect(!!config.server.bodyParser.urlencoded).toBeTruthy()
    expect(!!config.server.bodyParser.text).toBeFalsy()
    expect(!!config.server.bodyParser.json).toBeTruthy()
    expect(!!config.server.bodyParser.multipart).toBeFalsy()

    expect(!!config.server.cors.origin).toBeDefined()
    expect(!!config.server.cors.exposeHeaders).toBeDefined()
    expect(!!config.server.cors.allowedHeaders).toBeDefined()
    expect(!!config.server.cors.allowedMethods).toBeDefined()
    
    expect(!!config.auth.secret).toBeDefined()
    expect(!!config.auth.saltRounds).toBeDefined()
    expect(!!config.auth.createOptions.expiresIn).toBeDefined()
    expect(!!config.auth.createOptions.algorithm).toBeDefined()
    expect(!!config.auth.createOptions.issuer).toBeDefined()

    expect(!!config.database.connection).toBeDefined()
})

