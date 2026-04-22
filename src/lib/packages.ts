export const packageOptions = {
  "Signal Launch": {
    name: "Signal Launch",
    price: "$1,500",
    stripePriceEnv: "VITE_STRIPE_SIGNAL_LAUNCH_PRICE_ID",
    summary: "Premium conversion-ready website for serious service businesses.",
  },
  "Authority Build": {
    name: "Authority Build",
    price: "$3,000",
    stripePriceEnv: "VITE_STRIPE_AUTHORITY_BUILD_PRICE_ID",
    summary: "Expanded authority website with deeper positioning and page strategy.",
  },
  "Private Studio": {
    name: "Private Studio",
    price: "$5,000",
    stripePriceEnv: "VITE_STRIPE_PRIVATE_STUDIO_PRICE_ID",
    summary: "Premium custom presence with investor/demo-ready polish.",
  },
} as const;

export type PackageName = keyof typeof packageOptions;

export const getPackageByName = (name: string | null) => {
  if (name && name in packageOptions) {
    return packageOptions[name as PackageName];
  }

  return packageOptions["Signal Launch"];
};
