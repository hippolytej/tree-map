export async function parisData() {
    var ids = [];
    const response = await fetch(
        'https://opendata.paris.fr/api/records/1.0/search/?dataset=arbresremarquablesparis&rows=200');
    const responseJson = await response.json();
    var maxNbTrees = Math.min(responseJson.parameters.rows, responseJson.nhits);
    for (var i = 0; i < maxNbTrees; i++) {
        ids.push(i)
    }
    return this.setState({
        treeDict: responseJson.records,
        nbTrees: maxNbTrees,
        treeIds: ids
    }, function(){
        console.log('dict', this.state.treeDict);
        console.log('nb', this.state.nbTrees);
        console.log('ids', this.state.treeIds);
    });
}