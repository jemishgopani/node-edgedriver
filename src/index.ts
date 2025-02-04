import cp from 'node:child_process'

import { download as downloadDriver } from './install.js'
import { hasAccess, parseParams } from './utils.js'
import { DEFAULT_ALLOWED_ORIGINS, DEFAULT_ALLOWED_IPS, log } from './constants.js'
import type { EdgedriverParameters } from './types.js'

export async function start (params: EdgedriverParameters) {
  const { cacheDir, ...startArgs } = params
  let binaryFilePath = params.customEdgeDriverPath
  if (!binaryFilePath) {
    binaryFilePath = await downloadDriver(params.edgeDriverVersion, cacheDir)
  }

  if (!(await hasAccess(binaryFilePath))) {
    throw new Error('Failed to access EdgeDriver, was it installed successfully?')
  }

  startArgs.allowedOrigins = startArgs.allowedOrigins || DEFAULT_ALLOWED_ORIGINS
  startArgs.allowedIps = startArgs.allowedIps || DEFAULT_ALLOWED_IPS

  const args = parseParams(startArgs)
  log.info(`Starting EdgeDriver at ${binaryFilePath} with params: ${args.join(' ')}`)
  return cp.spawn(binaryFilePath, args)
}

export const download = downloadDriver
export * from './types.js'
