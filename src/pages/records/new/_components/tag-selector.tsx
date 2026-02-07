import { cn } from '@/utils/cn'

interface Tag {
  readonly id: string
  readonly label: string
}

type CategorizedTags = readonly Record<string, readonly Tag[]>[]

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
  tags: readonly Tag[] | CategorizedTags
} & (SingleSelectProps | MultiSelectProps)

function isCategorizedTags(
  tags: readonly Tag[] | CategorizedTags
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
  tag: Tag
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full px-3 py-2 text-gray-0 text-xs font-regular transition-colors',
        isSelected
          ? 'bg-gradient-to-b from-[#73F0DE] to-[#F4DD4B] text-gray-900'
          : 'bg-[#262930] text-gray-300 hover:bg-[#2f3340]'
      )}>
      {tag.label}
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
      <div className="flex flex-col gap-4">
        {tags.map(category => {
          const [title, categoryTags] = Object.entries(category)[0]

          return (
            <div
              key={title}
              className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-0">{title}</span>
              <div className="-mx-5 flex gap-2 overflow-x-auto px-5 scrollbar-hide">
                {categoryTags.map(tag => (
                  <TagButton
                    key={tag.id}
                    tag={tag}
                    isSelected={isSelected(tag.id)}
                    onClick={() => handleTagClick(tag.id)}
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
    <div className="-mx-5 flex gap-2 overflow-x-auto px-5 scrollbar-hide">
      {tags.map(tag => (
        <TagButton
          key={tag.id}
          tag={tag}
          isSelected={isSelected(tag.id)}
          onClick={() => handleTagClick(tag.id)}
        />
      ))}
    </div>
  )
}
