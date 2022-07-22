// https://docs.insomnia.rest/insomnia/hooks-and-actions#folder-actions

module.exports = [
    {
        label: '',
        action: async (context, { requestGroup, requests}) => {
            console.log(context, { requestGroup, requests});
        }
    }
];