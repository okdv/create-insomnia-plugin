export type Names = {
  packageName: string
  pluginName: string
  dirName: string
  rawName: string
}

export const formatName = (name: string, theme?: boolean): Names => {
  const prefix = 'insomnia-plugin-'
  const suffix = theme ? '-theme' : ''
  const prettifyName = (name: string): string =>
    name
      .split('-')
      .map(str => str.charAt(0).toUpperCase() + str.slice(1))
      .join(' ')

  if (!name.startsWith(prefix)) {
    name = `${prefix}${name}`
  }

  if (!name.endsWith(suffix)) {
    name = `${name}${suffix}`
  }
  const rawName = name.slice(
    prefix.length,
    suffix.length > 0 ? -suffix.length : name.length
  )

  return {
    packageName: name,
    pluginName: prettifyName(rawName),
    dirName: name,
    rawName: rawName,
  }
}
