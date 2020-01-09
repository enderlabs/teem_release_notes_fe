import * as native from '../native/sender';
import * as chrome from '../chrome/messenger';
import * as o365 from '../o365/messenger';
import sendGoogleAnalytics from '../chrome/google_analytics';
import sendOutlookAnalytics from './outlook_analytics';

function callForType(chromeCB, o365CB, nativeCB) {
  switch (PLUGIN_TYPE) {
    case 'O365':
      o365CB();
      break;
    case 'NATIVE':
      nativeCB();
      break;
    case 'CHROME':
    default:
      chromeCB();
  }
}

export function extendPluginWidth() {
  callForType(
    chrome.extendPluginWidth,
    () => ({}),
    native.extendPluginWidth,
  );
}

export function contractPluginWidth() {
  callForType(
    chrome.contractPluginWidth,
    () => ({}),
    native.contractPluginWidth,
  );
}

export function addItemToHost(email, name, office, skipLocation = false) {
  callForType(
    () => chrome.addItemToDom(email, name),
    () => o365.setRoom(office, name, email, skipLocation),
    () => native.setNativeRoom('', email), // TODO: add the name back in once the wrapper is updated to handle it.
  );
}

export function removeItemFromHost(email, name = '', office, inOutlookPopup) {
  callForType(
    () => chrome.removeItemFromDom(email, name),
    () => o365.removeEmailO365(office, inOutlookPopup, name, email),
    () => native.removeNativeRoom(name, email),
  );
}

export function sendAnalytics(category, action, label) {
  callForType(
    () => sendGoogleAnalytics(category, action, label),
    () => sendOutlookAnalytics(category, action, label),
    () => sendOutlookAnalytics(category, action, label),
  );
}
