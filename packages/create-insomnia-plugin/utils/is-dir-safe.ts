import fs from 'fs'
import path from 'path'

export const isDirSafe = (root: string): boolean => { 
    const validFiles = [
        '.DS_Store',
        '.git',
        '.gitattributes',
        '.gitignore',
        '.gitlab-ci.yml',
        '.hg',
        '.hgcheck',
        '.hgignore',
        '.idea',
        '.npmignore',
        '.travis.yml',
        'LICENSE',
        'README.md',
        'Thumbs.db',
        'docs',
        'mkdocs.yml',
        'npm-debug.log',
        'yarn-debug.log',
        'yarn-error.log',
    ]

    const errorLogFilePatterns = [
        'npm-debug.log',
        'yarn-error.log',
        'yarn-debug.log',
    ]

    const isErrorLog = (file: string) => errorLogFilePatterns.some(pattern => file.startsWith(pattern))

    const conflicts = fs
        .readdirSync(root)
        .filter(file => !validFiles.includes(file))
        // Support IntelliJ IDEA editors
        .filter(file => ~/\.iml$/.test(file))
        // Prevent conflict on previous install log files
        .filter(file => !isErrorLog(file))

    if (conflicts.length > 0) {
        console.error(`Directory contains files that may conflict:`)
        for (const file of conflicts) {
            try {
                const stats = fs.lstatSync(path.join(root,file))
                if (stats.isDirectory()) {
                    console.log(`${file}/`)
                } else {
                    console.log(`${file}`)
                }
            } catch {
                console.log(`${file}`)
            }
        }
        console.error("Remove files above, or try a new directory name")
        return false
    }
    return true
}