"use strict";!function(){angular.module("app",[])}(),function(){function n(n){return w=n,{getNeighboursCount:u,getNewPixelColor:e,run:r}}function r(n){m=n}function o(){C=w(function(){for(var n=u(m),r=0;r<m.length;r++)for(var o=0;o<m[r].pixels.length;o++){var e=m[r].pixels[o],t=n[r*m[r].pixels.length+o];e.color=p(e,t.red,t.blue)}},h,s).then(function(){d=!1})}function e(n){return d?n.color:x?t(n):i(n)}function t(n){var r="white"!==n.color?"white":"blue";return x=--v>0,r}function i(n){var r="white"!==n.color?"white":"red";return 0===--g&&l(),r}function l(){x=!0,d=!0,v=a,g=a,o()}function u(){for(var n=[],r=0;r<m.length;r++)for(var o=0;o<m[r].pixels.length;o++){var e=c(r,o);n.push(e)}return n}function c(n,r){var o=f(n,r),e=o.map(function(n){return n.color}).reduce(function(n,r){return n[r]=++n[r]||1,n},{});return e}function f(n,r){var o=n===m.length-1?0:n+1,e=0===n?m.length-1:n-1,t=0===r?m[0].pixels.length-1:r-1,i=r===m[0].pixels.length-1?0:r+1,l=[];return l.push(m[e].pixels[t]),l.push(m[e].pixels[r]),l.push(m[e].pixels[i]),l.push(m[n].pixels[t]),l.push(m[n].pixels[i]),l.push(m[o].pixels[t]),l.push(m[o].pixels[r]),l.push(m[o].pixels[i]),l}function p(n,r,o){var e=r||0,t=o||0,i=e+t;return"white"===n.color&&e+t===3?e>t?"red":"blue":"white"!==n.color&&(i<2||i>3)?"white":n.color}angular.module("app").factory("golService",["$interval",n]);var a=5,s=15,h=400,v=a,g=a,x=!0,d=!1,w=0,C=void 0,m=void 0}(),function(){function n(){var n=this;n.hello="Hello, World!"}angular.module("app").controller("MainController",n)}(),function(){function n(n,t,i){var l=this;l.definition=[25,25],l.rows=e(l.definition[0],l.definition[1]),l.getColorStyle=o,i.run(l.rows),l.pixelClicked=function(n){r(n,i.getNewPixelColor(n))}}function r(n,r){n.color=r}function o(n){return{"background-color":n.color}}function e(n,r){for(var o=[],e=0;e<n;e++)o.push({pixels:t(r)});return o}function t(n){for(var r=[],o=0;o<n;o++)r.push(i(l()));return r}function i(n){return{color:n}}function l(){return"white"}angular.module("app").controller("PixelsController",["$interval","$timeout","golService",n])}();