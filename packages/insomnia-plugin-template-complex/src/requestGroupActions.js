module.exports = [
    {
        label: '',
        action: async (context, { requestGroup, requests}) => {
            console.log(context, { requestGroup, requests})
        }
    }
]