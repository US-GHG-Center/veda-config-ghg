const defaultGuidance = {
  left: {
    title: 'Official websites use .gov',
    text: 'A **.gov** website belongs to an official government organization in the United States.',
    iconAlt: 'Dot gov icon',
    icon: '/img/icon-dot-gov.svg'
  },
  right: {
    title: 'Secure .gov websites use HTTPS',
    text: "A **lock icon** or **https://** means you've safely connected to the .gov website. Share sensitive information only on official, secure websites.",
    iconAlt: 'HTTPS icon',
    icon: '/img/icon-https.svg'
  }
};

module.exports = {
  /**
   * Glob path for the datasets.
   */
  datasets: "./datasets/*.data.mdx",

  /**
   * Glob path for the stories.
   */
  stories: "./stories/*.mdx",

  // App component and content overrides.
  // See docs/CONFIGURATION.md for more information.
  pageOverrides: {
    // Content for the about page.
    // Type: Content override
    aboutContent: "./overrides/about.mdx",
    // Content for the home page.
    // Type: Content override
    homeContent: "./overrides/home/index.mdx",
    // Content for the development page.
    // Type: Content override
    developmentContent: "./overrides/development/index.mdx",
    storiesHubContent: "./overrides/theme/content/index.mdx",
    storiesHubHero: "./overrides/theme/hero/index.mdx",
    // Component for the home hero banner.
    homeHero: "./overrides/components/home-hero/index.mdx",

    // Component for the header brand.
    headerBrand: "./overrides/components/header-brand/index.mdx",
    // Component for the footer.
    pageFooter: "./overrides/components/page-footer/index.mdx",
    "/visit": "./custom-pages/visit/index.mdx",
    "/teach": "./custom-pages/teach/index.mdx",
  },

  strings: {
    stories: {
      one: "Theme",
      other: "Themes",
    },
    storiesBanner: "Nine themes, one Earth.",
    dataCatalogBanner:
      "These datasets offer a sample of the global, actionable, and regularly updated data products that Earth.gov will offer. This curated list is not a comprehensive accounting of all Earth data produced by the federal government and additional datasets will be added as they become available.",
  },

  theme: {
    color: {
      primary: "#0550D8",
      link: "#1565EF",
    },
    type: {
      base: {
        color: "#1B2631",
        family: '"Inter", sans-serif',
      },
    },
    button: {
      type: {
        case: "none",
        weight: 500,
      },
    },
  },

  cookieConsentForm: {
    title: 'Cookie Consent',
    copy: 'We use cookies to enhance your browsing experience and to help us understand how our website is used. These cookies allow us to collect data on site usage and improve our services based on your interactions. To learn more about it, see our [Privacy Policy](https://www.nasa.gov/privacy/#cookies).',
    theme: {
      card: {
        backgroundColor: '#F0F0F0',
        sideBarColor: '#0550D8',
        textColor: '#1B2631',
        linkColor: '#1565EF'
      },
      acceptButton: {
        default: { backgroundColor: '#0550D8', textColor: 'white' },
        hover: { backgroundColor: '#2c3e50', textColor: '#white' }
      },
      declineButton: {
        default: { borderColor: '#0550D8', textColor: '#0550D8' },
        hover: { borderColor: '#2c3e50', textColor: '#2c3e50' }
      },
      iconColor: { default: '#0550D8', hover: '#175074' }
    }
  },
  banner: {
    headerText: 'An official website of the United States government',
    headerActionText: "Here's how you know",
    ariaLabel: 'Banner for official government website',
    flagImgSrc: '/img/us_flag_small.png',
    flagImgAlt: 'US flag',
    leftGuidance: defaultGuidance.left,
    rightGuidance: defaultGuidance.right,
    className: '',
    defaultIsOpen: false,
    contentId: 'gov-banner-content'
  }
};
