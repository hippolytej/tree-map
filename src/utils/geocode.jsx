export async function getCoordinates(address, token) {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=2.350699,48.852737&access_token=${token}`
  ); // $bbox=48.964581,2.112012,48.745023,2.581812
  const responseJson = await response.json();

  return this.setState({
    longitude: responseJson.features[0].center[0],
    latitude: responseJson.features[0].center[1],
    locationAvailable: true,
  });
}
