import { cn } from '@/lib/utils';
import type { Review } from '@/lib/reviewsData';

type Props = {
  review: Review;
};

export function ReviewCard({ review }: Props) {
  const renderRating = (rating: number) => (
    <div className="flex justify-end items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            'h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full border border-white/30 transition',
            index < rating ? 'bg-white' : 'bg-white/10',
          )}
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row items-between md:items-center justify-between gap-2">
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            className={cn(
              'flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br text-xs sm:text-sm font-semibold uppercase text-ink',
              review.avatar.gradient,
            )}
            aria-hidden
          >
            {review.avatar.initials}
          </span>
          <div>
            <p className="text-sm sm:text-base font-semibold tracking-tight text-cloud">{review.name}</p>
            <p className="text-xs sm:text-sm text-cloud/60">
              {review.role} · {review.company}
            </p>
          </div>
        </div>
        {renderRating(review.rating)}
      </div>

      <blockquote className="text-balance text-base sm:text-lg md:text-xl font-medium italic text-cloud/90 max-h-[55%] overflow-auto">
        &quot;{review.quote}&quot;
      </blockquote>
    </>
  );
}

export default ReviewCard;
