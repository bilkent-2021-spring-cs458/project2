import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import {
  Divider,
  Datepicker,
  Icon,
  Button,
  TopNavigation,
  TopNavigationAction,
  Input,
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { cities, genders, vaccines, sideEffects } from "../data/survey_data";

const filter = (item, query) =>
  item.title.toLowerCase().includes(query.toLowerCase());

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const FormScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction
      accessible={true}
      accessibilityLabel="navBtnForm"
      icon={BackIcon}
      onPress={navigateBack}
    />
  );

  const onSelect = (index) => {
    setCity(data[index].title);
  };

  const onChangeText = (query) => {
    setCity(query);
    setData(cities.filter((item) => filter(item, query)));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      accessible={true}
      accessibilityLabel={item.title}
      key={index}
      title={item.title}
    />
  );

  const renderSelect = (title, index) => (
    <SelectItem
      accessible={true}
      accessibilityLabel={title}
      key={index}
      title={title}
    />
  );

  const isNameValid = () => {
    if (name === "") {
      return false;
    }
    const condition = new RegExp("^[a-zA-Z]+$", "g");
    return condition.test(name);
  };
  const handleNameValidation = () => {
    setEmptyName(isNameValid());
  };

  const isSurnameValid = () => {
    if (surname === "") {
      return false;
    }
    const condition = new RegExp("^[a-zA-Z]+$", "g");
    return condition.test(surname);
  };
  const handleSurnameValidation = () => {
    setEmptySurname(isSurnameValid());
  };

  const isCityValid = () => {
    return (
      city &&
      cities.find(
        (obj) => obj.title.toLowerCase().localeCompare(city.toLowerCase()) === 0
      ) !== undefined
    );
  };
  const handleCityValidation = () => {
    setEmptyCity(isCityValid());
  };

  const validateAll = () => {
    if (!isNameValid() || !isSurnameValid() || !isCityValid()) {
      return false;
    }

    return true;
  };
  const handleSubmit = () => {
    if (validateAll()) {
      navigation.navigate("Home");
    } else {
      alert("Fill the fields");
    }
  };

  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [birthday, setDate] = React.useState();
  const [city, setCity] = React.useState();
  const [data, setData] = React.useState(cities);
  const [selectedGender, setGenderIndex] = React.useState();
  const [selectedVaccine, setVacccineIndex] = React.useState();
  const [selectedEffect, setEffectIndex] = React.useState();
  const [nameEmpty, setEmptyName] = React.useState(true);
  const [surnameEmpty, setEmptySurname] = React.useState(true);
  const [cityEmpty, setEmptyCity] = React.useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleCityValidation, [city]);

  const max = new Date();
  const min = new Date(max.getFullYear() - 100, max.getMonth(), max.getDate());
  const displayGender = selectedGender ? genders[selectedGender.row] : "";
  const displayVaccine = selectedVaccine ? vaccines[selectedVaccine.row] : "";
  const displaySideEffect = selectedEffect
    ? sideEffects[selectedEffect.row]
    : "";

  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#e0e5ec",
        marginTop: 30,
      }}
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
      <TopNavigation
        title="Survey Screen"
        alignment="center"
        accessoryLeft={BackAction}
        style={{ backgroundColor: "transparent", width: "100%" }}
      />
      <Divider />
      <Input
        style={styles.selector}
        accessible={true}
        accessibilityLabel="nameInput"
        value={name}
        label="Name"
        placeholder="Your name"
        caption={nameEmpty ? null : "Invalid or empty entry"}
        onChangeText={(nextValue) => setName(nextValue)}
        onEndEditing={handleNameValidation}
      />
      <Input
        style={styles.selector}
        accessible={true}
        accessibilityLabel="surnameInput"
        value={surname}
        label="Surname"
        placeholder="Your surname"
        caption={surnameEmpty ? null : "Invalid or empty entry"}
        onChangeText={(nextValue) => setSurname(nextValue)}
        onEndEditing={handleSurnameValidation}
      />
      <Datepicker
        accessible={true}
        accessibilityLabel="birthDateInput"
        style={styles.selector}
        label="Birth Date"
        placeholder="Your Birthday"
        date={birthday}
        min={min}
        max={max}
        onSelect={(nextDate) => setDate(nextDate)}
      />
      <Autocomplete
        style={styles.selector}
        accessible={true}
        accessibilityLabel="cityInput"
        label="City"
        placeholder="Your city"
        value={city}
        caption={cityEmpty ? null : "Please select from the list"}
        onSelect={onSelect}
        onChangeText={onChangeText}
      >
        {data.map(renderOption)}
      </Autocomplete>
      <View
        style={styles.selector}
        accessible={true}
        accessibilityLabel="genderSelection"
      >
        <Select
          label="Gender"
          placeholder="Please select"
          value={displayGender}
          selectedIndex={selectedGender}
          onSelect={(index) => setGenderIndex(index)}
        >
          {genders.map(renderSelect)}
        </Select>
      </View>
      <View
        style={styles.selector}
        accessible={true}
        accessibilityLabel="vaccineSelection"
      >
        <Select
          label="Vaccine Type"
          placeholder="Please select"
          value={displayVaccine}
          selectedIndex={selectedVaccine}
          onSelect={(index) => setVacccineIndex(index)}
        >
          {vaccines.map(renderSelect)}
        </Select>
      </View>
      <View
        style={styles.selector}
        accessible={true}
        accessibilityLabel="sideEffectSelection"
      >
        <Select
          label="Side Effect"
          placeholder="Please select"
          value={displaySideEffect}
          selectedIndex={selectedEffect}
          onSelect={(index) => setEffectIndex(index)}
        >
          {sideEffects.map(renderSelect)}
        </Select>
      </View>
      {validateAll() ? (
        <Button
          accessible={true}
          ppearance="outline"
          status="basic"
          style={styles.btn}
          accessibilityLabel="submissionBtn"
          onPress={handleSubmit}
        >
          SUBMIT
        </Button>
      ) : (
        <Text
          style={{
            opacity: 0.4,
            margin: 20,
            fontSize: 20,
            fontWeight: "200",
          }}
        >
          Please fill all the fields to submit
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selector: {
    width: "80%",
    margin: 8,
  },
  btn: {
    width: "80%",
    margin: 8,
    backgroundColor: "rgba(0, 0, 0, 0.31)",
    borderRadius: 20,
  },
});

FormScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
