import * as styledComponents from 'styled-components';

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

export interface IThemeInterface {
  backgroundColor: string,
  color0: string,
  color1: string,
  color2: string,
  color3: string,
}

export const theme = {
  backgroundColor: '#286DA8',
  color0: '#286DA8',
  color1: '#CD5360',
  color2: '#B37D4E',
  color3: '#438496',
};

export default styled;
export { css, injectGlobal, keyframes, ThemeProvider };
