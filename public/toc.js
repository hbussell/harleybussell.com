document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    try {
      const target = document.querySelector(href);
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
      });
    } catch (e) {}

    console.log("running click handler on", href);
    try {
      const headers = document.querySelectorAll("h2");
      let matchingHeader = null;
      const matching = headers.forEach((h) => {
        const headerId = h.getAttribute("id");
        if (href == `#${headerId}`) {
          matchingHeader = h;
        }
      });
      if (matchingHeader) {
        e.preventDefault();
        matchingHeader.scrollIntoView({
          behavior: "smooth",
        });
      }
    } catch (e) {}
  });
});

// github.com/rezahedi/rezahedi.dev/blob/main/src/layouts/BlogPost.astro
// Source: https://kld.dev/toc-animation/#marking-active-links
function addIntersectionObserver() {
  const observer = new IntersectionObserver((sections) => {
    sections.forEach((section) => {
      const heading = section.target.querySelector("h2");
      if (!heading) return;
      const id = heading.getAttribute("id");

      // Get the link to this section's heading
      const link = document.querySelector(`aside a[href="#${id}"]`);
      if (!link) return;

      const li = link.parentElement;
      if (li) {
        // Add/remove the .active class based on whether the
        // section is visible
        const addRemove = section.intersectionRatio > 0 ? "add" : "remove";
        li.classList[addRemove]("active");
      }
    });
  });

  document.querySelectorAll(".prose section").forEach((section) => {
    observer.observe(section);
  });
}

addIntersectionObserver();
