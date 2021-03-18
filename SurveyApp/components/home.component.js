import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Divider, View, Image, Text, Layout, TopNavigation } from '@ui-kitten/components';
import { NeuView, NeuButton } from "neumorphism-ui";
import { ScrollView } from 'react-native-gesture-handler';

export const HomeScreen = ({ navigation }) => {

  const navigateForm = () => {
    navigation.navigate('Form');
  };

  return (
    <ScrollView style={{ width:'100%',height:'100%',backgroundColor:'#e0e5ec' }}>
      <NeuView containerStyle={{ marginTop: 30 }} style={{ height: 700, width: '100%', borderRadius: 50 }} contentStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ opacity: 0.4, margin: 20, fontSize: 70, fontWeight:'200' }}>WELCOME</Text>
        <Text style={{ opacity: 0.4, margin: 20, fontSize: 30, fontWeight:'200' }}>TO COVID-19 SURVEY</Text>
        <Text style={{ opacity: 0.4, margin: 20, fontSize: 13, fontWeight:'400', textAlign: 'center'}} >MADE BY {"\n"}{"\n"}Ziya Mukhtarov {"\n"} Mokhlaroyim Raupova {"\n"} Javid Baghirov {"\n"} Alper Sarı</Text>
        <Text style={{ opacity: 0.4, margin: 50, fontSize: 20, fontWeight:'300'}} >Please click below to start the survey.</Text>
        <Button  appearance='outline' status='basic'accessible={true}
          accessibilityLabel='formInitBtn' 
          onPress={navigateForm} 
          size='large'>GET STARTED
        </Button>
      </NeuView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
    row: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'pink', margin: 10, borderRadius:15,  },
    text: {
      margin: 10,
    },
    button: {
      margin: 2,
    },
  });