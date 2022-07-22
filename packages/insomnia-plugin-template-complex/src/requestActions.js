module.exports = [
    {
        label: '',
        action: async (context, { requestGroup, request}) => {
            console.log(context, { requestGroup, request})
        }
    }
]