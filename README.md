# STAGE 7 - CARLE TEST

Complete, responsive homepage-only design exploration for Garden Gate Child Development Center.

This is an **unapproved Stage 7 comparison test**. It is not the selected homepage, a final design system, final copy, a production website, or a launch-ready implementation.

## Run locally

```sh
npm install
npm run dev -- --port 4173
```

Open `http://localhost:4173/`.

Production checks:

```sh
npm run verify
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

## Scope

- Destination: `/Users/anthonyrosenberger/Desktop/GardenGate-Carle-Test/`
- Assigned visual reference: `/Users/anthonyrosenberger/Desktop/GardenGate/06-design-research/screenshots/05-carle-museum-desktop.png`
- Homepage only; deeper routes are preserved as exact link destinations but are not built.
- No CMS, forms, donation processing, analytics, authentication, deployment, or active Portuguese route.
- Donate links hand off directly to `https://www.gardengatemv.org/donate`.

## Design and asset status

The prototype translates the reference's editorial pacing, varied image scale, adjacent caption/date treatment, and compact information hierarchy into an original Garden Gate system called **Studio Margin Notes**. It does not use reference-site text, artwork, identity, assets, layout order, or interaction signatures.

Seven Garden Gate image files were copied from the read-only source collection into `public/images/`. The project record clears the locally retained official-site photographs for this prototype, but final publication still needs current child/photographer permissions, image identities and dates, crop approval, and context review. ASSET-254 contains a visible photographic reference that needs separate source-image review. ASSET-005, ASSET-006, and ASSET-007 are small source files and need approved higher-resolution masters for final publication.

Fraunces and Public Sans are open-source Google Fonts used for this exploration with documented Georgia/Times and Arial/Helvetica fallbacks. A final build should confirm license-file retention, privacy policy, and whether to self-host approved font files.
