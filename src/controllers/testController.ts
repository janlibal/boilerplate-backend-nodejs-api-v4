import os from 'os'
import pkginfo from '../../package.json'
import { IContext } from '../interfaces/IContext'
import logger from '../utils/logger'


export async function getApiInfo(ctx: IContext){

  const environments = {
    nodeVersion: process.versions['node'],
    hostname: os.hostname(),
    platform: `${process.platform}/${process.arch}`
  }

  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    environments
  }

  ctx.status = 200
  ctx.body = data


  logger.info('Test route works.')
}