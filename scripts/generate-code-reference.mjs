import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "PROJECT_CODE_REFERENCE.md");

const INCLUDE_DIRS = ["src", "prisma", "scripts", "public"];
const INCLUDE_ROOT = [
  "next.config.ts",
  "instrumentation.ts",
  "package.json",
  "tsconfig.json",
].filter((f) => fs.existsSync(path.join(ROOT, f)));

const EXT = new Set([".ts", ".tsx", ".css", ".mjs", ".json", ".svg", ".prisma"]);

function describe(file) {
  const p = file.replace(/\\/g, "/");

  if (p === "src/middleware.ts") {
    return { layer: "미들웨어", role: "요청 가로채기 · 인증 · 뷰모드 처리" };
  }
  if (p === "src/auth.ts") {
    return { layer: "인증", role: "NextAuth v5 진입점 · 세션/프로바이더 설정" };
  }
  if (p === "src/auth.config.ts") {
    return { layer: "인증", role: "NextAuth 설정 분리" };
  }
  if (p.startsWith("src/app/api/")) {
    return { layer: "API Route", role: "HTTP API 엔드포인트 (Route Handler)" };
  }
  if (/src\/app\/[^/]+\/page\.tsx$/.test(p)) {
    return { layer: "App Router 페이지", role: "URL 페이지 컴포넌트 (Server/Client)" };
  }
  if (p === "src/app/layout.tsx") {
    return { layer: "App Router 루트", role: "전역 레이아웃 · 폰트 · 메타데이터" };
  }
  if (p === "src/app/globals.css") {
    return { layer: "전역 스타일", role: "디자인 토큰 · 홈 UI · 공통 CSS" };
  }
  if (p.startsWith("src/features/") && p.includes("/components/")) {
    return { layer: "Feature UI", role: "기능별 React 컴포넌트 (프레젠테이션)" };
  }
  if (p.startsWith("src/features/") && p.includes("/server/")) {
    return { layer: "Feature Server", role: "기능별 서버 로직 · DB · 비즈니스 규칙" };
  }
  if (p.startsWith("src/features/") && p.includes("/lib/")) {
    return { layer: "Feature Lib", role: "기능별 유틸 · 필터 · 매핑" };
  }
  if (p.startsWith("src/features/") && p.includes("/data/")) {
    return { layer: "Feature Data", role: "정적 데이터 · 목업 · 시드" };
  }
  if (p.endsWith("/index.ts") && p.startsWith("src/features/")) {
    return { layer: "Feature Barrel", role: "기능 모듈 public export" };
  }
  if (p.startsWith("src/server/")) {
    return { layer: "Shared Server", role: "외부 API 어댑터 · 공통 서버 유틸" };
  }
  if (p.startsWith("src/shared/ui/")) {
    return { layer: "Shared UI", role: "재사용 UI 컴포넌트" };
  }
  if (p.startsWith("src/shared/layout/")) {
    return { layer: "Shared Layout", role: "헤더 · 푸터 · 사이드바 · 셸" };
  }
  if (p.startsWith("src/shared/lib/")) {
    return { layer: "Shared Lib", role: "상수 · 공통 유틸" };
  }
  if (p.startsWith("src/shared/hooks/")) {
    return { layer: "Shared Hook", role: "공통 React 훅" };
  }
  if (p.startsWith("src/shared/providers")) {
    return { layer: "Shared Provider", role: "React Context/Provider 래퍼" };
  }
  if (p.startsWith("src/types/")) {
    return { layer: "Types", role: "전역 TypeScript 타입 확장" };
  }
  if (p.startsWith("prisma/")) {
    return { layer: "Database", role: "Prisma 스키마 · DB 모델" };
  }
  if (p.startsWith("scripts/")) {
    return { layer: "Scripts", role: "개발/검증/시드 스크립트" };
  }
  if (p.startsWith("public/")) {
    return { layer: "Static", role: "정적 에셋" };
  }
  return { layer: "기타", role: "프로젝트 설정 · 보조 파일" };
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full).replace(/\\/g, "/");
    if (name === "node_modules" || name === ".next" || name === ".git") continue;
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (EXT.has(path.extname(name))) acc.push(rel);
  }
  return acc;
}

function langFor(file) {
  const ext = path.extname(file).slice(1);
  if (ext === "tsx") return "tsx";
  if (ext === "ts") return "typescript";
  if (ext === "css") return "css";
  if (ext === "prisma") return "prisma";
  if (ext === "json") return "json";
  if (ext === "svg") return "xml";
  return "javascript";
}

