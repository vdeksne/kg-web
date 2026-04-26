import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { portfolioItems } from "../src/data/portfolio";

const path = join(process.cwd(), "content/site-content.json");
const j = JSON.parse(readFileSync(path, "utf8")) as {
  portfolio: { items: unknown };
};
j.portfolio.items = portfolioItems;
writeFileSync(path, `${JSON.stringify(j, null, 2)}\n`, "utf8");
console.log("synced", portfolioItems.length, "portfolio items");
