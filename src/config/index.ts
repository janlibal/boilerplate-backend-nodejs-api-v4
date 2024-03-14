import dotenvExtended from 'dotenv-extended'
import dotenvParseVariables from 'dotenv-parse-variables'
import { IConfig } from '../interfaces/IConfig'
import * as pack from '../../package.json'

const env = dotenvExtended.load({
    path: process.env.ENV_FILE, 
    defaults: './src/config/env/.env.defaults',
    schema: './src/config/env/.env.schema',
    includeProcessEnv: true,
    silent: false,
    errorOnMissing: true,
    errorOnExtra: true,
})

const config: IConfig = {
    appName: pack.name as string,
    nodeVer: pack.engines.node as string,
}

export default config
