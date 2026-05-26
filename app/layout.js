export const metadata = {
  title: "Rent vs Buy Estimator | Should You Rent or Buy a Home?",
  description: "Compare renting vs buying a home. Estimate net worth after selling, including home appreciation, mortgage costs, and investment returns on your down payment and monthly savings.",

  alternates: {
    canonical: "https://www.rentvsbuyestimator.com",
  },

  openGraph: {
    title: "Rent vs Buy Estimator | Should You Rent or Buy a Home?",
    description: "Compare renting vs buying a home. See which builds more wealth over time based on your specific situation.",
    url: "https://www.rentvsbuyestimator.com",
    siteName: "MoneyWise Calculators",
    images: [
      {
        url: "https://www.rentvsbuyestimator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rent vs Buy Estimator — Compare renting vs buying a home",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rent vs Buy Estimator | Should You Rent or Buy a Home?",
    description: "Compare renting vs buying a home. See which builds more wealth over time.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  authors: [{ name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Rent vs Buy Estimator",
              description: "Free tool to compare renting versus buying a home. Estimate net worth after selling, including appreciation, mortgage costs, and investment returns.",
              url: "https://www.rentvsbuyestimator.com",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              author: {
                "@type": "Organization",
                name: "MoneyWise Calculators",
                url: "https://moneywisecalculator.com"
              }
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}