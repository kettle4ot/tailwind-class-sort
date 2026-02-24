/**
 * 기본 정렬 순서 (프로젝트에 tailwind-class-order.config.js 가 없을 때 사용)
 * 프로젝트 루트에 tailwind-class-order.config.js 를 두면 해당 설정이 우선합니다.
 */
/** 클래스 유틸리티 카테고리 순서 (앞일수록 먼저) */
export const CLASS_CATEGORY_ORDER = [
  // 0. Display — contents가 있으면 진짜 가장 앞 (0번)
  { order: 0, patterns: [/^contents$/] },
  // 1. Overflow (position 앞)
  { order: 1, patterns: [/^overflow-/, /^overscroll-/] },
  // 2. z-index
  { order: 2, patterns: [/^z-[\d-]+/] },
  // 3. Position
  {
    order: 3,
    patterns: [/^relative$/, /^absolute$/, /^fixed$/, /^sticky$/],
  },
  // 4–8. Inset (inset-0 먼저, 그 다음 top → right → bottom → left)
  { order: 4, patterns: [/^inset-/] },
  { order: 5, patterns: [/^top-/] },
  { order: 6, patterns: [/^right-/] },
  { order: 7, patterns: [/^bottom-/] },
  { order: 8, patterns: [/^left-/] },
  // 9. Flex/Grid 자기 크기 (inset 뒤, display 앞 — shrink-0, flex-1 등)
  {
    order: 9,
    patterns: [
      /^shrink-/,
      /^grow-/,
      /^basis-/,
      /^flex-1$/,
      /^flex-shrink/,
      /^flex-grow/,
      /^flex-\d/,
    ],
  },
  // 10. Display — 그 외 (hidden 제외)
  {
    order: 10,
    patterns: [
      /^inline$/,
      /^block$/,
      /^inline-block$/,
      /^flex$/,
      /^inline-flex$/,
      /^grid$/,
      /^table$/,
    ],
  },
  // 11. Display — hidden은 다른 display와 같이 쓸 때가 많으므로 맨 뒤
  { order: 11, patterns: [/^hidden$/] },
  // 12–17. Flex/Grid 레이아웃 (justify → items → content → flex-col → gap 순)
  { order: 12, patterns: [/^justify-/] },
  { order: 13, patterns: [/^items-/] },
  { order: 14, patterns: [/^content-/] },
  { order: 15, patterns: [/^flex-row/, /^flex-col/, /^flex-wrap/] },
  { order: 16, patterns: [/^gap-/] },
  { order: 17, patterns: [/^space-x-/, /^space-y-/] },
  // 18–24. 크기 (w → min-w → max-w → h → min-h → max-h → size, aspect 제외)
  { order: 18, patterns: [/^w-/] },
  { order: 19, patterns: [/^min-w-/] },
  { order: 20, patterns: [/^max-w-/] },
  { order: 21, patterns: [/^h-/] },
  { order: 22, patterns: [/^min-h-/] },
  { order: 23, patterns: [/^max-h-/] },
  { order: 24, patterns: [/^size-/] },
  // 25. Aspect (크기 뒤, margin 앞)
  { order: 25, patterns: [/^aspect-/] },
  // 26. Margin
  {
    order: 26,
    patterns: [
      /^m-/, /^mx-/, /^my-/, /^mt-/, /^mr-/, /^mb-/, /^ml-/,
      /^-m/, /^-mx/, /^-my/, /^-mt/, /^-mr/, /^-mb/, /^-ml/,
    ],
  },
  // 27. Padding
  {
    order: 27,
    patterns: [/^p-/, /^px-/, /^py-/, /^pt-/, /^pr-/, /^pb-/, /^pl-/],
  },
  // 28. Border radius
  { order: 28, patterns: [/^rounded-/] },
  // 29. Border
  { order: 29, patterns: [/^border$/, /^border-/, /^divide-/] },
  // 30. Ring / Outline (ring → outline)
  { order: 30, patterns: [/^ring-/, /^ring-offset-/] },
  { order: 31, patterns: [/^outline-/] },
  // 32. Background
  { order: 32, patterns: [/^bg-/] },
  // 33. Shadow
  { order: 33, patterns: [/^shadow-/] },
  // 34–36. Typography (text-size → font- → text-color/기타)
  {
    order: 34,
    patterns: [
      /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
      /^text-\d+/,
    ],
  },
  { order: 35, patterns: [/^font-/] },
  {
    order: 36,
    patterns: [
      /^text-/,
      /^leading-/,
      /^tracking-/,
      /^whitespace-/,
      /^break-/,
      /^truncate$/,
      /^line-clamp-/,
      /^tabular-/,
      /^text-left$/,
      /^text-right$/,
      /^text-center$/,
    ],
  },
  // 37. Fill / Stroke (타이포 뒤)
  { order: 37, patterns: [/^fill-/, /^stroke-/] },
  // 38. Effect (opacity 등)
  {
    order: 38,
    patterns: [
      /^opacity-/,
      /^visibility-/,
      /^mix-blend-/,
      /^backdrop-/,
    ],
  },
  // 39–41. Transition (transition → duration → ease)
  { order: 39, patterns: [/^transition-/] },
  { order: 40, patterns: [/^duration-/] },
  { order: 41, patterns: [/^ease-/, /^animate-/, /^will-change-/] },
  // 42. Transform
  {
    order: 42,
    patterns: [
      /^translate-/,
      /^-translate-/,
      /^rotate-/,
      /^scale-/,
      /^origin-/,
    ],
  },
  // 43. Interactivity
  {
    order: 43,
    patterns: [
      /^cursor-/,
      /^pointer-events-/,
      /^resize-/,
      /^select-/,
      /^appearance-/,
    ],
  },
  // 44. 기타 레이아웃
  { order: 44, patterns: [/^object-/, /^float-/, /^clear-/] },
  // 45. 스크린리더 등
  { order: 45, patterns: [/^sr-only$/, /^not-sr-only$/] },
]

/** 수정자(prefix) 순서: base → 미디어 쿼리(sm:, md:) → 그 외 variant → group/peer/has/data → arbitrary */
export const MODIFIER_ORDER = [
  { order: 0, pattern: /^(?!.*[:\[\]])/ },
  {
    order: 1,
    pattern: /^(min-|max-)?(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl):/,
  },
  { order: 2, pattern: /^group[\-\/]|^peer[\-\/]|^has-|^data-/ },
  { order: 3, pattern: /^[\w\-]+:/ },
  { order: 4, pattern: /^\[&|^after:|^before:|^file:|^placeholder:|^selection:|^aria-/ },
]

export default {
  CLASS_CATEGORY_ORDER,
  MODIFIER_ORDER,
}
