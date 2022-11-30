import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

  export const PolygonStyle = new Style({
    fill: new Fill({
        color: 'rgba(71, 166, 255, 1)'
    }),
    stroke: new Stroke({
        color: 'rgba(71, 166, 255, 1)',
        width: 5,
        lineDash: [5,10]
    })
});