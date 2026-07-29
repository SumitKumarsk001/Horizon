import { http, HttpResponse, delay } from "msw";
import { sidebarItems } from "../components/Sidebar/sidebarData";
import { usersStorage,cardsStorage, transactionsStorage } from "../hooks/useOfflineSync";
import type { User } from "../features/auth/authSlice";

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

type CardRequest = {
  id: number;
  holder: string;
  number: string;
  balance: string;
  expiry: string;
  color: string;
};

type TransactionRequest = {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
  status: "Income" | "Expense";
};

export const handlers = [

  // Login
  http.post("/api/login", async ({ request }) => {
   
    await delay(1000);

    const body = (await request.json()) as LoginRequest;
   
   const users =
  (await usersStorage.getItem<User[]>("users")) || [];

const user = users.find(
  (u) =>
    u.email === body.email &&
    u.password === body.password
);
  

    if (!user) {
      return HttpResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      token: "fake-jwt-token",
      user,
    });
  }),

  // Register
  http.post("/api/register", async ({ request }) => {

    await delay(1000);
    
    const body = (await request.json()) as RegisterRequest;
    
  
  
   const users =
  (await usersStorage.getItem<User[]>("users")) || [];

  const existingUser = users.find(
  (u) => u.email === body.email
  );
    
  
  if (existingUser) {
    return HttpResponse.json(
      {
        message: "Email already exists",
      },
      {
        status: 400,
      }
    );
  }
   const newUser = {
    id: Date.now(),
     ...body,
    };
    users.push(newUser);
  await usersStorage.setItem("users", users);
  await cardsStorage.setItem(newUser.email, []);
  await transactionsStorage.setItem(newUser.email, []);

  return HttpResponse.json({
  success: true,
  token: "fake-jwt-token", 
  user: newUser,
  });
}),

  // Cards
  //----> GET Cards
http.get("/api/cards", async ({ request }) => {
  await delay(800);

  const email = request.headers.get("x-user-email");

  if (!email) {
    return HttpResponse.json([], { status: 200 });
  }

 const cards = (await cardsStorage.getItem<CardRequest[]>(email)) || [];

return HttpResponse.json(cards);
}),
// http.get("/api/cards", async () => {  // this is for testing when API crash
//   return HttpResponse.json(
//     {
//       message: "Server Error",
//     },
//     {
//       status: 500,
//     }
//   );
// }),
// ----> POST Cards
http.post("/api/cards", async ({ request }) => {
  await delay(800);

  const email = request.headers.get("x-user-email");

  if (!email) {
    return HttpResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const card = (await request.json()) as CardRequest;

  const cards =
  (await cardsStorage.getItem<CardRequest[]>(email)) || [];

    cards.push(card);

   await cardsStorage.setItem(email, cards);

    return HttpResponse.json(card);
}),
//---> DELETE Cards
http.delete("/api/cards/:id", async ({ params,request }) => {
    await delay(400);

const email = request.headers.get("x-user-email");

if (!email) {
  return HttpResponse.json(
    { message: "Unauthorized" },
    { status: 401 }
  );
}

const cardId = Number(params.id);

const userCards =(await cardsStorage.getItem<CardRequest[]>(email)) || [];

const index = userCards.findIndex(
  (card) => card.id === cardId
);

if (index === -1) {
  return HttpResponse.json(
    { message: "Card not found" },
    { status: 404 }
  );
}

userCards.splice(index, 1);
await cardsStorage.setItem(email, userCards);
return HttpResponse.json({ success: true });
  }),

  // Transactions
  
  // ----> GET Transactions
http.get("/api/transactions", async ({ request }) => {
  await delay(800);

  const email = request.headers.get("x-user-email");

  if (!email) {
    return HttpResponse.json([], { status: 200 });
  }

  const url = new URL(request.url);

  const search =
    url.searchParams.get("search")?.toLowerCase() || "";

  const filter =
    url.searchParams.get("filter") || "All";

  let transactions =
  (await transactionsStorage.getItem<TransactionRequest[]>(email)) || [];

  // Search
  if (search) {
    transactions = transactions.filter((transaction) =>
      transaction.title.toLowerCase().includes(search)
    );
  }

  // Filter
  if (filter !== "All") {
    transactions = transactions.filter(
      (transaction) => transaction.status === filter
    );
  }

  return HttpResponse.json(transactions);
}),
// http.get("/api/transactions", async () => {  // this is for testing when API crash
//   return HttpResponse.json(
//     {
//       message: "Server Error",
//     },
//     {
//       status: 500,
//     }
//   );
// }),
//----> POST Transactions 
http.post("/api/transactions", async ({ request }) => {
  await delay(800);

  const email = request.headers.get("x-user-email");

  if (!email) {
    return HttpResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const transaction =
    (await request.json()) as TransactionRequest;

  const transactions =
  (await transactionsStorage.getItem<TransactionRequest[]>(email)) || [];

   transactions.unshift(transaction);

   await transactionsStorage.setItem(email, transactions);

  return HttpResponse.json(transaction);
})
,

// API-based Search
http.get("/api/search", async ({ request }) => {

    await delay(500);

    const url = new URL(request.url);

    const query =
        url.searchParams.get("q")?.toLowerCase() || "";

    const results = sidebarItems.filter(item =>
        item.title.toLowerCase().includes(query)
    );

    return HttpResponse.json(results);
})
,

]
