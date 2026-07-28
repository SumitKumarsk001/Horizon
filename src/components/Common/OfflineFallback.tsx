import Button from "../FormComponent/Button";

interface Props {
  onRetry: () => void;
}

const OfflineFallback = ({ onRetry }: Props) => {
  return (
    <div className="rounded-xl border border-orange-300 bg-orange-50 p-8 text-center dark:border-orange-600 dark:bg-slate-900">
      <h2 className="text-2xl font-bold text-orange-600">
        📡 You are Offline
      </h2>

      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Please check your internet connection.
      </p>

      <Button
        type="button"
        variant="primary"
        className="mt-6"
        onClick={onRetry}
      >
        Retry
      </Button>
    </div>
  );
};

export default OfflineFallback;