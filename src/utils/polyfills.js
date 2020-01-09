/* Add the required Polyfills here */
import 'core-js/features/array';
import 'core-js/features/string';
import 'core-js/features/symbol';
import 'core-js/features/object/assign';
import 'core-js/features/symbol/iterator';
import 'core-js/features/promise';
import 'core-js/features/number/is-nan';

window.URLSearchParams = require('url-search-params'); // the core-js doesn't have this polyfill yet
