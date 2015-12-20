/**
 * Created by chenchunyong on 12/17/15.
 */
'use strict';

import React,{View,WebView,Text}  from 'react-native';
import qr from 'qr.js';

function renderCanvas(canvas) {
    let ctx = canvas.getContext('2d');
    let size = this.size;
    let fgColor = this.fgColor;
    let bgColor = this.bgColor;
    canvas.width = size;
    canvas.height = size;
    canvas.style.left = (window.innerWidth - size) / 2 + 'px';
    if (window.innerHeight > size) canvas.style.top = (window.innerHeight - size) / 2 + 'px';
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, size, size);
    let cells = this.cells;
    let cellWidth = this.size / cells.length;
    let cellHeight = this.size / cells.length;
    cells.forEach(function (row, rowIndex) {
        row.forEach(function (column, columnIndex) {
            ctx.fillStyle = column ? bgColor : fgColor;
            let w = Math.ceil((rowIndex + 1) * cellWidth) - Math.floor(rowIndex * cellWidth);
            let h = Math.ceil((columnIndex + 1) * cellHeight) - Math.floor(columnIndex * cellHeight);
            ctx.fillRect(Math.round(rowIndex * cellWidth), Math.round(columnIndex * cellHeight), w, h);
        });
    });
}

export default React.createClass({
    getDefaultProps: function () {
        return {
            value: '12345678901234567890',
            fgColor: 'white',
            bgColor: 'black',
            size: 128,
        }
    },
    utf16to8: function (str) {
        let out, i, len, c;
        out = "";
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
    },
    render: function () {
        let size = this.props.size;
        return (
            <View style={{height: size, width: size}}>
                <WebView
                    html={this._getHtml()}
                />
            </View>
        );
    },
    _getHtml(){
        let value = this.utf16to8(this.props.value);
        let context = {
            size: this.props.size,
            bgColor: this.props.bgColor,
            fgColor: this.props.fgColor,
            cells: qr(value).modules,
        };
        var contextString = JSON.stringify(context);
        var renderString = renderCanvas.toString();
        return ` <!doctype html>
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

    },
});
