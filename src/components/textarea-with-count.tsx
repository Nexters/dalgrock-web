import { Textarea } from './ui/textarea'

interface TextareaWithCountProps extends React.ComponentProps<'textarea'> {
  maxLength: number
}

export function TextareaWithCount({
  value,
  onChange,
  maxLength,
  ...props
}: TextareaWithCountProps) {
  return (
    <div className="flex flex-col gap-2">
      <Textarea
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        {...props}
      />
      <div className="text-right text-xs text-gray-200">
        {typeof value === 'string' || Array.isArray(value) ? value.length : 0} /{' '}
        {maxLength}
      </div>
    </div>
  )
}
