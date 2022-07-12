export type PackageManager = 'npm' | 'pnpm' | 'yarn'

export const getPackageManager = (): PackageManager => {
  const userAgent = process.env.npm_config_user_agent
  if (userAgent) {
    if (userAgent.indexOf('pnpm') === 0) {
      return 'pnpm'
    } else if (userAgent.indexOf('yarn') === 0) {
      return 'yarn'
    }
  }
  return 'npm'
}
