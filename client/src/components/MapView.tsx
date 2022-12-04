import { useState, useEffect, useRef } from "react";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import {
  FullScreen,
  ZoomSlider,
  defaults as defaultControls,
} from "ol/control";

import "ol/ol.css";
import XYZ from "ol/source/XYZ"; //here...

import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

import { PolygonStyle } from "./styles/PolygonStyle";
import {
  displayCoords,
  displayFeatureInfo,
  handlePopupDisplay,
} from "../Helpers";
import { Pixel } from "ol/pixel";
import { Coordinate } from "ol/coordinate";
import { Popover } from "./Popover/Popover";

interface ICustomProps {
  zoom: number;
  features: Feature<Geometry>[] | undefined;
}

function MapView({ zoom = 1, features }: ICustomProps) {
  const place = [13.37871, 49.74529];
  const placeWebMercator = fromLonLat(place);
  // const point = new Point(place);
  // const [map, setMap] = useState<Map>();
  const [popVal, setPopVal] = useState({});
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [selectedCoord, setSelectedCoord] = useState<Coordinate>();

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: features,
    }),
    style: PolygonStyle,
  });

  useEffect(() => {
    if (mapElement.current && !mapRef.current) {
      mapRef.current = new Map({
        controls: defaultControls().extend([
          new FullScreen(),
          new ZoomSlider(),
        ]),
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
          zoom,
        }),
        target: mapElement.current,
      });
    }
  }, [mapElement, mapRef]);

  useEffect(() => {
    if (mapRef.current && features) {
      const map = mapRef.current;
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
          const coords = displayCoords(pixel, map);
          if (displ !== undefined) {
            setSelectedCoord(coords.clickedCoord);
            // set React state
            handlePopupDisplay(map, coords.clickedCoord);
            const { geometry, ...filteredDispl } = displ;
            setPopVal(filteredDispl);
          } else {
            map.getView().animate({
              center: selectedCoord,
              zoom: 12,
              duration: 1000,
            });
            if (Object.keys(popVal).length !== 0) {
              setPopVal({});
            }
          }
        }
      );
    }
  }, [selectedCoord]);

  return (
    <div ref={mapElement} style={{ width: "100%", height: "100vh" }}>
      <Popover popVal={popVal} />
    </div>
  );
}

export default MapView;
