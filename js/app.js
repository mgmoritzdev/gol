"use strict";!function(){angular.module("app",[])}(),function(){function n(){return{getNeighboursCount:r}}function r(n){for(var r=[],i=0;i<n.length;i++)for(var l=0;l<n[i].pixels.length;l++){var o=e(n,i,l);r.push(o)}return r}function e(n,r,e){var l=i(n,r,e),o=l.filter(function(n){return"white"!==n.color}).length;return o}function i(n,r,e){var i=r===n.length-1?0:r+1,l=0===r?n.length-1:r-1,o=0===e?n[0].pixels.length-1:e-1,t=e===n[0].pixels.length-1?0:e+1,u=[];return u.push(n[l].pixels[o]),u.push(n[l].pixels[e]),u.push(n[l].pixels[t]),u.push(n[r].pixels[o]),u.push(n[r].pixels[t]),u.push(n[i].pixels[o]),u.push(n[i].pixels[e]),u.push(n[i].pixels[t]),u}angular.module("app").factory("golService",n)}(),function(){function n(){var n=this;n.hello="Hello, World!"}angular.module("app").controller("MainController",n)}(),function(){function n(n,l,o){var t=this;t.definition=[25,25],t.totalClicksPerPlayer=5,t.remainingClicks=t.totalClicksPerPlayer,t.currentPlayer=!1,t.rows=i(t.definition[0],t.definition[1]),t.getColorStyle=e,t.togglePixel=function(n){t.remainingClicks>0&&(t.currentPlayer?(r(n,"red"),t.remainingClicks--):(r(n,"blue"),t.remainingClicks--,0===t.remainingClicks&&(t.currentPlayer=!0,t.remainingClicks=t.totalClicksPerPlayer)))},l(function(){n(function(){for(var n=o.getNeighboursCount(t.rows),r=0;r<t.rows.length;r++)for(var e=0;e<t.rows[r].pixels.length;e++)u(t.rows[r].pixels[e],n[r*t.rows[r].pixels.length+e])},500)},1e4)}function r(n,r){n.color=r}function e(n){return{"background-color":n.color}}function i(n,r){for(var e=[],i=0;i<n;i++)e.push({pixels:l(r)});return e}function l(n){for(var r=[],e=0;e<n;e++)r.push(o(t()));return r}function o(n){return{color:n}}function t(){return"white"}function u(n,e){"white"===n.color&&3===e&&r(n,"red"),"white"!==n.color&&(e<2||e>3)&&r(n,"white")}angular.module("app").controller("PixelsController",["$interval","$timeout","golService",n])}();