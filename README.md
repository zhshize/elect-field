# 平行板電場中的電荷移動模擬

作者：國立中興大學資工系 張世澤 [mailbox@4ze.tw](mailto:mailbox@4ze.tw)    
[Github: zhshize/elect-field](https://github.com/zhshize/elect-field)     
[到網站上使用(online)](https://showcase.4ze.tw/elect-field/src/index.html)     
[開始使用(本機程式檔)](src/index.html)

## 執行需求

請使用最新的Google Chrome或是Chromium開啟以取得最佳執行效果，Firefox也可執行，但大量運算可能會有不順暢問題請多包涵。  
您的瀏覽器必須開啟Javascript才能正常執行，通常是預設開啟的。  
IE以及Edge並非支援的瀏覽器，執行效果不受保證。  
本程式可以直接複製檔案點選使用，無需網路連線。

## 畫面及使用說明

![](readme/screen1.png)

1.  數值控制項
2.  平行電板  
    圖示，無法拖曳，請使用fieldBoard的數值控制項控制。
3.  點電荷  
    可以使用滑鼠做拖曳
4.  初速度控制點  
    與點電荷的距離大小代表初速度大小，與點電荷的相對位置代表初速度方向
5.  電荷運動軌跡
6.  螢幕  
    可以顯示電荷撞擊螢幕的位置
7.  動作與進階控制區  

    a  動作按鈕
    
    b  電場值輸入區  
    可以用陣列形式輸入X,Y方向的電場值，按下「Draw Screen by field pairs」可以繪製。
        
    c  客製化電場值輸入區  
    可以用函數程式碼產生X,Y方向的電場值陣列。請使用正規且可被瀏覽器執行的javascript(ECMAScript 5)程式碼撰寫，並以內建程式碼為範例進行撰寫。

## 模擬環境說明

螢幕左上角為原點(0,0,0)，自原點向右為+x方向，自原點向下為+y方向，自原點往螢幕後方為+z方向。

## 函式庫

[p5.js](https://p5js.org/): p5.js , p5.dom.js , p5.sound.js , p5.gui.js  
[Bootstrap 4.1](https://getbootstrap.com/)  
[jQuery 3.3.1](https://jquery.com/)  
[doSegmentsIntersect.js](https://gist.github.com/lengstrom/8499382) Algorithm for checking whether two line segments intersect, written in Javascript.  

## 授權

採用[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)

<pre>Copyright 2018 Shih-Tze, Chang

Licensed under the Apache License, Version  2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
    </pre>