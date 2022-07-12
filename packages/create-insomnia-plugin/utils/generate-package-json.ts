import type { Settings } from '..'

type PackageObject = {
  [key: string]: string | PackageObject | Array<string>
}

const defaultBlacklist = [
  'name',
  'version',
  'description',
  'keywords',
  'bugs',
  'license',
  'author',
  'contributors',
  'files',
  'browser',
  'bin',
  'man',
  'directories',
  'repository',
  'peerDependencies',
  'bundledDependencies',
  'optionalDependencies',
  'engineStrict',
  'os',
  'cpu',
  'preferGlobal',
  'private',
  'publishConfig',
  'insomnia',
]
const defaultMergelist = ['scripts', 'dependencies']

export const generatePackageJson = ({
  replaceWith,
  replace,
  blacklist = defaultBlacklist,
  mergelist = defaultMergelist,
  settings,
}: {
  replaceWith: PackageObject
  replace: PackageObject
  blacklist?: ReadonlyArray<string>
  mergelist?: ReadonlyArray<string>
  settings?: Settings
}) => {
  if (settings) {
    replaceWith = {
      name: settings['package-name'],
      description: settings['plugin-description'],
      author: settings['plugin-author'],
      license: settings['package-license'],
      insomnia: {
        name: settings['package-name'],
        displayName: settings['plugin-display-name'],
        description: settings['plugin-description'],
        publisher: {
          name: settings['plugin-author'],
        },
      },
      repository: {
        type: 'git',
        url: settings['package-repo'],
      },
      scripts: {
        update: '',
      },
      bugs: {
        url: `${settings['package-repo']}/issues`,
      },
      homepage: `https://insomnia.rest/plugins/${settings['package-name']}`,
      insomniaPluginsPath: settings['plugins-path'],
    }
  }
  const keysToReplace = Object.keys(replaceWith).filter(key => {
    return !blacklist.includes(key) && !mergelist.includes(key)
  })
  mergelist.forEach(key => {
    if (replaceWith[key] || replace[key]) {
      if (replaceWith[key] && typeof replaceWith[key] !== 'object') {
        return
      }
      if (replace[key] && typeof replace[key] !== 'object') {
        return
      }
      replace[key] = Object.assign(replaceWith[key], replace[key])
    }
  })
  keysToReplace.forEach(key => (replace[key] = replaceWith[key]))
  return replace
}
