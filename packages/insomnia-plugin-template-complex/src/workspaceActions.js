module.exports = [
    {
        label: '',
        action: async (context, { workspace, requestGroup, requests}) => {
            console.log(context, { workspace, requestGroup, requests});
        }
    }
];