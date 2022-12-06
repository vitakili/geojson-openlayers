export interface IPopupProps {
  OBJEKT?: String;
  NAZEV?: String;
  ID_ZAST?: Number;
  ID_PMDP_GPS?: String;
  TYP?: String;
}
export interface ISideBarProps {
  id: number;
  name: string;
  url: string;
  attributions: string;
  params: {
    LAYERS: string;
  };
  zoom: number;
  minZoom: number;
}

// export type TypeLayerName = "Mhd zastávky Plzeň";
export enum EnumLayerName {
  Name = "Mhd zastávky Plzeň",
  Zoom = 12,
  MinZoom = 10,
}
export interface ILayerName {
  layerName: EnumLayerName;
}
