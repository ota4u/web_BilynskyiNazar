const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();

app.use(cors());
app.use(express.json());

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Токен відсутній" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Недійсний токен" });
  }
}

// Тестовий маршрут
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Тест читання всієї колекції ratings
app.get("/api/test-db", async (req, res) => {
  try {
    const snapshot = await db.collection("ratings").get();

    const ratings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: середній рейтинг конкретної гри
app.get("/api/ratings/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;

    const snapshot = await db
      .collection("ratings")
      .where("gameId", "==", gameId)
      .get();

    if (snapshot.empty) {
      return res.json({
        gameId,
        averageRating: 0,
        count: 0,
      });
    }

    let sum = 0;
    let count = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      sum += Number(data.rating);
      count++;
    });

    const averageRating = Number((sum / count).toFixed(2));

    res.json({
      gameId,
      averageRating,
      count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: додати нову оцінку гри
app.post("/api/ratings", async (req, res) => {
  try {
    const { gameId, rating, userEmail } = req.body;

    if (!gameId || !rating || !userEmail) {
      return res.status(400).json({
        error: "Потрібно передати gameId, rating і userEmail",
      });
    }

    if (Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({
        error: "Оцінка повинна бути від 1 до 5",
      });
    }

    const newRating = {
      gameId,
      rating: Number(rating),
      userEmail,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("ratings").add(newRating);

    res.status(201).json({
      message: "Оцінку успішно додано",
      id: docRef.id,
      data: newRating,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "Доступ до захищеного маршруту дозволено",
    user: {
      uid: req.user.uid,
      email: req.user.email || "Email відсутній"
    }
  });
});
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});