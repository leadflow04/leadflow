const fs = require("fs");
require("dotenv").config({ path: ".env.local" });

async function testSerper() {
  const query = "Plombier Paris";
  const getPlaces = async (page) => {
    const res = await fetch("https://google.serper.dev/places", {
      method: "POST",
      headers: {
        "X-API-KEY": "2e329fa2814a28c999b450fb678c44da22d9fa0c",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: query, gl: "fr", hl: "fr", page: page }),
    });
    const data = await res.json();
    return data.places ? data.places.map(p => p.title) : [];
  };

  const p1 = await getPlaces(1);
  const p2 = await getPlaces(2);

  console.log("Places Page 1 length:", p1.length);
  console.log("Places Page 2 length:", p2.length);
  if (p1.length > 0 && p2.length > 0) {
    console.log("Same results?", p1[0] === p2[0]);
  }
}

testSerper();
