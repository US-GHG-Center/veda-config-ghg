export const themeLandingPageIds = [
  "air_quality",
  "agriculture",
  "biodiversity",
  "disasters",
  "energy",
  "greenhouse_gases",
  "sea_level_rise",
  "wildfires",
  "water_resources",
];

export const teachToolsStoryIds = [
  "earth_observation_trainings",
  "globe_protocol_etraining",
  "stem_group",
];

export const visitLocationStoryIds = [
  "nasa_headquarters",
  "si_nmnh"
];

export const visitLocationFeaturesStoryIds = {
  "nasa_headquarters" : [
    "eyes_on_earth",
    "hyperwall",
    "earth_pulse",
    "immersive_earth",
  ],
  "si_nmnh" : [
    "eyes_on_earth",
    "si_hyperwall",
    "hometown_dashboard",
    "unveiling_time",
  ]
};

// take the unique ids from the object above
export const visitLocationAllFeaturesStoryIds = [
  ...new Set(Object.values(visitLocationFeaturesStoryIds).flat())
];

export const airQualityStoryIds = [
  'air_quality_and_covid19',
  'extra_air_pollution_burden',
  'exploring_nasa_aq_gis' 
];

export const agricultureStoryIds = [
];

export const biodiversityStoryIds = [
  'introduction_biodiversity'
];

export const disastersStoryIds = [
];

export const energyStoryIds = [
  "introduction_energy"
];

export const greenhouseGasesStoryIds = [
  "introduction_greenhouse_gases"
];

export const seaLevelRiseStoryIds = [
  "introduction_sea_level_rise"
];

export const wildfiresStoryIds = [
  "introduction_wildfires"
];

export const waterResourcesStoryIds = [
  "introduction_water_resources"
];
