import fs from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'
import { isDirSafe } from './utils/is-dir-safe'
import { generatePackageJson } from './utils/generate-package-json'
import { packageInit } from './utils/package-init'

export const createPlugin = async (defaultPackageJson: {
  name: string
  createInsomniaPluginTemplate: 'theme' | 'simple' | 'complex'
  [key: string]: any
}): Promise<void> => {
  const root = path.resolve(defaultPackageJson.name)
  const packageJsonPath = path.join(root, 'package.json')
  const originalDir = process.cwd()
  const templateName = `cip-template-${defaultPackageJson.createInsomniaPluginTemplate}`
  const localTemplatePackagePath = path.resolve(originalDir, '..', templateName)
  const devDependencies = ['eslint', 'prettier']

  fs.ensureDirSync(root)
  if (!isDirSafe(root)) {
    process.exit(1)
  }

  console.log(`Creating an Insomnia REST Client Plugin in ${root}`)
  fs.writeJsonSync(packageJsonPath, defaultPackageJson)

  if (fs.existsSync(localTemplatePackagePath)) {
    devDependencies.push(localTemplatePackagePath)
    console.log(`Using local package as template: ${localTemplatePackagePath}`)
  } else {
    devDependencies.push(templateName)
    console.log(`Using ${templateName} as template`)
  }

  console.log('Installing dependencies, this may take a few moments...')
  if (!packageInit(devDependencies)) {
    process.exit(1)
  }

  const templateModule = path.dirname(
    require.resolve(`${templateName}/package.json`, {
      paths: [root, 'node_modules'],
    })
  )
  if (fs.existsSync(templateModule)) {
    const templatePackageJson = fs.readJsonSync(
      path.resolve(templateModule, 'package.json'),
      { throws: true }
    )
    const mergedPackageJson = generatePackageJson({
      original: defaultPackageJson,
      merger: templatePackageJson,
    })
    if (fs.existsSync(path.join(root, 'README.md'))) {
      fs.moveSync(
        path.join(root, 'README.md'),
        path.join(root, 'README.old.md')
      )
    }
    fs.copySync(templateModule, root)
    fs.writeJsonSync(packageJsonPath, mergedPackageJson)
    fs.moveSync(path.join(root, 'gitignore'), path.join(root, '.gitignore'))
  }

  execSync(`npm run lint:fix && npm run format`)

  console.log('Initializing git repository...')
  execSync(
    'git init && git add . && git commit -m "Created using create-insomnia-plugin'
  )
}
