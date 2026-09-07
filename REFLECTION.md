## Q1 
Two populations. **External:** passengers on a booked flight — 300–500 per widebody departure,
ordering once per sector. **Internal:** the catering coordinator in airline ground operations,
who today owns reconciling meal counts against the galley loading plan before the uplift cutoff.

What a passenger does today, step by step: opens Manage Booking; finds Special Requests below
seat selection; picks from a list of four-letter SSR codes — VGML, MOML, AVML, KSML — with no
description of what each contains; submits; receives no confirmation of what will actually be
loaded; learns the outcome during the flight. Anything not on that list means phoning the call
centre. The cutoff is roughly 24 hours before departure.

## Q2 
**Augmented.** Four navigable screens with state persisting between them, from one prompt,
having written no React. What I contributed was not implementation but the decision that
"miscellaneous requests that are not guaranteed" deserved its own screen instead of a checkbox on
Screen 2. That distinction is the product. The pairing meant I spent the afternoon on it rather
than on routing.

**Constrained.** The constraint is visible in the shape of my own log: it is one prompt long. I
never iterated, because the first output looked finished. That is the constraint — not that I
could not read the code, but that a plausible result removed the prompt to look. I specified four
screen titles, received several hundred lines, checked that four screens existed and that I could
click between them, and stopped. My Goal list was a list of screens, so screens are all I
verified.

What went unchecked, concretely: what Screen 1 does with a booking reference that does not exist;
what a 40-character passenger name does to a meal card; what Screen 4 shows before data arrives;
and the exact wording in which Screen 3 tells a passenger their request may not be honoured.

Anthropic's 2026 figures put AI in around 60% of developers' work with only 0–20% of tasks fully
delegated. Those come from their own engineers, who can read what they receive. My gap was
different in kind: not slow verification, but verification I was not equipped to perform and did
not attempt.

**Constrained.** The constraint is visible in the shape of my own log: it is one prompt long. I
never iterated, because the first output looked finished. That is the constraint — not that I
could not read the code, but that a plausible result removed the prompt to look. I specified four
screen titles, received several hundred lines, checked that four screens existed and that I could
click between them, and stopped. My Goal list was a list of screens, so screens are all I
verified.

What went unchecked, concretely: what Screen 1 does with a booking reference that does not exist;
what a 40-character passenger name does to a meal card; what Screen 4 shows before data arrives;
and the exact wording in which Screen 3 tells a passenger their request may not be honoured.

Anthropic's 2026 figures put AI in around 60% of developers' work with only 0–20% of tasks fully
delegated. Those come from their own engineers, who can read what they receive. My gap was
different in kind: not slow verification, but verification I was not equipped to perform and did
not attempt.

## Q3
**Where my judgment changed the outcome.** One place, and it is in the master prompt:

> [SCREEN 3, Miscellaneous Meal Requests that are not guaranteed to be served]

Splitting non-guaranteed requests onto a separate screen is a judgment about honesty toward the
passenger. Nothing in "build a meal ordering front end" implies it, and the model would not have
invented it. That is evidence, not opinion.

**Where I was nominally in the loop and added nothing.** Everything after that prompt. I was
notionally specifying an entire product and specified four titles. Empty states, row ordering,
error text, the phrasing of the non-guarantee, and the data behind Screen 1 were all decided
without me, and I approved them by not looking.

Forward, judged on reversibility, stakes, checkability, volume, and who bears the error:

**Out of the loop: standard meal selection on Screen 1.** Chicken or pasta. Reversible until the
catering cutoff, self-checking because the passenger sees their own choice reflected back, 500
times per departure. No human should approve these individually. Before signing that off I would
want measured, over a month of flights: the reconciliation rate between recorded selections and
actual galley uplift, and the rate of selections that reach departure unresolved — a named
threshold, not an assumption that the totals add up.

**Human stays, however expensive: the religious and allergy meal count against what physically
boards the aircraft.** Irreversible at departure, invisible to the passenger until too late, and
the error is borne by someone who never agreed to any of this. Note that this same step is
reversible at T-48h and irreversible at T-0 — position has to be a function of time, not of the
step alone.

## Q4 — What it built that I never sketched

I asked for "the front end." Screen 1 was specified as "the food options available for their
booked flight" — which requires a booking lookup and a menu source I never mentioned. So the
model invented a flight, invented a menu, and stood up a small server behind it, ready to be
handed a Gemini key I never see. I asked for four screens and received an application with a
backend and fabricated data that reads exactly as convincingly as real data would.

I noticed at deploy.

The problem is not the server. It is that plausible fake data is demo-safe and production-fatal:
a menu that looks right conceals that nothing is connected to a catering system, and the invented
one probably has no non beef option at all.

To have caught it at the time I needed one line in my Goal list that was not about screens:
*where does every field on this screen come from, and what happens when that source is absent?*
That single question catches the invented menu, the missing booking lookup, and the empty state
in one pass.

## Q5 — Learning pointers for the organisational context

1. Require any AI-built app to declare its data sources and secret paths before it is demoed, not
   before it launches — my "front end" arrived with a server and a Gemini key path I never asked
   for and did not notice.
2. Review against a list of behaviours, not a list of screens — my four-screen Goal list passed
   in full while empty states, name overflow and invalid booking references went unexamined.
3. Set empty-state, error and disclaimer wording centrally as defaults — Screen 3 currently tells
   passengers a religious meal request may not be honoured in words the model chose and nobody
   approved.
