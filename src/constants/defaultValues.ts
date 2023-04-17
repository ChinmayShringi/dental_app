interface SkeletonPlaceholderProps {
  duration: number;
  animationType: string;
  animationDirection: string;
  boneColor: string;
  highlightColor: string;
}

export const skeletonPlaceholderProps: SkeletonPlaceholderProps = {
  duration: 1200,
  animationType: 'shiver',
  animationDirection: 'horizontalRight',
  boneColor: '#E1E9EE',
  highlightColor: '#F2F8FC',
};

interface LocationTrackingProps {
  LOCATION_TASK_NAME: string;
  TASK_EVENT_NAME: string;
}

export const locationTrackingProps: LocationTrackingProps = {
  LOCATION_TASK_NAME: 'background-location-tracking',
  TASK_EVENT_NAME: 'new-location-detected',
};

interface RegionCoordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export const regionCoordinates: RegionCoordinates = {
  latitude: 20.6879327,
  longitude: 72.9511871,
  latitudeDelta: 35,
  longitudeDelta: 35,
};

interface RegionCoordinatesDeltas {
  latitudeDelta: number;
  longitudeDelta: number;
}

export const regionCoordinatesDeltas: RegionCoordinatesDeltas = {
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export const mapStyle: any[] = [];
