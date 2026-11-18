# Burton Lab website

Static site for the Burton Lab at Emory University (replacing the old Weebly site at www.jcburtonlab.com).
Plain HTML and CSS: no build step, no framework. Open `index.html` in a browser to preview locally.

## Layout

```
index.html, people.html, research.html, publications.html, ...   one file per page
levitated-matter.html, soft-earth-geophysics.html, gels-and-fluids.html   research topic pages
css/style.css        all styling (colors and fonts are set at the top)
js/site.js           mobile menu, image lightbox, figure sizing
assets/img/...       images, organized by page
assets/papers/       publication PDFs
assets/video/        lab videos (mp4)
assets/docs/         CV and other documents
tools/               one-time import of files from the old Weebly site
```

## First-time setup: pull the videos from the old site

Images and PDFs were imported from the Weebly archive. The 11 videos (and one sand figure) were not in
the archive; until a file exists, a striped placeholder with the file name is shown in its place.
To fetch them from the live old site, run once from this folder (existing files are skipped):

- Windows: `powershell -ExecutionPolicy Bypass -File tools\fetch-old-assets.ps1`
- Mac/Linux: `python3 tools/fetch_old_assets.py`

Anything it can't fetch is listed at the end with the target path, so you can save it by hand.
After that, the `tools/` folder can be deleted.

## Common edits

- **Add a paper:** in `publications.html`, copy an existing `<li class="pub">...</li>` block under the
  right year, change the title, link, authors and journal. Put the PDF in `assets/papers/`.
- **Add a lab member:** in `people.html`, copy an `<article class="member">` block and put the photo in
  `assets/img/people/` (portrait orientation crops best).
- **Replace an image:** save the new file with the same name as the placeholder label, or change the `src`.
- **Change colors/fonts:** edit the variables at the top of `css/style.css`.

## Hosting on GitHub Pages

1. Create a repository (for example `burtonlab-website`) and push these files to the `main` branch.
2. In the repository: Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site appears at `https://<user>.github.io/<repo>/` within a minute or two.

To keep the `www.jcburtonlab.com` address: in Settings → Pages → Custom domain, enter `www.jcburtonlab.com`
(this adds a `CNAME` file), then at your domain registrar point a `CNAME` record for `www` to
`<user>.github.io`. Turn on "Enforce HTTPS" once the certificate is issued. Only do this when you are
ready to switch away from Weebly.

GitHub rejects single files over 100 MB, so compress any very large videos (or host them on YouTube).
