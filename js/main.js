"use strict";!function(){var n=$("html"),t=function(){$(".btn-menu").on("click",function(t){t.preventDefault(),n.toggleClass("menu-opened")})},e=function(){t()};e()}();

// import { getWeather } from "./weather";

import { getWeather } from "./js/weather.js"

var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};
let map;

navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

function positionSuccess({ coords }) {
    getWeather(
      coords.latitude,
      coords.longitude,
      Intl.DateTimeFormat().resolvedOptions().timeZone
    )
      .then(renderWeather)
      .catch(e => {
        console.error(e)
        alert("Error getting weather.")
      })
}

function positionError() {
    alert(
      "There was an error getting your location. Please allow us to use your location and refresh the page."
    )
}

function renderWeather({ current }) {
    renderCurrentWeather(current)
}

function setValue(selector, value, { parent = document } = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value
}
  
function getIconUrl(iconCode) {
    return `icons/${ICON_MAP.get(iconCode)}.svg`
}
  
const currentIcon = document.querySelector("[data-current-icon]")
function renderCurrentWeather(current) {
    currentIcon.src = getIconUrl(current.iconCode)
    setValue("current-temp", current.currentTemp)
    setValue("current-high", current.highTemp)
    setValue("current-low", current.lowTemp)
    setValue("current-fl-high", current.highFeelsLike)
    setValue("current-fl-low", current.lowFeelsLike)
    setValue("current-wind", current.windSpeed)
    setValue("current-precip", current.precip)
}