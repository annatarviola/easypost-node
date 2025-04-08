import fs from "fs";
import open from "open";

// this tool can be used to open a list of shipment or tracker IDs in admin

fs.readFile("./misc.txt", "utf8", (err, data) => {
  if (err) throw err;

  let arr = data.split(/\r?\n/);

  let url;

  const urlArr = [];

  // arr.shift() // remove column header if needed

  arr = arr.map((el) => {
    return el.trim();
  });

  arr.forEach((id) => {
    if (id.startsWith("trk")) {
      let url = `https://easypost-admin.easypo.net/tracking~tracker/${id}`;
      console.log(url);
      urlArr.push(url);
    } else if (id.startsWith("shp")) {
      let url = `https://easypost-admin.easypo.net/easy_post~shipment/${id}`;
      console.log(url);
      urlArr.push(url);
    } else if (id.startsWith("rate")) {
      let url = `https://easypost-admin.easypo.net/easy_post~rate/${id}`;
      console.log(url);
      urlArr.push(url);
    } else {
      console.log("Could not create valid admin url.");
    }
  });

  async function openUrls(urlArr) {
    for (const url of urlArr) {
      await open(url); // Opens each URL in the default browser
    }
  }

  openUrls(urlArr);
});
