/**
 * The CV, served straight from `public/` rather than linked out to a file
 * host.
 *
 * Same origin, so it is as fast as the rest of the site, it survives without a
 * third party staying up or a share link keeping its permissions, and nothing
 * about who downloads it is reported to anyone. A hosted-elsewhere link would
 * also be the only third-party dependency left on the site.
 *
 * The basename is what the browser saves the file as, so it carries the full
 * name rather than being `cv.pdf` in someone's downloads folder.
 *
 * Deliberately opened rather than force-downloaded: a recruiter would rather
 * skim it in the browser's PDF viewer and save it only if interested.
 *
 * The published copy carries no street address and no phone number, matching
 * the privacy line the rest of the site holds. Keep it that way when replacing
 * the file - a public repo keeps every version in its history forever, so a
 * later deletion does not unpublish anything.
 */
export const CV_PATH = "/Alessio-Maiola-CV.pdf";
