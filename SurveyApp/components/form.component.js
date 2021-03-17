import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Divider, Datepicker, Icon, Layout, Text, TopNavigation, TopNavigationAction,SelectGroup, Input ,Autocomplete, AutocompleteItem, IndexPath, Select, SelectItem } from '@ui-kitten/components';

const cities = [
  { title: 'Ankara' },
  { title: 'Istanbul' },
  { title: 'New York' },
];

const genders = [
  'Male',
  'Female',
];

const vaccines = [
  'BNT162b2/COMIRNATY Tozinameran (INN)',
  'AZD1222',
  'Covishield (ChAdOx1_nCoV19)',
  'SARS-CoV-2 Vaccine (VeroCell), Inactivated (lnCoV)',
  'SARS-CoV-2 Vaccine (VeroCell), Inactivated',
  'mRNA-1273',
  'Ad26.COV2.S',
  'Ad5-nCoV',
  'EpiVacCorona',
  'Recombinant Novel Coronavirus Vaccine（CHOCell)',
  'SARS-CoV-2 Vaccine, Inactivated (Vero Cell)',
  'Inactivated SARS-CoV-2 Vaccine (Vero Cell)',

];

const sideEffects = {
  'Vaccine Area': [
    'Pain',
    'Redness',
    'Swelling',
  ],
  'Body': [
    'Tiredness',
    'Headache',
    'Muscle pain',
    'Chills',
    'Nausea',
    'Fever'
  ],
};

const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline'/>
);

export const FormScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const onSelect = (index) => {
    setCity(cities[index].title);
  };

  const onChangeText = (query) => {
    setCity(query);
    setData(cities.filter(item => filter(item, query)));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
    />
  );

  const renderSelect = (title) => (
    <SelectItem title={title}/>
  );

  const renderGroup = (title) => (
    <SelectGroup title={title}>
      {sideEffects[title].map(renderOption)}
    </SelectGroup>
  );

  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [birthday, setDate] = React.useState(new Date());
  const [city, setCity] = React.useState(null);
  const [data, setData] = React.useState(cities);
  const [selectedGender, setGenderIndex] = React.useState( new IndexPath(0));
  const [selectedVaccine, setVacccineIndex] = React.useState(new IndexPath(0));
  // const [selectedEffect, setEffectIndex] = React.useState([new IndexPath(0, 0),  new IndexPath(1, 1),]);
  
  const max = new Date();
  const min =  new Date(max.getFullYear() -100, max.getMonth(), max.getDate());
  const displayGender = genders[selectedGender.row];
  const displayVaccine = vaccines[selectedVaccine.row];
  // const displaySideEffect = selectedEffect.map(index => {
  //   const title = Object.keys(sideEffects)[index.section];
  //   console.log(title)
  //   return sideEffects[title][index.row];
  // });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>COVID-19 SURVEY</Text>
        <Input
          value={name}
          label='Name'
          placeholder='Your name'
          caption='Cannot be left empty.'
          captionIcon={AlertIcon}
          onChangeText={nextValue => setName(nextValue)}
        />
        <Input
          value={surname}
          label='Surname'
          placeholder='Your surname'
          caption='Cannot be left empty.'
          captionIcon={AlertIcon}
          onChangeText={nextValue => setSurname(nextValue)}
        />
        <Autocomplete
          label='City'
          placeholder='Your city'
          value={city}
          onSelect={onSelect}
          caption='Cannot be left empty.'
          captionIcon={AlertIcon}
          onChangeText={onChangeText}>
          {data.map(renderOption)}
        </Autocomplete>
        <Select
          label='Gender'
          caption='Cannot be left empty.'
          captionIcon={AlertIcon}
          style={styles.selector}
          placeholder='Default'
          value={displayGender}
          selectedIndex={selectedGender}
          onSelect={index => setGenderIndex(index)}>
          {genders.map(renderSelect)}
        </Select>
        <Select
          label='Vaccine Type'
          caption='Cannot be left empty.'
          captionIcon={AlertIcon}
          style={styles.selector}
          placeholder='Default'
          value={displayVaccine}
          selectedIndex={selectedVaccine}
          onSelect={index => setVacccineIndex(index)}>
          {vaccines.map(renderSelect)}
        </Select>
        {/* <Select
          label='Side Effects'
          caption='Cannot be left empty.'
          multiSelect={true}
          captionIcon={AlertIcon}
          style={styles.selector}
          placeholder='Default'
          value={displaySideEffect.join(',')}
          selectedIndex={selectedEffect}
          onSelect={index => setEffectIndex(index)}>
        {Object.keys(sideEffects).map(renderGroup)}
        </Select> */}
        <Datepicker
          style={styles.picker}
          label='Birth Date'
          caption='Cannot be left empty.'
          captionIcon={AlertIcon}
          placeholder='Your Birthday'
          date={birthday}
          min={min}
          max={max}
          onSelect={nextDate => setDate(nextDate)}
        />

        
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selector:{
    width: 200
  }
    
  
});