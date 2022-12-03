import { Pixel } from "ol/pixel";
import { Feature, Map, Overlay, View } from "ol";
import { transform } from "ol/proj";
import { Point } from "ol/geom";
import { Coordinate } from "ol/coordinate";
import { FeatureLike } from "ol/Feature";

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
  displ: { [x: string]: any; }
) => {
  // on click popup
  const popupContainerElement: HTMLDivElement = document.getElementById(
    "popup-container"
  ) as HTMLDivElement;
  const popupContentElement: HTMLDivElement = document.getElementById(
    "popup-content"
  ) as HTMLDivElement;

  console.log(coords)
  const overlayLayer: Overlay = new Overlay({
    element: popupContainerElement,
    autoPan: true,
  });

  map.addOverlay(overlayLayer);

  const displayFeaturePopup = (pixel: number[]): void => {
    var feature: Feature = map.forEachFeatureAtPixel(pixel, function (feature) {
      return feature;
    }) as Feature;
    if (feature && coords) {
      popupContainerElement.style.display = "block";
      // map.getViewport().style.cursor = "auto";

      popupContentElement.innerHTML = `
      <div id="popup-text">
      <strong>${displ.OBJEKT}</strong><br/>
      <strong>${displ.NAZEV}</strong>
      <p>${coords[0]},${coords[1]}</p>
      </div>
      `;
      overlayLayer.setPosition(coords);
      console.log(overlayLayer);
      map.getView().animate({
        center: coords,
        zoom:15,
        duration: 500,
      });
    } else {
      popupContainerElement.style.display = "none";
      overlayLayer.setPosition(undefined);
      // map.getViewport().style.cursor = "auto";
    }
  };

  map.on("singleclick", (evt) => {
    displayFeaturePopup(map.getEventPixel(evt.originalEvent));
  });
};
