import WorkspaceCard from "../../components/Common/WorkspaceCard";
import type { Card } from "../../features/cards/cardSlice";

interface SummaryCardsProps {
  cards: Card[];
}

const SummaryCards = ({ cards }: SummaryCardsProps) => {
  // Uncomment only for testing
  //throw new Error("Summary Cards crashed");

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <WorkspaceCard title="Total Cards" length={cards.length} children />

      <WorkspaceCard title="Active Cards" length={cards.length} children />

      <WorkspaceCard title="Monthly Spending">
        <p className="mt-4 text-4xl font-bold text-red-500">
          $2,480
        </p>
      </WorkspaceCard>
    </div>
  );
};

export default SummaryCards;