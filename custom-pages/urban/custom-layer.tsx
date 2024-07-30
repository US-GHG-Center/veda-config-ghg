import { useCallback, useEffect, useMemo, useState } from '$veda-ui/react';
import {
  AnyLayer,
  AnySourceImpl,
  VectorSourceImpl
} from '$veda-ui/mapbox-gl';
import { useTheme } from '$veda-ui/styled-components';
import { endOfDay, startOfDay } from 'date-fns';
import centroid from '$veda-ui/@turf/centroid';
import { LngLatLike } from '$veda-ui/react-map-gl';
import { Feature } from '$veda-ui/geojson';

import { BaseGeneratorParams } from '$veda-ui-scripts/components/common/map/types';
import useMapStyle from '$veda-ui-scripts/components/common/map/hooks/use-map-style';
import {
  requestQuickCache
} from '$veda-ui-scripts/components/common/map/utils';
import useFitBbox from '$veda-ui-scripts/components/common/map/hooks/use-fit-bbox';
import useLayerInteraction from '$veda-ui-scripts/components/common/map/hooks/use-layer-interaction';
import { MARKER_LAYOUT } from '$veda-ui-scripts/components/common/map/hooks/use-custom-marker';
import useMaps from '$veda-ui-scripts/components/common/map/hooks/use-maps';
import useGeneratorParams from '$veda-ui-scripts/components/common/map/hooks/use-generator-params';

import {
  ActionStatus,
  S_FAILED,
  S_LOADING,
  S_SUCCEEDED
} from '$veda-ui-scripts/utils/status';
import { userTzDate2utcString } from '$veda-ui-scripts/utils/date';

export interface VectorTimeseriesProps extends BaseGeneratorParams {
  id: string;
  stacCol: string;
  date: Date;
  sourceParams?: Record<string, any>;
  zoomExtent?: number[];
  bounds?: number[];
  onStatusChange?: (result: { status: ActionStatus; id: string }) => void;
  isPositionSet?: boolean;
  stacApiEndpoint?: string;
  filePath: string;
  onClick: (feature: Feature)=> void;
}


export default function InteractiveMarkerLayer(props: VectorTimeseriesProps) {
  const {
    id,
    date,

    zoomExtent,
    bounds,
    onStatusChange,
    isPositionSet,
    hidden,
    opacity,
    filePath, 
    onClick
  } = props;

  const { current: mapInstance } = useMaps();
  const [sourceData, setSourceData] = useState(null)

  const theme = useTheme();
  const { updateStyle } = useMapStyle();

  const generatorId = `custom-interactive-marker`;

  const [minZoom, maxZoom] = [18,20];
  const vectorOpacity = 1;
  //
  // Get the tiles url

  const generatorParams = useGeneratorParams({generatorOrder: 10000, hidden: false, opacity: vectorOpacity});
  //
  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        
        const data = await requestQuickCache<any>({
          url: filePath,
          method: 'GET',
          controller
        });
        console.log('success')
        console.log(data);
        setSourceData(data);

        onStatusChange?.({ status: S_SUCCEEDED, id });
      } catch (error) {
        if (!controller.signal.aborted) {
          setSourceData(null);
          onStatusChange?.({ status: S_FAILED, id });
        }
        return;
      }
    }

    load();

    return () => {
      controller.abort();
    };
  }, [id, onStatusChange]);


  useEffect(() => {
    if (!sourceData ) return;

    const sources: Record<string, AnySourceImpl> = {
      [id]: {
        type: 'geojson',
        data: sourceData
      } as VectorSourceImpl
    };
    console.log(sourceData)

    const layers = [
        {
            type: 'symbol',
            id: `${id}-points`,
            source: id,
            layout: {
              ...(MARKER_LAYOUT as any),
              visibility: hidden ? 'none' : 'visible'
            },
            paint: {
              'icon-color': theme.color?.infographicB,
              'icon-halo-color': theme.color?.base,
              'icon-halo-width': 1
            },
            maxzoom: minZoom,
            metadata: {
              layerOrderPosition: 'markers'
            }
          }
        
    ].filter(Boolean) as AnyLayer[];

    updateStyle({
      generatorId,
      sources,
      layers,
      params: generatorParams
    });
    // sourceParams not included, but using a stringified version of it to
    // detect changes (haveSourceParamsChanged)
    // `theme` will not change throughout the app use
  }, [
    id,
    updateStyle,
    date,
    sourceData,
    minZoom,
    maxZoom,
    hidden,
    opacity,
    
    
    generatorId
  ]);

  //
  // Cleanup layers on unmount.
  //
  useEffect(() => {
    return () => {
      updateStyle({
        generatorId,
        sources: {},
        layers: []
      });
    };
  }, [updateStyle, generatorId]);

  //
  // Listen to mouse events on the markers layer
  //
  const onPointsClick = useCallback(
    (features) => {
      const extractedFeat = {
        type: 'Feature',
        ...features[0]
      } as Feature<any>;

      // const center = centroid(extractedFeat).geometry.coordinates as LngLatLike;

      // // Zoom past the min zoom centering on the clicked feature.
      // mapInstance?.flyTo({
      //   zoom: minZoom,
      //   center
      // });
      onClick(extractedFeat);
    },
    [mapInstance, minZoom]
  );

  useLayerInteraction({
    layerId: `${id}-points`,
    onClick: onPointsClick
  });

  //
  // FitBounds when needed
  //
  // useFitBbox(!!isPositionSet, bounds, featuresBbox);

  return null;
}
