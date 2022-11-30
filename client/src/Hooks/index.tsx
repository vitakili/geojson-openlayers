import { Pixel } from "ol/pixel";
import { Map, View } from "ol";

export const displayFeatureInfo = function (pixel: Pixel, map: Map) {
    const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
      return feature;
    });
    if (feature) {
      return feature.getProperties();
    }
  };