import { NativeModules } from 'react-native';

const { RNSnowplowTracker } = NativeModules;

function _applyDefaults(input, defaults) {
  let combined = input;
  Object.keys(defaults).forEach((key) => {
    if(!(key in combined)) {
      combined[key] = defaults[key];
      }});
  return combined;
}

export default class Tracker {

  static initialize(argmap) {

    let defs = {// defaults for optional params
                 method: 'post',
                 protocol: 'https',
                 setPlatformContext : false,
                 setBase64Encoded : false,
                 setApplicationContext : false,
                 setLifecycleEvents : false,
                 setScreenContext : false,
                 setSessionContext : false,
                 foregroundTimeout : 600,
                 backgroundTimeout : 300,
                 checkInterval : 15,
                 setInstallEvent : false}


    if (typeof argmap.endpoint !== 'undefined' && typeof argmap.appId !== 'undefined' && typeof argmap.namespace !== 'undefined' ) {
      return RNSnowplowTracker.initialize(_applyDefaults(argmap, defs));
    } else {
      console.warn("SnowplowTracker: initialize() requires endpoint, namespace and appId parameter to be set")
      return;
    }
  }

  static setSubjectData(argmap) {
    RNSnowplowTracker.setSubjectData(argmap);
  }

    static trackScreenViewEvent(argmap, ctxt=[]) {
                // screenName,
                // screenId,
                // screenType,
                // previousScreenName,
                // previousScreenId,
                // transitionType,
                // contexts: []}) {

    if (typeof argmap.screenName !== 'undefined') {
      return RNSnowplowTracker.trackScreenViewEvent(argmap, ctxt);
    } else {
      console.warn("SnowplowTracker: trackScreenViewEvent() requires screenName parameter to be set");
      return;
    }
  }

  static trackSelfDescribingEvent(argmap, ctxt=[]) {
    if (typeof argmap.schema !== 'undefined' && typeof argmap.data !== 'undefined') {
      return RNSnowplowTracker.trackSelfDescribingEvent(argmap, ctxt);
    } else {
      console.warn("SnowplowTracker: trackSelfDescribingEvent() requires schema and data parameters to be set");
      return;
    }
  }

  static trackStructuredEvent(argmap, ctxt=[]) {

    let defs = {
      property: null,
      label: null
    }

    // RN's Java bridge forces value into double, which throws on null or undefined.
    // Remove 'value' key if null or undefined are found to work around this limitation
    if (argmap['value'] == null) {
      delete(argmap['value'])
    }

    if (typeof argmap.category !== 'undefined' && typeof argmap.action !== 'undefined') {
      return RNSnowplowTracker.trackStructuredEvent(_applyDefaults(argmap, defs), ctxt);
    } else {
      console.warn("SnowplowTracker: trackStructuredEvent() requires category and action parameters to be set");
      return;
    }
  }

  static trackPageViewEvent(argmap, ctxt=[]) {
    if (typeof argmap.pageUrl !== 'undefined') {
      return RNSnowplowTracker.trackPageViewEvent(argmap, ctxt);
    } else {
      console.warn("SnowplowTracker: trackPageViewEvent() requires pageUrl parameter to be set");
      return;
    }
  }
}
