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
import { XYZ, OSM } from "ol/source"; //here...

import { Geometry } from "ol/geom";

import {
  displayCoords,
  displayFeatureInfo,
  handlePopupDisplay,
} from "../Helpers";
import { Pixel } from "ol/pixel";
import { Coordinate } from "ol/coordinate";
import { Popover } from "./Popover/Popover";
import { tileWmsLayer, vectorLayer } from "./Layers";
import { SideBar } from "./SideBar";
import { EnumLayerName, ISideBarProps } from "../Types";

interface ICustomProps {
  zoom: number;
  features: Feature<Geometry>[] | undefined;
  layers: ISideBarProps[] | undefined;
}

function MapView({ zoom = 1, features, layers }: ICustomProps) {
  const place = [13.37871, 49.74529];
  const placeWebMercator = fromLonLat(place);
  // const [map, setMap] = useState<Map>();
  const [popVal, setPopVal] = useState({});
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [selectedCoord, setSelectedCoord] = useState<Coordinate>();

  const [newData, setNewData] = useState(null);
  const sendValue = (newData: any) => {
    setNewData(newData);
  };

  let vectorLayerProp;

  useEffect(() => {
    if (mapElement.current && !mapRef.current && features) {
      mapRef.current = new Map({
        controls: defaultControls().extend([
          new FullScreen(),
          new ZoomSlider(),
        ]),
        layers: [
          // Google Maps
          // new TileLayer({
          //   source: new XYZ({
          //     url: "http://mt0.google.com/vt/lyrs=m&hl=cs&x={x}&y={y}&z={z}",
          //   }),
          // }),
          new TileLayer({
            properties: {
              name: "Mapa pozadí",
            },
            source: new OSM(),
          }),
        ],
        view: new View({
          center: placeWebMercator,
          zoom,
          minZoom: 8,
          maxZoom: 20,
        }),
        target: mapElement.current,
      });
    }
  }, [mapElement, mapRef]);

  useEffect(() => {
    if (mapRef.current && features && newData !== null && layers) {
      vectorLayerProp = vectorLayer(features);
      function findInArray(item: ISideBarProps) {
        return item.name === newData;
      }
      const map = mapRef.current;
      const findLayer = layers.find(findInArray);
      if (findLayer) {
        const layer = tileWmsLayer(findLayer);
        map.addLayer(layer);
        map.getView().setMinZoom(findLayer.minZoom);
        map.getView().animate({
          zoom: findLayer.zoom,
          duration: 250,
        });
        const findMhd = map
          .getLayers()
          .getArray()
          .find((layer) => layer.get("name") == EnumLayerName.Name);
        if (findMhd) {
          map.removeLayer(findMhd);
        }
        layers.forEach((lay) => {
          if (findLayer.name !== lay.name) {
            console.log(lay.name);
            let remove = map
              .getLayers()
              .getArray()
              .find((layer) => layer.get("name") == lay.name);
            if (remove) {
              map.removeLayer(remove);
            }
          }
        });
      } else if (newData === EnumLayerName.Name) {
        map.addLayer(vectorLayerProp);
        map.getView().setMinZoom(EnumLayerName.MinZoom);
        map.getView().animate({
          zoom: EnumLayerName.Zoom as number,
          duration: 250,
        });
        if (layers) {
          layers.forEach((lay) => {
            let remove = map
              .getLayers()
              .getArray()
              .find((layer) => layer.get("name") == lay.name);
            if (remove) {
              map.removeLayer(remove);
            }
          });
        }
      }
    }
  }, [newData]);
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
    <div className="flex">
      <SideBar layerProps={layers} sendValue={sendValue} />
      <div ref={mapElement} style={{ width: "100%", height: "100vh" }}>
        <Popover popVal={popVal} />
      </div>
    </div>
  );
}

export default MapView;
