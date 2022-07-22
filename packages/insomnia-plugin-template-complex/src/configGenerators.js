// https://docs.insomnia.rest/insomnia/hooks-and-actions#config-generator

module.exports = [
    {
        label: '',
        docsLink: '',
        generate: async ({
            contents,
            rawContents,
            format,
            formatVersion
        }) => {
            console.log(
                contents,
                rawContents,
                format,
                formatVersion
            );
            return {
                document: '',
                error: ''
            };
        }
    }
];