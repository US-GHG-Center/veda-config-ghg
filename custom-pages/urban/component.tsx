import React, { useState } from '$veda-ui/react';
import styled from '$veda-ui/styled-components';
import format from '$veda-ui/date-fns/esm/format';
import { veda_faux_module_datasets } from '$veda-ui-scripts/data-layer/datasets';
import MapBlock from '$veda-ui-scripts/components/common/blocks/block-map';
import Map, { MapControls } from '$veda-ui-scripts/components/common/map';
import { Basemap } from '$veda-ui-scripts/components/common/map/style-generators/basemap';
import { LayerLegend, LayerLegendContainer } from '$veda-ui-scripts/components/common/map/layer-legend';
import { Layer } from '$veda-ui-scripts/components/exploration/components/map/layer';
import { TimelineDatePicker as DatePicker } from '$veda-ui-scripts/components/exploration/components/timeline/timeline-datepicker';
import { getDatasetLayers, reconcileDatasets } from '$veda-ui-scripts/components/exploration/data-utils-no-faux-module';

import InteractiveMarkerLayer from './custom-layer';


const Carto = styled.div`
  position: relative;
  grid-column: 1 / -1;
  height: 800px;
`;

const StyledMapBlock = styled(MapBlock)`
  height: 800px !important;
`

const DatePickerWrapper = styled.div`
  position: absolute;
  top: 100px;
  right: 100px;
  z-index: 10000;
  background: white;
  padding: 10px;
`

export default function UrbanMap(){
  const [selectedDate, setSelectedDate] = useState(new Date('2022-02-03'));
  const layers = getDatasetLayers(veda_faux_module_datasets);
  const layerToDisplay = reconcileDatasets(['oco2-dryair-column'], layers, [])[0];
  
  return (
    <Carto id="carto-box">
      <Map id="test-map">
        <Basemap basemapStyleId={'satellite'} />
        <Layer
            key={'oco2-dryair-column'}
            id={layerToDisplay.data.id}
            dataset={layerToDisplay}
            selectedDay={new Date(selectedDate)}
          />
          <InteractiveMarkerLayer
            id="interactive-marker-layer"
            filePath = '/test-data.geojson'
            onClick={(feature)=> {console.log(feature)}}
          />
          <LayerLegendContainer>
            <LayerLegend
              id={layerToDisplay.data.id}
              title={layerToDisplay.data.name}
              description={layerToDisplay.data.description}
              {...layerToDisplay.data.legend}
            />
            </LayerLegendContainer>
      </Map>
    <DatePickerWrapper>
      <DatePicker 
        triggerHeadReference='Selected Date '
        selectedDay={selectedDate}
        onConfirm={(d) => {
          if (!d) return;
          setSelectedDate(new Date(d));
        }}
        disabled={false}
        tipContent={'some content'}
        />
    </DatePickerWrapper>
  </Carto>)
}