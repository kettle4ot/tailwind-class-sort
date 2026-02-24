#!/usr/bin/env node
/**
 * Tailwind CSS 클래스 자동 정렬 CLI
 * - 프로젝트 루트의 tailwind-class-order.config.js 가 있으면 해당 설정 사용
 * - 없으면 패키지 내장 기본 설정 사용
 *
 * 사용: npx tailwind-class-sort "flex p-4 bg-white"
 *      npx tailwind-class-sort --dir src
 *      npx tailwind-class-sort --file src/App.tsx
 */
import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = process.cwd()

async function loadConfig() {
  const projectConfig = path.join(rootDir, "tailwind-class-order.config.js")
  if (fs.existsSync(projectConfig)) {
    try {
      const config = await import(pathToFileURL(projectConfig).href)
      return {
        CLASS_CATEGORY_ORDER: config.CLASS_CATEGORY_ORDER ?? config.default?.CLASS_CATEGORY_ORDER,
        MODIFIER_ORDER: config.MODIFIER_ORDER ?? config.default?.MODIFIER_ORDER,
      }
    } catch (_) {}
  }
  const defaultConfig = path.join(__dirname, "default-config.js")
  const config = await import(pathToFileURL(defaultConfig).href)
  return {
    CLASS_CATEGORY_ORDER: config.CLASS_CATEGORY_ORDER,
    MODIFIER_ORDER: config.MODIFIER_ORDER,
  }
}

function parseClass(cls) {
  const trimmed = cls.trim()
  if (!trimmed) return null
  let depth = 0
  let lastModifierColon = -1
  for (let i = 0; i < trimmed.length; i++) {
    const c = trimmed[i]
    if (c === "[") depth++
    else if (c === "]") depth--
    else if (c === ":" && depth === 0) lastModifierColon = i
  }
  if (lastModifierColon === -1) return { modifier: "", utility: trimmed }
  return {
    modifier: trimmed.slice(0, lastModifierColon + 1),
    utility: trimmed.slice(lastModifierColon + 1),
  }
}

function getCategoryOrder(utility, CLASS_CATEGORY_ORDER) {
  for (const { order, patterns } of CLASS_CATEGORY_ORDER) {
    for (const p of patterns) {
      if (p.test(utility)) return order
    }
  }
  return 999
}

function getModifierOrder(modifier, SORTED_MODIFIER_ORDER) {
  if (!modifier) return 0
  for (const { order, pattern } of SORTED_MODIFIER_ORDER) {
    if (pattern && pattern.test(modifier)) return order
  }
  return 999
}

function sortClassString(classString, CLASS_CATEGORY_ORDER, SORTED_MODIFIER_ORDER) {
  if (!classString || !classString.trim()) return classString
  const classes = classString.trim().split(/\s+/).filter(Boolean)
  const parsed = classes.map((c) => ({ raw: c, ...parseClass(c) })).filter((p) => p.utility)
  parsed.sort((a, b) => {
    const catA = getCategoryOrder(a.utility, CLASS_CATEGORY_ORDER)
    const catB = getCategoryOrder(b.utility, CLASS_CATEGORY_ORDER)
    if (catA !== catB) return catA - catB
    const modA = getModifierOrder(a.modifier, SORTED_MODIFIER_ORDER)
    const modB = getModifierOrder(b.modifier, SORTED_MODIFIER_ORDER)
    if (modA !== modB) return modA - modB
    return a.raw.localeCompare(b.raw)
  })
  return parsed.map((p) => p.raw).join(" ")
}

function processFileContent(content, sortClassStringFn) {
  let result = content
  result = result.replace(/className="([^"]*)"/g, (_, s) => `className="${sortClassStringFn(s)}"`)
  result = result.replace(/className='([^']*)'/g, (_, s) => `className='${sortClassStringFn(s)}'`)
  result = result.replace(/cn\s*\(\s*(["'])([^"']*)\1/g, (_, q, s) => `cn(${q}${sortClassStringFn(s)}${q}`)
  return result
}

async function main() {
  const { CLASS_CATEGORY_ORDER, MODIFIER_ORDER } = await loadConfig()
  const SORTED_MODIFIER_ORDER = (MODIFIER_ORDER || []).slice().sort((a, b) => a.order - b.order)
  const sortFn = (s) => sortClassString(s, CLASS_CATEGORY_ORDER, SORTED_MODIFIER_ORDER)

  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.log("사용법:")
    console.log('  npx tailwind-class-sort "flex p-4 bg-white"')
    console.log("  npx tailwind-class-sort --file <파일경로>")
    console.log("  npx tailwind-class-sort --dir [디렉터리]  (기본: src)")
    process.exit(0)
  }

  if (args[0] !== "--file" && args[0] !== "--dir") {
    console.log(sortFn(args.join(" ")))
    return
  }

  if (args[0] === "--file") {
    const filePath = path.resolve(rootDir, args[1])
    if (!fs.existsSync(filePath)) {
      console.error("파일 없음:", filePath)
      process.exit(1)
    }
    const content = fs.readFileSync(filePath, "utf8")
    const out = processFileContent(content, sortFn)
    if (out !== content) {
      fs.writeFileSync(filePath, out)
      console.log("정렬 완료:", filePath)
    } else {
      console.log("변경 없음:", filePath)
    }
    return
  }

  if (args[0] === "--dir") {
    const dir = path.resolve(rootDir, args[1] || "src")
    const exts = [".tsx", ".jsx", ".ts", ".js"]
    let changed = 0
    function walk(d) {
      if (!fs.existsSync(d)) return
      const entries = fs.readdirSync(d, { withFileTypes: true })
      for (const e of entries) {
        const full = path.join(d, e.name)
        if (e.isDirectory() && e.name !== "node_modules" && e.name !== ".git") walk(full)
        else if (e.isFile() && exts.some((x) => e.name.endsWith(x))) {
          const content = fs.readFileSync(full, "utf8")
          const out = processFileContent(content, sortFn)
          if (out !== content) {
            fs.writeFileSync(full, out)
            changed++
            console.log("정렬:", full)
          }
        }
      }
    }
    walk(dir)
    console.log(changed ? `총 ${changed}개 파일 정렬됨` : "변경된 파일 없음")
  }
}

main()
