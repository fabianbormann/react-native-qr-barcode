# react-native-barCode
React Native WebView component of BarCode and QRCode.
Based on [chenchunyong/react-native-barCode](https://github.com/chenchunyong/react-native-barCode)

# Setup
  
`npm i react-native-bar-qr-code --save`

# Usage

```javascript
import {BarCode,QRCode} from 'react-native-bar-qr-code'
    
    /**
     * value: Encrypted barcode text (default: '12345678901234567890')
     * bgColor: Barcode background color (default: 'white')
     * height: Barcode height (default: 90)
     * width: Barcode width (default: 225)
     */
    <BarCode 
        value={this.props.payCode}
        bgColor="#e7e7eb"
    />

    /**
     * value: Encrypted QR code text (default: '12345678901234567890')
     * bgColor: QR code background color (default: 'white')
     * fgColor: QR code foreground color (default: 'black')
     * size: QR code size (default: 128)
     */
    <QRCode value={this.props.payCode}
        fgColor="#333"/>
```

<img src="https://github.com/chenchunyong/react-native-barCode/raw/master/barCode.png" width = "375" height = "669" align=center />

