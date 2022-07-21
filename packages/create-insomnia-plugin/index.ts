#!/usr/bin/env node

import Commander from 'commander'
import prompts from 'prompts'
import validateProjectName from 'validate-npm-package-name'
import { createPlugin } from './create-plugin'
import { formatName } from './utils/format-name'
import type { Names } from './utils/format-name'
import packageJson from './package.json'

let names: Names = { pluginName: '', packageName: '', dirName: '' }

const program = new Commander.Command(packageJson.name)
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version)
  .argument('<package-name>', 'Will be prefixed with insomnia-plugin-')
  .usage(`'<package-name>' [options]`)
  .action((name: string) => {
    names = formatName(name.trim())
    const validate = validateProjectName(names.packageName)
    if (!validate.validForNewPackages) {
      console.error(
        'Package name invalid, must meet npm new package standards: https://www.npmjs.com/package/validate-npm-package-name\n'
      )
      if (validate.warnings && validate.warnings.length > 0) {
        console.error('Warnings:')
        console.error(validate.warnings.join('\n'))
      }
      if (validate.errors && validate.errors.length > 0) {
        console.error('Errors:')
        console.error(validate.errors.join('\n'))
      }
      process.exit(1)
    }
  })
  .option('-t, --theme', 'Use theme template')
  .option('-s, --simple', 'Use simple template')
  .option('-c, --complex', 'Choose complex template')
  .option('-p, --plugins-path [path]', 'Path to Insomnia plugins folder')
  .allowUnknownOption()
  .parse(process.argv)

const options = program.opts()

options.yes && prompts.inject([names.packageName, names.pluginName])

const run = async (): Promise<void> => {
  const res = await prompts([
    {
      type: 'text',
      name: 'dir-name',
      message: 'Directory name:',
      initial: names.dirName,
      onState: state => (names.dirName = state.value.trim()),
      validate: (name: string) => name.length > 0,
    },
    {
      type: 'text',
      name: 'plugin-display-name',
      message: 'Display name:',
      initial: names.pluginName,
    },
    {
      type: 'text',
      name: 'plugin-description',
      message: 'Describe your plugin:',
    },
    {
      type: options.pluginsPath ? null : 'text',
      name: 'plugins-path',
      message: 'Insomnia plugins folder path:',
    },
    {
      type: options.template ? null : 'select',
      name: 'plugin-template',
      message: 'Choose a plugin template:',
      choices: [
        {
          title: 'Simple',
          description: 'Small plugins, uses only a couple JS files',
          value: 'simple',
        },
        {
          title: 'Complex',
          description:
            'Larger plugins, includes JS file for each available hook',
          value: 'complex',
        },
        {
          title: 'Theme',
          description: 'For themes rather than functional plugins',
          value: 'theme',
        },
      ],
    },
    {
      type: 'text',
      name: 'plugin-author',
      message: 'Author:',
    },
    {
      type: 'text',
      name: 'package-license',
      message: 'License:',
      initial: 'MIT',
    },
  ])

  const defaultRepoUrl = `htts://github.com/user/${names.packageName}`

  const defaultPackageJson = {
    name: names.packageName,
    description: res['plugin-description'],
    author: res['plugin-author'],
    license: res['package-license'],
    insomnia: {
      name: names.packageName,
      displayName: res['plugin-display-name'],
      description: res['plugin-description'],
      publisher: {
        name: res['plugin-author'],
      },
    },
    repository: {
      type: 'git',
      url: `${defaultRepoUrl}.git`,
    },
    scripts: {
      update: '',
    },
    bugs: {
      url: `${defaultRepoUrl}/issues`,
    },
    homepage: `https://insomnia.rest/plugins/${names.packageName}`,
    createInsomniaPluginTemplate:
      res['plugin-template'] || options.template || 'simple',
    insomniaPluginsPath:
      res['plugins-path'] || options.pluginsPath || '/apps/Insomnia/plugins',
  }

  await createPlugin(defaultPackageJson)
}

run().catch(async err => {
  console.log('\nAborting installation...\n')
  if (err.command) {
    console.log(`${err.command} had failed\n`)
  } else {
    console.log(`An unexpected error occured:\n`, err)
  }
  process.exit(1)
})
