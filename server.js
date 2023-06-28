const express = require("express");
const md5 = require("md5");
const fetch = require("node-fetch");
const app = express();
const apiURL = "http://anecdotica.ru/api";

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
    .then((data) => {
      res.send(JSON.stringify({text: data.item.text}));
    })
    .catch((err) => {
      res.charset = "utf-8";
      res.send(JSON.stringify({text: "Тут что-то сломалось, сегодня без анекдотов"}));
    });
});

app.listen(3000, function () {
  console.log("Сервер ожидает подключения...");
});
