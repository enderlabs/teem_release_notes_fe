import * as messages from '../communication';
import * as native from '../../native/sender';
import * as chrome from '../../chrome/messenger';

global.ReactGA = {
  initialize: jest.fn(),
  ga: jest.fn(),
  event: jest.fn(),
  pageview: jest.fn(),
};

describe('communication utility', () => {
  it('extendPluginWidth in native', () => {
    global.PLUGIN_TYPE = 'NATIVE';
    native.extendPluginWidth = jest.fn();
    messages.extendPluginWidth();
    expect(native.extendPluginWidth).toHaveBeenCalled();
  });

  it('extendPluginWidth in chrome', () => {
    global.PLUGIN_TYPE = 'CHROME';
    chrome.extendPluginWidth = jest.fn();
    messages.extendPluginWidth();
    expect(native.extendPluginWidth).toHaveBeenCalled();
  });

  it('contractPluginWidth in native', () => {
    global.PLUGIN_TYPE = 'NATIVE';
    native.contractPluginWidth = jest.fn();
    messages.contractPluginWidth();
    expect(native.contractPluginWidth).toHaveBeenCalled();
  });

  it('contractPluginWidth in chrome', () => {
    global.PLUGIN_TYPE = 'CHROME';
    chrome.contractPluginWidth = jest.fn();
    messages.contractPluginWidth();
    expect(native.contractPluginWidth).toHaveBeenCalled();
  });
});
