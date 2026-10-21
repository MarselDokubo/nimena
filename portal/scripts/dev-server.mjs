import { spawn } from "node:child_process";

const input = process.argv.slice(2);
const forwarded = ["dev"];

for (let index = 0; index < input.length; index += 1) {
  const argument = input[index];

  if (argument === "--host" || argument === "--hostname") {
    forwarded.push("--hostname", input[index + 1] ?? "0.0.0.0");
    index += 1;
    continue;
  }

  if (argument === "--strictPort") continue;
  forwarded.push(argument);
}

const nextBinary = process.platform === "win32" ? "next.cmd" : "next";
const child = spawn(nextBinary, forwarded, { stdio: "inherit", shell: true });

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
