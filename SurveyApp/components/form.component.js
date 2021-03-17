import React from 'react';
import { SafeAreaView,  StyleSheet } from 'react-native';
import { Divider, Datepicker, Icon, Layout, Text, Button, TopNavigation, TopNavigationAction,SelectGroup, Input ,Autocomplete, AutocompleteItem, IndexPath, Select, SelectItem } from '@ui-kitten/components';

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

const sideEffects = [
    'Pain',
    'Redness',
    'Swelling',
    'Tiredness',
    'Headache',
    'Muscle pain',
    'Chills',
    'Nausea',
    'Fever'
];

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
    <TopNavigationAction key='navBtnForm' icon={BackIcon} onPress={navigateBack}/>
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


  const handleUserValidation = (text) => {
    if(text === ''){
      setEmptyName(false);
    }
    const condition = new RegExp('^[a-zA-Z]+$', 'g');
    setEmptyName(condition.test(text))
  }
  const handleSurnameValidation = (text) => {
    if(text === ''){
      setEmptySurname(false);
    }
    const condition = new RegExp('^[a-zA-Z]+$', 'g');
    setEmptySurname(condition.test(text))
  }
  const handleCityValidation = (text) => {
    if(text === ''){
      setEmptyCity(false);
    }
    const condition = new RegExp('^[a-zA-Z]+$', 'g');
    setEmptyCity(condition.test(text))
  }
  const handleSubmit = () =>{
    if(name === '' | surname ==''| city == '' ){
      alert('Fill the fields')
      return
    }
    navigation.navigate('Home');
  }

  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [birthday, setDate] = React.useState(new Date());
  const [city, setCity] = React.useState(null);
  const [data, setData] = React.useState(cities);
  const [selectedGender, setGenderIndex] = React.useState( new IndexPath(0));
  const [selectedVaccine, setVacccineIndex] = React.useState(new IndexPath(0));
  const [selectedEffect, setEffectIndex] = React.useState(new IndexPath(0));
  const [nameEmpty, setEmptyName] = React.useState(true);
  const [surnameEmpty, setEmptySurname] = React.useState(true);
  const [cityEmpty, setEmptyCity] = React.useState(true);
  
  const max = new Date();
  const min =  new Date(max.getFullYear() -100, max.getMonth(), max.getDate());
  const displayGender = genders[selectedGender.row];
  const displayVaccine = vaccines[selectedVaccine.row];
  const displaySideEffect = sideEffects[selectedVaccine.row];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='COVID-19 SURVEY' alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Input
          key='nameInput'
          value={name}
          label='Name'
          placeholder='Your name'
          caption = {nameEmpty ? null: 'Invalid or empty entry' }
          onChangeText={nextValue => setName(nextValue)}
          onEndEditing={(e)=>handleUserValidation(e.nativeEvent.text)}
        />
        <Input
          key='nameInput'
          value={surname}
          label='Surname'
          placeholder='Your surname'
          caption = {surnameEmpty ? null: 'Invalid or empty entry'}
          onChangeText={nextValue => setSurname(nextValue)}
          onEndEditing={(e)=>handleSurnameValidation(e.nativeEvent.text)}
        />
        <Autocomplete
          key='nameInput'
          label='City'
          placeholder='Your city'
          value={city}
          onSelect={onSelect}
          caption = {cityEmpty ? null: 'Cannot be left empty.' }
          onChangeText={onChangeText}
          onEndEditing={(e)=>handleCityValidation(e.nativeEvent.text)}>
          {data.map(renderOption)}
          
        </Autocomplete>
        <Select
          key='genderSelection'
          label='Gender'
          style={styles.selector}
          placeholder='Default'
          value={displayGender}
          selectedIndex={selectedGender}
          onSelect={index => setGenderIndex(index)}>
          {genders.map(renderSelect)}
        </Select>
        <Select
          key='vaccineSelection'
          label='Vaccine Type'
          style={styles.selector}
          placeholder='Default'
          value={displayVaccine}
          selectedIndex={selectedVaccine}
          onSelect={index => setVacccineIndex(index)}>
          {vaccines.map(renderSelect)}
        </Select>
        <Select
          key='sideEffectSelection'
          label='Side Effect'
          style={styles.selector}
          placeholder='Default'
          value={displaySideEffect}
          selectedIndex={selectedEffect}
          onSelect={index => setEffectIndex(index)}>
          {sideEffects.map(renderSelect)}
        </Select>
        <Datepicker
          key='birthDateInput'
          style={styles.picker}
          label='Birth Date'
          placeholder='Your Birthday'
          date={birthday}
          min={min}
          max={max}
          onSelect={nextDate => setDate(nextDate)}
        />
        <Button 
          key='submissionBtn'
          disabled={!nameEmpty || !surnameEmpty || !cityEmpty}
          status='warning'
          onPress={handleSubmit}
        >
          SUBMIT
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selector:{
    width: 200
  }
    
  
});