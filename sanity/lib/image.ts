import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "./env";

const builder = imageUrlBuilder({
  projectId: projectId || "vitalink",
  dataset,
});

export function urlForImage(source: SanityImageSource | null | undefined) {
  if (!source) return null;
  return builder.image(source);
}
