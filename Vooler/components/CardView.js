import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {colorSet, useStyles} from '../utils/GlobalStyle';

const CardView = () => {
  const [image, setImage] = useState(1);
  const [items, setItems] = useState([
    {name: '200', unit: 'steps/day'},
    {name: '500', unit: 'steps/day'},
    {name: '700', unit: 'steps/day'},
    {name: '1000', unit: 'steps/day'},
    {name: '5000', unit: 'steps/week'},
    {name: '7000', unit: 'steps/week'},
    {name: '10000', unit: 'steps/week'},
    {name: 'Rank #3', unit: ''},
    {name: 'Rank #2', unit: ''},
    {name: 'Rank #1', unit: ''},
  ]);

  const fontStyle = useStyles();   
  if (fontStyle == undefined) return undefined;
  else
    return (
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({item}) =>
          1 ? (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={setImage(2)}
            >
              <Text style={[fontStyle.Text, styles.itemName]}>{item.name}</Text>
              <Text style={[fontStyle.Text, styles.itemName]}>{item.unit}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={setImage(1)}
            >
              <Image
                source={require('../assets/Moomin/Moominmama.png')}
              ></Image>
            </TouchableOpacity>
          )
        }
      />
    );
};

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: colorSet.lightGray,
    justifyContent: 'center',
    borderRadius: 15,
    height: 200,
  },
  itemName: {
    textAlign: 'center',
  },
});

export default CardView;
