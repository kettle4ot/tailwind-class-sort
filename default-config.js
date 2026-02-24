/**
 * 기본 정렬 순서 (프로젝트에 tailwind-class-order.config.js 가 없을 때 사용)
 * 프로젝트 루트에 tailwind-class-order.config.js 를 두면 해당 설정이 우선합니다.
 */
/** 클래스 유틸리티 카테고리 순서 (앞일수록 먼저) */
export const CLASS_CATEGORY_ORDER = [
  // 0. Display — contents가 있으면 진짜 가장 앞 (0번)
  { order: 0, patterns: [/^contents$/] },
  // 1. z-index
  { order: 1, patterns: [/^z-[\d-]+/] },
  // 2. Position
  {
    order: 2,
    patterns: [/^relative$/, /^absolute$/, /^fixed$/, /^sticky$/],
  },
  // 3–7. Inset (inset-0 먼저, 그 다음 top → right → bottom → left)
  { order: 3, patterns: [/^inset-/] },
  { order: 4, patterns: [/^top-/] },
  { order: 5, patterns: [/^right-/] },
  { order: 6, patterns: [/^bottom-/] },
  { order: 7, patterns: [/^left-/] },
  // 8. Flex/Grid 자기 크기 (inset 뒤, display 앞 — shrink-0, flex-1 등)
  {
    order: 8,
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
  // 9. Display — 그 외 (hidden 제외)
  {
    order: 9,
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
  // 10. Display — hidden은 다른 display와 같이 쓸 때가 많으므로 맨 뒤
  { order: 10, patterns: [/^hidden$/] },
  // 11–16. Flex/Grid 레이아웃 (justify → items → content → flex-col → gap 순)
  { order: 11, patterns: [/^justify-/] },
  { order: 12, patterns: [/^items-/] },
  { order: 13, patterns: [/^content-/] },
  { order: 14, patterns: [/^flex-row/, /^flex-col/, /^flex-wrap/] },
  { order: 15, patterns: [/^gap-/] },
  { order: 16, patterns: [/^space-x-/, /^space-y-/] },
  // 17–23. 크기 (w → min-w → max-w → h → min-h → max-h → size, aspect 제외)
  { order: 17, patterns: [/^w-/] },
  { order: 18, patterns: [/^min-w-/] },
  { order: 19, patterns: [/^max-w-/] },
  { order: 20, patterns: [/^h-/] },
  { order: 21, patterns: [/^min-h-/] },
  { order: 22, patterns: [/^max-h-/] },
  { order: 23, patterns: [/^size-/] },
  // 24. Aspect (크기 뒤, margin 앞)
  { order: 24, patterns: [/^aspect-/] },
  // 25. Margin
  {
    order: 25,
    patterns: [
      /^m-/, /^mx-/, /^my-/, /^mt-/, /^mr-/, /^mb-/, /^ml-/,
      /^-m/, /^-mx/, /^-my/, /^-mt/, /^-mr/, /^-mb/, /^-ml/,
    ],
  },
  // 26. Padding
  {
    order: 26,
    patterns: [/^p-/, /^px-/, /^py-/, /^pt-/, /^pr-/, /^pb-/, /^pl-/],
  },
  // 27. Border radius
  { order: 27, patterns: [/^rounded-/] },
  // 28. Border
  { order: 28, patterns: [/^border$/, /^border-/, /^divide-/] },
  // 29. Ring / Outline (ring → outline)
  { order: 29, patterns: [/^ring-/, /^ring-offset-/] },
  { order: 30, patterns: [/^outline-/] },
  // 31. Background
  { order: 31, patterns: [/^bg-/] },
  // 32. Shadow
  { order: 32, patterns: [/^shadow-/] },
  // 33–35. Typography (text-size → font- → text-color/기타)
  {
    order: 33,
    patterns: [
      /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
      /^text-\d+/,
    ],
  },
  { order: 34, patterns: [/^font-/] },
  {
    order: 35,
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
  // 36. Fill / Stroke (타이포 뒤)
  { order: 36, patterns: [/^fill-/, /^stroke-/] },
  // 37. Effect (opacity 등)
  {
    order: 37,
    patterns: [
      /^opacity-/,
      /^visibility-/,
      /^mix-blend-/,
      /^backdrop-/,
    ],
  },
  // 38. Overflow (transition 앞)
  { order: 38, patterns: [/^overflow-/, /^overscroll-/] },
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
