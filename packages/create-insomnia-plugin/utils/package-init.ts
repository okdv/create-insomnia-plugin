import { execSync } from 'child_process'

export const packageInit = (devDependencies: ReadonlyArray<string>) => {
  let cmd = 'npm install --registry=https://registry.npmjs.org/'
  execSync(cmd)
  devDependencies.forEach(name => {
    console.log(process.cwd());
    if (name.includes('/')) {
      cmd = `npm install --registry=https://registry.npmjs.org/ --save-dev --no-audit ${name}`
    } else {
      cmd = `npm install --registry=https://registry.npmjs.org/ --save-dev --no-audit --save-exact ${name}`
    }
    console.log(cmd)
    execSync(cmd)
  })

  return true
}
