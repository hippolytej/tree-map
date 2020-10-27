export async function getCoordinates(address, token) {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}`
  );
  const responseJson = await response.json();

  return this.setState({
    longitude: responseJson.features[0].center[0],
    latitude: responseJson.features[0].center[1],
    locationAvailable: true,
  });
}
