# Privacy Policy — AI Money Tracker

**Version 4 · Last updated 28 July 2026**
*(Supersedes version 3, same date. What changed is recorded in
[§11](#11-version-history).)*

Contact for any question about this policy, or to request deletion:
**support@ai-money-tracker.com**

---

## The short version

- **Your budget stays on your phone.** The numbers you enter — income, expenses,
  goals, the whole plan — are written to a file in the app's private storage on
  your device. They are not uploaded, not synced, and not readable by us.
- **We never see your bank username or password.** Bank sign-in happens inside
  Plaid's own secure screen. Those credentials never reach the app or our
  server.
- **No ads, no analytics, no trackers, no data sales.** The app contains no
  advertising SDK, no analytics SDK, and no third-party tracking of any kind.
  We do not sell, rent, or share your data for marketing.

---

## 1. What is stored on your device, and only your device

Your spending plan — every figure you enter and everything calculated from it —
is saved as a single file inside the app's private Application Support
directory. It never leaves the device except through your own encrypted iCloud
or iTunes device backup, which we cannot read.

Deleting the app deletes this file.

## 2. What is stored on our server

An account exists only after you sign in. The server holds:

| Data | Why | Form |
|---|---|---|
| Your Apple user identifier | To recognise your account across sign-ins | The opaque `sub` value Apple issues. It is specific to this app and is not your Apple ID, name, or email. |
| Two-factor authentication secret | To verify your 6-digit codes | Stored server-side; used only to check codes |
| Session tokens | To keep you signed in | **Hashed.** A stolen copy of our database contains nothing that can be replayed to sign in as you. |
| Recovery codes | Backup access if you lose your authenticator | **Hashed**, and each one stops working the moment it is used |

### Sign in with Apple

We request your name and email through Sign in with Apple. If you choose
Apple's **Hide My Email**, we receive only the relay address and never your
real one. We do not use either for marketing.

### Bank connection data

When you connect a bank account through Plaid, the server additionally holds:

- A Plaid access token and item identifier. **These never leave the server** and
  are never sent to your device.
- The name of the connected institution.
- A synchronisation cursor, so we fetch only what is new.
- Transaction records — date, amount, merchant or description, and Plaid's
  category — for a rolling window of the last **90 days**.

We hold the 90-day window so that reinstalling the app can restore your recent
transactions rather than losing them permanently.

**We never receive, store, or transmit your bank login credentials.** You enter
those into Plaid's interface. Plaid's own privacy policy governs that step:
<https://plaid.com/legal/#end-user-privacy-policy>

## 3. What we do *not* collect

- No advertising identifier, and no advertising of any kind
- No analytics, crash-reporting, or telemetry SDK
- No location data
- No contacts, photos, calendar, health, or microphone access
- No browsing or app-usage history
- No cross-app or cross-site tracking

## 4. Who your data is shared with

Only two third parties, both because the app cannot function without them:

- **Apple** — for Sign in with Apple, and for App Store delivery.
- **Plaid Inc.** — to establish and maintain the bank connection.

That is the entire list. We do not sell your personal information, we do not
share it with data brokers or advertisers, and we do not disclose it except
where we are legally compelled to.

## 5. How long it is kept, and how to have it deleted

- **On your device:** until you delete the plan or delete the app. Deleting the
  app removes your budget from the device immediately, and we never had a copy.
- **On the server:** while your account exists. Transaction records older than
  the 90-day window described above are discarded automatically.

### Deleting your account

**In the app: About → Delete Account.** You confirm once, and deletion happens
immediately — no email, no waiting period, no person in the loop.

Deletion covers everything in §2: your account record, your two-factor
enrolment, your recovery codes, every session, the bank connections associated
with your account, and the stored transaction records. The Plaid access tokens
for those connections are revoked with Plaid **before** any of our records are
removed, so the connection to your bank is severed and not merely forgotten. If
a bank connection cannot be revoked at that moment, **nothing is deleted** —
you keep your account and simply try again, rather than being left half-deleted.

Your budget is not touched: it lives only on your device (§1), and we never had
a copy to delete.

If you can no longer access the app — a lost device, for example — email
<support@ai-money-tracker.com> from the address associated with your account
and we will run the same deletion by hand. Please allow up to **30 days** for
the email route; in practice it is much faster, and we confirm once it is done.

## 6. Security

- Bank access tokens never leave the server and are never exposed to the device.
- Session tokens and recovery codes are stored hashed, never in plain form.
- Two-factor authentication is **mandatory**; there is no route around it.
- A used two-factor code cannot be replayed, even within the 30 seconds it
  would otherwise remain valid.
- Apple sign-in tokens are cryptographically verified against Apple's published
  keys, with the signing algorithm pinned, before any account is created.

No system is perfectly secure, and we do not claim otherwise.

## 7. Children

AI Money Tracker is not directed at children under 13, and we do not knowingly
collect personal information from them. If you believe a child has provided us
information, write to the address below and we will remove it.

## 8. Your rights

Wherever you live, you may ask us to tell you what we hold about you, correct
it, delete it, or export it. Depending on your jurisdiction — for example under
the GDPR or the CCPA — you may have additional rights, including the right to
lodge a complaint with a supervisory authority. **We do not sell personal
information**, so there is nothing to opt out of on that front.

To exercise any of these, email **support@ai-money-tracker.com**.

## 9. Changes to this policy

Material changes will be posted here with an updated date, and — because this
document lives in a public Git repository — every previous version and every
edit remains publicly visible in the commit history.

## 10. Contact

**support@ai-money-tracker.com**

Policy URL: <https://github.com/terminator1111111/Ai-Money-Tracker/blob/main/PRIVACY.md>

---

## 11. Version history

This document keeps its filename and URL across revisions on purpose — a policy
whose address changes is a policy that breaks every link pointing at it,
including the one on file with the App Store. The version below identifies the
text; the commit history of this repository is the authoritative record of every
change, including ones not summarised here.

### Version 4 — 28 July 2026 *(current)*

§5 rewritten because the facts changed, in the direction version 2 promised to
report: **in-app account deletion now exists** (About → Delete Account) and is
the primary route. It is immediate, it revokes Plaid access tokens *before*
removing any record, and it refuses to run at all — deleting nothing — if a
bank connection cannot be revoked, so an account can never be left half
deleted. The email route remains for anyone who can no longer access the app.
Nothing about what we collect, store, or share changed.

### Version 3 — 28 July 2026 *(superseded)*

The support and deletion-request contact address changed from
`support@marauderinnovation.org` to **support@ai-money-tracker.com**, in every
place it appears. Mail sent to the old address may not reach us; use the new
one. Nothing about what we collect, store, or share changed, and the deletion
process described in §5 is otherwise unchanged.

### Version 2 — 27 July 2026 *(superseded)*

Corrected §5 to describe account deletion **as it actually works today**.

Version 1 said we would delete your account on request and implied that was a
built-in feature. It is not. There is no in-app delete button and no automated
deletion endpoint; the request goes to a support address and a person acts on
it. Version 2 says exactly that, adds the response window we will actually hold
ourselves to (up to 30 days), and spells out precisely what deletion covers —
including that Plaid access tokens are revoked with Plaid rather than merely
forgotten on our side.

Nothing about what we collect, store, or share changed between versions. The
correction is to the description of a process, not to the handling of data.

### Version 1 — 27 July 2026 *(superseded)*

Initial publication.
