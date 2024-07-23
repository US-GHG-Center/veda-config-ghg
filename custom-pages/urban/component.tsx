import React from '$veda-ui/react';
import styled from '$veda-ui/styled-components';
import { Basemap } from '$veda-ui-scripts/components/common/map/style-generators/basemap';
import Map from '$veda-ui-scripts/components/common/map';
import { DEFAULT_MAP_STYLE_URL } from '$veda-ui-scripts/components/common/mapbox/map-options/basemaps';
const Carto = styled.div`
  position: relative;
  flex-grow: 1;
  height: 800px;
`;

const mapOptions = {
  style: DEFAULT_MAP_STYLE_URL,
  logoPosition: 'bottom-left',
  trackResize: true,
  pitchWithRotate: false,
  dragRotate: false,
  zoom: 1,
  center: [0,0]
}

export default function UrbanMap(){
  return (<Carto id="carto-box">
    <Map
      id={'test-custom'}
      mapOptions={mapOptions}
    >
    <Basemap basemapStyleId='satellite' />
  </Map>
</Carto>)
}