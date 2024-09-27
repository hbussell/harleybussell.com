import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import compress from "astro-compress";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import sectionize from "@hbsnow/rehype-sectionize";
//import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: "https://www.harleybussell.com",
  trailingSlash: "never",
  build: {
    inlineStylesheets: "auto",
  },
  markdown: {
    rehypePlugins: [sectionize, rehypeHeadingIds],
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => page !== "https://www.harleybussell.com/",
      customPages: ["https://www.harleybussell.com"],
    }),
    robotsTxt(),
    compress({
      css: true,
      html: true,
      js: true,
      img: false,
      svg: false,
    }),
  ],
});
