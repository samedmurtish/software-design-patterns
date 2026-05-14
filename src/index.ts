import express from "express";
import {
  NotificationService,
  NotificationPayload,
} from "./NotificationService";

const app = express();
app.use(express.json());

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const service = new NotificationService();

app.post("/notify", (req, res) => {
  const { type, payload } = req.body as {
    type?: string;
    payload?: NotificationPayload;
  };
  if (!type || !payload) {
    res.status(400).json({ success: false, error: "Missing type or payload" });
    return;
  }

  const result = service.send(type as any, payload);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
