import React from "react";
import { Button, Divider, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PropTypes from "prop-types";

export const SubmissionScreen = ({ route, navigation }) => {
    const { name,surname, birthdate, gender, city, sideEffects,displayVaccine} = route.params;
  const navigateForm = () => {
    navigation.navigate("Form");
  };

  const navigateHome = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#e0e5ec",
        paddingTop: 50,
        paddingBottom: 50,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{ opacity: 0.4, marginTop: 30, fontSize: 50, fontWeight: "200", textAlign:"center", marginHorizontal: 5}}
      >
        You have successfully submitted your answers!
      </Text>
      <View>
          <Text style={{opacity: 0.4, fontSize: 20, fontWeight: "500", textAlign: "center", marginBottom:10 }} >Data</Text>
          <Text style={styles.data} >Name: {name} </Text>
          <Text style={styles.data} >Surname: {surname} </Text>
          <Text style={styles.data} >Birth Date: {birthdate} </Text>
          <Text style={styles.data} >Gender: {gender} </Text>
          <Text style={styles.data} >City: {city} </Text>
          <Text style={styles.data} >Vaccine Type: {displayVaccine} </Text>
          <Text style={styles.data} >Side Effects: {sideEffects} </Text>
      </View>
      
      <Text style={{opacity: 0.4, fontSize: 15, fontWeight: "500", textAlign: "center" }}>
        Thank you for participating in the survey.
      </Text>
      <View style={{flexDirection: "row"}}>
            <Button
            style={{margin:10}}
                appearance="outline"
                status="basic"
                accessible={true}
                accessibilityLabel="formNavBtn"
                onPress={navigateForm}
                size="small"
            >
                EDIT SUBMISSION
            </Button>
            <Button
                style={{margin:10}}
                appearance="outline"
                status="basic"
                accessible={true}
                accessibilityLabel="homeNavBtn"
                onPress={navigateHome}
                size="small"
            >
                GO TO HOME PAGE
            </Button>
      </View>
      
    </ScrollView>
  );
};
const styles = StyleSheet.create({
    data: {
        opacity: 0.4,
        marginHorizontal: 80,
        fontSize: 16,
        fontWeight: "300",
        textAlign: "center",

    },
  });
SubmissionScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
