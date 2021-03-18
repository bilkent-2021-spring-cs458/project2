import React from "react";
import { Button, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import PropTypes from "prop-types";

export const HomeScreen = ({ navigation }) => {
  const navigateForm = () => {
    navigation.navigate("Form");
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
        style={{
          opacity: 0.4,
          margin: 20,
          fontSize: 50,
          fontWeight: "200",
        }}
      >
        WELCOME
      </Text>
      <Text
        style={{
          opacity: 0.4,
          margin: 20,
          fontSize: 30,
          fontWeight: "200",
        }}
      >
        COVID-19 SURVEY
      </Text>
      <Text
        style={{
          opacity: 0.4,
          margin: 20,
          fontSize: 13,
          fontWeight: "400",
          textAlign: "center",
        }}
      >
        MADE BY {"\n"}
        {"\n"} Mokhlaroyim Raupova {"\n"} Ziya Mukhtarov {"\n"}Javid Baghirov{" "}
        {"\n"} Alper Sarı
      </Text>
      <Text
        style={{
          opacity: 0.4,
          margin: 50,
          fontSize: 20,
          fontWeight: "300",
          textAlign: "center",
        }}
      >
        Please click below {"\n"} to start the survey.
      </Text>
      <Button
        appearance="outline"
        status="basic"
        accessible={true}
        accessibilityLabel="formInitBtn"
        onPress={navigateForm}
        size="large"
      >
        GET STARTED
      </Button>
    </ScrollView>
  );
};
HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
