import {
  FiPlus,
} from "react-icons/fi";

import {  useState,useEffect } from "react";
import AddCardModal from "./AddCardModal";
import Button from "../../components/FormComponent/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addCard,setCards,} from "../../features/cards/cardSlice";
import type { Card} from "../../features/cards/cardSlice";
import { getCardsApi, addCardsApi, } from "../../services/cardService";
import PageHeader from "../../components/Common/PageHeader";
import { toast } from "react-toastify";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import CardItem from "./CardItems";
import SummaryCards from "./SummaryCards";
import OfflineFallback from "../../components/Common/OfflineFallback";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import ErrorFallback from "../../components/Common/ErrorFallback";



const parseUserName = () => {
  if (typeof window === "undefined") return "";
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return "";

  try {
    const user = JSON.parse(storedUser) as {
      firstName?: string;
      lastName?: string;
    };
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  } catch {
    return "";
  }
};



const Cards = () => {
  const userName = parseUserName() || "Card Holder";
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards.cards);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userEmail = currentUser.email;

  const [open, setOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [apiError, setApiError] =useState(false);

 useEffect(() => {

 const fetchCards = async () => {
  setApiError(false);

  try {
    const response = await getCardsApi(userEmail);

    dispatch(setCards(response.data));
  } catch (error) {
    console.error(error);

    setApiError(true);
  }
};

fetchCards();
}, [dispatch,userEmail]);

  const handleAddCard = async (card: Card) => {
  try {
    const response = await addCardsApi(card,userEmail);

    dispatch(addCard(response.data));
    
    setOpen(false);
    toast.success("Card Add Successfully");
  } catch (error) {
    console.error(error);
  }
};

 const online = useNetworkStatus();
 if (!online) {
  return (
    <OfflineFallback
      onRetry={() => window.location.reload()}
    />
  );
} 
if (apiError) {
  return (
    <ErrorFallback
      onRetry={() => window.location.reload()}
    />
  );
}
 
  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
    title="My Cards"
    subtitle="Manage your debit and credit cards."
    action={
        <Button
            type="button"
            variant="primary"
            className="w-auto flex items-center gap-2 px-5 py-3"
            onClick={() => setOpen(true)}
        >
            <FiPlus />
            Add Card
        </Button>
         }
     />

       <AddCardModal
       key={editingCard ? `edit-${editingCard.id}` : "add"}
       open={open}
       initialCard={editingCard}
       onClose={() => {
         setOpen(false);
         setEditingCard(null);
       }}
       onAdd={handleAddCard}
       />

      {/* Cards Grid */}
     <ErrorBoundary>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {cards.map((card) => (
      <CardItem
        key={card.id}
        card={card}
        userName={userName}
      />
    ))}
     </div>
     </ErrorBoundary>
     
      {/* Summary Cards */}
     <ErrorBoundary>
  <SummaryCards cards={cards} />
    </ErrorBoundary>
    </div>
  );
};

export default Cards;