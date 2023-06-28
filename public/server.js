const express = require("express");
const fs = require("fs");
var md5 = require("md5");
const fetch = require("node-fetch");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkc8C17AgeCwqgixs2MU2i2Tvx4WIdy8Q",
  authDomain: "homepod-jokes.firebaseapp.com",
  projectId: "homepod-jokes",
  storageBucket: "homepod-jokes.appspot.com",
  messagingSenderId: "312153047508",
  appId: "1:312153047508:web:70cf8e916c5cf9c5d95641"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const apiURL = "http://anecdotica.ru/api";

// app.use(express.static(__dirname + "/public"));

app.get("/random_joke", function (req, res) {
  const method = "getRandItemP";
  const key =
    "a81234437c8b2a03d8a8b4730c4de0a8c779b99dfef0335572d891b71d5bb1b5";
  const params = {
    pid: "31v44s0m1509nnwupsgm",
    method: method,
    genre: 1,
    lang: 1,
    wlist: 0,
    censor: 0,
    format: "json",
    charset: "utf-8",
    uts: Math.trunc(Date.now() / 1000),
    markup: 0,
  };
  let query = "";
  let paramsArray = [];

  for (const [key, value] of Object.entries(params)) {
    paramsArray.push(`${key}=${value}`);
  }

  query = query + paramsArray.join("&");

  let signature = md5(query + key);

  const readyQuery = apiURL + "?" + query + `&hash=${signature}`;

  console.log(readyQuery);

  fetch(readyQuery)
    .then((response) => response.json())
    .then((data) => res.send(data.item.text))
    .catch((err) => res.send('Тут что-то сломалось, сегодня без анекдотов'));
});

app.listen(3000, function () {
  console.log("Сервер ожидает подключения...");
});
