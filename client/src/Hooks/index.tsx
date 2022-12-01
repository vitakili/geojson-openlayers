import { Pixel } from "ol/pixel";
import { Map, View } from "ol";
import { transform } from "ol/proj";

export const displayFeatureInfo = function (pixel: Pixel, map: Map) {
  const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
    return feature;
  });
  if (feature) {
    return feature.getProperties();
  }
};

export const displayCoords = function (pixel: Pixel, map: Map) {
  const clickedCoord = map.getCoordinateFromPixel(pixel);
  const transormedCoord = transform(clickedCoord, "EPSG:3857", "EPSG:4326");
  return transormedCoord;
};
