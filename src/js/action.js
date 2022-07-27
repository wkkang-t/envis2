import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5oEh81tf0d6K6CaodIr5boowlWLCAf4U",
  authDomain: "test-6127b.firebaseapp.com",
  databaseURL: "https://test-6127b-default-rtdb.firebaseio.com",
  projectId: "test-6127b",
  storageBucket: "test-6127b.appspot.com",
  messagingSenderId: "631995033789",
  appId: "1:631995033789:web:c0ac0e5fb01e942e8d2fd4",
  measurementId: "G-DL2NMGGT8G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const table = "coordinates";
const db = getDatabase(app);
const dbRef = ref(db);

const search = document.getElementById("search");
const saveBtn = document.getElementById("save");
const queryBtn = document.getElementById("query");
const output = document.getElementById("output");

saveBtn.onclick = async () => {
  const key = search.value;
  if (!key) {
    alert("Enter a serial number to query");
    return;
  }

  const mainSnapshot = await get(child(dbRef, `${table}/main`));
  const mainSnapshotVal = mainSnapshot.val();
  let snapshotAdd = [];

  const snapshot = await get(child(dbRef, `${table}/${key}`));
  if (snapshot.exists()) {
    const snapshotVals = snapshot.val();
    snapshotVals.push(mainSnapshotVal);
    snapshotAdd = snapshotVals;
  } else {
    snapshotAdd = [mainSnapshotVal];
  }

  await set(ref(db, `${table}/${key}`), snapshotAdd);

  output.innerText = "Saved Successfully.";
};

queryBtn.onclick = async () => {
  const key = search.value;
  if (!key) {
    alert("Enter a serial number to query");
    return;
  }

  const snapshot = await get(child(dbRef, `${table}/${key}`));
  if (snapshot.exists()) {
    const res = snapshot.val();
    output.innerHTML = JSON.stringify(res);
  } else {
    output.innerText = "No data available";
  }
};
