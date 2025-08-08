// export const tokenName = "dsbTkn";

export const jwtConfig = {
  user: {
    accessTokenExpiresIn: "7h",
    refreshTokenExpiresIn: "7d",
    accessTokenName: "_dsbTkn",
    refreshTokenName: "_rDsbTkn",
  },
  admin: {
    accessTokenExpiresIn: "7h",
    refreshTokenExpiresIn: "7d",
    accessTokenName: "_aDsbTkn",
    refreshTokenName: "_arDsbTkn",
  },
};

export const SCORING_WEIGHT: Record<string, number> = {
  website_accessibility: 0.1,
  platform_stability: 0.1,
  visual_design: 0.15,
  navigation_responsiveness: 0.1,
  content_weight: 0.3,
  creativity_innovation: 0.15,
  consistency_relevance: 0.1,
};
