!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="dist",n(n.s=0)}([function(e,t){const n=document.querySelector(".search_city_form"),r=document.querySelector("#search_city_field"),o=document.querySelector(".city"),i=document.querySelector(".sky"),c=document.querySelector(".current_temp"),a=document.querySelector(".temp_max"),u=document.querySelector(".temp_min"),l=document.querySelector(".weather_icon_display"),m=document.querySelector(".change_units");let s="CHICAGO";let d,p="units=imperial";const f="!@#$%^&*(){}/?,<>`~|[]";function y(){for(o.innerHTML="",i.innerHTML="",c.innerHTML="",a.innerHTML="",u.innerHTML="";l.firstChild;)l.removeChild(l.firstChild)}function h(){const e=document.querySelector(".error_message");e&&e.remove(e)}function g(e){let t;d={},y(),t="blank"===e?"a blank submission":"symbol"===e?"a strange symbol in your city name":"an error getting the info";const n=document.querySelector(".display");document.querySelector(".error_message")&&h();const r=document.createElement("h1");r.classList.add("error_message"),r.innerHTML=`Whoops something went wrong because of ${t}. Try entering another city`,n.prepend(r)}function b(){let e;e="units=imperial"===p?"℉":"℃",o.innerHTML=d.city,i.innerHTML=d.weatherDescription,c.innerHTML=`${d.currentTemp} ${e}`,a.innerHTML=`${d.maxTemp}`,u.innerHTML=`${d.minTemp} ${e}`,function(){const e=document.createElement("img");e.classList.add("icon"),e.setAttribute("src",`http://openweathermap.org/img/wn/${d.weatherIcon}@2x.png`),l.appendChild(e)}()}async function _(){try{const t=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${s}&${p}&appid=1b1a6dceff48a9792acfdc16ccc5da0e`,{mode:"cors"}),n=await t.json();e=n,y(),r.value="",console.log(e),d={city:e.name,currentTemp:e.main.temp,maxTemp:e.main.temp_max,minTemp:e.main.temp_min,weatherMain:e.weather[0].main,weatherDescription:e.weather[0].description,weatherIcon:e.weather[0].icon},b()}catch(e){g(e),console.log(e)}var e}n.addEventListener("submit",(function(e){e.preventDefault(),h();const t=r.value.trim().toUpperCase().toString();""===t?g("blank"):!function(e){let t;for(let n=0;n<f.length;n++)e.includes(f[n])&&(t=!0);return t}(t)?(s=t,_()):g("symbol")})),m.addEventListener("click",(function(){p="units=imperial"===p?"units=metric":"units=imperial",_()})),_()}]);