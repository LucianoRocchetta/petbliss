export const ProductCardSkeleton = () => {
    return (
        <div className="w-full bg-zinc-700 animate-pulse rounded-2xl min-h-80 p-5 space-y-2 flex flex-col items-center justify-between">
            <div className="bg-zinc-600 w-full h-64 rounded-2xl"></div>
            <div className="flex w-full items-center justify-between">
                <div className="w-3/4 space-y-2">
                <div className="bg-zinc-600 p-3"></div>
                <div className="bg-zinc-600 p-3"></div>
                </div>
                <div className="w-12 h-12 bg-zinc-600 rounded-full"></div>
            </div>
        </div>
    )
}