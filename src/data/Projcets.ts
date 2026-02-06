export interface Project {
  id: number;
  type: 'image' | 'video';
  title: string;
  subtitle: string;
  image: string;
  link: string;
  locked?: boolean;
  textColor?: string;
  logoImage?: boolean;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'natural';
  gridColumn?: string;
  gridRow?: string;
}

export const projectData: Project[] = [
  {
    id: 0,
    type: 'image',
    title: 'TrackYou',
    subtitle: 'Track your coding activity.',
    link: '',
    image: '/preview/trackyou.png',
    textColor: '#010101ff',
    logoImage: true,
    locked: true
  },


  {
    id: 2,
    type: 'video',
    title: 'Vaayu jewels',
    link: '/vaayu-jewels',
    subtitle: 'E-COMMERCE JEWELRY WEBSITE',
    image: '/preview/vaayujewelsv.mp4',
    textColor: '#333333',
    logoImage: true
  },
  {
    id: 1,
    type: 'image',
    title: 'Moco',
    subtitle: 'The Trading Newspaper',
    link: '/moco',
    image: '/preview/moco.png',
    textColor: '#010101ff',
    logoImage: true,
  },
  {
    id: 3,
    type: 'image',
    title: 'Sunflower',
    subtitle: 'find All about your music Artist',
    link: '/sunflower',
    image: '/preview/sunflower.png',
    textColor: '#010101ff',
    logoImage: true,
  },

  {
    id: 4,
    type: 'image',
    title: 'midway',
    subtitle: 'Your cross-chain payment solution',
    link: '/midway',
    image: '/preview/midway.png',
    textColor: '#333333',
    logoImage: true
  },
  {
    id: 5,
    type: 'image',
    title: 'Kafinao',
    subtitle: "NewYork times paper about COffee",
    link: 'kafinao',

    image: '/preview/kafinao.png',
    textColor: '#333333',
    logoImage: true
  },
  {
    id: 5,
    type: 'image',
    title: 'Mewswap Dex',
    subtitle: "You can trade my MEW and Cat token",
    link: 'mewswap',

    image: '/preview/mewswap.png',
    textColor: '#333333',
    logoImage: true
  },
  {
    id: 6,
    type: 'image',
    title: 'SpeedCast',
    subtitle: 'better api client than axios',
    link: 'speedcast',

    image: '/preview/speedcast.gif',
    textColor: '#333333',
    logoImage: true
  },
  {
    id: 9,
    type: 'image',
    title: 'unipay Exchange',
    subtitle: "made in ETHGlobal",
    link: 'unipay',

    image: '/preview/unipay.png',
    textColor: '#333333',
    logoImage: true
  },
]

export interface ProjectPageData {
  link: string;
  title: string;
  poster: string;
  subtitle: string;
  description1: string;
  description2: string;
  role: string[];
  collaborators: string[];
  techStack: string[];
  timeline: string;
  rlinks: {
    link: string;
    text: string;
  }[];

  data: {
    image: string;
    description?: string;
  }[];
}

