import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';

export const HomeScreen = ({ navigation }) => {

  const navigateForm = () => {
    navigation.navigate('Form');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='COVID-19 SURVEY' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button key='formInitBtn' onPress={navigateForm}>OPEN SURVEY</Button>
      </Layout>
    </SafeAreaView>
  );
};