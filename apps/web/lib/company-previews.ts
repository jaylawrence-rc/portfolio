import { companyUrls } from "./profile";

export type CompanyPreview = {
  name: string;
  domain: string;
  label: string;
  image: { src: string; width: number; height: number; alt: string };
};

export const companyPreviews: Record<string, CompanyPreview> = {
  [companyUrls.chartmetric]: {
    name: "Chartmetric",
    domain: "chartmetric.com",
    label: "Audience analytics",
    image: {
      src: "/companies/chartmetric-preview.png", width: 2966, height: 2130,
      alt: "Chartmetric audience analytics with demographic charts, audience languages, and top cities.",
    },
  },
  [companyUrls.captivateChat]: {
    name: "Captivate Chat",
    domain: "captivatechat.ai",
    label: "Sales call assistant",
    image: {
      src: "/companies/captivate-chat-preview.png", width: 1237, height: 775,
      alt: "Captivate sales-call interface with a call plan and the Ask Athena AI assistant.",
    },
  },
  [companyUrls.evelan]: {
    name: "Evelan GmbH",
    domain: "evelan.de",
    label: "Web application showcase",
    image: {
      src: "/projects/evelan-public-webapps.jpg", width: 1600, height: 1200,
      alt: "Evelan’s published showcase of business applications on desktop and laptop screens.",
    },
  },
};
