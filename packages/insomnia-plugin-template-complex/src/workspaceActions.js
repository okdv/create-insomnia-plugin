// https://docs.insomnia.rest/insomnia/hooks-and-actions#workspace-actions

module.exports = [
    {
        label: '',
        action: async (context, { workspace, requestGroup, requests}) => {
            console.log(context, { workspace, requestGroup, requests});
        }
    }
];