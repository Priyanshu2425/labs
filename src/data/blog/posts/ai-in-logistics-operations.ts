import type { BlogPost } from '../types';

export const post: BlogPost = {
  slug: 'ai-in-logistics-operations',
  title: 'AI in logistics: the use cases that survive contact with the yard',
  metaTitle: 'AI in Logistics Operations',
  metaDescription:
    'Logistics AI that works runs on data you already emit, degrades gracefully offline, and outputs a decision a dispatcher can act on — not a score to interpret.',
  excerpt:
    'Logistics is unusually well suited to AI and unusually unforgiving of it. The difference between the systems that stick and the dashboards that get ignored is fairly predictable.',
  standfirst:
    'Logistics AI succeeds when it runs on telemetry the operation already emits, degrades gracefully when connectivity drops, and outputs a specific action a dispatcher can take rather than a score to interpret — which is why routing, slotting, ETA prediction, appointment scheduling, and carrier matching ship, while general "supply chain intelligence" dashboards do not.',
  category: 'Industry',
  publishedAt: '2026-07-25',
  updatedAt: '2026-07-25',
  tags: ['logistics', 'supply chain', 'operations', 'industry'],
  keywords: [
    'AI in logistics',
    'AI supply chain use cases',
    'AI route optimization',
    'predictive ETA logistics',
    'warehouse AI slotting',
  ],
  body: [
    {
      type: 'p',
      text: 'Logistics has properties that make it a genuinely good fit for AI: enormous volumes of repeated decisions, continuous telemetry, and outcomes that are measured within hours rather than quarters. You know by the end of the day whether the route was good.',
    },
    {
      type: 'p',
      text: 'It is also unforgiving. The users are drivers with gloves on and dispatchers under time pressure, the connectivity is intermittent, and anything that adds a step to a shift gets abandoned within a week.',
    },
    {
      type: 'h2',
      id: 'three-traits',
      text: 'What the systems that stick have in common',
    },
    {
      type: 'ol',
      items: [
        'They run on data the operation already emits — GPS pings, scans, dock events, EDI messages — rather than requiring anyone to enter something new.',
        'They degrade gracefully. Signal drops constantly; a system that stops working in a dead zone is a system drivers stop trusting.',
        'They output an action, not a score. "Reroute vehicle 12 via the A-road, arrival 14:40" is usable. "Delay risk: 0.71" is a research finding.',
      ],
    },
    {
      type: 'quote',
      text: 'A dispatcher does not need a probability. They need to know which truck to move, and where.',
    },
    {
      type: 'h2',
      id: 'routing',
      text: 'Routing and dispatch',
    },
    {
      type: 'p',
      text: 'The classic case, and still the most reliable. Planning against live traffic and live vehicle positions rather than a snapshot from an hour ago is a straightforward improvement with an immediately measurable effect on ETAs and fuel.',
    },
    {
      type: 'p',
      text: 'The engineering difficulty is rarely the optimisation. It is the constraint set — driver hours, vehicle capabilities, customer time windows, site access restrictions, union rules — most of which lives in people\'s heads rather than in a system. Extracting those constraints is the project. [DSV Fleet Management](/product/dsv-fleet-management) is our build here: real-time tracking and dispatch with full visibility over every vehicle, driver, and route.',
    },
    {
      type: 'p',
      text: 'The same pattern extends past freight. [FieldRoute](/product/field-route) applies it to field service — auto-dispatching the best-matched technician, optimising routes, and tracking first-time-fix against service levels — and [Charge Pulse](/product/charge-pulse) applies live-availability routing to EV charging.',
    },
    {
      type: 'h2',
      id: 'eta',
      text: 'Predictive ETAs, with a confidence figure',
    },
    {
      type: 'p',
      text: 'Carrier-provided ETAs are frequently optimistic and rarely updated. A model trained on your own historical lane performance, weather, and dwell times will beat them, often substantially.',
    },
    {
      type: 'p',
      text: 'The important design choice is exposing confidence alongside the estimate. A precise ETA that is silently unreliable is worse than a range, because planners will build a schedule on it. [ShipSight](/product/ship-sight) tracks shipments across ocean, air, and ground and attaches a confidence score to each predicted ETA, flagging the at-risk ones — which is the part that actually changes behaviour.',
    },
    {
      type: 'callout',
      title: 'Prediction only pays if something happens next',
      text: 'An at-risk flag that lands in a report nobody reads is worth nothing. Wire the prediction to a specific action — notify the customer, re-sequence the dock, hold the connecting load — and name the person who owns that action. This is the most common reason logistics AI pilots fail to convert.',
    },
    {
      type: 'h2',
      id: 'warehouse',
      text: 'Inside the four walls',
    },
    {
      type: 'p',
      text: 'Warehouse work is dense with repeated micro-decisions, which makes small percentage gains add up quickly.',
    },
    {
      type: 'ul',
      items: [
        'Slotting: placing SKUs by velocity and affinity so the fastest movers are nearest the pick face. Re-slotting continuously as demand shifts is the part manual processes never manage.',
        'Pick-path optimisation: routing a picker along the shortest viable path rather than in SKU order.',
        'Wave planning: grouping orders so the picking effort per order falls.',
      ],
    },
    {
      type: 'p',
      text: '[StowPilot](/product/stow-pilot) combines these — re-slotting by velocity, planning pick waves, and routing pickers on the shortest path. The measurement discipline matters here: walking distance per order is the honest metric, because picks per hour can improve for reasons that have nothing to do with the system.',
    },
    {
      type: 'h2',
      id: 'yard-and-dock',
      text: 'The yard and the dock',
    },
    {
      type: 'p',
      text: 'Detention charges and driver waiting time are among the most avoidable costs in the chain, and they come from a scheduling problem rather than a transport one. Letting carriers self-book appointments, assigning the right door on arrival, and tracking turnaround makes the constraint visible — which is most of the fix. [DockQueue](/product/dock-queue) is our build in this area.',
    },
    {
      type: 'h2',
      id: 'brokerage',
      text: 'Matching and pricing',
    },
    {
      type: 'p',
      text: 'Freight brokerage is fundamentally a matching and pricing problem with abundant historical data, which is close to ideal conditions. [HaulBoard](/product/haul-board) matches open loads to best-fit carriers, prices each lane against live spot-rate data, and tracks margin per load.',
    },
    {
      type: 'p',
      text: 'The subtlety is that the objective is not "fill the load" — it is margin against the probability the carrier actually performs. A cheap carrier who fails costs far more than the spread saved, and a model optimised on price alone will learn to make that mistake.',
    },
    {
      type: 'h2',
      id: 'what-fails',
      text: 'What consistently fails',
    },
    {
      type: 'ul',
      items: [
        '"Supply chain intelligence" dashboards with no decision attached. Interesting once, ignored by week three.',
        'Anything requiring drivers to enter data they do not already enter.',
        'Systems assuming clean master data. Address quality and SKU dimension accuracy are usually the real project, and pretending otherwise wastes a quarter.',
        'Demand forecasting sold as an AI project when the operational constraint is actually warehouse capacity.',
      ],
    },
    {
      type: 'p',
      text: 'The scoping method in [how to scope an AI project](/blog/scoping-an-ai-project) applies particularly cleanly here, because logistics decisions are so easy to state concretely. More of our work in this space is on the [logistics and mobility page](/solutions/logistics).',
    },
  ],
  faqs: [
    {
      q: 'What are the best AI use cases in logistics?',
      a: 'Routing and dispatch against live traffic and vehicle positions, predictive ETAs with a confidence score, warehouse slotting and pick-path optimisation, dock and yard appointment scheduling, and carrier matching with lane pricing. All of them run on telemetry the operation already emits and output a specific action rather than a score.',
    },
    {
      q: 'Why do logistics AI pilots fail to reach production?',
      a: 'Most often because the prediction is not wired to an action. An at-risk flag that lands in a report nobody reads changes nothing. Others fail because they require drivers to enter data they do not already enter, or because they assume clean master data when address quality and SKU dimensions are the real project.',
    },
    {
      q: 'Should logistics AI work offline?',
      a: 'Yes. Connectivity in yards, warehouses, and on the road is intermittent, and a system that stops working in a dead zone is one drivers stop trusting within a week. Field-facing tools should work offline and sync automatically when the connection returns.',
    },
    {
      q: 'How do you measure whether a warehouse AI system is working?',
      a: 'Use walking distance per order rather than picks per hour. Picks per hour can improve for reasons unrelated to the system — different order mix, different staff, seasonal volume — whereas distance per order isolates the effect of slotting and path optimisation.',
    },
  ],
  relatedProductIds: ['dsv-fleet-management', 'ship-sight', 'stow-pilot', 'haul-board', 'dock-queue'],
  relatedSolutionSlugs: ['logistics'],
  relatedPostSlugs: [
    'scoping-an-ai-project',
    'ai-poc-to-production',
    'computer-vision-industrial-safety',
  ],
};
