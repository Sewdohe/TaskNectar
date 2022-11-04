import express from "express";
import cors from "cors";
import fetch from "node-fetch"

const app = express();
const port = 3000; // default port to listen

import {
  createDAVClient,
  DAVAccount,
  DAVCalendar,
  DAVCalendarObject,
  DAVClient
} from "tsdav";

let client: DAVClient | null = null;

type AuthResponse = {
  "server": string,
  "loginName": string,
  "appPassword": string
}

type TokenResponse = {
  login: string,
  poll: {
    token: string,
    endpoint: string,
  }
}

app.use(cors({
  origin: ['https://nextcloud.divnectar.com', 'http:localhost:4200'],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS']
}));

app.use(express.json());

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send(req.body);
  // tslint:disable-next-line:no-console
  console.log(req.body)
});

app.post("/login", (req, res) => {
  fetch("https://nextcloud.divnectar.com/login/v2", {
    method: "post",
    headers: {
      'OCS-APIRequest': 'true'
    }
  }).catch((err: any) => res.send(err))
    .then(res => res.json())
    .then(json => res.send(json))
});

app.get("/calendars", (req, res) => {
  if (client) {
    client.fetchCalendars()
      .catch(err => {
        res.send(err)
      })
      .then(calendars => {
        res.send(calendars)
      })
  } else {
    res.send("Not logged in!")
  }
})

app.post("/detail", async (req, res) => {
  let cal: DAVCalendar = req.body.calendar;
  if (client != null) {
    console.log(`getting details for ${cal.displayName}`)
    let objects: DAVCalendarObject[] = await client.fetchCalendarObjects(
      {
        calendar: cal,
        filters: [
          {
            "comp-filter": {
              "_attributes": { "name": "VCALENDAR" },
              "comp-filter":
              {
                "_attributes": { "name": "VTODO" }
              },
            }
          },
        ]
      }
    )
    res.json(objects)
  } else {
    console.log("not signed in")
  }
})

app.get("/calendars", (req, res) => {
  if (client != null) {
    client.fetchCalendars()
      .catch(err => res.send(err))
      .then(calendars => res.send(calendars))
  } else {
    res.send({ "response": "You are not signed in" })
  }
})

app.post("/davlogin", (req, res) => {
  client = new DAVClient({
    serverUrl: req.body.server,
    credentials: {
      username: req.body.user,
      password: req.body.password
    },
    authMethod: 'Basic',
    defaultAccountType: 'caldav',
  })

  client.login()
    .catch(err => res.send({ "response": "Error" }))
    .finally(() => res.send({ "response": "Success" }))
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
