import express from "express";
import path from "path";
import ejs from "ejs";

const DEFAULT_PORT = 3000;
const TEMPLATES_PATH = path.resolve(path.join(__dirname, "templates"));
const STATIC_PATH = path.resolve(path.join(__dirname, "..", "html"));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(STATIC_PATH));

app.get("/hello-world", (req, res) => {
  res.send('Hello world!');
});

const htmx = express.Router();

htmx.use((_, res, next) => {
  res.status(200);
  res.header("Content-Type", "text/html");
  next();
});

htmx.get("/replace-test", async (req, res) => {
  const rendered = await ejs.renderFile(
    path.join(TEMPLATES_PATH, "replace-test.ejs"),
    {},
    {}
  );
  res.send(rendered);
});

htmx.post("/post-test", (req, res) => {
  res.send(
    req.body?.username
      ? `Hi, ${req.body?.username}!`
      : "Sorry, I didn't catch that."
  );
});

htmx.get("/timer-test", (req, res) => {
  res.send(
    `<p id="timer-test">The current time is ${new Date().toLocaleTimeString()}</p>`
  );
});

htmx.get("/cascading-selects", (req, res) => {
  const { drinks } = req.query;

  const drinkList = {
    tea: ["English Breakfast", "Earl Gray", "Green", "Chamomille"],
    coffee: ["Short Black", "Flat White", "Latte", "Cappcuino"],
    "soft-drinks": ["Coke", "Pepsi", "Sprite", "Fanta"],
  } as Record<string, string[]>;

  if (typeof drinks === "string") {
    return res.send(
      drinkList[drinks].reduce(
        (acc, drink) => (acc += `<option>${drink}</option>`),
        ""
      )
    );
  }

  return res.send(`<option>Something went wrong :(</option>`);
});

app.use("/htmx", htmx);

app.listen(DEFAULT_PORT, () => {
  console.log(`Listening on ${DEFAULT_PORT}`);
});
