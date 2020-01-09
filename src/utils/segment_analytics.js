import axios from 'axios';
import _ from 'lodash';
import moment from 'moment-timezone';
import uuid from 'uuid';
import { getTeemData } from './local_storage';
import { getBrowserLocale } from '../i18n/helpers';

// btoa is the javascript function for base64 encoding,
// an authorization requirement for the segment write key.
// https://segment.com/docs/sources/server/http/
const encodedWriteKey = btoa(SEGMENT_WRITE_KEY);
const segmentAppId = uuid();
const userLanguage = getBrowserLocale();
let segmentSessionId = null;
let segmentSessionStartTime = null;
let browserTimezoneOffset = null;

const header = {
  'Content-Type': 'application/json',
  Authorization: `Basic ${encodedWriteKey}`,
};

const identifyURL = 'https://api.segment.io/v1/identify';
const trackURL = 'https://api.segment.io/v1/track';


function initSession() {
  segmentSessionId = uuid();
}

function sendSegmentAppId() {
  const identifyData = {
    userId: 'staticID',
  };
  axios.post(identifyURL, identifyData, {
    headers: header,
  });

  const appInitializedData = {
    event: 'AppInitialized',
    userId: 'staticID',
    properties: {
      app_session_id: segmentAppId,
      lang: userLanguage,
      plugin: {
        env: PLUGIN_TYPE,
        version: APP_VERSION,
      },
    },
  };
  axios.post(trackURL, appInitializedData, {
    headers: header,
  });
  initSession();
}

function setSegmentSessionStartTime() {
  segmentSessionStartTime = moment.tz().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
  browserTimezoneOffset = moment(segmentSessionStartTime).format('Z');
}
// RULES FOR THE TIME CHECK
// - If it's the first time setting the time, send the analytics.
// - If NOW is more than 10 minutes from the last time setting the time, reset the
// time to NOW and send the analytics with the time and a new segmentSessionId.
function shouldStartNewSession() {
  const segmentSessionStartCheck = moment.tz().subtract(10, 'minute').format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
  const userId = getTeemData('user_id');
  if ((segmentSessionStartTime < segmentSessionStartCheck) && !_.isNil(userId)) {
    initSession();
    setSegmentSessionStartTime();
    return true;
  }
  setSegmentSessionStartTime();
  return false;
}

function sendAnalytics() {
  const userId = getTeemData('user_id');
  const companyId = getTeemData('company_id');
  const autoLaunch = getTeemData('AUTO_LAUNCH');
  const sessionStartedData = {
    event: 'SessionStarted',
    userId: 'staticID',
    properties: {
      auto_open: autoLaunch,
      app_session_id: segmentAppId,
      browser_timezone_offset: browserTimezoneOffset,
      company_id: companyId,
      plugin: {
        env: PLUGIN_TYPE,
        version: APP_VERSION,
      },
      session_id: segmentSessionId,
      session_started_at: segmentSessionStartTime,
      user_id: userId,
    },
  };

  if (!_.isNil(userId)) {
    axios.post(trackURL, sessionStartedData, {
      headers: header,
    });
  }
}

export default function sendSegmentAnalytics() {
  if (segmentSessionId) {
    if (!segmentSessionStartTime) {
      setSegmentSessionStartTime();
      sendAnalytics();
    } else if (shouldStartNewSession()) {
      sendAnalytics();
    }
  } else {
    // Per the Data Team requirements, send up Segment App ID before anything else happens.
    // That way they know how many times the plugin is rendered compared to how many times the
    // plugin is interacted with.
    sendSegmentAppId();
  }
}

// What follows adds listener to plugin window to know when first interactions by user are
// with plugin. We refer to the first user interaction with the plugin as "popping the bubble".
window.addEventListener('click', sendSegmentAnalytics, false);
