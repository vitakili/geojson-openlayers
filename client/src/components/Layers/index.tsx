import { Feature } from "ol";
import { Geometry } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { TileWMS } from "ol/source";
import VectorSource from "ol/source/Vector";
import { ISideBarProps, EnumLayerName } from "../../Types";
import { PolygonStyle } from "../styles/PolygonStyle";

// interface IPropTypes {
//     features?: Feature<Geometry>[] | Collection<Feature<Geometry>> | undefined;
// }
// interface ICustomProps {
//   layerProps: ISideBarProps;
// }

export const vectorLayer = (features: Feature<Geometry>[] | undefined) => {
  let vectorName:EnumLayerName = EnumLayerName.Name;
  return new VectorLayer({
    properties:{
      name: vectorName,
    },
    source: new VectorSource({
      features: features,
    }),
    style: PolygonStyle,
  });
};

export const tileWmsLayer = (layerProps:ISideBarProps) => {
  return new TileLayer({
    properties:{
      name: layerProps.name,
    },
    source: new TileWMS({
      url: layerProps.url,
      attributions:
        layerProps.attributions,
      params: {
        LAYERS:
          layerProps.params.LAYERS,
      },
    }),
  });
}