export const projectPageData: ProjectPageData[] = [
  {
    link: 'vaayu-jewels',
    title: 'Vaayu Jewels',
    poster: '/projects/vaayujewels/1.png',
    subtitle: 'E-COMMERCE JEWELRY WEBSITE',
    description1: "I (He/Him) build digital experiences. I crafted VaayuJewels.com end to end — from frontend flows to backend logic. I thrive where design meets engineering, and I'm always up for shaping beautiful, functional web products. Got something cool in mind? Let’s connect↗",
    description2: "I (He/Him) design and develop websites. I built VaayuJewels.com from scratch—full-stack architecture↗",
    role: ['Full Stack Developer.', 'Designer.'],
    collaborators: ['Harshil Madaliye'],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    timeline: '(SEP-NOV) 2024',
    rlinks: [
      {
        link: 'https://vaayujewels.com',
        text: 'MAIN WEBSITE',
      },
      {
        link: 'https://www.google.com/search?q=vaayu+jewels&oq=vaayu+jewels&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDINCAEQABiGAxiABBiKBTIKCAIQABiABBiiBDIKCAMQABiABBiiBDIKCAQQABiABBiiBDIKCAUQABiABBiiBDIKCAYQABiABBiiBNIBCDc0NzZqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8',
        text: 'SEO',
      },
    ],
    data: [
      {
        image: '/projects/vaayujewels/2.png',
      },
      {
        image: '/projects/vaayujewels/3.webp',
      },
      {
        image: '/projects/vaayujewels/4.jpg',
      },
      {
        image: '/projects/vaayujewels/5.png',
      },
    ]


  },


  {
    link: 'speedcast',
    title: 'SPEEDCAST API',
    poster: '/projects/speedcast/1.gif',
    subtitle: ' blazing fast API client with built-in caching',
    description1: "I (He/Him) built SpeedCast in TypeScript—a blazing‑fast API client with smart caching and built‑in rate limiting, so your modern JS apps stay snappy and resilient without you breaking a sweat↗",
    description2: "SpeedCast is my TypeScript‑powered API client crafted for speed: it handles request caching, rate limits itself automatically, and gives you rock‑solid typing out of the box—perfect for today’s JavaScript ecosystems↗",
    role: ['Developer.'],
    collaborators: ['Solo'],
    techStack: ['TypeScript'],
    timeline: '2025',
    rlinks: [
      {
        link: 'https://speedcast.heet.pro/',
        text: 'MAIN WEBSITE',
      },

    ],
    data: [
      {
        image: "/projects/speedcast/2.png",
        description: 'install api client.'
      },
      {
        image: "/projects/speedcast/3.png",
        description: "A blazing fast API client with built-in caching, rate limiting, and TypeScript support for modern JavaScript applications."
      },
      {
        image: "/projects/speedcast/4.png",
        description: "With Speedcast API, you can focus on building your application while it handles the complex tasks like caching, rate limiting, and retry logic for you. Whether you're working on a frontend React app, Next.js project or a backend Node.js server, Speedcast API provides a consistent, powerful solution for API management."
      },
      {
        image: "/projects/speedcast/5.png",
        description: "BETTER THAN AXIOS"
      },
      {
        image: "/projects/speedcast/6.png",
        description: "Just import Speedcast Api."
      },
      {
        image: "/projects/speedcast/7.png",
        description: "Rate-limiting is now easy with speedcast api."
      },

    ]


  },


  {
    link: 'midway',
    title: 'midway',
    poster: '/projects/midway/2.png',
    subtitle: ' your cross-chain payment solution.',
    description1: "Midway is a revolutionary cross-chain payment infrastructure that enables users to deposit funds on any supported blockchain and have them instantly available on the core network. Built on LayerZero's omnichain protocol, Midway eliminates the friction of managing multiple wallets and bridging funds across different chains.↗",
    description2: "Midway is deployed on Optimism, Ethereum, Unichain, Zora, Base, World Chain, Polygon, and Ink Ethereum, with Optimism serving as the core network while the others act as client networks.↗",
    role: ['Developer.'],
    collaborators: ['Solo'],
    techStack: ['OpenZeppelin', 'LayerZero V2', 'Wagmi', 'Viem', 'Hardhat v3', 'TypeScript'],
    timeline: '2025',
    rlinks: [
      {
        link: 'https://midway.heet.pro/',
        text: 'MAIN WEBSITE',
      },
      {
        link: 'https://github.com/heetprox/Midway-contracts',
        text: 'Contracts',
      },
      {
        link: 'https://github.com/heetprox/Midway',
        text: 'Frontend',
      },

    ],
    data: [
      {
        image: "/projects/midway/1.png",
        description: 'get some test tokens from optimsim console.↗'
      },
      {
        image: "/projects/midway/4.png",
        description: "First Mint FUSD for your chosen network and after deposit your funds it will sent message in layer zero and add to your wallet in 1 min.."
      },
      {
        image: "/projects/midway/5.png",
        description: "this are the networks that are supported by midway."
      },


    ]


  },





  {
    link: 'kafinao',
    title: 'Kafinao',
    poster: '/projects/kafinao/0.png',
    subtitle: "YOUR COFFEE SHOP'S NFT COLLECTION",
    description1: "Kafinao is my ongoing passion project—a live NFT gallery that captures the warmth and character of cafés from Seoul to São Paulo, all animated with buttery‑smooth GSAP magic. its based on world wide coffee shops↗",
    description2: "I’m building Kafinao from the ground up: a full‑stack NFT showcase inspired by coffee shops worldwide↗",
    role: ['Full Stack Developer.', 'Designer.'],
    collaborators: ['Solo'],
    techStack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'GSAP', 'Framer-motion'],
    timeline: 'JAN 2025',
    rlinks: [
      {
        link: 'https://www.kafinao.store/',
        text: 'MAIN WEBSITE',
      },
      {
        link: 'https://www.google.com/search?q=kafinao.store',
        text: 'SEO',
      },
    ],
    data: [
      {
        image: '/projects/kafinao/1.png',
      },
      {
        image: '/projects/kafinao/2.png',
      },
      {
        image: '/projects/kafinao/3.png',
      },
      {
        image: '/projects/kafinao/4.png',
      },
      {
        image: '/projects/kafinao/5.png',
      },
      {
        image: '/projects/kafinao/6.png',
      },
      {
        image: '/projects/kafinao/7.png',
      },
    ]
  },




  {
    link: 'moco',
    title: 'moco',
    poster: '/projects/moco/0.png',
    subtitle: "The Trading Newspaper",
    description1: "Moco is a trading newspaper that provides the latest news and information about the stock market in your mailbox. It is a platform that allows users to stay updated with the latest trends and developments in the stock market.↗",
    description2: "I’m building Moco from the ground up: a full‑stack trading newspaper that provides the latest news and information about the stock market in your mailbox with gemini analysis.↗",
    role: ['Full Stack Developer.'],
    collaborators: ['Solo'],
    techStack: ['Next.js', 'Brevo OTP mail', 'TradingView', 'BetterAuth', 'Gemini API', 'TailwindCSS', 'TypeScript', 'Inngest APi'],
    timeline: 'DEC 2025',
    rlinks: [
      {
        link: 'https://www.moco.realblue.lol/',
        text: 'MAIN WEBSITE',
      },
      {
        link: 'https://github.com/xrealblue/moco',
        text: 'GITHUB',
      },
    ],
    data: [
      {
        image: '/projects/moco/1.png',
      },
      {
        image: '/projects/moco/2.png',
      },
      {
        image: '/projects/moco/3.png',
      },
      {
        image: '/projects/moco/4.png',
      },
      {
        image: '/projects/moco/5.png',
      },
      {
        image: '/projects/moco/6.png',
      },
    ]
  },


  {
    link: 'mewswap',
    title: 'Mewswap',
    poster: '/projects/mewswap/0.png',
    subtitle: "The Trading Newspaper",
    description1: "Mewswap dex is about you can swap MEW token and CAT token on UniswapV2 that i have not you :) ",
    description2: "Just Visit Github.↗",
    role: ['Full Stack Developer.'],
    collaborators: ['Solo'],
    techStack: ['Next.js', 'UniswapV2', 'Solidity', 'Foundry', 'TypeScript', 'TailwindCSS'],
    timeline: 'DEC 2025',
    rlinks: [
      {
        link: 'https://www.mewswap.realblue.lol/',
        text: 'MAIN WEBSITE',
      },
      {
        link: 'https://github.com/xrealblue/MewDex',
        text: 'GITHUB',
      },
    ],
    data: []
  },


  {
    link: 'unipay',
    title: 'unipay Exchange',
    poster: '/projects/unipay/0.png',
    subtitle: "made in ETHGlobal",
    description1: "Unipay.Exchange is the 1st FIAT to DeFi onramp using UPI payments to make the vast liquidity available to the masses. The platform allows users to purchase cryptocurrencies directly in their native form by just scanning a UPI QR code and making an INR payment—no complicated onboarding, no centralized custody.↗",
    description2: "The platform leverages Uniswap V4 hooks to facilitate the transaction via a treasury and Pyth Network’s real-time price feeds to ensure transparent INR-to-crypto conversion rates verified on-chain!↗",
    role: ['Full Stack Developer.'],
    collaborators: ['Yagna RDK', 'Vaibhav Huddle01'],
    techStack: ['UniswapV4', 'Solidity', 'Next.js', 'Foundry', 'Pyth Network', 'TypeScript', 'TailwindCSS'],
    timeline: 'SEP 2025',
    rlinks: [
      {
        link: 'https://unipay-final.vercel.app/',
        text: 'MAIN WEBSITE',
      },
      {
        link: 'https://ethglobal.com/showcase/unipay-exchange-ev92h',
        text: 'ETHGLOBAL 2025',
      },
    ],
    data: [
      {
        image: '/projects/unipay/1.png',
      },
      {
        image: '/projects/unipay/2.png',
      },
    ]
  },

  {
    link: 'sunflower',
    title: 'sunflower',
    poster: '/projects/sunflower/0.png',
    subtitle: "Find Your Favorite Spotify Artist",
    description1: "Sunflower is a platform that allows users to find their favorite Spotify artists. user can see their albums and on new album release user get notified about new tracks↗",
    description2: "I’m building Sunflower from the ground up: a full‑stack platform that allows users to find their favorite Spotify artists with spotify apis↗",
    role: ['Full Stack Developer.'],
    collaborators: ['Solo'],
    techStack: ['Next.js', 'Express.js', 'BetterAuth', 'SpotifyAPI', 'JWT-OAUTH-GOOGLE', 'TypeScript'],
    timeline: 'JAN 2026',
    rlinks: [
      {
        link: 'https://www.sunflower.realblue.lol/',
        text: 'MAIN WEBSITE',
      },
      {
        link: 'https://github.com/xrealblue/sunflower',
        text: 'FRONTEND GITHUB',
      },
      {
        link: 'https://github.com/xrealblue/sunflower-backend',
        text: 'BACKEND GITHUB',
      },
    ],
    data: [
      {
        image: '/projects/sunflower/1.png',
      },
      {
        image: '/projects/sunflower/2.png',
      },
      {
        image: '/projects/sunflower/3.png',
      },
      {
        image: '/projects/sunflower/4.png',
      },
      {
        image: '/projects/sunflower/5.png',
      },
      {
        image: '/projects/sunflower/6.png',
      },
      {
        image: '/projects/sunflower/7.png',
      },
      {
        image: '/projects/sunflower/8.png',
      },
      {
        image: '/projects/sunflower/8.png',
      },
    ]
  },

]


