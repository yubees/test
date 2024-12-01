import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className=" w-full h-[250px] sm:h-[200px] md:h-[250px] rounded-lg bg-gray-900" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[70%] bg-gray-900" />
                <Skeleton className="h-4 w-[50%] bg-gray-900" />
            </div>
        </div>
    );
}