import { useState, useEffect } from "react";

// openlayers
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";

// components
import MapView from "./components/MapView";
import { Geometry } from "ol/geom";
import { LoadingSpinner } from "./components/styles/LoadingSpinner";
import { ISideBarProps } from "./Types";

function App() {
  const [features, setFeatures] = useState<Feature<Geometry>[]>();
  const [fetchLayers, setFetchLayers] = useState<ISideBarProps[]>();

  
  useEffect(() => {
      Promise.all([
        fetch("/api/mhd"),
        fetch("/api/layers")
      ])
        .then(([resFeatures, resLayers]) =>
          Promise.all([resFeatures.json(), resLayers.json()])
        )
        .then(([dataFeatures, dataLayers]) =>{
                  // parse fetched geojson into OpenLayers features
        //  use options to convert feature from EPSG:4326 to EPSG:3857
        const wktOptions = {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        };
        const parsedFeatures = new GeoJSON().readFeatures(
          dataFeatures,
          wktOptions
        );

        // set features into state (which will be passed into OpenLayers
        //  map component as props)
        setFeatures(parsedFeatures);
        setFetchLayers(dataLayers);
        })

  }, []);

  return (
    <>
      {!features && !fetchLayers ? <LoadingSpinner color={"red"} /> : <MapView zoom={12} features={features} layers={fetchLayers}  />}
    </>
  );
}

export default App;
