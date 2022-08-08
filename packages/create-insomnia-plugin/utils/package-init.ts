import { execSync } from 'child_process'

export const packageInit = (devDependencies: ReadonlyArray<string>) => {
  let cmd = 'npm install'
  execSync(cmd)
  devDependencies.forEach(name => {
    if (name.includes('/')) {
      cmd = `npm install --save-dev --no-audit ${name}`
    } else {
      cmd = `npm install --save-dev --no-audit --save-exact ${name}`
    }
    execSync(cmd)
  })

  return true
}
