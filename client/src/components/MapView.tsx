import { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";

import "ol/ol.css";
import XYZ from "ol/source/XYZ"; //here...

import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { PolygonStyle } from "./styles/PolygonStyle";
import { displayFeatureInfo } from "../Hooks";

function MapView({ zoom = 1 }: { zoom?: number }) {
  const place = [13.37871, 49.74529];
  // const point = new Point(place);
  // const [map, setMap] = useState<Map>();
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);


  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      url: "http://localhost:5000/api/mhd",
      format: new GeoJSON(),
    }),
    style: PolygonStyle,
  });

  const placeWebMercator = fromLonLat(place);
  useEffect(() => {
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

      const map = mapRef.current;
      map.on('click', function (evt: { dragging: any; originalEvent: UIEvent; }) {
        if (evt.dragging) {
          return;
        }
        const pixel = map.getEventPixel(evt.originalEvent);
        const displ = displayFeatureInfo(pixel, map);
        console.log(displ);
      });
    }
  }, [mapElement, mapRef]);

  useEffect(() => {
    mapRef.current?.getView().setZoom(zoom);
  }, [mapRef, zoom]);


  return <div ref={mapElement} style={{ width: "100%", height: "100vh" }} />;
}

export default MapView;
