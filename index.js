'use strict';
import React, { Component } from 'react';
import { View, WebView, Text }  from 'react-native';
import qr from 'qr.js';

export default class BarCode extends Component {
    render() {
      return (
        <View style={{width:this.props.width,height:this.props.height}}>
          <WebView html={this._getHtml()}/>
        </View>
      )
    }

    _getHtml() {
      const IFT = `(function($){JsBarcode=function(image,content,options,validFunction){var merge=function(m1,m2){var newMerge={};for(var k in m1){newMerge[k]=m1[k]}for(var k in m2){newMerge[k]=m2[k]}return newMerge};var validFunctionIfExist=function(valid){if(validFunction){validFunction(valid)}};options=merge(JsBarcode.defaults,options);var canvas=image;if(window.jQuery&&canvas instanceof jQuery){canvas=image.get(0)}if(!(canvas instanceof HTMLCanvasElement)){canvas=document.createElement("canvas")}if(!canvas.getContext){return image}var encoder=new window[options.format](content);if(!encoder.valid()){validFunctionIfExist(false);return this}var binary=encoder.encoded();var _drawBarcodeText=function(text){var x,y;y=options.height;ctx.font=options.fontOptions+" "+options.fontSize+"px "+options.font;ctx.textBaseline="bottom";ctx.textBaseline="top";if(options.textAlign=="left"){x=options.quite;ctx.textAlign="left"}else{if(options.textAlign=="right"){x=canvas.width-options.quite;ctx.textAlign="right"}else{x=canvas.width/2;ctx.textAlign="center"}}ctx.fillText(text,x,y)};var ctx=canvas.getContext("2d");canvas.width=binary.length*options.width+2*options.quite;canvas.height=options.height+(options.displayValue?options.fontSize*1.3:0);ctx.clearRect(0,0,canvas.width,canvas.height);if(options.backgroundColor){ctx.fillStyle=options.backgroundColor;ctx.fillRect(0,0,canvas.width,canvas.height)}ctx.fillStyle=options.lineColor;for(var i=0;i<binary.length;i++){var x=i*options.width+options.quite;if(binary[i]=="1"){ctx.fillRect(x,0,options.width,options.height)}}if(options.displayValue){_drawBarcodeText(content)}uri=canvas.toDataURL("image/png");if(window.jQuery&&image instanceof jQuery){if(!(image.get(0) instanceof HTMLCanvasElement)){image.attr("src",uri)}}else{if(!(image instanceof HTMLCanvasElement)){image.setAttribute("src",uri)}}validFunctionIfExist(true)};JsBarcode.defaults={width:2,height:100,quite:10,format:"CODE128",displayValue:false,fontOptions:"",font:"monospace",textAlign:"center",fontSize:12,backgroundColor:"",lineColor:"#000"};if(window.jQuery){$.fn.JsBarcode=function(content,options,validFunction){JsBarcode(this,content,options,validFunction);return this}}})(window.jQuery);function ITF(ITFNumber){this.ITFNumber=ITFNumber+"";this.valid=function(){return valid(this.ITFNumber)};this.encoded=function(){if(valid(this.ITFNumber)){return encode(this.ITFNumber)}return""};var digitStructure={"0":"00110","1":"10001","2":"01001","3":"11000","4":"00101","5":"10100","6":"01100","7":"00011","8":"10010","9":"01010"};var startBin="1010";var endBin="11101";var regexp=/^([0-9][0-9])+$/;function encode(number){var result="";result+=startBin;for(var i=0;i<number.length;i+=2){result+=calculatePair(number.substr(i,2))}result+=endBin;return result}function calculatePair(twoNumbers){var result="";var number1Struct=digitStructure[twoNumbers[0]];var number2Struct=digitStructure[twoNumbers[1]];for(var i=0;i<5;i++){result+=(number1Struct[i]=="1")?"111":"1";result+=(number2Struct[i]=="1")?"000":"0"}return result}function valid(number){return number.search(regexp)!==-1}};`;
      return `<!doctype html>
                  <html>
                  <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  </head>
                 <body style="height: 100%;width: 100%;margin: 0;padding: 0;overflow: hidden">
                  <canvas height="${this.props.height}" width="${this.props.width}"></canvas><script>
           ${IFT}
           var PIXEL_RATIO = (function () {
              var ctx = document.createElement("canvas").getContext("2d"),
              dpr = window.devicePixelRatio || 1,
              bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

              return dpr / bsr;
          })();
           var canvas = document.querySelector('canvas');
           var oldWidth=canvas.width;
           var oldHeight=canvas.height;
           canvas.width=oldWidth*PIXEL_RATIO;
           canvas.height=oldHeight*PIXEL_RATIO;
           canvas.style.width=oldWidth+'px';
           canvas.style.height=oldHeight+'px';
           canvas.ontouchstart=function(e){
              e.preventDefault();
              e.stopImmediatePropagation();
           }
          JsBarcode(canvas, "${this.props.value}",{  width:2, format: "ITF",
           displayValue: true,  fontSize: 28, backgroundColor:'${this.props.bgColor}'});
           </script>
           </body>
           </html>`;
    }
}

BarCode.propTypes = {
  value: PropTypes.string,
  bgColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}

BarCode.defaultProps = {
  value: '12345678901234567890',
  bgColor: 'white',
  width: 225,
  height: 90
}

export default class QRCode extends Component {
    utf16to8 = str => {
      let out, i, len, c;
      out = '';
      len = str.length;
      for (i = 0; i < len; i++) {
          c = str.charCodeAt(i);
          if ((c >= 0x0001) && (c <= 0x007F)) {
              out += str.charAt(i);
          } else if (c > 0x07FF) {
              out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
              out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
              out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
          } else {
              out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
              out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
          }
      }
      return out;
    }

    render() {
      return (
        <View style={{height: this.props.size, width: this.props.size}}>
          <WebView html={this._getHtml()} />
        </View>
      );
    }

    _getHtml = () => {
      let value = this.utf16to8(this.props.value);
      let context = {
          size: this.props.size,
          bgColor: this.props.bgColor,
          fgColor: this.props.fgColor,
          cells: qr(value).modules,
      };
      var contextString = JSON.stringify(context);
      var renderString = renderCanvas.toString();
      return `<!doctype html>
                  <html>
                  <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  </head>
                  <body style="height: 100%;width: 100%;margin: 0;padding: 0;overflow: hidden">
                      <canvas></canvas>
                 <script>
                  var canvas = document.querySelector('canvas');
                 (${renderString}).call(${contextString}, canvas);
                  canvas.ontouchstart=function(e){
                      e.preventDefault();
                      e.stopImmediatePropagation();
                   }
                 </script>
                 </body>
                 </html>`;

    }
}

QRCode.propTypes = {
  value: PropTypes.string,
  fgColor: PropTypes.string,
  bgColor: PropTypes.string,
  size: PropTypes.number
}

QRCode.defaultProps = {
  value: '12345678901234567890',
  fgColor: 'white',
  bgColor: 'black',
  size: 128
}
