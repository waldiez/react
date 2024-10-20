export const getFlowViewPort = (data: { [key: string]: unknown }) => {
  let viewport = { zoom: 1, x: 0, y: 0 };
  if (
    'viewport' in data &&
    typeof data.viewport === 'object' &&
    data.viewport &&
    'zoom' in data.viewport &&
    'x' in data.viewport &&
    'y' in data.viewport &&
    typeof data.viewport.zoom === 'number' &&
    typeof data.viewport.x === 'number' &&
    typeof data.viewport.y === 'number'
  ) {
    viewport = data.viewport as {
      zoom: number;
      x: number;
      y: number;
    };
  }
  return viewport;
};
