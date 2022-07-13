import { execSync } from 'child_process'
import type { PackageManager } from './get-package-manager'

export const packageInit = ({
  packageManager,
  devDependencies,
}: {
  packageManager: PackageManager
  devDependencies: ReadonlyArray<string>
}) => {
  execSync(`${packageManager} install`)
  let args = ['--no-audit', '--save-dev'],
    exactOpt = '--save-exact',
    installCmd = `${packageManager} install`
  if (packageManager === 'yarn') {
    args = ['--dev']
    exactOpt = '--exact'
    installCmd = `${packageManager} add`
  }
  const remoteDependencies = devDependencies.map(name => {
    if (name.includes('/')) {
      execSync(`${installCmd} ${args.join(' ')} ${name}`)
    } else {
      return name
    }
  })
  if (remoteDependencies.length > 0) {
    args.push(exactOpt)
    execSync(`${installCmd} ${args.join(' ')} ${remoteDependencies.join(' ')}`)
  }

  return true
}
