import { cpSync, existsSync, mkdirSync } from "node:fs";

if (existsSync("imagine_images")) {
  mkdirSync("public/imagine_images", { recursive: true });
  cpSync("imagine_images", "public/imagine_images", { recursive: true });
}
