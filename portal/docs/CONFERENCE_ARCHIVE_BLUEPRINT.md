# NIMENA Conference Archive Blueprint

## Outcome

Create a durable institutional archive in which every annual conference or approved event has one collection containing its photographs, recordings, programme, presentations, proceedings and verified descriptive information.

The public prototype is available at `/archive/` on the main website. It currently uses optimised site photographs and links large recordings to the supplied source folders. It does not upload, move or delete any original media.

## Archive record

Every event collection should record:

| Record | Required information |
| --- | --- |
| Event | Official title, edition, theme, start/end dates, location and organiser |
| Media | Photo, video, audio, programme, presentation or proceedings |
| Caption | What is happening, session/title and people shown where known |
| Source | Photographer, videographer, chapter, partner or original folder |
| Rights | Owner, permission basis, credit line and any publication restriction |
| Files | Original master, public derivative, thumbnail, duration/dimensions and checksum |
| Publication | Draft, rights review, approved, published, withdrawn or restricted |

## Workflow

1. Secretariat creates or verifies the event collection.
2. An authorised contributor supplies originals and descriptive information.
3. The archivist checks duplicates, quality, dates, names, source and rights.
4. Approved images receive web derivatives; approved videos are transcoded or linked from an authorised host.
5. Public records are published with captions and credits.
6. Corrections and withdrawals are retained in an audit history.

## Roles

- **Public visitor:** browse, filter and open approved media.
- **Contributor:** propose media and supply ownership/permission information.
- **Archive editor:** catalogue, caption, organise and request corrections.
- **Rights reviewer:** approve publication and restrictions.
- **Administrator:** manage controlled vocabularies, retention, storage and staff access.

## Storage recommendation

- Retain masters in private object storage with checksums, versioning and backup.
- Publish optimised photographs through the website/CDN, not from staff email accounts.
- Store large video masters privately and serve streaming derivatives from an approved video platform or storage/CDN workflow.
- Do not commit conference video files to GitHub; the supplied 208 MB and 629 MB recordings are unsuitable for the public-site repository.
- Preserve the source Drive folder ID and ingestion date for provenance, but do not rely on Drive as the only long-term copy.

## Rights and privacy

- Record permission to publish and the required credit line.
- Provide a correction/removal route for inaccurate captions or legitimate privacy concerns.
- Do not publish private delegate lists, identity documents, unapproved presentations or internal recordings.
- Mark minors, restricted sessions and commercially sensitive material for additional review.

## Current seed collections

- 14th NIMENA Annual Conference — supplied Google Drive collection and full recording.
- 13th NIMENA Annual Conference — 9 December 2024 poster, conference images and edited recording supplied for cataloguing.
- Singapore Maritime Week / Innovation Night — verified event photographs already used on the NIMENA website.

## Production next steps

1. Confirm that the supplied Drive folders are accessible to the intended public audience.
2. Obtain original captions, dates, venue, credits and publication permission.
3. Select a private master-storage and public video-streaming approach.
4. Build the archive-management interface and approval workflow.
5. Import collections in batches and verify each published event page.
