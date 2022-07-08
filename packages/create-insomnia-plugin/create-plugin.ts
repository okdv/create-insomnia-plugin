import fs from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'
import { isDirSafe } from './utils/is-dir-safe'
import { generatePackageJson } from './utils/generate-package-json'
import { packageInit } from './utils/package-init'
import { gitInit } from './utils/git-init'
import type { Settings } from '.'
import type { PackageManager } from './utils/get-package-manager'

export const createPlugin = async ({
    settings,
    packageManager,
}:{
    settings: Settings,
    packageManager: PackageManager
}): Promise<void> => {
    const root = path.resolve(settings['dir-name'])

    fs.ensureDirSync(root)
    if (!isDirSafe(root)) {
        process.exit(1)
    }

    console.log(`Creating an Insomnia REST Client Plugin in ${root}\n`)
    
    const packageJsonPath = path.join(root, 'package.json')
    let packageJson = {}
    
    if (fs.existsSync(packageJsonPath)) {
        try {
            packageJson = fs.readJsonSync(packageJsonPath, {throws: true})
        } catch (err) {
            console.error(`Cannot read existing package.json:\n${err}`)
        }
    }
    packageJson = generatePackageJson({replaceWith: {}, replace: {}, blacklist: [], mergelist: [], settings}) 
    console.log(packageJson)
    try {
        fs.writeJsonSync(packageJsonPath, packageJson)
        console.log(`Created package.json at ${packageJsonPath}`)
    } catch (e) {
        console.error(`Unable to create package.json:\n${e}`)
        process.exit(1)
    }
    
    const originalDir = process.cwd()
    const templateName = `cip-template-${settings['plugin-template']}`
    const localPackagePath = path.resolve(originalDir, '..', templateName)
    process.chdir(root)

    console.log("Installing dependencies, this may take a few moments...")
    const devDependencies = ["eslint", templateName].join(' ')
    if (!packageInit({packageManager, devDependencies, logLevel: settings['log-level'], templatePath: localPackagePath})) {
        process.exit(1)
    }

    const templatePath = path.dirname(require.resolve(`${templateName}/package.json`, {paths:[root, 'node_modules']}))
    if (fs.existsSync(templatePath)) {
        const templatePackageJson = fs.readJsonSync(path.resolve(templatePath, 'package.json'), {throws: true})
        console.log(process.cwd(), root, templatePath, templatePackageJson)
        packageJson = generatePackageJson({replaceWith: templatePackageJson, replace: packageJson})
        const readMeExists = fs.existsSync(path.join(root, 'README.md'))
        if (readMeExists) {
            fs.renameSync(path.join(root, 'README.md'), path.join(root, 'README.old.md'))
        }
        fs.copySync(templatePath, root)
        fs.writeJsonSync(packageJsonPath, packageJson)
    }

    execSync(`${packageManager} run lint:fix`)

    console.log("Initializing git repository...")
    gitInit(settings['log-level']) 

}