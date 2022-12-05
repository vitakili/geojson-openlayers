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