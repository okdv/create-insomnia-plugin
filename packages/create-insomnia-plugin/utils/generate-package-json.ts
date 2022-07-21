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
  original,
  merger,
}: {
  original: {
    [key: string]: any
  }
  merger: {
    [key: string]: any
  }
}) => {
  const keysToReplace = Object.keys(merger).filter(key => {
    return !defaultBlacklist.includes(key) && !defaultMergelist.includes(key)
  })
  defaultMergelist.forEach(key => {
    const originalValue = original[key] && typeof original[key] === 'object' ? original[key] : {}
    const mergerValue = merger[key] && typeof merger[key] === 'object' ? merger[key] : {}
    original[key] = Object.assign(mergerValue, originalValue)
  })
  keysToReplace.forEach(key => (original[key] = merger[key]))
  return original
}
