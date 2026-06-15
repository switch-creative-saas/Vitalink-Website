import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { dataset, projectId } from "./sanity/lib/env";
import { structure } from "./sanity/studio/structure";

export default defineConfig({
  name: "vitalink",
  title: "VitaLink CMS",
  projectId: projectId || "vitalink",
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
