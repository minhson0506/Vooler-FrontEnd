import React, {useState} from 'react';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {moominArray} from '../utils/data';
import {colorSet, useStyles} from '../utils/GlobalStyle';

const CardView = () => {
  const [items, setItems] = useState(moominArray);

  const onClick = (id) => {
    const newImages = [...items];
    newImages[id].state = !newImages[id].state;
    setItems(newImages);
  };

  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        spacing={10}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              onClick(index);
            }}
          >
            {item.state ? (
              <Image
                style={{width: '100%', height: '100%', opacity: 0.2}}
                source={item.image}
              ></Image>
            ) : (
              <>
                <Text style={[fontStyle.Text, styles.itemName]}>
                  {item.name}
                </Text>
                <Text style={[fontStyle.Text, styles.itemName]}>
                  {item.unit}
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}
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
