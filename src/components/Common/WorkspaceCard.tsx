type WorkspaceCardProps = {
    title?: string;
    length?:number;
    children: React.ReactNode;
    className?: string;
};

const WorkspaceCard = ({
    title,
    length,
    children,
    className = "",
}: WorkspaceCardProps) => {
    return (
        <div
            className={`rounded-2xl bg-white p-6 shadow dark:bg-slate-800 ${className}`}
        >
            {title && (
                <h2 className="mb-6 text-xl font-semibold dark:text-white">
                    {title}
                </h2>
            )}
            {length?(
                <p className="mt-4 text-4xl font-bold text-green-600">
                    {length}
                </p>
            ):<p className="mt-4 text-4xl font-bold text-green-600">
                    {length}
                </p>}

            {children}
        </div>
    );
};

export default WorkspaceCard;