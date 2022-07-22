const init = async (context) => {
    console.log(context)
}

module.exports.requestHooks = [init];
module.exports.responseHooks = [init];
module.exports.requestActions = [init];
module.exports.requestGroupActions = [init];
module.exports.workspaceActions = [init];
module.exports.documentActions = [init];
module.exports.configGenerators = [init];