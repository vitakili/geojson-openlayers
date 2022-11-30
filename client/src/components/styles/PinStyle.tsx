import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import LocationPin from '../../assets/location-pin.png';

export const pinStyle = (): Style => {
    return new Style({
      image: new Icon({
        anchor: [30, 50],
        scale: 1,
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: LocationPin,
      }),
    });
  };