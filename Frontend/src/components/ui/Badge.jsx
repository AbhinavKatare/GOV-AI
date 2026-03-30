import React from 'react';
import { cn } from '../../lib/utils';

const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
    const variants = {
        default: 'bg-blue-100 text-blue-700 hover:bg-blue-200/80',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200/80',
        success: 'bg-green-100 text-green-700 hover:bg-green-200/80',
        warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200/80',
        danger: 'bg-red-100 text-red-700 hover:bg-red-200/80',
        outline: 'text-gray-950 border border-gray-200'
    };

    return (
        <div
            ref={ref}
            className={cn(
                'inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2',
                variants[variant],
                className
            )}
            {...props}
        />
    );
});

Badge.displayName = 'Badge';

export { Badge };
