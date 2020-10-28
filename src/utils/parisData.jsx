export async function remarkableParisData() {
  var ids = [];
  const response = await fetch(
    "https://opendata.paris.fr/api/records/1.0/search/?dataset=arbresremarquablesparis&rows=2000"
  );
  const responseJson = await response.json();
  var maxNbTrees = Math.min(responseJson.parameters.rows, responseJson.nhits);
  for (var i = 0; i < maxNbTrees; i++) {
    ids.push(i);
  }
  return this.setState(
    {
      treeArray: responseJson.records,
      nbTrees: maxNbTrees,
      treeIds: ids,
    },
    function () {
      console.log("nb loaded trees", this.state.nbTrees);
    }
  );
}

export async function parisData(latitude, longitude, radius) {
  console.log("api call lat", latitude);
  console.log("api call long", longitude);
  var ids = [];
  var urlBase =
    "https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&q=&facet=typeemplacement&facet=domanialite&facet=arrondissement&facet=libellefrancais&facet=genre&facet=espece&facet=varieteoucultivar&facet=circonferenceencm&facet=hauteurenm&facet=stadedeveloppement&facet=remarquable&geofilter.distance=";
  const response = await fetch(
    `${urlBase}${latitude}%2C${longitude}%2C${radius}&rows=2000`
  );
  const responseJson = await response.json();
  var maxNbTrees = Math.min(responseJson.parameters.rows, responseJson.nhits);
  var treeNamesDict = {};
  for (var i = 0; i < maxNbTrees; i++) {
    ids.push(i);
    var libelle = responseJson.records[i].fields.libellefrancais;
    if (libelle in treeNamesDict) {
      treeNamesDict[libelle]["ids"].push(i);
    } else {
      treeNamesDict[libelle] = {
        ids: [i],
        color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
      };
    }
  }

  return this.setState(
    {
      treeArray: responseJson.records,
      treeNamesDict: treeNamesDict,
      nbTrees: maxNbTrees,
    },
    function () {
      console.log("nb loaded trees", this.state.nbTrees);
    }
  );
}
