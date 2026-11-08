// Main editing file. Project entries live separately in projects.js.
// Read PERSONALIZAR.md, then run: node scripts/render-pages.cjs
globalThis.PORTFOLIO_CONTENT = {
  "profile": {
    "name": "Weirdtions",
    "discord": "weirdtions_",
    "discordUrl": "https://discord.com/channels/@me",
    "avatar": "assets/avatar.jpg",
    "avatarAlt": "Weirdtions avatar",
    "favicon": "assets/avatar.jpg",
    "tagline": "Roblox programmer"
  },
  "settings": {
    "language": "en",
    "initialProjectCount": 6,
    "loadMoreStep": 6,
    "featuredProjectIds": [],
    "homeSections": {
      "projects": true,
      "workflow": true,
      "notes": true,
      "contact": true
    },
    "showProjectPlaceholders": true
  },
  "navigation": [
    {
      "page": "portfolio",
      "label": "Portfolio",
      "visible": true,
      "inHeader": true
    },
    {
      "page": "proof",
      "label": "Proof",
      "visible": false,
      "inHeader": false
    },
    {
      "page": "services",
      "label": "Services",
      "visible": true,
      "inHeader": true
    },
    {
      "page": "about",
      "label": "About",
      "visible": true,
      "inHeader": true
    },
    {
      "page": "studios",
      "label": "Clients",
      "visible": false,
      "inHeader": false
    },
    {
      "page": "reviews",
      "label": "Reviews",
      "visible": false,
      "inHeader": false
    },
    {
      "page": "terms",
      "label": "Terms",
      "visible": false,
      "inHeader": false
    },
    {
      "page": "faq",
      "label": "FAQ",
      "visible": true,
      "inHeader": true
    }
  ],
  "pages": {
    "home": {
      "label": "Home",
      "title": "Roblox scripting & game systems | {{name}}",
      "description": "Weirdtions — Roblox programmer focused on backend systems."
    },
    "portfolio": {
      "label": "Portfolio",
      "title": "Portfolio | {{name}}",
      "description": "Projects and programming notes by {{name}}.",
      "kicker": "Projects & systems",
      "headingHtml": "The work",
      "descriptionHtml": "A place for the things I work on, what I did, and how they came together."
    },
    "proof": {
      "label": "Proof",
      "title": "Code & proof | {{name}}",
      "description": "Luau code examples and a clear structure for verifying project contributions.",
      "kicker": "Code, context & verification",
      "headingHtml": "Look under<br>the hood.",
      "descriptionHtml": "A useful portfolio makes its claims inspectable. Explore source code, technical decisions and evidence, with sample content clearly identified."
    },
    "services": {
      "label": "Services",
      "title": "Working together | {{name}}",
      "description": "Discuss project scope, gameplay systems, interfaces and whole-game scripting.",
      "kicker": "For your project",
      "headingHtml": "Start with the GDD.",
      "descriptionHtml": "I'd like to read it. A clear design document is the best starting point for figuring out the backend work your game needs."
    },
    "about": {
      "label": "About",
      "title": "About | {{name}}",
      "description": "Meet {{name}} and explore the approach behind connected Roblox game systems.",
      "kicker": "A little about me",
      "headingHtml": "About me",
      "descriptionHtml": "I'm {{name}}, a Roblox programmer. Most of the work I enjoy is on the backend."
    },
    "studios": {
      "label": "Clients",
      "title": "Clients & collaborations | {{name}}",
      "description": "Studio credits and approved project contributions.",
      "kicker": "Collaborations & contributions",
      "headingHtml": "The people<br>behind a game.",
      "descriptionHtml": "Studio credits, project roles and approved collaboration links, with the contribution to each project made clear."
    },
    "reviews": {
      "label": "Reviews",
      "title": "Client reviews | {{name}}",
      "description": "Client feedback, shared with permission and original context.",
      "kicker": "Client feedback",
      "headingHtml": "Real words.<br>Real context.",
      "descriptionHtml": "Feedback from actual collaborations, shared with permission and original context."
    },
    "terms": {
      "label": "Terms",
      "title": "Project terms | {{name}}",
      "description": "Project agreement outline covering scope, assets, milestones and review.",
      "kicker": "Project agreement · Draft template",
      "headingHtml": "Clear terms.<br>Clear expectations.",
      "descriptionHtml": "This page provides a structure for discussing a commission. <strong>It is a draft to personalize, not an active service agreement.</strong> Confirm the final terms directly before starting work."
    },
    "faq": {
      "label": "FAQ",
      "title": "Frequently asked questions | {{name}}",
      "description": "Questions about Roblox scripting, project scope, pricing and delivery.",
      "kicker": "FAQ · {{questionCount}} questions",
      "headingHtml": "Before we<br>get started.",
      "descriptionHtml": "Practical answers about project scope, pricing, delivery and the examples in this portfolio."
    }
  },
  "labels": {
    "message": "Send me your GDD",
    "hire": "Say hello",
    "startProject": "Send me your GDD",
    "viewPricing": "View pricing",
    "allProjects": "All work",
    "breakdown": "Read notes",
    "sampleProject": "Sample project",
    "layoutExample": "Layout example",
    "realProject": "Project",
    "technicalQuestion": "The problem",
    "approach": "How I approached it",
    "discussSimilar": "Get in touch",
    "projectPricing": "Project pricing",
    "discussSystem": "Discuss this system",
    "loadMore": "More projects",
    "projectCount": "Showing {{visible}} of {{total}} projects",
    "questions": "{{total}} questions",
    "reviews": "{{total}} published reviews",
    "collaborations": "{{total}} collaborations",
    "step": "STEP",
    "copyCode": "Copy code",
    "copyUsername": "Copy username",
    "openDiscord": "Open Discord",
    "copied": "Copied to clipboard.",
    "copyManually": "Select the text and copy it manually.",
    "onDiscord": "on Discord",
    "home": "Home",
    "menu": "Around the site",
    "codeExample": "EXAMPLE",
    "viewDemo": "View demo",
    "watchVideo": "Watch recording",
    "source": "Source / media credit",
    "sampleNotice": "Illustrative project, not a completed commission.",
    "projectPreview": "Read project notes",
    "skip": "Skip to content",
    "noScript": "Enable JavaScript to open project notes, use filters and copy the Discord username.",
    "contribution": "My part"
  },
  "callToAction": {
    "title": "Have a GDD for your game?",
    "description": "Send it over on Discord. We can go through the scope together."
  },
  "home": {
    "profileNote": "Roblox programmer",
    "greeting": "Hi, I'm",
    "introduction": [
      "I write code for Roblox games, mostly on the backend.",
      "I like working from a GDD. Send yours over and we can talk about the systems your game needs."
    ],
    "workLabel": "Explore the portfolio",
    "facts": [
      {
        "label": "My focus",
        "value": "Backend systems"
      },
      {
        "label": "Best place to start",
        "value": "Your GDD"
      }
    ],
    "board": {
      "imageLabel": "Server-side / Roblox",
      "title": "Backend work",
      "description": "The kind of work I'd like to take on.",
      "items": [
        {
          "title": "Player systems",
          "detail": "Data, inventories & progression"
        },
        {
          "title": "Game logic",
          "detail": "States, rules & game flow"
        },
        {
          "title": "System integration",
          "detail": "Connecting the pieces of a game"
        }
      ],
      "linkLabel": "How I work",
      "footerNote": "Roblox Studio / Luau"
    },
    "directory": {
      "title": "Take a look around",
      "items": [
        {
          "page": "portfolio",
          "label": "Portfolio",
          "description": "Projects & what I built"
        },
        {
          "page": "services",
          "label": "Services",
          "description": "Scope, GDD & getting started"
        },
        {
          "page": "about",
          "label": "About",
          "description": "A bit about me"
        },
        {
          "page": "faq",
          "label": "FAQ",
          "description": "Before we get started"
        }
      ]
    },
    "work": {
      "title": "Selected work",
      "linkLabel": "All work",
      "limit": 3,
      "emptyTitle": "A space for your work.",
      "emptyDescription": "Add a project to fill this layout with your own screenshots and notes.",
      "slotLabel": "Empty project template",
      "slotTitle": "Your project title",
      "slotDescription": "A short description of what the project does and what you built.",
      "slotRoleLabel": "Your contribution",
      "slotRole": "The backend systems you worked on."
    },
    "workflow": {
      "title": "Working together",
      "linkLabel": "The full process"
    },
    "notes": {
      "title": "A few things on my mind",
      "items": []
    },
    "contact": {
      "eyebrow": "Have something in mind?",
      "title": "Got a GDD?",
      "description": "Send it over. I'd like to read what you're building.",
      "buttonLabel": "Send me your GDD",
      "secondaryLabel": "See the process"
    }
  },
  "portfolio": {
    "allTitle": "Projects",
    "allNote": "",
    "allCategory": "All",
    "categories": [],
    "emptyTitle": "No project notes yet.",
    "emptyDescription": "This page will hold my projects and the work I did on them.",
    "emptyCategory": "No projects in this category."
  },
  "services": {
    "processTitle": "How I like to start",
    "processNote": "",
    "process": [
      {
        "title": "Send the GDD",
        "description": "Share the document, references, and the current state of the game."
      },
      {
        "title": "Go through the backend work",
        "description": "We'll go over what the systems need to do and how they connect to the rest of the game."
      },
      {
        "title": "Agree on the scope",
        "description": "We'll confirm the requirements, price and timing before starting."
      }
    ],
    "groups": []
  },
  "proof": {
    "codeTitle": "Read the code",
    "codeNote": "Illustrative Luau · No client code",
    "codeKicker": "Small, focused boundaries",
    "moduleTitle": "Cooldown logic",
    "description": "A tiny, deterministic module demonstrates how timing logic can stay independent of the UI and networking. This is a newly written illustration, not a published production module.",
    "filename": "examples/Cooldown.luau",
    "code": "-- Illustrative architecture example, not client code.\nlocal Cooldown = {}\n\nfunction Cooldown.canUse(lastUse, now, duration)\n    return lastUse == nil or now - lastUse >= duration\nend\n\nfunction Cooldown.remaining(lastUse, now, duration)\n    if lastUse == nil then\n        return 0\n    end\n\n    return math.max(0, duration - (now - lastUse))\nend\n\nreturn Cooldown",
    "sourceUrl": "",
    "evidenceTitle": "What makes useful evidence",
    "evidenceNote": "More than a screenshot",
    "items": [
      {
        "label": "01 / Source",
        "title": "Something you can read",
        "description": "A public repository or an approved code sample, with context about who owns the code and what it demonstrates."
      },
      {
        "label": "02 / Behavior",
        "title": "Something you can see",
        "description": "A playable demo or a recording showing the actual system, its edge cases and the supported interactions."
      },
      {
        "label": "03 / Contribution",
        "title": "A clear role",
        "description": "A specific explanation of the developer's contribution, separated from the work of artists and other team members."
      }
    ]
  },
  "about": {
    "title": "What I like working on",
    "note": "",
    "paragraphs": [
      "I'm {{name}}, a Roblox programmer. I enjoy the backend side of game development.",
      "I'm mainly looking for backend work. That's the kind of programming I'd like to spend more time on.",
      "If you have a GDD, send it to me. I prefer having the design in front of me so we can be specific about what needs to be built."
    ],
    "portfolioLabel": "See the work",
    "facts": [
      "Roblox Studio",
      "Luau",
      "Backend systems"
    ],
    "exploreTitle": "Elsewhere on this site",
    "exploreNote": "",
    "items": []
  },
  "reviews": {
    "sectionTitle": "Client reviews",
    "emptyTitle": "The next chapter goes here.",
    "emptyDescription": "Verified feedback will appear here with its original context. In the meantime, explore the project examples or start a conversation about your own idea.",
    "emptyButton": "Explore the portfolio",
    "items": []
  },
  "clients": {
    "sectionTitle": "Studio credits",
    "emptyNote": "Reserved for confirmed collaborations",
    "emptyRows": [
      {
        "title": "Studio / project",
        "description": "The studio name and a public project link."
      },
      {
        "title": "Role & contribution",
        "description": "The systems scripted and the boundaries of the contribution."
      },
      {
        "title": "Evidence & context",
        "description": "Approved media, release context or a reference the visitor can verify."
      }
    ],
    "emptyLabel": "To be added",
    "items": []
  },
  "faq": {
    "groups": [
      {
        "title": "Scope & process",
        "questions": [
          {
            "question": "How do I start a conversation?",
            "answer": "Send a short description of your game and the systems you want to discuss. Include your references, the current state of the project and any deadlines."
          },
          {
            "question": "What should a project brief include?",
            "answer": "Describe the behavior of each feature, the supported devices, any existing systems it must connect to and the assets that are already available."
          },
          {
            "question": "Can a reference game explain the whole scope?",
            "answer": "A reference can communicate a direction, but a written feature list is still useful. Spell out the interactions and rules that matter to your version."
          },
          {
            "question": "What happens if the scope changes?",
            "answer": "Discuss new requirements before development continues so that the scope, quote and schedule can be updated together."
          }
        ]
      },
      {
        "title": "Pricing & delivery",
        "questions": [
          {
            "question": "How much does a system cost?",
            "answer": "A price depends on the specific behavior, complexity and integrations. No rates have been configured in this sample portfolio; discuss the scope to receive a project-specific quote."
          },
          {
            "question": "Is there a fixed delivery time?",
            "answer": "Delivery dates are agreed individually. Feature scope, asset readiness and the state of the existing project all affect the schedule."
          },
          {
            "question": "Which payment methods are available?",
            "answer": "Payment methods, currency and milestone arrangements should be confirmed directly before accepting a commission. This template does not establish payment terms."
          },
          {
            "question": "How should revisions be handled?",
            "answer": "Agree in advance on the review process, the acceptance criteria and how revisions differ from additional features. Put those details in the written agreement."
          }
        ]
      },
      {
        "title": "Technical details",
        "questions": [
          {
            "question": "Are both client and server systems included?",
            "answer": "The service examples cover both. The exact division of responsibilities and the systems included in your project belong in its written scope."
          },
          {
            "question": "Who provides models, animations and effects?",
            "answer": "Identify the assets and their owners in the brief. Scripting and asset production are separate requirements that need to be planned together."
          },
          {
            "question": "Do the examples represent shipped commissions?",
            "answer": "No. The current project entries demonstrate the portfolio layout and technical breakdown format. Their preview artwork is credited to the reference site."
          },
          {
            "question": "Can I ask about an existing project?",
            "answer": "Yes. Describe the current setup and the changes you want to discuss. Sharing the relevant structure and a reproducible problem helps make the conversation concrete."
          }
        ]
      }
    ]
  },
  "terms": {
    "contentsTitle": "On this page",
    "sectionLabel": "Agreement outline",
    "questionsLabel": "Questions",
    "contactKicker": "Before starting",
    "contactTitle": "Anything unclear?",
    "contactDescription": "Bring questions to the conversation before agreeing to a project.",
    "contactButton": "Ask a question",
    "sections": [
      {
        "id": "scope",
        "title": "Scope of work",
        "subtitle": "Write down what the system does.",
        "description": "A project brief should describe the included features, supported devices, required integrations and acceptance criteria. Confirm that document before work begins.",
        "calloutTitle": "Changes belong in writing.",
        "calloutDescription": "New features or changes in direction should be discussed together with their impact on the quote and schedule."
      },
      {
        "id": "assets",
        "title": "Assets & access",
        "subtitle": "Identify what is needed to begin.",
        "description": "List the models, animations, effects, sounds, UI designs and access permissions required by the project. Agree on who provides each item and when it will be available.",
        "calloutTitle": "Keep responsibilities clear.",
        "calloutDescription": "Asset production, rigging, existing-code repairs and new integrations should be discussed explicitly when they are part of the work."
      },
      {
        "id": "payment",
        "title": "Payment & milestones",
        "subtitle": "Confirm the details directly.",
        "description": "Price, currency, payment method and milestone arrangements must be agreed directly for each project. This sample page does not set rates or request payment.",
        "calloutTitle": "Agree before paying.",
        "calloutDescription": "Use a written agreement covering the scope, payment schedule and applicable cancellation arrangements."
      },
      {
        "id": "delivery",
        "title": "Delivery & review",
        "subtitle": "Use the brief to review the result.",
        "description": "Agree on the delivery format, testing environment and review process. Review the behavior against the written requirements and record any remaining issues clearly.",
        "calloutTitle": "Define the handoff.",
        "calloutDescription": "Confirm documentation, configuration guidance, ownership and any support period as part of the project agreement."
      }
    ]
  },
  "contact": {
    "kicker": "Discord",
    "headingHtml": "Send me your GDD.",
    "description": "Share the document and a little context about the game. I'll read through what you need.",
    "channelLabel": "Discord"
  },
  "footer": {
    "description": "Roblox programmer / Backend systems",
    "note": "Your GDD is welcome.",
    "backToTop": "Back to top",
    "contactLabel": "Discord",
    "navigationTitle": "Explore",
    "contactTitle": "Get in touch"
  }
};
