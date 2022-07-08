import { execSync } from 'child_process'

export const gitInit = (quiet: boolean): boolean => {
    let cmd: string
    try {
        execSync(`git --version`, {stdio: 'ignore'})
        if (execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' })) {
            console.error(`Already inside git repository`)
            return false;
        }
        const quietString = quiet ? '--quiet' : ''
        cmd = `
            git init ${quietString} &&
            git add ${quietString} . && 
            git commit -m "Initialized using create-insomnia-plugin"
        `
        console.log(cmd)
        execSync(cmd)
        return true;
    } catch (err) {
        console.error(`Unable to initialize Git repository:\n${err}\nAbandoning create-insomnia-plugin`)
        return false;
    }
}