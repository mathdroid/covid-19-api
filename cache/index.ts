import { daily } from "./daily";
import { og } from "./og";
import * as fs from "fs";
import { promisify } from "util";
import format from "date-fns/format";
(async () => {
  const [statusOg, statusDaily] = await Promise.all([og(), daily()]);

  const write = promisify(fs.writeFile);
  const writeReadme = `{
"date":"${format(new Date(), "cccc, dd LLLL yyyy HH:mm:ss")}",
"og_status":"${statusOg ? "success" : "error"}",
"daily_status":"${statusDaily ? "success" : "error"}"
}  
      `;
  await write("cache/status.json", writeReadme);
})();
