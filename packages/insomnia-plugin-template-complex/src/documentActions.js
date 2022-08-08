// https://docs.insomnia.rest/insomnia/hooks-and-actions#document-actions

module.exports = [
    {
        label: '',
        action: async (context, { contents, rawContents, format, formatVersion}) => {
            console.log(context, { contents, rawContents, format, formatVersion});
        },
        hideAfterClick: false
    }
];