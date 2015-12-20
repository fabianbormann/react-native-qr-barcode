# react-native-barCode
采用React Native WebView组件实现的BarCode（条形码）、QRCode(二维码),其中QRCode的代码是参考 
[qrcode](https://github.com/cssivision/react-native-qrcode),修复了qrcode图片会出现滚动条问题。

实现的原理:在`WebView`组件下,用`canvas`组件画出BarCode、QRCode。

# Install
 
 安装包:
 
`npm i react-native-barCode --save`

通过引用`import {BarCode,QRCode} from 'react-native-barcode-qrcode'`来使用

# Usage

```
<BarCode    value={this.props.payCode}
            width="225"
            height="90"
            bgColor="#e7e7eb"
           />
    <QRCode value={this.props.payCode}
            bgColor="#fff"
            fgColor="#333"/>
```

效果如下:

![条形码与二维码](https://github.com/chenchunyong/react-native-barCode/raw/master/barCode.png)


