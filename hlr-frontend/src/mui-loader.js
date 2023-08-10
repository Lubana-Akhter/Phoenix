// MuiComponents.js
import React from 'react';

export function muiMaterial(componentName) {
  const component = React.lazy(() => import(`@mui/material/${componentName}`));
  return component;
}
export function muiIcon(IconName) {
  const icon = React.lazy(() => import(`@mui/icons-material/${IconName}`));
  return icon;
}
export function emotionReact(EmotionReact) {
  const emotion = React.lazy(() => import(`@emotion/react/${EmotionReact}`));
  return emotion;
}
export function emotionStyled(EmotionStyled) {
  const emotion = React.lazy(() => import(`@emotion/styled/${emotionStyled}`));
  return emotion;
}