import * as materialColors from "@material-ui/core/colors/";
const { common, grey, blueGrey, ...colors } = materialColors;

function shuffle(array) {
  var tmp,
    current,
    top = array.length;

  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

  return array;
}

function getColors() {
  var colorNames = Object.keys(colors);
  var shuffledColorNames = shuffle(colorNames);
  var allColors = [];
  for (var intensity of [
    500,
    700,
    300,
    900,
    "A400",
    "A200",
    "A700",
    "A100",
    600,
    200,
    100,
    50,
  ]) {
    for (var colorName of shuffledColorNames) {
      allColors.push(colors[colorName][intensity]);
    }
  }
  return allColors;
}

const allColors = getColors();

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
  var uniqueLibelleCount = 0;
  for (var i = 0; i < maxNbTrees; i++) {
    ids.push(i);
    var libelle = responseJson.records[i].fields.libellefrancais;
    if (libelle in treeNamesDict) {
      treeNamesDict[libelle]["ids"].push(i);
    } else {
      treeNamesDict[libelle] = {
        ids: [i],
        color: allColors[uniqueLibelleCount],
      };
      uniqueLibelleCount++;
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
