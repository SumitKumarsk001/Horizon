import { http, HttpResponse, delay } from "msw";
import { users, cardsDB, transactionsDB } from "./data";


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
   
    const user = users.find((u) => 
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
    
  console.log("Register Request:", body);
  console.log("Current Users:", users);
  
    const email = body.email.trim().toLowerCase();
    const existingUser = users.find(
    (u) => u.email === body.email
  );
    
console.log("Normalized email:", email);
console.log("Existing User:", existingUser);
console.log("Will return 400?", !!existingUser);
  
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

  return HttpResponse.json(cardsDB[email] || []);
}),
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

  if (!cardsDB[email]) {
    cardsDB[email] = [];
  }

  cardsDB[email].push(card);

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

const userCards = cardsDB[email] || [];

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

return HttpResponse.json({ success: true });
  }),

  // Transactions
  //----> GET Transactions
  http.get("/api/transactions", async ({ request }) => {
  await delay(800);

  const email = request.headers.get("x-user-email");

  if (!email) {
    return HttpResponse.json([], { status: 200 });
  }

  return HttpResponse.json(
    transactionsDB[email] || []
  );
}),
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

  if (!transactionsDB[email]) {
    transactionsDB[email] = [];
  }

  transactionsDB[email].unshift(transaction);

  return HttpResponse.json(transaction);
})

]
