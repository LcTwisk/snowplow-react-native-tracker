/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import Tracker from '@snowplow/react-native-tracker';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  Tracker.initialize({
    // required
    endpoint: 'test-endpoint',
    method: 'post',
    protocol: 'https',
    namespace: 'namespace',
    appId: 'my-app-id',

    // optional
    setPlatformContext: true,
    setBase64Encoded: true,
    setApplicationContext:true,
    setLifecycleEvents: true,
    setScreenContext: true,
    setSessionContext: false,
    foregroundTimeout: 10, // set unreasonably low for testing purposes
    backgroundTimeout: 10, // set unreasonably low for testing purposes
    checkInterval: 5,
    setInstallEvent: true
    });

    Tracker.setSubjectData({
      userId: 'test-userId',
      screenWidth: 123,
      screenHeight: 456,
      colorDepth: 20,
      timezone: 'Europe/London',
      language: 'en',
      ipAddress: '123.45.67.89',
      useragent: '[some-user-agent-string]',
      networkUserId: '5d79770b-015b-4af8-8c91-b2ed6faf4b1e',
      domainUserId: '5d79770b-015b-4af8-8c91-b2ed6faf4b1e',
      viewportWidth: 123,
      viewportHeight: 456
    });

  Tracker.trackScreenViewEvent({screenName: 'someName'}, []);
  const onPressSendEvent = () => {
    Tracker.trackSelfDescribingEvent({schema: 'iglu:com.acme/event/jsonschema/1-0-0', data: {'message': 'hello world'}}, []);
    Tracker.trackStructuredEvent({category: 'category', action: 'action', label: 'label', property: 'property', value: 50.00}, []);
    Tracker.trackStructuredEvent({category: 'test2', action: 'action'}, []);
    Tracker.trackPageViewEvent({pageUrl: 'acme.com', pageTitle: 'some title', pageReferrer: 'refr.com'}, []);
    Tracker.trackScreenViewEvent({screenName: 'someOtherName'}, []);
  }
  const onPressShowMeSomeWarnings = () => {
    Tracker.trackSelfDescribingEvent({}, []);
    Tracker.trackStructuredEvent({}, []);
    Tracker.trackPageViewEvent({}, []);
    Tracker.trackScreenViewEvent({}, []);
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
              <Button
                  onPress={onPressSendEvent}
                  title="Send event"
                  color="#841584"
                  accessibilityLabel="Send an event"
              />
              <Button
                  onPress={onPressShowMeSomeWarnings}
                  title="Show me some warnings"
                  color="#ADFF2F"
                  accessibilityLabel="Show me some warnings"
              />
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
