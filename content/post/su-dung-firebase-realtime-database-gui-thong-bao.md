---
title: "Sử dụng Firebase Realtime Database để gửi thông báo cho người dùng trong web app"
type: "post"
date: 2022-07-12T17:09:16+07:00
description: "Hướng dẫn setup và code sample sử dụng ReactJS"
keywords: ["firebase", "notifications"]
categories: ["cheatsheet"]
tags: []
image: "https://user-images.githubusercontent.com/31009750/178468844-4ee1f036-78cc-44fd-8185-5092b5863494.png"
---

# Firebase Realtime Database

## Create new project

- https://console.firebase.google.com/u/0/

> Step 1

![image](https://user-images.githubusercontent.com/31009750/178453011-1da71561-f7bd-48b3-a1a8-6d7be34cfbce.png)

> Step 2

![image](https://user-images.githubusercontent.com/31009750/178453101-e9996701-2501-44b7-9b7a-78f147dff2e6.png)

> Step 3

![image](https://user-images.githubusercontent.com/31009750/178453680-40f3be23-7617-421c-96a4-026645a209cb.png)

## Add new firebase realtime database

![image](https://user-images.githubusercontent.com/31009750/178453976-2a3cb1b9-a29c-4388-821d-6d5c3332eb37.png)

![image](https://user-images.githubusercontent.com/31009750/178454046-0ededf24-8b2d-49cd-aacc-28fe3afda63c.png)

> Select your database region

![image](https://user-images.githubusercontent.com/31009750/178454178-27d15fe7-ce37-4877-9b52-9c6731873014.png)

> Test Mode Enable

![image](https://user-images.githubusercontent.com/31009750/178454308-bc61aeaf-b33b-4967-900f-95b185b6fba1.png)

> Finally, you will have this new database with the generated URI

![image](https://user-images.githubusercontent.com/31009750/178454580-f47f1d29-a68a-4a8a-80e2-589d0551881b.png)

## Let’s design a simple notification database

```json
{
  "notifications": {
    "1": [
      {
        "userId": 1,
        "notificationId": 1,
        "content": "hello",
        "notificationType": 1,
        "isRead": false,
        "isSent": false
      },
      {
        "userId": 1,
        "notificationId": 2,
        "content": "hey",
        "notificationType": 2,
        "isRead": false,
        "isSent": false
      }
    ],
    "2": [
      {
        "userId": 2,
        "notificationId": 3,
        "content": "heyo",
        "notificationType": 1,
        "isRead": false,
        "isSent": false
      }
    ]
  }
}
```

> Import

![image](https://user-images.githubusercontent.com/31009750/178457594-8e3aaa23-07fe-40d5-92d5-a5538fd44eb9.png)

> After imported

![image](https://user-images.githubusercontent.com/31009750/178465807-7e534b24-a9de-4a1f-b2ea-75ad9a599e76.png)

> Connect and get DB instance

```js
/* eslint-disable import/no-anonymous-default-export */
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export default {
  getInstance: (databaseURL) => {
    const firebaseConfig = {
      // ...
      // The value of `databaseURL` depends on the location of the database
      databaseURL,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Realtime Database and get a reference to the service
    return getDatabase(app);
  },
};
```

> Subscribe for changes

- [Ref](https://firebase.google.com/docs/database/web/read-and-write#write_data)

```jsx
function App() {
  const [notifications, setNotifications] = useState([]);
  const subcribeOnNotification = () => {
    const db = firebaseService.getInstance(FIREBASE_DATABASE_URL);
    const userId = 1;
    const dbRef = ref(db, "/notifications/" + userId);
    onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.val()) {
          setNotifications([...notifications, ...snapshot.val()]);
        }
      },
      {
        onlyOnce: false,
      }
    );
  };
  // init
  useEffect(() => {
    subcribeOnNotification();
  }, []);
  return (
    <>
      <h1>Firebase Realtime Database Notififcation Sample</h1>
      <ul>
        {notifications.map((n) => (
          <li key={n.notificationId}>{JSON.stringify(n)}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
```
