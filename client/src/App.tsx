import "./App.css";

// react
import { useState, useEffect } from "react";

// openlayers
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";

// components
import MapView from "./components/MapView";
import { Geometry } from "ol/geom";

function App() {
  // set intial state
  const [features, setFeatures] = useState<Feature<Geometry>[]>();

  // initialization - retrieve GeoJSON features from Mock JSON API get features from mock
  //  GeoJson API (read from flat .json file in public directory)
  useEffect(() => {
    fetch("http://localhost:5000/api/mhd")
      .then((response) => response.json())
      .then((fetchedFeatures) => {
        // parse fetched geojson into OpenLayers features
        //  use options to convert feature from EPSG:4326 to EPSG:3857
        const wktOptions = {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        };
        const parsedFeatures = new GeoJSON().readFeatures(
          fetchedFeatures,
          wktOptions
        );

        // set features into state (which will be passed into OpenLayers
        //  map component as props)
        setFeatures(parsedFeatures);
      });
  }, []);

  return (
    <div className="App">
      {!features ? "Loading..." : <MapView features={features} zoom={12} />}
    </div>
  );
}

export default App;
