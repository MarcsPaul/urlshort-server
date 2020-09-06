module.exports.buildBulkbody = async (args) => {
    let index = args.index;
    let type = args.type;
    let data = args.data;
    console.log('inside bulkbody:' + args.data);
    let bulkBody = [];
    data.map((elem) => {
        let operation = elem.operation || null;
        delete elem.operation;
        if (operation) {
            let data = { _index: index, _type: type };
            if (elem.id) data._id = elem.id;
            bulkBody.push({ [operation]: data });
            if (operation !== 'delete') bulkBody.push({ ...elem });
        }
    });
    return bulkBody;
};
