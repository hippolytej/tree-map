export async function wikiData(keyword) {
    var safeKeyword = keyword.split(' ').join('_')
    console.log('Safe Keyword: ', safeKeyword)
    var urlBase = 'https://fr.wikipedia.org/w/api.php?format=json&origin=*'
    // First search for a page, get best result, get the title of the best result
    var bestResultTitle = ''
    var bestResultId = 0
    try {
        const searchResponse = await fetch(
            `${urlBase}&action=query&list=search&srsearch=${safeKeyword}`);
            // `${urlBase}&action=opensearch&search=${safeGenre}+incategory:Arbre&redirects=resolve`);
        const responseJson = await searchResponse.json();
        console.log('Search response Json', responseJson);
        bestResultTitle = await responseJson.query.search[0].title;
        bestResultId = await responseJson.query.search[0].pageid;
        console.log('Best result', bestResultTitle);
    } catch (error) {
        console.log('search error', error)
    }

    var desc = ''
    try {
        const descQueryResponse = await fetch(
            `${urlBase}&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${bestResultTitle}`);
        const descQueryJson = await descQueryResponse.json();
        console.log('descQuery Json', descQueryJson)
        const descPages = await descQueryJson.query.pages;
        console.log('Pages', descPages)
        desc = await descPages[Object.keys(descPages)[0]].extract;
        console.log('desc', desc)
    } catch (error) {
        console.log('desc error', error)
    }

    // Then query the best result's page :)
    var thumbnail = ''
    try {
        const thumbQueryResponse = await fetch(
            `${urlBase}&action=query&prop=pageimages&titles=${bestResultTitle}&pithumbsize=200`);
        const thumbQueryJson = await thumbQueryResponse.json();
        console.log('thumbQuery Json', thumbQueryJson)
        thumbnail = await thumbQueryJson.query.pages[bestResultId].thumbnail.source;
        console.log('Thumbnail', thumbnail)
    } catch (error) {
        console.log('thumbnail error', error)
    }

    return this.setState({
        wikiDesc: desc,
        thumbnailUrl: thumbnail
    }, function(){
        console.log('wikiData', this.state.thumbnailUrl);
    });
}