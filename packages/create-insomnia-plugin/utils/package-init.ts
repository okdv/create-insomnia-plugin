import { execSync } from 'child_process'

export const packageInit = (devDependencies: ReadonlyArray<string>) => {
  execSync(`npm install`)
  devDependencies.forEach(name => {
    if (name.includes('/')) {
      execSync(`npm install --save-dev --no-audit ${name}`)
    } else {
      execSync(`npm install --save-dev --no-audit --save-exact ${name}`)
    }
  })

  return true
}
