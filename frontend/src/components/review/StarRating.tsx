import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
    value: number;
    onChange: (value: number) => void;
    readonly?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({
    value,
    onChange,
    readonly = false,
    size = 'md'
}) => {
    const [hoverValue, setHoverValue] = useState(0);

    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    const starSize = sizes[size];

    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= (hoverValue || value);
                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => !readonly && onChange(star)}
                        onMouseEnter={() => !readonly && setHoverValue(star)}
                        onMouseLeave={() => !readonly && setHoverValue(0)}
                        disabled={readonly}
                        className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
                    >
                        <Star
                            className={`${starSize} ${isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                        />
                    </button>
                );
            })}
        </div>
    );
};
