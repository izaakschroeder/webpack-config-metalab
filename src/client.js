import compose from 'lodash/flowRight';
import postcss from 'webpack-config-postcss';
import expose from 'webpack-config-expose';

export default compose(
  expose,
  postcss
);
