module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'react' }],
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-syntax-jsx'
    ],
  };
};
