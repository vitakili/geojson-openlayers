import { useState, useEffect, useRef } from "react";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import Geometry from "ol/geom/Geometry";

import "ol/ol.css";
import XYZ from "ol/source/XYZ"; //here...

import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import Fill from "ol/style/Fill";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
// import '../../public/mhdzastavky.geojson';

function MapView({ zoom = 1 }: { zoom?: number }) {
  const place = [13.37871, 49.74529];
  const point = new Point(place);
  const [map, setMap] = useState<Map>();
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  const styles = {
    'Polygon': new Style({
      stroke: new Stroke({
        color: 'red',
        lineDash: [4],
        width: 3,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
    }),
  };

  const vectorLayer = new VectorLayer({
    // background: '#1a2b39',
    source: new VectorSource({
      url: "../../public/mhdzastavky.geojson",
      format: new GeoJSON(),
    }),
    style: function (feature) {
      return styles[feature.getGeometry().getType()];
    },
  });
  
  const placeWebMercator = fromLonLat(place);
  useEffect(() => {
    console.log("I'm mounting!");
    if (mapElement.current && !mapRef.current) {
      mapRef.current = new Map({
        layers: [
          // Google Maps
          new TileLayer({
            source: new XYZ({
              url: "http://mt0.google.com/vt/lyrs=m&hl=cs&x={x}&y={y}&z={z}",
            }),
          }),
          vectorLayer,
        ],
        view: new View({
          center: placeWebMercator,
          zoom: 8,
        }),
        target: mapElement.current,
      });
    }
  }, [mapElement, mapRef]);

  useEffect(() => {
    mapRef.current?.getView().setZoom(zoom);
  }, [mapRef, zoom]);

  return <div ref={mapElement} style={{ width: "100%", height: "100vh" }} />;
}

export default MapView;
