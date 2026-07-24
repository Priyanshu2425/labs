import type { BlogPost } from '../types';

export const post: BlogPost = {
  slug: 'computer-vision-industrial-safety',
  title: 'Computer vision for industrial safety: what it takes to run on a real site',
  metaTitle: 'Computer Vision for Industrial Safety',
  metaDescription:
    'PPE detection is easy in a lab and hard on a real site. Camera placement, lighting, alert fatigue, and the privacy constraints that force on-premise inference.',
  excerpt:
    'Detecting a hard hat in a photograph is a solved problem. Running that detection across twenty cameras on a working site, at night, without generating alerts nobody reads, is not.',
  standfirst:
    'Industrial safety vision systems rarely fail on model accuracy. They fail on camera placement and lighting, on alert volume that trains operators to ignore them, on privacy and works-council constraints that were not resolved up front, and on network and hardware realities that force inference to run on-premise rather than in the cloud.',
  category: 'Industry',
  publishedAt: '2026-07-25',
  updatedAt: '2026-07-25',
  tags: ['computer vision', 'manufacturing', 'safety', 'industry'],
  keywords: [
    'computer vision industrial safety',
    'PPE detection AI',
    'AI safety monitoring manufacturing',
    'on-premise video analytics',
    'intrusion detection computer vision',
  ],
  body: [
    {
      type: 'p',
      text: 'Object detection on a clean image is a commodity. If your project is "detect whether a person is wearing a hard hat", the modelling is the easy part and it will be done in the first week.',
    },
    {
      type: 'p',
      text: 'Everything that determines whether the system is still switched on six months later happens elsewhere.',
    },
    {
      type: 'h2',
      id: 'cameras',
      text: 'The camera is the model',
    },
    {
      type: 'p',
      text: 'Detection accuracy on a real site is dominated by physical installation, not by architecture choice. A well-placed camera with an ordinary model beats a poorly placed one with the best model available, every time.',
    },
    {
      type: 'ul',
      items: [
        'Angle. Cameras mounted high for theft deterrence look down at heads and shoulders — a poor view for judging whether a harness is clipped or a vest is fastened.',
        'Occlusion. On a working site people stand behind machinery, pallets, and each other for most of the shift.',
        'Lighting. Mixed daylight and sodium lamps, headlights sweeping across the frame, and shift changes at dusk are where accuracy collapses.',
        'Weather and lens condition. Outdoor cameras get dust, rain, spiderwebs, and glare, and nobody is assigned to clean them.',
        'Resolution at distance. A person forty metres away occupies too few pixels for a reliable equipment judgement, regardless of the model.',
      ],
    },
    {
      type: 'callout',
      title: 'Do the camera survey before the model work',
      text: 'Collect a week of real footage across every shift, including night and shift change, before committing to a design. It routinely reveals that a third of the cameras cannot support the intended detection and that the project is partly a re-installation job. Finding that in week one is cheap; finding it after the pilot is not.',
    },
    {
      type: 'h2',
      id: 'alert-fatigue',
      text: 'Alert fatigue kills more deployments than false negatives',
    },
    {
      type: 'p',
      text: 'A system that flags every infraction on a busy site will generate hundreds of alerts a day. Operators will mute it within a fortnight, and then it detects nothing regardless of how accurate it is.',
    },
    {
      type: 'quote',
      text: 'A muted system has an effective accuracy of zero. Alert volume is a safety parameter, not a configuration detail.',
    },
    {
      type: 'p',
      text: 'The containment patterns are mostly about aggregation and consequence:',
    },
    {
      type: 'ol',
      items: [
        'Aggregate rather than alert per frame. "Zone B: 14 PPE exceptions this shift, trending up" beats fourteen interruptions.',
        'Escalate on persistence, not on instance. Someone unclipped for two seconds while adjusting kit is not the same as unclipped for ninety.',
        'Reserve real-time alerts for genuinely immediate danger — an intrusion into an active machine zone. Everything else is a report.',
        'Tune the threshold against operator tolerance, and re-check it monthly. It drifts as the site changes.',
      ],
    },
    {
      type: 'h2',
      id: 'privacy',
      text: 'Privacy and the workforce conversation',
    },
    {
      type: 'p',
      text: 'This is the constraint that most often stops an otherwise working system, and it is rarely on the original project plan. Continuous monitoring of identifiable workers engages data protection law, and in many jurisdictions requires consultation with a works council or union before deployment.',
    },
    {
      type: 'ul',
      items: [
        'Detect states, not identities, wherever the use case allows. "A person in zone B without a helmet" is a far easier system to defend than one that names them.',
        'Decide the retention period for footage and detections deliberately, and keep it short. Indefinite retention is the default and it is the wrong answer.',
        'Be explicit about whether output can be used in disciplinary processes. Workforce trust collapses the first time it happens unannounced, and takes the system with it.',
        'Involve safety representatives during design rather than presenting a finished system. A system framed as protecting people is accepted; the same system framed as monitoring them is fought.',
      ],
    },
    {
      type: 'h2',
      id: 'on-prem',
      text: 'Why this usually runs on-premise',
    },
    {
      type: 'p',
      text: 'Streaming continuous video from twenty cameras to a cloud endpoint is expensive in bandwidth, fragile on industrial connections, and frequently prohibited outright by the privacy constraints above.',
    },
    {
      type: 'p',
      text: 'So inference generally runs on-site, which shapes the whole architecture: a smaller model, a hardware budget per camera group, an update mechanism that works over an unreliable link, and monitoring that tells you a camera has been offline for three days. Our [Open Vision PPE](/product/open-vision-ppe) system runs fully on-premise for exactly these reasons — boundary surveillance, PPE compliance, and intrusion detection with no cloud dependency.',
    },
    {
      type: 'p',
      text: 'The general question of where inference is allowed to happen is covered in [private and on-premises LLM deployment](/blog/private-llm-deployment); the same reasoning applies to vision, with bandwidth added to the constraint list.',
    },
    {
      type: 'h2',
      id: 'measurement',
      text: 'Measuring whether it worked',
    },
    {
      type: 'p',
      text: 'Safety outcomes are, fortunately, rare events, which makes them statistically awkward to attribute. Incident counts will not move measurably within a pilot window, and claiming otherwise is not credible.',
    },
    {
      type: 'p',
      text: 'Measure leading indicators instead: exception rate per zone over time, time-to-correction after an exception, near-miss detections, and camera uptime. Those move within weeks and are defensible.',
    },
    {
      type: 'h2',
      id: 'beyond-safety',
      text: 'The same infrastructure does more than safety',
    },
    {
      type: 'p',
      text: 'Once cameras, on-site inference, and an alerting pipeline exist, the marginal cost of additional detections is low: bay occupancy, queue length, process step timing, obstruction of emergency routes. Safety is often the easiest case to fund and the best foundation to build from — and it connects naturally to production systems like [Factory OS](/product/factory-os), where milestone planning and floor-level status already live. More on the [manufacturing page](/solutions/manufacturing).',
    },
  ],
  faqs: [
    {
      q: 'What makes computer vision for industrial safety hard?',
      a: 'Not the model. Detection accuracy on a real site is dominated by camera angle, occlusion, mixed lighting, weather and lens condition, and resolution at distance. Beyond that, alert fatigue causes operators to mute systems, and privacy or works-council constraints frequently block deployment entirely.',
    },
    {
      q: 'How do you avoid alert fatigue in a safety monitoring system?',
      a: 'Aggregate rather than alerting per frame, escalate on persistence rather than on a single instance, reserve real-time alerts for immediate danger such as intrusion into an active machine zone, and tune thresholds against operator tolerance with a monthly re-check as the site changes.',
    },
    {
      q: 'Why does PPE detection usually run on-premise?',
      a: 'Streaming continuous video from many cameras to the cloud is expensive in bandwidth, fragile on industrial connections, and often prohibited by data protection constraints on monitoring identifiable workers. On-site inference avoids all three, at the cost of a hardware budget and an update mechanism that tolerates unreliable links.',
    },
    {
      q: 'How do you measure the impact of a safety vision system?',
      a: 'Not by incident counts — safety incidents are rare events that will not move measurably within a pilot window. Use leading indicators instead: exception rate per zone over time, time-to-correction after an exception, near-miss detections, and camera uptime.',
    },
  ],
  relatedProductIds: ['open-vision-ppe', 'factory-os'],
  relatedSolutionSlugs: ['manufacturing'],
  relatedPostSlugs: [
    'private-llm-deployment',
    'ai-in-logistics-operations',
    'ai-poc-to-production',
  ],
};
