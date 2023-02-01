import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import Calendar from './utils/Calendar';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const calendar = useRef(new Calendar()).current;

  const startAlarm = async () => {
    let time = new Date().getTime();
    const date = new Date(time + 1 * 60 * 1000);
    calendar.addEvent(date);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={startAlarm}
          style={styles.btn}>
          <Text>Создать событие</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  btn: {
    backgroundColor: 'red',
    padding: 16,
  },
});

export default App;
