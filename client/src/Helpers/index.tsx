import { Pixel } from "ol/pixel";
import { Map, Overlay } from "ol";
import { transform } from "ol/proj";
import { Point } from "ol/geom";
import { Coordinate } from "ol/coordinate";

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
  return {clickedCoord, transormedCoord};
};

export const handlePopupDisplay = (
  map: Map,
  coords: Coordinate | undefined,
) => {
  // on click popup
  const popupContainerElement: HTMLDivElement = document.getElementById(
    "popup-container"
  ) as HTMLDivElement;

  const overlayLayer: Overlay = new Overlay({
    element: popupContainerElement,
    autoPan: true,
  });

  map.addOverlay(overlayLayer);

  const displayFeaturePopup = (): void => {
    if (coords) {
      overlayLayer.setPosition(coords);
      map.getView().animate({
        center: coords,
        zoom:15,
        duration: 1000,
      });
    } else {
      overlayLayer.setPosition(undefined);
    }
  };

    displayFeaturePopup();
};
