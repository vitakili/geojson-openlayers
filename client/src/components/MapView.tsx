import { useState, useEffect, useRef } from "react";
import { Feature, Map, Overlay, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat, transform } from "ol/proj";

import "ol/ol.css";
import XYZ from "ol/source/XYZ"; //here...

import { Geometry, Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { PolygonStyle } from "./styles/PolygonStyle";
import { displayCoords, displayFeatureInfo } from "../Hooks";
import { Pixel } from "ol/pixel";
import { Coordinate } from "ol/coordinate";

interface ICustomProps {
  zoom: number;
  features: Feature<Geometry>[] | undefined;
}

function MapView({ zoom = 1, features }: ICustomProps) {
  const place = [13.37871, 49.74529];
  // const point = new Point(place);
  // const [map, setMap] = useState<Map>();
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [selectedCoord, setSelectedCoord] = useState<Coordinate>();

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: features,
    }),
    style: PolygonStyle,
  });

  const placeWebMercator = fromLonLat(place);
  useEffect(() => {
    if (mapElement.current && !mapRef.current && features) {
      const element = document.getElementById("popup");
      const popup = new Overlay({
        element: element,
        stopEvent: false,
      });
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
      map.addOverlay(popup);
      map.on(
        "click",
        function (evt: {
          pixel: Pixel;
          dragging: any;
          originalEvent: UIEvent;
        }) {
          if (evt.dragging) {
            return;
          }
          const pixel = map.getEventPixel(evt.originalEvent);
          const displ = displayFeatureInfo(pixel, map);
          let popover;
          if (displ !== undefined) {
            const coords = displayCoords(pixel, map);
            // set React state
            setSelectedCoord(coords);
            console.log(coords);
            if (popover) {
              popover!.dispose();
              popover = undefined;
            }
            popup.setPosition([coords[0], coords[1]]);
            popover = new bootstrap.Popover(element, {
              container: element.parentElement,
              content: "pepega",
              html: true,
              offset: [0, 20],
              placement: "top",
              sanitize: false,
            });
            popover.show();
          }
        }
      );
    }
  }, [mapElement, mapRef, features]);

  useEffect(() => {
    mapRef.current?.getView().setZoom(zoom);
  }, [mapRef, zoom, features]);

  return (
    <>
      <div ref={mapElement} style={{ width: "100%", height: "100vh" }}>
        <div id="popup"></div>
      </div>
    </>
  );
}

export default MapView;
