import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'default' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group',
          {
            'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5': variant === 'default',
            'border-2 border-gray-200 bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white hover:border-green-300 hover:text-green-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5': variant === 'outline',
            'text-gray-900 hover:bg-gray-50/80 hover:text-gray-900': variant === 'ghost',
            'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5': variant === 'destructive',
          },
          {
            'h-9 px-4 text-xs': size === 'sm',
            'h-12 px-6 py-3': size === 'default',
            'h-14 px-8 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }