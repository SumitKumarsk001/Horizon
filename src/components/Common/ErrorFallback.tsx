import Button from "../FormComponent/Button";

interface Props {
  onRetry: () =>void;
}

const ErrorFallback = ({ onRetry }: Props) => {
  return (
    <div className="rounded-xl border border-red-300 bg-red-50 p-8 text-center dark:border-red-700 dark:bg-slate-900">
      <h2 className="text-2xl font-bold text-red-600">
        ⚠ Something went wrong
      </h2>

      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Unable to load data.
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

export default ErrorFallback;