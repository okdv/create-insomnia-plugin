export type Names = {
    packageName: string;
    pluginName: string;
    dirName: string;
}

export const formatName = (name: string): Names => {
    let packageName: string, pluginName: string
    const prefix = "insomnia-plugin-"
    const prettifyName = (name: string): string => name
        .split("-")
        .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
        .join(" ");

    if (name.startsWith(prefix)) {
        packageName = name
        pluginName = prettifyName(name.slice(prefix.length))
    } else {
        packageName = `${prefix}${name}`
        pluginName = prettifyName(name)
    }

    return {
        packageName: packageName,
        pluginName: pluginName,
        dirName: packageName
    }
}