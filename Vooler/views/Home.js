import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Dashboard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.logoFlexBox}>
        <Image 
        source={require("./assets/voolerLogo.png")}></Image>
      </View>
      <View style={styles.greetingFlexBox}>
        <Text style={styles.greetingText}>GOOD MORNING, LAURA</Text>
      </View>
      <View style={styles.sentenceFlexBox}>
        <Text style={styles.sentenceText}>“The longer I live, the more beautiful life becomes.” - Frank Lloyd Wright</Text>
      </View>
      <View style={styles.groupsFlexBox}>
        <View style={{ flex: 1}} />
        <View style={styles.groupsInnerFlexBoxes}>
          <View style={styles.InnerFlexBoxLeftColumn}>
            <View style={styles.leftColumnFirsLine}>
            <Image 
              source={require("./assets/stepsIcon.png")}
              style={styles.icon}
              ></Image>
            </View>
            <View style={styles.leftColumnSecondLine}>
              <Text style={styles.leftColumnSecondLineText}>STEPS</Text>
            </View>
          </View>
          <View style={styles.InnerFlexBoxRightColumn}>
            <Text style={styles.RightColumnText}>500</Text>
          </View>
        </View>
        <View style={{ flex: 1}} />
        <View style={styles.groupsInnerFlexBoxes}>
          <View style={styles.InnerFlexBoxLeftColumn}>
            <View style={styles.leftColumnFirsLine}>
              <Image 
                source={require("./assets/teamRankIcon.png")}
                style={styles.icon}
                ></Image>
            </View>
            <View style={styles.leftColumnSecondLine}>
              <Text style={styles.leftColumnSecondLineText}>TEAM RANK</Text>
            </View>
          </View>
          <View style={styles.InnerFlexBoxRightColumn}>
            <Text style={styles.RightColumnText}>1st</Text>
          </View>
        </View>
        <View style={{ flex: 1}} />
        <View style={styles.groupsInnerFlexBoxes}>
          <View style={styles.InnerFlexBoxLeftColumn}>
            <View style={styles.leftColumnFirsLine}>
              <Image 
                  source={require("./assets/badgesIcon.png")}
                  style={styles.icon}
                  ></Image>
            </View>
            <View style={styles.leftColumnSecondLine}>
              <Text style={styles.leftColumnSecondLineText}>BADGES</Text>
            </View>
          </View>
          <View style={styles.InnerFlexBoxRightColumn}>
            <Text style={styles.RightColumnText}>3</Text>
          </View>
        </View>
        <View style={{ flex: 2}} />
      </View>
      <View style={styles.bottomButtonsFlexBox}>
        <View style={{backgroundColor: "#FFB500", flex: 1, marginRight: 2, flexDirection: "column"}}>
          <View style={{ flex: 1}}>
            <Image 
              source={require("./assets/homeIcon.png")}
              style={styles.bottomIcons}
            ></Image>
          </View>
          <View style={{ flex: 1}}>
            <Text style={styles.bottomButtonsText}>Home</Text>
          </View>
        </View>
        <View style={{backgroundColor: "#AAAAAA", flex: 1, marginLeft: 2, flexDirection: "column"}}>
          <View style={{ flex: 1}}>
              <Image 
                source={require("./assets/settingsIcon.png")}
                style={styles.bottomIcons}
              ></Image>
            </View>
            <View style={{ flex: 1}}>
              <Text style={styles.bottomButtonsText}>Settings</Text>
            </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight*0.5,
    flex: 1,
    alignItems: "center",
  },
  logoFlexBox: {
    flex: 2
  },
  greetingFlexBox: {
    flex: 1,
  },
  greetingText: {
    fontWeight: "bold",
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 25
  },
  sentenceFlexBox: {
    flex: 1,
  },
  sentenceText: {
    fontFamily: "roboto-regular",
    color: "#121212",
    textAlign: "center",
    fontSize: 18
  },

  groupsFlexBox: {
    flex: 12,
  },
  bottomButtonsFlexBox: {
    flex: 2,
    flexDirection: "row"
  },
  groupsInnerFlexBoxes: {
    flex: 2,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    flexDirection: "row",
    width: windowWidth * 0.85,
  },
  InnerFlexBoxLeftColumn: {
    flex: 2,
    flexDirection: "column"
  },
  InnerFlexBoxRightColumn: {
    flex: 1,  
    //Codes below did not work
    //justifyContent: "center",
    //alignItems: "center",
  },
  leftColumnFirsLine: {
    flex: 1,
  },
  leftColumnSecondLine: {
    flex: 1,
    marginLeft: 10,
  },
  leftColumnSecondLineText: {
    fontWeight: "bold",
    fontFamily: "nunito-800",
    color: "#121212",
    fontSize: 26
  },
  icon: {
    width: windowWidth * 0.1, 
    height: windowWidth * 0.1,
    marginLeft: windowWidth * 0.1,
    marginTop: windowHeight * 0.008
  },
  RightColumnText: {
    fontWeight: "bold",
    fontFamily: "nunito-800",
    color: "#121212",
    fontSize: 30,
    flex: 1,
    marginTop: windowHeight * 0.04,
  },
  bottomButtonsText: {
    fontFamily: "nunito-700",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: windowHeight * 0.01,
  },
  bottomIcons: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    marginLeft: windowWidth * 0.1,
    marginTop: windowHeight * 0.01,
    alignSelf: "center",
    alignItems: "center",
  }
});

export default Dashboard;
