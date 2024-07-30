import React, { useState } from '$veda-ui/react';
import styled from '$veda-ui/styled-components';
import { glsp, themeVal } from '$veda-ui/@devseed-ui/theme-provider';
import { veda_faux_module_datasets } from '$veda-ui-scripts/data-layer/datasets';
import Map, { MapControls } from '$veda-ui-scripts/components/common/map';
import { Basemap } from '$veda-ui-scripts/components/common/map/style-generators/basemap';
import { LayerLegend, LayerLegendContainer } from '$veda-ui-scripts/components/common/map/layer-legend';
import { Layer } from '$veda-ui-scripts/components/exploration/components/map/layer';
import { TimelineDatePicker as DatePicker } from '$veda-ui-scripts/components/exploration/components/timeline/timeline-datepicker';
import { getDatasetLayers, reconcileDatasets } from '$veda-ui-scripts/components/exploration/data-utils-no-faux-module';
import {
  NavigationControl,
  ScaleControl
} from '$veda-ui-scripts/components/common/map/controls';
import MapCoordsControl from '$veda-ui-scripts/components/common/map/controls/coords';
import useThemedControl from '$veda-ui-scripts/components/common/map/controls/hooks/use-themed-control';

import InteractiveMarkerLayer from './custom-layer';


const Carto = styled.div`
  position: relative;
  grid-column: 1 / -1;
  height: 800px;
`;

const DatePickerWrapper = styled.div`
  background-color: white;
  padding: ${glsp(0.5)};
  border-radius: ${themeVal('shape.rounded')};
  border-radius: 
`

const PanelWrapper = styled.div`
  background-color: white;
  padding: ${glsp(0.5)};
  border-radius: ${themeVal('shape.rounded')};
  width: 250px;
`;

// Use Mapbox control styles
function DatePickerControl(props) {
  const { position, ...rest } = props
  useThemedControl(
    () => <DatePickerWrapper><DatePicker {...rest} /></DatePickerWrapper>,
    {
      position
    }
  );
  return null;
}

function Panel({selectedFeature}) {
  return <PanelWrapper>
  {selectedFeature && <div>{JSON.stringify(selectedFeature.properties)}</div>}
  {!selectedFeature && <div>Please select a feature by clicking a marker.</div>}
</PanelWrapper>
}


function PanelControl(props) {
  const { position, ...rest } = props
  useThemedControl(
    () => <Panel {...rest} />,
    {
      position
    }
  );
  return null;
}

export default function UrbanMap(){
  const [selectedDate, setSelectedDate] = useState(new Date('2022-02-03'));
  const [selectedFeature, setSelectedFeature] = useState(null);
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
            onClick={(feature)=> {setSelectedFeature(feature)}}
          />
          <LayerLegendContainer>
            <LayerLegend
              id={layerToDisplay.data.id}
              title={layerToDisplay.data.name}
              description={layerToDisplay.data.description}
              {...layerToDisplay.data.legend}
            />
            </LayerLegendContainer>
        <MapControls>
          <ScaleControl />
          <NavigationControl position='top-left' />
          <MapCoordsControl />
          <DatePickerControl 
          triggerHeadReference='Selected Date '
          selectedDay={selectedDate}
          onConfirm={(d) => {
            if (!d) return;
            setSelectedDate(new Date(d));
          }}
          disabled={false}
          tipContent={'some content'}
          position='top-right'
          />
          <PanelControl selectedFeature={selectedFeature} position='bottom-left' />
        </MapControls>
      </Map>
      
  </Carto>)
}