let files = [];
for (const d of INCLUDE_DIRS) walk(path.join(ROOT, d), files);
files.push(...INCLUDE_ROOT);
files = [...new Set(files)].sort((a, b) => a.localeCompare(b));

const lines = [];
lines.push("# NOW MEET GO · 나믿고 — 전체 코드 레퍼런스");
lines.push("");
lines.push("> 프로젝트 전체 소스 + 파일별 구조/경로/모듈화 설명");
lines.push(`> 생성: \`node scripts/generate-code-reference.mjs\` · ${new Date().toISOString()}`);
lines.push("");
lines.push("---");
lines.push("");
lines.push("## 1. 모듈 구조 요약");
lines.push("");
lines.push("```text");
lines.push("japan-travel-planner/");
lines.push("├── src/");
lines.push("│   ├── app/                 # Next.js App Router (페이지 + API Route)");
lines.push("│   │   ├── api/             # REST API");
lines.push("│   │   ├── */page.tsx       # URL 페이지");
lines.push("│   │   ├── layout.tsx       # 전역 레이아웃");
lines.push("│   │   └── globals.css      # 전역 스타일");
lines.push("│   ├── features/            # 기능 단위 (UI + server + lib)");
lines.push("│   │   ├── auth/ home/ attractions/ restaurants/ stays/");
lines.push("│   │   ├── planner/ trips/ itinerary/ checklist/ budget/");
lines.push("│   │   ├── chat/ notifications/ profile/");
lines.push("│   ├── server/              # Google·Rakuten·DeepL·AI·Email");
lines.push("│   ├── shared/              # ui / layout / lib / hooks");
lines.push("│   ├── auth.ts              # NextAuth");
lines.push("│   └── middleware.ts");
lines.push("├── prisma/schema.prisma");
lines.push("└── scripts/");
lines.push("```");
lines.push("");
lines.push("### 레이어 규칙");
lines.push("- **페이지** (`app/*/page.tsx`) → Feature 컴포넌트 조합");
lines.push("- **API Route** (`app/api/*`) → Feature server 또는 `server/*` 호출");
lines.push("- **Feature** = 한 도메인의 UI + server + lib (응집도 높은 모듈)");
lines.push("- **Shared** = 여러 Feature가 공유하는 UI/유틸");
lines.push("- **Server** = 외부 API 어댑터 (기능 간 재사용)");
lines.push("");
lines.push("---");
lines.push("");
lines.push(`## 2. 파일 인덱스 (${files.length}개)`);
lines.push("");

for (const f of files) {
  const d = describe(f);
  lines.push(`- \`${f}\` — **${d.layer}**: ${d.role}`);
}

lines.push("");
lines.push("---");
lines.push("");
lines.push("## 3. 전체 소스 코드 (파일별)");
lines.push("");

let totalLines = 0;
for (const f of files) {
  const full = path.join(ROOT, f);
  let content;
  try {
    content = fs.readFileSync(full, "utf8");
  } catch {
    continue;
  }

  const d = describe(f);
  const lang = langFor(f);
  totalLines += content.split("\n").length;

  lines.push(`### \`${f}\``);
  lines.push("");
  lines.push("| 항목 | 내용 |");
  lines.push("|------|------|");
  lines.push(`| **파일 경로** | \`${f}\` |`);
  lines.push(`| **레이어** | ${d.layer} |`);
  lines.push(`| **역할** | ${d.role} |`);

  if (f.startsWith("src/features/")) {
    const feat = f.split("/")[2];
    lines.push(`| **기능 모듈** | \`features/${feat}\` |`);
  }
  if (f.startsWith("src/app/api/")) {
    const route = f.replace("src/app/api/", "").replace("/route.ts", "");
    lines.push(`| **API 경로** | \`/api/${route}\` |`);
  }

  lines.push("");
  lines.push(`\`\`\`${lang}`);
  lines.push(content.replace(/```/g, "``\\`"));
  lines.push("```");
  lines.push("");
  lines.push("---");
  lines.push("");
}

fs.writeFileSync(OUT, lines.join("\n"), "utf8");
console.log(`Written: ${OUT}`);
console.log(`Files: ${files.length}, Source lines: ~${totalLines}`);
console.log(`Size: ${Math.round(fs.statSync(OUT).size / 1024)} KB`);
