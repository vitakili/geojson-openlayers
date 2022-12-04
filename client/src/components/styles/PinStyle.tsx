import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import LocationPin from "../../assets/location-pin.png";

export const PinStyle = new Style({
  image: new Icon({
    anchor: [0.5, 50],
    scale: 0.04,
    anchorXUnits: "fraction",
    anchorYUnits: "pixels",
    crossOrigin: 'anonymous',
    src: LocationPin,
  }),
});
