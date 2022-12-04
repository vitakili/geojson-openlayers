import { Collection, Feature } from "ol";
import { Geometry } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { TileWMS } from "ol/source";
import VectorSource from "ol/source/Vector";
import { useEffect } from "react";
import { PolygonStyle } from "../styles/PolygonStyle";

// interface IPropTypes {
//     features?: Feature<Geometry>[] | Collection<Feature<Geometry>> | undefined;
// }

export const vectorLayer = (features: Feature<Geometry>[] | undefined) => {
  console.log(features);
  return new VectorLayer({
    source: new VectorSource({
      features: features,
    }),
    style: PolygonStyle,
  });
};

export const krajWmsKatLayer = new TileLayer({
    source: new TileWMS({
      url: "http://services.cuzk.cz/wms/wms.asp?service=WMS",
      attributions:
        '<a href="http://www.cuzk.cz" target="blank"> Czech Office for Surveying, Mapping and Cadastre</a>',
      params: {
        LAYERS:
          "parcelni_cisla,obrazy_parcel,RST_KMD,hranice_parcel,DEF_BUDOVY,RST_KN,dalsi_p_mapy,prehledka_kat_prac,prehledka_kat_uz,prehledka_kraju-linie",
      },
    }),
  });

export const nemovWmsKatLayer = new TileLayer({
  source: new TileWMS({
    url: "http://services.cuzk.cz/wms/wms.asp?service=WMS",
    attributions:
      '<a href="http://www.cuzk.cz" target="blank"> Czech Office for Surveying, Mapping and Cadastre</a>',
    params: {
      layers:
        "parcelni_cisla,obrazy_parcel,RST_KMD,RST_KN,hranice_parcel,dalsi_p_mapy",
    },
  }),
});