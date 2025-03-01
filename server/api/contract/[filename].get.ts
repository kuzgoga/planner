import { Stream } from "stream";
import { H3Event } from "h3";
import { promises as fs } from "fs";
import { createReadStream } from "fs";

async function downloadContract(event: H3Event): Promise<Stream> {
  const filename = getRouterParam(event, "filename");

  if (filename === undefined) {
    throw createError({ statusCode: 400, statusMessage: "Missing filename" });
  }

  const filepath = getFileLocally(filename, "/contracts");
  try {
    await fs.access(filepath); // Check if the file exists
    const fileStream = createReadStream(filepath);
    setHeaders(event, {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
    });
    return fileStream;
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: "Error reading file" });
  }
}

export default createTypedRoute(downloadContract);
