# react-native-qr-barcode
React Native WebView component of BarCode and QRCode.
Based on [chenchunyong/react-native-barCode](https://github.com/chenchunyong/react-native-barCode)

# Setup
  
`npm i react-native-qr-barcode --save`

# Usage

```javascript
import React, { Component } from 'react';
import { BarCode, QRCode } from 'react-native-qr-barcode'
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

class QRBarcodeTest extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BarCode style={{marginBottom: 15}} value='1234567890876543' />
        <QRCode value='Lorem ipsum dolor sit amet, consectetur, adipisci velit' 
                size={200} 
                fgColor='white' 
                bgColor='black'
                style={{marginTop: 15}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('QRBarcodeTest', () => QRBarcodeTest);
```

<img src="https://cloud.githubusercontent.com/assets/1525818/18814037/b49eeaf2-830e-11e6-8483-4bde3e230482.png" width = "375" height = "669" align=center />

