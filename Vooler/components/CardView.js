import React, { useState } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { colorSet, useStyles } from '../utils/GlobalStyle';

const CardView = ({ array }) => {
  const [items, setItems] = useState(array);

  const onClick = (id) => {
    const newImages = [...items];
    if (newImages[id].state == 1) newImages[id].state = 2;
    else if (newImages[id].state == 2) newImages[id].state = 1;
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
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              onClick(index);
            }}
          >
            {item.state == 1 ? (
              <>
                <Text style={[fontStyle.Text, styles.itemName]}>
                  {item.name}
                </Text>
                <Text style={[fontStyle.Text, styles.itemName]}>
                  {item.unit}
                </Text>
              </>
            ) : item.state == 2 ? (
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: 0.2,
                  borderRadius: 15,
                }}
                source={item.image}
              ></Image>
            ) : (
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: 1,
                  borderWidth: 3,
                  borderColor: colorSet.primary,
                  borderRadius: 15,
                }}
                source={item.image}
              ></Image>
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
