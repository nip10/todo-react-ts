import * as styledComponents from 'styled-components';

const {
  default: styled,
  createGlobalStyle,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<{}>;

export const colors = {
  backgroundColor: '#286DA8',
}

export default styled;
export { createGlobalStyle };
