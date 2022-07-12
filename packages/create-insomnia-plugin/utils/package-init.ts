import { execSync } from 'child_process'
import type { PackageManager } from './get-package-manager'

export const packageInit = ({
  packageManager,
  devDependencies,
  logLevel,
  templatePath,
}: {
  packageManager: PackageManager
  devDependencies: string
  logLevel?: string
  templatePath?: string
}) => {
  const argsArr = []
  if (packageManager === 'yarn') {
    argsArr.push(['install', devDependencies])
    argsArr.push(['add', '--exact', '--dev', devDependencies])
    if (templatePath) {
      argsArr.push(['add', templatePath, '--dev'])
    }
  } else {
    argsArr.push(['install', '--no-audit'])
    argsArr.push([
      'install',
      '--save-exact',
      '--save-dev',
      '--no-audit',
      devDependencies,
    ])
    if (templatePath) {
      argsArr.push(['install', '--no-audit', '--save-dev', templatePath])
    }
  }
  logLevel && argsArr.forEach(args => args.push(`--${logLevel}`))
  argsArr.forEach(args => {
    logLevel && args.push(`--${logLevel}`)
    const cmd = packageManager + ' ' + args.join(' ')
    try {
      execSync(cmd)
      console.log(cmd)
    } catch (e) {
      console.error(`Unable to execute ${cmd}:\n${e}`)
      return false
    }
  })

  return true
}
