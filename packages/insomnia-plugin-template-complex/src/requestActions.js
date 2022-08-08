// https://docs.insomnia.rest/insomnia/hooks-and-actions#request-actions

module.exports = [
    {
        label: '',
        action: async (context, { requestGroup, request}) => {
            console.log(context, { requestGroup, request});
        }
    }
];