import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Divider, Text, Layout, TopNavigation } from '@ui-kitten/components';

export const HomeScreen = ({ navigation }) => {

  const navigateForm = () => {
    navigation.navigate('Form');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='' alignment='center'/>
      <Divider/>
      <Layout style={styles.row}>
          <Text style={styles.row} category='h1'>WELCOME!</Text>
          <Text style={styles.row} category='h6'>Please click below to start the survey.</Text>
        <Button 
          accessible={true}
          accessibilityLabel='formInitBtn' 
          onPress={navigateForm} 
          size='large'>OPEN SURVEY</Button>
      </Layout>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    row: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: {
    },
  });