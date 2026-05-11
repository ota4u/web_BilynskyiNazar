import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const [protectedMessage, setProtectedMessage] = useState("");
async function handleProtectedRequest() {
  if (!currentUser) {
    setProtectedMessage("Спочатку потрібно увійти в систему");
    return;
  }

  try {
    const idToken = await currentUser.getIdToken();

    const response = await fetch("http://localhost:5050/api/protected", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setProtectedMessage(data.error || "Помилка доступу");
      return;
    }

    setProtectedMessage(`${data.message}. Користувач: ${data.user.email}`);
  } catch (error) {
    setProtectedMessage(`Помилка запиту: ${error.message}`);
  }
}
function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  async function saveUserToFirestore(user) {
    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        createdAt: new Date().toISOString(),
      },
      { merge: true }
    );
  }

  async function handleRegister() {
    if (!email || !password) {
      setMessage("Введіть email і пароль");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await saveUserToFirestore(userCredential.user);

      setMessage(`Користувача ${userCredential.user.email} успішно зареєстровано`);
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(`Помилка реєстрації: ${error.message}`);
    }
  }

  async function handleLogin() {
    if (!email || !password) {
      setMessage("Введіть email і пароль");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setMessage(`Вхід виконано: ${userCredential.user.email}`);
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(`Помилка входу: ${error.message}`);
    }
  }

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await saveUserToFirestore(result.user);

      setMessage(`Вхід через Google виконано: ${result.user.email}`);
    } catch (error) {
      setMessage(`Помилка входу через Google: ${error.message}`);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      setMessage("Користувач вийшов із системи");
    } catch (error) {
      setMessage(`Помилка виходу: ${error.message}`);
    }
  }

  return (
    <div className="auth-page">
      <h2>Реєстрація та вхід</h2>

      <div className="auth-form">
        <input
          type="email"
          placeholder="Введіть email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Введіть пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="auth-buttons">
          <button onClick={handleRegister}>Зареєструватися</button>
          <button onClick={handleLogin}>Увійти</button>
          <button onClick={handleGoogleLogin}>Увійти через Google</button>
          <button onClick={handleLogout}>Вийти</button>
          <button onClick={handleProtectedRequest}>Перевірити захищений маршрут</button>
        </div>

        <p className="auth-message">{message}</p>
        <p className="auth-message">{protectedMessage}</p>

        <div className="auth-status">
          <h3>Статус автентифікації</h3>
          {currentUser ? (
            <p>Користувач увійшов: {currentUser.email}</p>
          ) : (
            <p>Користувач не увійшов у систему</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;