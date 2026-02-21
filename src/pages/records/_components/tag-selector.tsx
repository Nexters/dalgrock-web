import { cn } from '@/utils/cn'

type CategorizedTags = readonly Record<string, readonly string[]>[]

type SingleSelectProps = {
  multiple?: false
  selectedId: string | null
  onChange: (id: string | null) => void
}

type MultiSelectProps = {
  multiple: true
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

type TagSelectorProps = {
  tags: readonly string[] | CategorizedTags
} & (SingleSelectProps | MultiSelectProps)

function isCategorizedTags(
  tags: readonly string[] | CategorizedTags
): tags is CategorizedTags {
  if (tags.length === 0) return false
  const firstItem = tags[0]
  return typeof firstItem === 'object' && !('id' in firstItem)
}

function TagButton({
  tag,
  isSelected,
  onClick
}: {
  tag: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full px-[14px] py-2  text-sm font-thin transition-colors',
        isSelected
          ? 'bg-gradient-to-b from-[#73F0DE] to-[#F4DD4B] text-gray-600 font-semibold'
          : 'bg-gray-500 text-gray-0 hover:bg-[#2f3340]'
      )}>
      {tag}
    </button>
  )
}

export function TagSelector(props: TagSelectorProps) {
  const { tags, multiple } = props

  const isSelected = (tagId: string) => {
    if (multiple) {
      return props.selectedIds.includes(tagId)
    }
    return props.selectedId === tagId
  }

  const handleTagClick = (tagId: string) => {
    if (multiple) {
      const { selectedIds, onChange } = props
      if (selectedIds.includes(tagId)) {
        onChange(selectedIds.filter(id => id !== tagId))
      } else {
        onChange([...selectedIds, tagId])
      }
    } else {
      const { selectedId, onChange } = props
      // 이미 선택된 태그를 다시 클릭하면 선택 해제
      if (selectedId === tagId) {
        onChange(null)
      } else {
        onChange(tagId)
      }
    }
  }

  if (isCategorizedTags(tags)) {
    return (
      <div className="flex flex-col gap-8">
        {tags.map(category => {
          const [title, categoryTags] = Object.entries(category)[0]

          return (
            <div
              key={title}
              className="flex flex-col gap-3">
              <label className="text-xs font-bold text-gray-100">{title}</label>
              <div className="flex flex-wrap gap-2">
                {categoryTags.map(tag => (
                  <TagButton
                    key={`${title}-${tag}`}
                    tag={tag}
                    isSelected={isSelected(tag)}
                    onClick={() => handleTagClick(tag)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <TagButton
          key={tag}
          tag={tag}
          isSelected={isSelected(tag)}
          onClick={() => handleTagClick(tag)}
        />
      ))}
    </div>
  )
}
