require('core-js');

const testContext = require.context('../src', true, /\.spec\.ts/);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

const modules = requireAll(testContext);
